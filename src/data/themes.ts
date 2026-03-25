import type { Theme, ThemeStyles } from '../types';

export const THEMES: Record<Theme, ThemeStyles> = {
  neon: {
    name: 'Prototype 1: Neon Cyber',
    appBg: 'bg-slate-950 text-cyan-50',
    card: 'bg-slate-900 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] rounded-2xl',
    input: 'bg-slate-800 border-cyan-500/50 focus:border-cyan-400 focus:ring-cyan-400 text-white placeholder-slate-400 rounded-xl',
    buttonPrimary: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all',
    buttonOption: 'bg-slate-800 hover:bg-cyan-950 border-2 border-slate-700 hover:border-cyan-500 text-cyan-50 rounded-xl transition-all duration-300',
    progressBarBg: 'bg-slate-800 rounded-full',
    progressBarFill: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]',
    accentText: 'text-cyan-400',
    iconColor: 'text-cyan-400'
  },
  glass: {
    name: 'Prototype 2: Glassmorphism',
    appBg: 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 text-slate-800',
    card: 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.1)] rounded-3xl',
    input: 'bg-white/50 border-white/80 focus:border-indigo-400 focus:ring-indigo-400 text-slate-800 placeholder-slate-500 rounded-2xl backdrop-blur-sm',
    buttonPrimary: 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5',
    buttonOption: 'bg-white/50 hover:bg-white/80 border border-white/50 hover:border-indigo-300 text-slate-700 rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md',
    progressBarBg: 'bg-indigo-900/10 rounded-full',
    progressBarFill: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    accentText: 'text-indigo-700',
    iconColor: 'text-indigo-600'
  },
  minimal: {
    name: 'Prototype 3: Clean Minimalist',
    appBg: 'bg-gray-50 text-gray-900',
    card: 'bg-white border-2 border-gray-100 shadow-sm rounded-3xl',
    input: 'bg-gray-50 border-2 border-gray-200 focus:border-blue-600 focus:ring-blue-600 text-gray-900 placeholder-gray-400 rounded-full px-6',
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-md transition-colors px-8',
    buttonOption: 'bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-700 rounded-3xl transition-colors duration-200',
    progressBarBg: 'bg-gray-200 rounded-full',
    progressBarFill: 'bg-blue-600',
    accentText: 'text-blue-600',
    iconColor: 'text-blue-600'
  }
};
