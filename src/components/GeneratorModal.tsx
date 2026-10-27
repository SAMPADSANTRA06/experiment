import React, { useState } from 'react';
import { Sparkles, X, RefreshCw, Wand2, ArrowRight } from 'lucide-react';
import { BrandBible } from '../types';

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrandGenerated: (bible: BrandBible) => void;
}

const SAMPLE_MISSIONS = [
  {
    title: 'Autonomous Robotics',
    name: 'Cobalt Dynamics',
    mission: 'To build agile bipedal warehouse robotics that safely collaborate with human workers, eliminating industrial injuries and accelerating circular supply chains.',
    industry: 'Robotics & Automation',
    vibe: 'Industrial Precision, High-Tech, Resilient',
  },
  {
    title: 'Specialty Coffee',
    name: 'Origin & Ember',
    mission: 'To source micro-lot high-elevation coffees directly from indigenous co-ops, celebrating single-origin roasting nuances through solar-powered roasteries.',
    industry: 'Artisanal Food & Beverage',
    vibe: 'Warm, Earthen, Artisanal, Grounded',
  },
  {
    title: 'Health & Longevity',
    name: 'Veritas Biome',
    mission: 'To democratize preventive metabolomics and mitochondrial optimization through non-invasive biomarker sensing and adaptive nutritional regimens.',
    industry: 'Biotechnology & Wellness',
    vibe: 'Clinical, Lucid, Trustworthy, Optimistic',
  },
  {
    title: 'Carbon Neutral Architecture',
    name: 'Terraform Atelier',
    mission: 'To create bio-composite, mass-timber residential buildings that sequester more atmospheric carbon than they consume over a century lifecycle.',
    industry: 'Architecture & Sustainable Design',
    vibe: 'Monolithic, Architectural, Organic, Clean',
  },
];

export const GeneratorModal: React.FC<GeneratorModalProps> = ({
  isOpen,
  onClose,
  onBrandGenerated,
}) => {
  const [mission, setMission] = useState('');
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('Technology & Software');
  const [vibe, setVibe] = useState('Modern, Minimalist & Authoritative');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplySample = (sample: typeof SAMPLE_MISSIONS[0]) => {
    setMission(sample.mission);
    setBrandName(sample.name);
    setIndustry(sample.industry);
    setVibe(sample.vibe);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission.trim()) {
      setErrorMessage('Please provide a mission or company description.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/brand/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mission,
          brandName: brandName.trim(),
          industry,
          vibe,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate Brand Bible');
      }

      onBrandGenerated(data.brandBible);
      onClose();
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err.message || 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                Generate New Brand Bible
              </h2>
              <p className="text-xs text-slate-500">
                Describe your company mission to synthesize full trademark assets, palettes, & typography
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleGenerate} className="p-6 space-y-5">
          {/* Preset Inspirations */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Fast Track Sample Missions:
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SAMPLE_MISSIONS.map((sample, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleApplySample(sample)}
                  className="text-left p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-colors text-xs"
                >
                  <span className="font-bold text-slate-900 block truncate">{sample.title}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{sample.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mission Description (Required) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Company Mission & Core Purpose <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="What does your company do? What problem do you solve, and what is your foundational philosophy?"
              className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Brand Name (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Brand Name <span className="text-[10px] font-normal text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Leave blank for AI name"
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-800"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Industry Domain
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Fintech, Sustainable Energy"
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-800"
              />
            </div>

            {/* Desired Vibe */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Visual & Tonal Vibe
              </label>
              <input
                type="text"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="e.g. Luxury Editorial, Cyberpunk"
                className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-800"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {errorMessage}
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating || !mission.trim()}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg transition-all shadow-sm"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Brand Bible...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate Complete Brand Bible</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
