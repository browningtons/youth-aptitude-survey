import { User, ArrowRight, Info } from 'lucide-react';
import type { ThemeStyles } from '../types';

interface Props {
  t: ThemeStyles;
  name: string;
  setName: (v: string) => void;
  dob: string;
  setDob: (v: string) => void;
  onStart: () => void;
  onAdmin: () => void;
}

export default function Onboarding({ t, name, setName, dob, setDob, onStart, onAdmin }: Props) {
  return (
    <div className={`w-full max-w-lg p-8 sm:p-12 text-center relative ${t.card}`}>
      <button
        onClick={onAdmin}
        className={`absolute top-6 right-6 flex items-center gap-2 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity hover:scale-105 ${t.iconColor}`}
        title="View Methodology & Outcomes"
      >
        <Info className="w-5 h-5" /> Admin
      </button>

      <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${t.progressBarBg}`}>
        <User className={`w-10 h-10 ${t.iconColor}`} />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Discover Your Path</h1>
      <p className="opacity-80 mb-8">Let's find out what kind of thinker you are.</p>

      <div className="space-y-5 mb-8 text-left">
        <div>
          <label className="block text-sm font-semibold mb-2 opacity-90 pl-2">First Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex"
            className={`w-full p-4 outline-none transition-all ${t.input}`}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 opacity-90 pl-2">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={`w-full p-4 outline-none transition-all ${t.input}`}
          />
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={!name || !dob}
        className={`w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${t.buttonPrimary}`}
      >
        Start Survey <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
