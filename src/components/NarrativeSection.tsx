import React from 'react';
import { BrandBible } from '../types';
import { Compass, CheckCircle2, XCircle, Sparkles, Target, Volume2, Camera, Shield } from 'lucide-react';

interface NarrativeSectionProps {
  brandBible: BrandBible;
}

export const NarrativeSection: React.FC<NarrativeSectionProps> = ({ brandBible }) => {
  const {
    brandName,
    tagline,
    missionStatement,
    visionStatement,
    elevatorPitch,
    brandValues,
    brandVoice,
    artDirection,
  } = brandBible;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide uppercase mb-1">
            <span>Core Brand Strategy</span>
            <span aria-hidden="true">·</span>
            <span>Narrative & Voice Matrix</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Mission, Vision & Verbal Identity
          </h2>
        </div>
      </div>

      {/* Mission & Vision Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-slate-200/70 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Mission Statement</span>
            </div>
            <p className="text-base md:text-lg font-medium text-slate-900 leading-relaxed">
              "{missionStatement}"
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs text-slate-500">
            Why we exist and what we build every single day.
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200/70 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Future Vision</span>
            </div>
            <p className="text-base md:text-lg font-medium text-slate-900 leading-relaxed">
              "{visionStatement}"
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs text-slate-500">
            The long-term transformation we catalyze in our industry.
          </div>
        </div>
      </div>

      {/* Elevator Pitch */}
      <div className="p-6 rounded-xl border border-slate-200/70 bg-gradient-to-r from-slate-50 to-white">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
          30-Second Elevator Pitch
        </span>
        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
          {elevatorPitch}
        </p>
      </div>

      {/* Core Values Pillars */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Foundational Value Pillars</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brandValues.map((value, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200/70 bg-slate-50/40 hover:border-slate-300 transition-colors"
            >
              <div className="text-xs font-mono font-bold text-slate-400 mb-1">
                0{idx + 1}.
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{value.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Voice & Tone with Do's and Don'ts */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Verbal Voice & Tone Directives</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brandVoice.map((voice, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200/70 bg-white shadow-2xs flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{voice.trait}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {voice.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-[11px] mb-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Say This (Do):</span>
                  </div>
                  <p className="text-slate-700 italic">"{voice.doExample}"</p>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-100 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800 text-[11px] mb-1">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    <span>Avoid This (Don't):</span>
                  </div>
                  <p className="text-slate-700 italic">"{voice.dontExample}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Art Direction & Visual Photography Guidelines */}
      {artDirection && (
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Art Direction & Visual Imagery Guidelines</span>
          </div>

          <div className="p-6 rounded-xl border border-slate-200/70 bg-slate-50/50 space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1">
                Photography & Lighting Philosophy:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {artDirection.photographyStyle}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-700">Mood Signature:</span>
              {(artDirection.moodKeywords || []).map((keyword, kIdx) => (
                <span
                  key={kIdx}
                  className="text-[11px] font-medium text-slate-700 bg-white px-2.5 py-0.5 rounded-full border border-slate-200"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                <span className="text-xs font-bold text-emerald-700 block mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Visual Do's
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {(artDirection.visualDos || []).map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                <span className="text-xs font-bold text-rose-700 block mb-2 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Visual Don'ts
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {(artDirection.visualDonts || []).map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
