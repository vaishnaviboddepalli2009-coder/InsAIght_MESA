import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Lightbulb, 
  ArrowRight,
  Target,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { BusinessProfile, KPIProposal, Insight } from '../types';

interface DashboardProps {
  profile: BusinessProfile;
  kpis: KPIProposal[];
  insights: Insight[];
}

const MOCK_TIME_SERIES = [
  { name: 'Mon', val: 40, benchmark: 45 },
  { name: 'Tue', val: 35, benchmark: 45 },
  { name: 'Wed', val: 55, benchmark: 48 },
  { name: 'Thu', val: 65, benchmark: 50 },
  { name: 'Fri', val: 85, benchmark: 60 },
  { name: 'Sat', val: 95, benchmark: 80 },
  { name: 'Sun', val: 75, benchmark: 70 },
];

export default function Dashboard({ profile, kpis, insights }: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="flex justify-between items-end border-b border-[#222] p-8 pb-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#888] font-bold">Discovery Engine v2.0</p>
          <h1 className="text-5xl font-serif italic text-white tracking-tight">Adaptive QSR Insights</h1>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#888] uppercase tracking-widest mb-1 font-bold">Active Profile</p>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-lg font-medium text-[#c9a66b]">{profile.name}</span>
            <span className="text-white opacity-40 font-light italic">· {profile.type}</span>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-8 p-8 overflow-hidden">
        {/* Left Column: Stats & DNA */}
        <div className="col-span-4 flex flex-col gap-6">
          <section className="bg-[#111] border border-[#222] p-6 rounded-sm space-y-6">
            <h3 className="text-[11px] uppercase tracking-widest text-[#c9a66b] font-bold border-b border-[#222] pb-3">Business DNA</h3>
            <div className="space-y-4">
              <DNAItem label="Niche" value={profile.type} />
              <DNAItem label="Priority" value={profile.priority} />
              <DNAItem label="Peer Group" value="Urban Boutique" italic />
              <DNAItem label="Analysis Status" value="Optimized" color="text-green-500" />
            </div>
          </section>

          <section className="bg-[#111] border border-[#222] p-6 rounded-sm flex-1 flex flex-col">
            <h3 className="text-[11px] uppercase tracking-widest text-[#c9a66b] font-bold mb-4">Subjective Extraction</h3>
            <div className="flex-1 space-y-6">
              <div className="opacity-40">
                <p className="text-[10px] text-[#888] uppercase mb-1 font-bold">Discarded Variable</p>
                <p className="text-xs italic">"Net Gross Revenue" (Generic)</p>
              </div>
              
              {kpis.slice(0, 2).map((kpi, idx) => (
                <div key={kpi.id} className="pl-4 border-l-2 border-[#c9a66b] space-y-1">
                  <p className="text-[10px] text-[#c9a66b] uppercase mb-1 font-bold">North Star 0{idx + 1}</p>
                  <p className="text-sm font-medium text-white">{kpi.name}</p>
                  <p className="text-[11px] text-[#888] leading-relaxed italic line-clamp-2">
                    {kpi.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-[#222] mt-auto">
              <div className="flex items-center gap-3 text-[#555]">
                 <div className="w-2 h-2 rounded-full bg-[#c9a66b] animate-pulse" />
                 <span className="text-[10px] uppercase tracking-widest font-bold">AI Consistency Loop Active</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Key Metrics & Insights */}
        <div className="col-span-8 flex flex-col gap-8">
          {/* Main Metric Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] p-10 border border-[#333] flex flex-col justify-center items-center text-center rounded-sm relative group overflow-hidden">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#888] mb-4 font-bold relative z-10">Current Subjective Performance</p>
              <div className="relative z-10">
                <p className="text-7xl font-serif text-white tracking-tighter">
                  {MOCK_TIME_SERIES[MOCK_TIME_SERIES.length - 1].val}
                  <span className="text-3xl text-[#c9a66b] ml-1 font-sans font-medium">%</span>
                </p>
              </div>
              <p className="text-[11px] text-[#888] mt-4 italic font-light relative z-10">{kpis[0]?.name || 'Primary Metric'}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a66b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="bg-[#1a1a1a] p-10 border border-[#333] flex flex-col justify-center items-center text-center rounded-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#888] mb-4 font-bold">Peer Group Benchmark</p>
              <p className="text-7xl font-serif text-white opacity-40 tracking-tighter">
                {kpis[0]?.benchmark || '37.1'}
                <span className="text-3xl font-sans font-medium ml-1">%</span>
              </p>
              <p className="text-[11px] text-[#888] mt-4 uppercase tracking-[0.1em] font-bold">Urban Elite Segment</p>
            </div>
          </div>

          {/* Consultant Highlight Panel */}
          <section className="bg-white text-black p-12 flex-1 relative overflow-hidden flex flex-col rounded-sm">
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.4em]">Critical Intelligence Direct</h2>
              </div>
              
              <div className="flex-1">
                <p className="text-3xl font-serif leading-tight mb-8 text-[#111]">
                  {insights[0]?.context || "Processing context..."} 
                  <span className="mx-2 text-[#888] font-light">Your {profile.priority.toLowerCase()} trajectory is trailing the peer group by </span>
                  <span className="underline decoration-[#c9a66b] decoration-4 underline-offset-8 font-bold italic">
                    {(parseFloat(kpis[0]?.benchmark || '37') - MOCK_TIME_SERIES[MOCK_TIME_SERIES.length - 1].val).toFixed(1)}%
                  </span>
                </p>
                <div className="p-6 bg-gray-50 border border-gray-100 italic text-gray-600 leading-relaxed rounded-sm">
                   "The data suggests your '{profile.priority}' is being suppressed by menu hierarchy choices. Your highest margin items are physically buried, preventing attachment during peak volume."
                </div>
              </div>

              <div className="border-t border-black/10 pt-8 mt-10">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#888]">Recommended Strategic Pivot</p>
                    <p className="text-lg font-serif italic text-black font-medium">{insights[0]?.actionableStep}</p>
                  </div>
                  <button className="bg-black text-white text-[11px] px-10 py-4 uppercase tracking-[0.2em] font-bold hover:bg-[#c9a66b] transition-all flex items-center gap-3">
                    Apply Strategy <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Background SVG Watermark */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.03]">
              <Target className="w-64 h-64 text-black" />
            </div>
          </section>
        </div>
      </main>

      {/* Footer Meta */}
      <footer className="p-8 border-t border-[#222] flex justify-between items-center bg-[#0a0a0a]">
        <div className="flex gap-12">
          <MetaItem label="Extraction Speed" value="4.2m" />
          <MetaItem label="Model Relevance" value="98%" />
          <MetaItem label="Data Integrity" value="High" />
        </div>
        <div className="flex items-center gap-6 text-[#555]">
          <p className="text-[10px] uppercase italic tracking-widest">Was this analysis subjective enough?</p>
          <div className="flex gap-1 text-white">
            <button className="w-10 h-10 border border-[#222] flex items-center justify-center hover:bg-white hover:text-black transition-all">×</button>
            <button className="w-10 h-10 border border-[#222] flex items-center justify-center hover:bg-[#c9a66b] hover:text-black transition-all text-[#c9a66b]">✓</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DNAItem({ label, value, italic, color }: { label: string, value: string, italic?: boolean, color?: string }) {
  return (
    <div className="flex justify-between items-center border-b border-[#222] pb-2">
      <span className="text-[11px] text-[#555] uppercase tracking-widest">{label}</span>
      <span className={cn(
        "text-xs font-medium",
        color || "text-[#e0e0e0]",
        italic && "italic uppercase"
      )}>{value}</span>
    </div>
  );
}

function MetaItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a66b]" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-bold">{label}:</span>
      <span className="text-[10px] uppercase text-white tracking-widest">{value}</span>
    </div>
  );
}

function TrendBadge({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <div className="p-1 px-2 rounded-lg bg-green-50 text-green-600 flex items-center gap-1 text-[10px] font-bold"><TrendingUp className="w-3 h-3" /> UP</div>;
  if (trend === 'down') return <div className="p-1 px-2 rounded-lg bg-red-50 text-red-600 flex items-center gap-1 text-[10px] font-bold"><TrendingDown className="w-3 h-3" /> DN</div>;
  return <div className="p-1 px-2 rounded-lg bg-gray-50 text-gray-600 flex items-center gap-1 text-[10px] font-bold"><Minus className="w-3 h-3" /> ST</div>;
}

function TooltipIcon({ text }: { text: string }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Info className="w-3 h-3 text-gray-300 hover:text-black cursor-help" />
      {show && (
        <div className="absolute top-0 right-full mr-2 w-48 p-4 bg-white shadow-xl rounded-2xl border border-gray-100 z-50 text-[11px] leading-relaxed text-gray-500">
          <span className="block font-bold text-gray-800 mb-1">RATIONALE</span>
          {text}
        </div>
      )}
    </div>
  );
}
