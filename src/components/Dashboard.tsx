import { useState, useEffect } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { RefreshCcw, TrendingUp, Trophy, Palette, Users } from 'lucide-react';
import type { Aptitude, AnalyticsData, ThemeStyles } from '../types';
import { fetchAnalytics } from '../utils/fetchAnalytics';
import { useI18n } from '../i18n';

const APTITUDE_COLORS: Record<string, string> = {
  Builder: '#f59e0b',
  Thinker: '#6366f1',
  Creator: '#ec4899',
  Helper: '#10b981',
  Persuader: '#ef4444',
  Organizer: '#06b6d4'
};

const THEME_COLORS: Record<string, string> = {
  neon: '#a855f7',
  glass: '#6366f1',
  minimal: '#64748b',
  sunset: '#f97316',
  forest: '#22c55e'
};

const ALL_APTITUDES: Aptitude[] = ['Builder', 'Thinker', 'Creator', 'Helper', 'Persuader', 'Organizer'];

interface Props {
  t: ThemeStyles;
}

export default function Dashboard({ t }: Props) {
  const { t: tr } = useI18n();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(false);
    const result = await fetchAnalytics();
    if (result) {
      setData(result);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <RefreshCcw className={`w-8 h-8 animate-spin ${t.iconColor}`} />
        <p className="opacity-60 font-medium">{tr('dashboard.loading')}</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold opacity-70 mb-2">{tr('dashboard.noData')}</p>
        <p className="opacity-50 text-sm mb-6">
          {error ? tr('dashboard.connectError') : tr('dashboard.noDataDesc')}
        </p>
        {error && (
          <button onClick={loadData} className={`px-6 py-2 text-sm font-bold ${t.buttonPrimary}`}>
            {tr('dashboard.retry')}
          </button>
        )}
      </div>
    );
  }

  // Prepare chart data — ensure all 6 aptitudes always appear
  const aptitudeData = ALL_APTITUDES.map(name => ({
    name,
    value: data.byAptitude[name] || 0
  }));
  const totalAptitudeVotes = aptitudeData.reduce((sum, d) => sum + d.value, 0) || 1;

  // Sort for leaderboard
  const aptitudeLeaderboard = [...aptitudeData].sort((a, b) => b.value - a.value);

  const themeData = Object.entries(data.byTheme).map(([name, value]) => ({ name, value }));
  const ageGroupLabels: Record<string, string> = {
    elementary: tr('survey.ageGroup.elementary'),
    jrHigh: tr('survey.ageGroup.jrHigh'),
    highSchool: tr('survey.ageGroup.highSchool')
  };
  const ageData = Object.entries(data.byAgeGroup).map(([key, value]) => ({
    name: ageGroupLabels[key] || key,
    value
  }));
  const timeData = data.byDate.map(d => ({ date: d.date, count: d.count }));

  // Stat helpers
  const topAptitude = aptitudeLeaderboard.length > 0 ? aptitudeLeaderboard[0].name : '—';
  const topTheme = themeData.length > 0
    ? themeData.reduce((a, b) => a.value > b.value ? a : b).name
    : '—';

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard t={t} label={tr('dashboard.totalSubmissions')} value={String(data.total)} icon={<Users className="w-5 h-5" />} />
        <StatCard t={t} label={tr('dashboard.topAptitude')} value={topAptitude} icon={<Trophy className="w-5 h-5" />} color={APTITUDE_COLORS[topAptitude]} />
        <StatCard t={t} label={tr('dashboard.mostUsedTheme')} value={topTheme} icon={<Palette className="w-5 h-5" />} color={THEME_COLORS[topTheme]} />
      </div>

      {/* Aptitude Leaderboard + Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <ChartCard t={t} title={tr('dashboard.aptitudeDistribution')}>
          <div className="space-y-3">
            {aptitudeLeaderboard.map((item, idx) => {
              const pct = Math.round((item.value / totalAptitudeVotes) * 100);
              const color = APTITUDE_COLORS[item.name] || '#6366f1';
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="w-5 text-center font-extrabold text-xs opacity-40">{idx + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{item.name}</span>
                      <span className="text-xs font-bold opacity-60">{item.value} ({pct}%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-current/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>

        {/* Radar Chart */}
        <ChartCard t={t} title={tr('dashboard.aptitudeRadar')}>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={aptitudeData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid strokeDasharray="3 3" opacity={0.2} />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis allowDecimals={false} tick={{ fontSize: 10 }} />
              <Radar
                name="Aptitude"
                dataKey="value"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Age Group + Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard t={t} title={tr('dashboard.ageGroupBreakdown')}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={ageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={3}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {ageData.map((_, i) => (
                  <Cell key={i} fill={['#6366f1', '#06b6d4', '#f59e0b'][i % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Theme Distribution — Donut with theme colors */}
        <ChartCard t={t} title={tr('dashboard.themeDistribution')}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={themeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={3}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {themeData.map((entry) => (
                  <Cell key={entry.name} fill={THEME_COLORS[entry.name] || '#6366f1'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Timeline */}
      <ChartCard t={t} title={tr('dashboard.submissionsOverTime')}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} dot={{ r: 5, strokeWidth: 2 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-2 mt-3 text-xs opacity-50 font-medium">
          <TrendingUp className="w-3.5 h-3.5" /> {data.total} total across {timeData.length} day{timeData.length !== 1 ? 's' : ''}
        </div>
      </ChartCard>
    </div>
  );
}

function StatCard({ t, label, value, icon, color }: { t: ThemeStyles; label: string; value: string; icon: React.ReactNode; color?: string }) {
  return (
    <div className={`p-6 rounded-2xl border border-current/10 bg-current/5 text-center`}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className={`opacity-50 ${t.iconColor}`}>{icon}</span>
        <p className="text-xs font-bold uppercase tracking-wider opacity-50">{label}</p>
      </div>
      <p className={`text-3xl font-extrabold`} style={color ? { color } : undefined}>
        <span className={color ? '' : t.accentText}>{value}</span>
      </p>
    </div>
  );
}

function ChartCard({ t, title, children }: { t: ThemeStyles; title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-current/10 bg-current/5">
      <h3 className={`text-lg font-bold mb-4 ${t.accentText}`}>{title}</h3>
      {children}
    </div>
  );
}
