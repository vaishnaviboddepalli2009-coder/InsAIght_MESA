import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import DiscoveryPhase from './components/DiscoveryPhase';
import Dashboard from './components/Dashboard';
import { BusinessProfile, KPIProposal, Insight, POSData } from './types';
import { generateAdaptiveInsights } from './services/geminiService';

export default function App() {
  const [view, setView] = useState<'onboarding' | 'discovery' | 'dashboard'>('onboarding');
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [kpis, setKpis] = useState<KPIProposal[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);

  const handleOnboardingComplete = (data: BusinessProfile) => {
    setProfile(data);
    setView('discovery');
  };

  const handleDiscoveryComplete = async (discoveredKPIs: KPIProposal[]) => {
    setKpis(discoveredKPIs);
    
    // Generate actual insights based on the KPIs and mock data
    if (profile) {
      const mockData = generateMockPOSData();
      const generatedInsights = await generateAdaptiveInsights(profile, discoveredKPIs, mockData);
      setInsights(generatedInsights);
    }
    
    setView('dashboard');
  };

  return (
    <div className="antialiased font-sans">
      {view === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {view === 'discovery' && profile && (
        <DiscoveryPhase 
          profile={profile} 
          onDiscoveryComplete={handleDiscoveryComplete} 
        />
      )}

      {view === 'dashboard' && profile && (
        <Dashboard 
          profile={profile} 
          kpis={kpis} 
          insights={insights} 
        />
      )}
    </div>
  );
}

function generateMockPOSData(): POSData[] {
  return Array.from({ length: 10 }).map((_, i) => ({
    timestamp: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
    total: Math.random() * 100 + 20,
    timeToServe: Math.floor(Math.random() * 300) + 60,
    items: [
      { item: 'Signature Latte', category: 'Beverage', price: 6.5, quantity: 1 },
      { item: 'Muffin', category: 'Pastry', price: 4.5, quantity: Math.random() > 0.5 ? 1 : 0 }
    ]
  }));
}
