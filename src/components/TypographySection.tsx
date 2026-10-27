import React, { useState } from 'react';
import { TypographySpec } from '../types';
import { ExternalLink, Type, RefreshCw, Sparkles, Check, Edit3 } from 'lucide-react';

interface TypographySectionProps {
  typography: TypographySpec;
  brandName: string;
}

const POPULAR_GOOGLE_PAIRS: TypographySpec[] = [
  {
    headerFont: 'Syne',
    headerWeight: '700',
    bodyFont: 'Plus Jakarta Sans',
    bodyWeight: '400',
    accentFont: 'Space Grotesk',
    rationale: 'Avant-garde, sculptural geometric authority paired with lucid, warm humanist legibility.',
    headerLetterSpacing: '-0.03em',
    bodyLetterSpacing: '-0.01em',
  },
  {
    headerFont: 'Playfair Display',
    headerWeight: '600',
    bodyFont: 'DM Sans',
    bodyWeight: '400',
    accentFont: 'Cormorant Garamond',
    rationale: 'Classical editorial distinction balanced with clean, friendly modern sans-serif pragmatism.',
    headerLetterSpacing: '-0.02em',
    bodyLetterSpacing: '0em',
  },
  {
    headerFont: 'Space Grotesk',
    headerWeight: '700',
    bodyFont: 'Inter',
    bodyWeight: '400',
    accentFont: 'JetBrains Mono',
    rationale: 'Neo-grotesque retro-futurism for headlines anchored by the gold standard of digital UI readability.',
    headerLetterSpacing: '-0.03em',
    bodyLetterSpacing: '-0.01em',
  },
  {
    headerFont: 'Outfit',
    headerWeight: '700',
    bodyFont: 'Work Sans',
    bodyWeight: '400',
    accentFont: 'JetBrains Mono',
    rationale: 'Geometric optimism and modern rhythm combined with an open, accessible rhythm for long reading.',
    headerLetterSpacing: '-0.02em',
    bodyLetterSpacing: '0em',
  },
  {
    headerFont: 'Cinzel',
    headerWeight: '700',
    bodyFont: 'Inter',
    bodyWeight: '400',
    accentFont: 'Playfair Display',
    rationale: 'Monumental Roman proportions for high-end heritage, balanced by razor-sharp contemporary utility.',
    headerLetterSpacing: '0.04em',
    bodyLetterSpacing: '0em',
  },
];

export const TypographySection: React.FC<TypographySectionProps> = ({
  typography: initialTypography,
  brandName,
}) => {
  const [typography, setTypography] = useState<TypographySpec>(initialTypography);
  const [sampleHeadline, setSampleHeadline] = useState(
    'Shaping the Architecture of Tomorrow'
  );
  const [sampleBody, setSampleBody] = useState(
    'We build thoughtful products at the intersection of discipline and imagination. Every detail is calibrated for enduring clarity, reducing cognitive burden, and sparking human vitality.'
  );
  const [isEditingSample, setIsEditingSample] = useState(false);

  // Sync if prop updates
  React.useEffect(() => {
    setTypography(initialTypography);
  }, [initialTypography]);

  const headerFontUrl = `https://fonts.google.com/specimen/${encodeURIComponent(typography.headerFont.replace(/ /g, '+'))}`;
  const bodyFontUrl = `https://fonts.google.com/specimen/${encodeURIComponent(typography.bodyFont.replace(/ /g, '+'))}`;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide uppercase mb-1">
            <span>Visual Hierarchy System</span>
            <span aria-hidden="true">·</span>
            <span>Google Fonts Curated Pairing</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Editorial & Interface Typography Specimen
          </h2>
        </div>

        {/* Alternate Quick Pairing Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500">Pairing Presets:</label>
          <select
            className="text-xs bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-hidden font-medium"
            onChange={(e) => {
              const selected = POPULAR_GOOGLE_PAIRS.find(
                (p) => p.headerFont === e.target.value
              );
              if (selected) setTypography(selected);
            }}
            value={typography.headerFont}
          >
            {POPULAR_GOOGLE_PAIRS.map((p, idx) => (
              <option key={idx} value={p.headerFont}>
                {p.headerFont} + {p.bodyFont}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Font Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Header Font Card */}
        <div className="p-5 rounded-xl border border-slate-200/70 bg-slate-50/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
              <span>Primary Display & Headers</span>
              <a
                href={headerFontUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 normal-case font-medium"
                title="View on Google Fonts"
              >
                Google Fonts <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2"
              style={{ fontFamily: typography.headerFont }}
            >
              {typography.headerFont}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Default Weight: <span className="font-semibold text-slate-800">{typography.headerWeight || 'Bold (700)'}</span>
              {typography.headerLetterSpacing && (
                <span className="ml-2">· Tracking: <span className="font-mono text-slate-700">{typography.headerLetterSpacing}</span></span>
              )}
            </p>
          </div>
          <div
            className="mt-4 pt-3 border-t border-slate-200/60 text-lg font-bold text-slate-400 tracking-wide select-none"
            style={{ fontFamily: typography.headerFont }}
          >
            Aa Bb Gg 123 &%
          </div>
        </div>

        {/* Body Font Card */}
        <div className="p-5 rounded-xl border border-slate-200/70 bg-slate-50/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
              <span>Body Text & Paragraphs</span>
              <a
                href={bodyFontUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 normal-case font-medium"
                title="View on Google Fonts"
              >
                Google Fonts <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2"
              style={{ fontFamily: typography.bodyFont }}
            >
              {typography.bodyFont}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Default Weight: <span className="font-semibold text-slate-800">{typography.bodyWeight || 'Regular (400)'}</span>
              {typography.bodyLetterSpacing && (
                <span className="ml-2">· Tracking: <span className="font-mono text-slate-700">{typography.bodyLetterSpacing}</span></span>
              )}
            </p>
          </div>
          <div
            className="mt-4 pt-3 border-t border-slate-200/60 text-lg font-normal text-slate-400 tracking-wide select-none"
            style={{ fontFamily: typography.bodyFont }}
          >
            Aa Bb Gg 123 &%
          </div>
        </div>

        {/* Accent / Mono Font Card */}
        <div className="p-5 rounded-xl border border-slate-200/70 bg-slate-50/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
              <span>Accent & Technical Mono</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Micro Detail</span>
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2"
              style={{ fontFamily: typography.accentFont || 'JetBrains Mono' }}
            >
              {typography.accentFont || 'JetBrains Mono'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reserved for numerical figures, data telemetry, metadata tags, and code tokens.
            </p>
          </div>
          <div
            className="mt-4 pt-3 border-t border-slate-200/60 text-lg font-mono text-slate-400 tracking-wide select-none"
            style={{ fontFamily: typography.accentFont || 'JetBrains Mono' }}
          >
            0123456789 &lt;/&gt;
          </div>
        </div>
      </div>

      {/* Rationale Callout */}
      <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
        <span className="font-bold text-slate-900">Pairing Rationale:</span> {typography.rationale}
      </div>

      {/* Live Interactive Type Hierarchy Specimen */}
      <div className="border border-slate-200/80 rounded-xl p-6 bg-slate-50/30">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5" />
            Live Typographic Scale Specimen
          </span>
          <button
            onClick={() => setIsEditingSample(!isEditingSample)}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors"
          >
            <Edit3 className="w-3 h-3" />
            {isEditingSample ? 'Lock Text' : 'Edit Sample Copy'}
          </button>
        </div>

        {isEditingSample && (
          <div className="mb-6 p-4 bg-white border border-slate-200 rounded-lg space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Headline Test Text:
              </label>
              <input
                type="text"
                value={sampleHeadline}
                onChange={(e) => setSampleHeadline(e.target.value)}
                className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Body Test Copy:
              </label>
              <textarea
                rows={2}
                value={sampleBody}
                onChange={(e) => setSampleBody(e.target.value)}
                className="w-full text-xs px-3 py-1.5 border border-slate-200 rounded-md focus:outline-hidden"
              />
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Display H1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-baseline">
            <div className="lg:col-span-3 text-[11px] font-mono text-slate-400">
              Display H1 · 42px / {typography.headerFont}
            </div>
            <div className="lg:col-span-9">
              <h1
                className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
                style={{
                  fontFamily: typography.headerFont,
                  letterSpacing: typography.headerLetterSpacing || '-0.03em',
                }}
              >
                {sampleHeadline}
              </h1>
            </div>
          </div>

          {/* Section H2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-baseline pt-4 border-t border-slate-200/40">
            <div className="lg:col-span-3 text-[11px] font-mono text-slate-400">
              Section H2 · 24px / {typography.headerFont}
            </div>
            <div className="lg:col-span-9">
              <h2
                className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight"
                style={{ fontFamily: typography.headerFont }}
              >
                Architected for enduring digital & physical applications
              </h2>
            </div>
          </div>

          {/* Subhead H3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-baseline pt-4 border-t border-slate-200/40">
            <div className="lg:col-span-3 text-[11px] font-mono text-slate-400">
              Subhead H3 · 18px / {typography.bodyFont}
            </div>
            <div className="lg:col-span-9">
              <h3
                className="text-lg font-semibold text-slate-800"
                style={{ fontFamily: typography.bodyFont }}
              >
                Harmonized contrast between expressive headers and high-tempo readability
              </h3>
            </div>
          </div>

          {/* Body Paragraph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-baseline pt-4 border-t border-slate-200/40">
            <div className="lg:col-span-3 text-[11px] font-mono text-slate-400">
              Body Copy · 15px / {typography.bodyFont}
            </div>
            <div className="lg:col-span-9">
              <p
                className="text-sm md:text-base text-slate-600 leading-relaxed"
                style={{
                  fontFamily: typography.bodyFont,
                  letterSpacing: typography.bodyLetterSpacing || '0em',
                }}
              >
                {sampleBody}
              </p>
            </div>
          </div>

          {/* Technical Caption */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-baseline pt-4 border-t border-slate-200/40">
            <div className="lg:col-span-3 text-[11px] font-mono text-slate-400">
              Caption / Micro · 11px / {typography.accentFont || 'JetBrains Mono'}
            </div>
            <div className="lg:col-span-9">
              <div
                className="text-xs font-mono text-slate-500 uppercase tracking-widest"
                style={{ fontFamily: typography.accentFont || 'JetBrains Mono' }}
              >
                SPEC_ID: 2026-BB-01 · LATENCY: &lt;40MS · TYPOGRAPHIC EQUILIBRIUM: CALIBRATED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
