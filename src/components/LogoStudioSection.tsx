import React, { useState } from 'react';
import { BrandBible, ColorToken, LogoConcept, SecondaryMark } from '../types';
import { BrandMarkSvg } from './BrandMarkSvg';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Maximize2,
  RefreshCw,
  Image as ImageIcon,
  Sliders,
  Layers,
  ShieldCheck,
  Cpu,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface LogoStudioSectionProps {
  brandBible: BrandBible;
  onUpdateLogoConcept?: (concept: LogoConcept) => void;
  onUpdateSecondaryMarks?: (marks: SecondaryMark[]) => void;
}

export const LogoStudioSection: React.FC<LogoStudioSectionProps> = ({
  brandBible,
  onUpdateLogoConcept,
  onUpdateSecondaryMarks,
}) => {
  const { brandName, colorPalette, logoConcept, secondaryMarks, typography } = brandBible;

  // Image Generation State for gemini-3-pro-image-preview
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [stylePreset, setStylePreset] = useState<string>('minimalist vector mark');
  const [customPrompt, setCustomPrompt] = useState(logoConcept.imagePrompt || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'primary' | 'secondary' | 'generator'>('all');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Sync prompt if logo concept changes
  React.useEffect(() => {
    if (logoConcept.imagePrompt) {
      setCustomPrompt(logoConcept.imagePrompt);
    }
  }, [logoConcept.imagePrompt]);

  const handleGenerateAiLogo = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/brand/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          imageSize,
          aspectRatio: '1:1',
          style: stylePreset,
          brandColors: colorPalette.map((c) => `${c.name}: ${c.hex}`),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate logo image.');
      }

      if (onUpdateLogoConcept) {
        onUpdateLogoConcept({
          ...logoConcept,
          generatedImageUrl: data.imageUrl,
          imagePrompt: customPrompt,
        });
      }
    } catch (err: any) {
      console.error('Logo generation error:', err);
      setGenerationError(err.message || 'Image generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(customPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide uppercase mb-1">
            <span>Visual Trademark System</span>
            <span aria-hidden="true">·</span>
            <span>Vector & Gemini 3 Pro Image (1K/2K/4K)</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Primary Logo & Secondary Marks
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Marks
          </button>
          <button
            onClick={() => setActiveTab('primary')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'primary'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Primary Mark
          </button>
          <button
            onClick={() => setActiveTab('secondary')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'secondary'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Secondary Suite
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            AI Generator Studio
          </button>
        </div>
      </div>

      {/* PRIMARY LOGO SHOWCASE */}
      {(activeTab === 'all' || activeTab === 'primary') && (
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Primary Logo Canvas: Light & Dark presentations */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Light Mode Lockup */}
              <div className="p-8 rounded-xl border border-slate-200/80 bg-white flex flex-col items-center justify-center text-center min-h-[220px] relative group shadow-xs">
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Primary Lockup · Light Canvas
                </div>
                {logoConcept.generatedImageUrl ? (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={logoConcept.generatedImageUrl}
                      alt={`${brandName} Primary Logo`}
                      className="w-36 h-36 object-contain rounded-xl shadow-xs"
                    />
                    <div
                      className="text-2xl font-bold tracking-tight text-slate-900"
                      style={{ fontFamily: typography.headerFont }}
                    >
                      {brandName}
                    </div>
                  </div>
                ) : (
                  <BrandMarkSvg
                    brandName={brandName}
                    palette={colorPalette}
                    shapeType={logoConcept.svgShapeType}
                    variant="primary"
                    size={72}
                    showWordmark={true}
                    headerFont={typography.headerFont}
                  />
                )}
                <div className="mt-4 text-xs text-slate-400">
                  Minimum digital clearspace: 24px · Scalable vector asset
                </div>
              </div>

              {/* Dark Mode Lockup */}
              <div className="p-8 rounded-xl bg-slate-950 flex flex-col items-center justify-center text-center min-h-[180px] relative shadow-inner">
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Inverted / Dark Background Application
                </div>
                <div className="flex items-center gap-4">
                  {logoConcept.generatedImageUrl ? (
                    <img
                      src={logoConcept.generatedImageUrl}
                      alt={`${brandName} Primary Logo`}
                      className="w-16 h-16 object-contain rounded-lg border border-slate-800"
                    />
                  ) : (
                    <BrandMarkSvg
                      brandName={brandName}
                      palette={colorPalette}
                      shapeType={logoConcept.svgShapeType}
                      variant="primary"
                      size={48}
                      showWordmark={false}
                    />
                  )}
                  <span
                    className="text-2xl font-bold tracking-tight text-white"
                    style={{ fontFamily: typography.headerFont }}
                  >
                    {brandName}
                  </span>
                </div>
              </div>
            </div>

            {/* Logo Rationale & Metaphor Details */}
            <div className="lg:col-span-5 p-6 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Conceptual Architecture
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {logoConcept.primaryDescription}
                </h3>
                <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block">
                      Visual Metaphor & Symbology:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      {logoConcept.visualMetaphor}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block">
                      SVG Shape Preset:
                    </span>
                    <span className="inline-block text-xs font-mono font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 mt-1">
                      {logoConcept.svgShapeType || 'geometric-abstract'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('generator')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Render with Gemini 3 Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECONDARY MARKS SUITE */}
      {(activeTab === 'all' || activeTab === 'secondary') && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Responsive Secondary Marks Suite
              </h3>
              <p className="text-xs text-slate-500">
                Calibrated for micro-scales (favicons, app launcher icons, official seals, and collateral)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mark 1: Monogram */}
            <div className="p-5 rounded-xl border border-slate-200/70 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  <span>01. Monogram Mark</span>
                  <span className="text-[10px] font-mono text-slate-400">Micro 32px</span>
                </div>
                <div className="h-28 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center mb-4 shadow-xs">
                  <BrandMarkSvg
                    brandName={brandName}
                    palette={colorPalette}
                    shapeType={logoConcept.svgShapeType}
                    variant="monogram"
                    size={64}
                    headerFont={typography.headerFont}
                  />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 mb-1">
                  {secondaryMarks[0]?.name || 'Monogram Sub-mark'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {secondaryMarks[0]?.description ||
                    'Compact geometric glyph optimized for mobile avatars and stationery seals.'}
                </p>
              </div>
            </div>

            {/* Mark 2: Circular Badge / Seal */}
            <div className="p-5 rounded-xl border border-slate-200/70 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  <span>02. Certified Badge / Seal</span>
                  <span className="text-[10px] font-mono text-slate-400">Stamp</span>
                </div>
                <div className="h-28 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center mb-4 shadow-xs">
                  <BrandMarkSvg
                    brandName={brandName}
                    palette={colorPalette}
                    shapeType={logoConcept.svgShapeType}
                    variant="badge"
                    size={76}
                    headerFont={typography.headerFont}
                  />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 mb-1">
                  {secondaryMarks[1]?.name || 'Authentic Brand Seal'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {secondaryMarks[1]?.description ||
                    'Concentric heritage stamp denoting authentic quality, packaging tape, and legal certification.'}
                </p>
              </div>
            </div>

            {/* Mark 3: App Icon / Favicon */}
            <div className="p-5 rounded-xl border border-slate-200/70 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  <span>03. App Tile & Favicon</span>
                  <span className="text-[10px] font-mono text-slate-400">Squircle</span>
                </div>
                <div className="h-28 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center mb-4 shadow-xs">
                  <BrandMarkSvg
                    brandName={brandName}
                    palette={colorPalette}
                    shapeType={logoConcept.svgShapeType}
                    variant="icon"
                    size={64}
                    headerFont={typography.headerFont}
                  />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 mb-1">
                  {secondaryMarks[2]?.name || 'Launcher Tile'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {secondaryMarks[2]?.description ||
                    'High-contrast squircle tile designed for Android/iOS home screens and browser tabs.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI GENERATOR STUDIO (gemini-3-pro-image-preview with 1K / 2K / 4K affordance) */}
      {(activeTab === 'all' || activeTab === 'generator') && (
        <div className="p-6 rounded-xl border border-amber-200/60 bg-gradient-to-br from-amber-50/40 via-white to-slate-50/60 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-200/40">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-800">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Gemini 3 Pro High-Resolution Image Generator
                </h3>
                <p className="text-xs text-slate-600">
                  Model: <span className="font-mono font-medium text-slate-800">gemini-3-pro-image-preview</span> with selectable resolution affordance
                </p>
              </div>
            </div>

            {/* Resolution Affordance (1K, 2K, 4K) as required! */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">Resolution:</span>
              <div className="flex items-center p-1 bg-slate-200/70 rounded-lg">
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setImageSize(size)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      imageSize === size
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt & Style Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Logo Design Directive Prompt:
                </label>
                <button
                  onClick={handleCopyPrompt}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe the logo icon visual metaphor..."
                className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 leading-relaxed font-sans"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Visual Aesthetic Preset:
                </label>
                <select
                  value={stylePreset}
                  onChange={(e) => setStylePreset(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium focus:outline-hidden"
                >
                  <option value="minimalist vector mark">Minimalist Pure Flat Vector (Modern Brand)</option>
                  <option value="geometric corporate emblem">Geometric Corporate Tech Emblem</option>
                  <option value="luxury embossed monogram">Luxury Monogram & Clean Gold Foil</option>
                  <option value="organic botanical linework">Organic Handcrafted Botanical Linework</option>
                  <option value="kinetic automotive badge">Kinetic High-Speed Vector Badge</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateAiLogo}
                  disabled={isGenerating || !customPrompt.trim()}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg transition-colors shadow-xs"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating at {imageSize} Resolution...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Generate {imageSize} Logo Asset</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {generationError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <div className="flex-1">
                  <span className="font-semibold">Notice:</span> {generationError}
                  <div className="mt-1 text-slate-600">
                    You can continue customizing the Brand Bible and vector SVG marks while reviewing API settings.
                  </div>
                </div>
              </div>
            )}

            {/* Rendered Preview if generated */}
            {logoConcept.generatedImageUrl && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-center gap-4">
                <img
                  src={logoConcept.generatedImageUrl}
                  alt="Generated Mark"
                  className="w-24 h-24 object-contain rounded-lg border border-slate-100 shadow-xs"
                />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-slate-900 block mb-1">
                    Generated Mark Active ({imageSize} Resolution)
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    Rendered via <span className="font-mono">gemini-3-pro-image-preview</span> with aspect ratio 1:1 and integrated brand palette tokens.
                  </p>
                </div>
                <button
                  onClick={() =>
                    downloadImage(
                      logoConcept.generatedImageUrl!,
                      `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-logo-${imageSize.toLowerCase()}.png`
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {imageSize} PNG</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
