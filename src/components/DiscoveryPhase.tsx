import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { KPIProposal, BusinessProfile } from '../types';
import { discoverKPIs } from '../services/geminiService';

interface DiscoveryPhaseProps {
  profile: BusinessProfile;
  onDiscoveryComplete: (kpis: KPIProposal[]) => void;
}

const ENGINE_STEPS = [
  { id: 'scan', label: 'Scanning Menu DNA', icon: Database },
  { id: 'extract', label: 'Extracting Subjective Verticals', icon: Brain },
  { id: 'correlate', label: 'Correlating with Business Goals', icon: Cpu },
  { id: 'finalize', label: 'Mapping North Star KPIs', icon: Sparkles }
];

export default function DiscoveryPhase({ profile, onDiscoveryComplete }: DiscoveryPhaseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function startDiscovery() {
      try {
        // Simulate visual steps
        for (let i = 0; i < ENGINE_STEPS.length; i++) {
          if (!mounted) return;
          setCurrentStep(i);
          await new Promise(r => setTimeout(r, 1200));
          setCompletedSteps(prev => [...prev, ENGINE_STEPS[i].id]);
        }

        // Real call to Gemini
        const kpis = await discoverKPIs(profile);
        
        if (!mounted) return;
        
        if (kpis.length === 0) {
          throw new Error("Could not synthesize KPIs. Please check your AI Studio secrets configuration.");
        }

        onDiscoveryComplete(kpis);
      } catch (err: any) {
        if (mounted) {
          console.error("Discovery Engine Failed:", err);
          setError(err.message || "An unexpected error occurred during synthesis.");
        }
      }
    }

    startDiscovery();
    return () => { mounted = false; };
  }, [profile, onDiscoveryComplete]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans text-[#e0e0e0]">
        <div className="max-w-md w-full bg-[#111] border border-red-900/30 p-8 rounded-sm text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500">
            <Sparkles className="w-8 h-8 opacity-50" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif italic text-white leading-tight">Engine Interrupted</h2>
            <p className="text-red-400 text-sm font-medium tracking-wide">Synthesis Aborted</p>
          </div>
          <p className="text-[#888] text-sm leading-relaxed">
            {error.includes("GEMINI_API_KEY_MISSING") 
              ? "Your environment is missing the core logic key. Ensure GEMINI_API_KEY is configured in the AI Studio Secrets panel."
              : error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-black text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-[#c9a66b] transition-colors"
          >
            Re-Initialize System
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans text-[#e0e0e0] overflow-hidden">
      {/* Background Ambient Effect */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c9a66b]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 w-full max-w-lg space-y-12">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-5 rounded-full bg-white/5 border border-white/10"
          >
            <Sparkles className="w-10 h-10 text-[#c9a66b] animate-pulse" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-5xl font-serif italic text-white tracking-tight">Discovery Engine</h2>
            <p className="text-[#888] uppercase text-[10px] tracking-[0.4em] font-bold">Subjective KPI Synthesis v2.0</p>
          </div>
          <p className="text-[#888] font-light max-w-xs mx-auto italic">
            Analyzing {profile.name} DNA to extract unique growth formulas.
          </p>
        </div>

        <div className="space-y-4">
          {ENGINE_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStep;
            const isCompleted = completedSteps.includes(step.id);
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "flex items-center justify-between p-6 rounded-sm border transition-all",
                  isCurrent ? 'bg-[#111] border-[#c9a66b]/50 shadow-[0_0_20px_rgba(201,166,107,0.1)]' : 'bg-transparent border-[#222]'
                )}
              >
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "p-2 rounded-sm",
                    isCompleted ? 'text-green-500' : isCurrent ? 'text-[#c9a66b]' : 'text-[#333]'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium tracking-wide",
                    isCurrent ? 'text-white' : 'text-[#444]'
                  )}>
                    {step.label}
                  </span>
                </div>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : isCurrent ? (
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a66b] animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a66b] animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a66b] animate-bounce" />
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        <div className="pt-8 flex flex-col items-center gap-4">
           <div className="w-full bg-[#111] h-1 rounded-full overflow-hidden border border-[#222]">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${(completedSteps.length / ENGINE_STEPS.length) * 100}%` }}
               className="h-full bg-[#c9a66b]"
             />
           </div>
           <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#444] font-bold">
             Neural Extraction Active
           </span>
        </div>
      </div>
    </div>
  );
}
