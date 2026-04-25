import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Store, MapPin, Target, FileText, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { BusinessProfile, BusinessType, Priority } from '../types';

interface OnboardingProps {
  onComplete: (profile: BusinessProfile) => void;
}

const BUSINESS_TYPES: BusinessType[] = [
  'Food Truck',
  'Fine-Dining Cafe',
  'Quick-Service Drive-Thru',
  'Specialty Bakery',
  'Casual Dining'
];

const PRIORITIES: Priority[] = [
  'Speed of Service',
  'High Margin Sales',
  'Customer Loyalty',
  'Staff Efficiency'
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<BusinessProfile>({
    name: '',
    location: '',
    type: 'Quick-Service Drive-Thru',
    priority: 'Speed of Service',
    menuContent: ''
  });

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c9a66b]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div 
        layout
        className="w-full max-w-xl bg-[#111] rounded-sm p-12 shadow-2xl border border-[#222] relative z-10"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#888]">Context / Engine Launch</span>
                <h2 className="text-5xl font-serif italic text-white leading-tight">Tell us about your business.</h2>
                <p className="text-[#888] font-light">Mapping your core operational DNA to initialize the subjective discovery sequence.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9a66b] flex items-center gap-2">
                    <Store className="w-3 h-3" /> Business Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    placeholder="The Artisan's Table"
                    className="w-full text-2xl font-serif bg-transparent border-b border-[#333] py-3 focus:border-[#c9a66b] outline-none transition-all placeholder:text-[#333] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#c9a66b] flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Location
                  </label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={e => setProfile({ ...profile, location: e.target.value })}
                    placeholder="Urban Tech Hub"
                    className="w-full text-2xl font-serif bg-transparent border-b border-[#333] py-3 focus:border-[#c9a66b] outline-none transition-all placeholder:text-[#333] text-white"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#888]">Establishment Type</label>
                  <div className="flex flex-wrap gap-2">
                    {BUSINESS_TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => setProfile({ ...profile, type: t })}
                        className={cn(
                          "px-4 py-2 rounded-sm text-[11px] uppercase tracking-widest font-bold transition-all border",
                          profile.type === t 
                            ? "bg-[#c9a66b] text-black border-[#c9a66b]" 
                            : "bg-transparent text-[#888] border-[#222] hover:border-[#444]"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                disabled={!profile.name || !profile.location}
                onClick={nextStep}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#c9a66b] disabled:bg-[#222] disabled:text-[#444] disabled:cursor-not-allowed transition-all"
              >
                Continue Context Phase <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#888]">Intent / Goal Mapping</span>
                <h2 className="text-5xl font-serif italic text-white leading-tight">What drives your success?</h2>
                <p className="text-[#888] font-light">Pick your primary operational focus for LLM refinement.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {PRIORITIES.map(p => (
                  <button
                    key={p}
                    onClick={() => setProfile({ ...profile, priority: p })}
                    className={cn(
                      "flex items-center justify-between p-6 rounded-sm border transition-all text-left group",
                      profile.priority === p 
                        ? "border-[#c9a66b] bg-[#1a1a1a]" 
                        : "border-[#222] bg-transparent hover:border-[#444]"
                    )}
                  >
                    <div className="space-y-1">
                      <span className={cn(
                        "font-serif text-xl",
                        profile.priority === p ? "text-[#c9a66b]" : "text-white"
                      )}>{p}</span>
                      <p className="text-xs text-[#888] italic font-light">
                        {p === 'Speed of Service' && "Optimizing total throughput metrics."}
                        {p === 'High Margin Sales' && "Focusing on category profitability."}
                        {p === 'Customer Loyalty' && "Building long-term retention value."}
                        {p === 'Staff Efficiency' && "Maximizing output per labor hour."}
                      </p>
                    </div>
                    {profile.priority === p ? (
                      <Target className="w-5 h-5 text-[#c9a66b]" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-[#222] group-hover:text-[#444]" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#c9a66b] transition-all"
              >
                Deep Scan Menu <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#888]">DNA / Menu Extraction</span>
                <h2 className="text-5xl font-serif italic text-white leading-tight">Import your menu.</h2>
                <p className="text-[#888] font-light">The engine will identify subjective KPI opportunities from your menu structure.</p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <FileText className="absolute top-5 left-5 w-5 h-5 text-[#c9a66b]" />
                  <textarea
                    value={profile.menuContent}
                    onChange={e => setProfile({ ...profile, menuContent: e.target.value })}
                    className="w-full h-64 p-5 pl-14 rounded-sm border border-[#222] bg-[#1a1a1a] focus:border-[#c9a66b] outline-none transition-all font-mono text-[13px] text-[#e0e0e0] resize-none"
                    placeholder="Signature Dessert: $12.00
Boutique Coffee: $6.00...
"
                  />
                </div>
                <div className="p-4 bg-[#c9a66b]/5 border-l-2 border-[#c9a66b]">
                  <p className="text-[11px] text-[#c9a66b] italic font-light tracking-wide leading-relaxed">
                    Note: High-fidelity menus lead to 34% more accurate subjective KPI extraction.
                  </p>
                </div>
              </div>

              <button
                disabled={!profile.menuContent}
                onClick={() => onComplete(profile)}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#c9a66b] disabled:bg-[#222] transition-all"
              >
                Launch Discovery Engine <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
