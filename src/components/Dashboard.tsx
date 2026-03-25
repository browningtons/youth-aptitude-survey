import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { RefreshCcw } from 'lucide-react';
import type { AnalyticsData, ThemeStyles } from '../types';
import { fetchAnalytics } from '../utils/fetchAnalytics';

const CHART_COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
const AGE_GROUP_LABELS: Record<string, string> = {
  elementary: 'Elementary',
  jrHigh: 'Jr. High',
  highSchool: 'High School'
};

interface Props {
  t: ThemeStyles;
}

export default function Dashboard({ t }: Props) {
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
        <p className="opacity-60 font-medium">Loading analytics...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-semibold opacity-70 mb-2">No analytics data available</p>
        <p className="opacity-50 text-sm mb-6">
          {error ? 'Could not connect to the data source.' : 'Set VITE_SHEETS_WEBHOOK_URL to enable tracking.'}
        </p>
        {error && (
          <button onClick={loadData} className={`px-6 py-2 text-sm font-bold ${t.buttonPrimary}`}>
            Retry
          </button>
        )}
      </div>
    );
  }

  // Prepare chart data
  const aptitudeData = Object.entries(data.byAptitude).map(([name, value]) => ({ name, value }));
  const themeData = Object.entries(data.byTheme).map(([name, value]) => ({ name, value }));
  const ageData = Object.entries(data.byAgeGroup).map(([key, value]) => ({
    name: AGE_GROUP_LABELS[key] || key,
    value
  }));
  const timeData = data.byDate.map(d => ({ date: d.date, count: d.count }));

  // Stat helpers
  const topAptitude = aptitudeData.length > 0
    ? aptitudeData.reduce((a, b) => a.value > b.value ? a : b).name
    : '—';
  const topTheme = themeData.length > 0
    ? themeData.reduce((a, b) => a.value > b.value ? a : b).name
    : '—';

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard t={t} label="Total Submissions" value={String(data.total)} />
        <StatCard t={t} label="Top Aptitude" value={topAptitude} />
        <StatCard t={t} label="Most Used Theme" value={topTheme} />
      </div>

      {/* Aptitude + Theme Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard t={t} title="Aptitude Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={aptitudeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                {aptitudeData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard t={t} title="Age Group Breakdown">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={ageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {ageData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Timeline + Theme bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard t={t} title="Submissions Over Time">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={timeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard t={t} title="Theme Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={themeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                {themeData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ t, label, value }: { t: ThemeStyles; label: string; value: string }) {
  return (
    <div className={`p-6 rounded-2xl border border-current/10 bg-current/5 text-center`}>
      <p className="text-sm font-bold uppercase tracking-wider opacity-50 mb-2">{label}</p>
      <p className={`text-3xl font-extrabold ${t.accentText}`}>{value}</p>
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
