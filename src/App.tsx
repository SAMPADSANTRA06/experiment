import React, { useState } from 'react';
import { BrandBible, ColorToken, LogoConcept, SecondaryMark } from './types';
import { SHOWCASE_BRANDS } from './data/defaultBrands';
import { PaletteSection } from './components/PaletteSection';
import { LogoStudioSection } from './components/LogoStudioSection';
import { TypographySection } from './components/TypographySection';
import { NarrativeSection } from './components/NarrativeSection';
import { MockupsSection } from './components/MockupsSection';
import { GeneratorModal } from './components/GeneratorModal';
import { BrandChatDrawer } from './components/BrandChatDrawer';
import { ExportModal } from './components/ExportModal';
import { BrandMarkSvg } from './components/BrandMarkSvg';
import {
  Sparkles,
  Bot,
  Download,
  Share2,
  Wand2,
  Compass,
  Palette,
  Type,
  Layers,
  ChevronDown,
  ExternalLink,
  Printer,
  Sliders,
  CheckCircle2,
  MessageSquare,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [currentBrand, setCurrentBrand] = useState<BrandBible>(SHOWCASE_BRANDS[0]);
  const [customBrands, setCustomBrands] = useState<BrandBible[]>([]);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'palette' | 'logos' | 'typography' | 'narrative' | 'mockups'>('all');

  const allAvailableBrands = [...SHOWCASE_BRANDS, ...customBrands];

  const handleBrandGenerated = (newBible: BrandBible) => {
    const brandWithId: BrandBible = {
      ...newBible,
      id: `custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCustomBrands((prev) => [brandWithId, ...prev]);
    setCurrentBrand(brandWithId);
  };

  const handleUpdatePalette = (newPalette: ColorToken[]) => {
    setCurrentBrand((prev) => ({
      ...prev,
      colorPalette: newPalette,
    }));
  };

  const handleUpdateLogoConcept = (newConcept: LogoConcept) => {
    setCurrentBrand((prev) => ({
      ...prev,
      logoConcept: newConcept,
    }));
  };

  const handleUpdateSecondaryMarks = (newMarks: SecondaryMark[]) => {
    setCurrentBrand((prev) => ({
      ...prev,
      secondaryMarks: newMarks,
    }));
  };

  const primaryColor = currentBrand.colorPalette.find((c) => c.role === 'Primary')?.hex || '#2563EB';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand Brand Identity Generator Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold tracking-wider shadow-xs">
              <span className="text-sm font-black">AB</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm md:text-base font-extrabold tracking-tight text-slate-900">
                  AuraBrand
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                  Brand Bible Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Autonomous trademark synthesis, harmonic palettes & Google Font pairings
              </p>
            </div>
          </div>

          {/* Center Brand Switcher Selector */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            {allAvailableBrands.map((brand) => (
              <button
                key={brand.id || brand.brandName}
                onClick={() => setCurrentBrand(brand)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  currentBrand.brandName === brand.brandName
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {brand.brandName}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Gemini Brand Consultant Chat Trigger */}
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
              title="Open Gemini Brand Consultant"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Brand Strategist</span>
            </button>

            {/* Export Deliverables Modal */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
              title="Export Brand Deliverables & Tokens"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Generate Brand Bible (Core CTA) */}
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs hover:shadow transition-all"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-300" />
              <span>New Brand</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10 space-y-10">
        {/* BRAND BIBLE HERO COVER BANNER */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="uppercase tracking-widest font-mono text-[11px] text-slate-400">
                  OFFICIAL BRAND BIBLE SPECIFICATION
                </span>
                <span aria-hidden="true">·</span>
                <span>Version 2026.1</span>
              </div>

              <h1
                className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none"
                style={{ fontFamily: currentBrand.typography.headerFont }}
              >
                {currentBrand.brandName}
              </h1>

              <p className="text-base md:text-xl font-medium text-slate-600 tracking-tight">
                {currentBrand.tagline}
              </p>

              <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 5-Color Harmonic System
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {currentBrand.typography.headerFont} + {currentBrand.typography.bodyFont}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Primary & Secondary Trademark Marks
                </span>
              </div>
            </div>

            {/* Hero Quick Badge Preview */}
            <div className="shrink-0 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center text-center shadow-xs">
              <BrandMarkSvg
                brandName={currentBrand.brandName}
                palette={currentBrand.colorPalette}
                shapeType={currentBrand.logoConcept.svgShapeType}
                variant="primary"
                size={70}
                showWordmark={false}
              />
              <span
                className="text-sm font-bold text-slate-900 mt-3"
                style={{ fontFamily: currentBrand.typography.headerFont }}
              >
                {currentBrand.brandName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                TRADEMARK REGISTERED
              </span>
            </div>
          </div>
        </div>

        {/* SECTION FILTER BUTTONS (Segmented navigation for quick focus) */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 ${
              activeSection === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Sections
          </button>
          <button
            onClick={() => setActiveSection('palette')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 ${
              activeSection === 'palette'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            5-Color Palette
          </button>
          <button
            onClick={() => setActiveSection('logos')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 ${
              activeSection === 'logos'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Logos & Gemini 3 Pro
          </button>
          <button
            onClick={() => setActiveSection('typography')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 ${
              activeSection === 'typography'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            Google Font Pairing
          </button>
          <button
            onClick={() => setActiveSection('narrative')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 ${
              activeSection === 'narrative'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Mission, Vision & Voice
          </button>
          <button
            onClick={() => setActiveSection('mockups')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 ${
              activeSection === 'mockups'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Collateral Mockups
          </button>
        </div>

        {/* 1. 5-COLOR HEX PALETTE WITH USAGE NOTES */}
        {(activeSection === 'all' || activeSection === 'palette') && (
          <PaletteSection
            palette={currentBrand.colorPalette}
            onUpdatePalette={handleUpdatePalette}
          />
        )}

        {/* 2. PRIMARY LOGO, SECONDARY MARKS & GEMINI 3 PRO IMAGE GENERATION (1K/2K/4K) */}
        {(activeSection === 'all' || activeSection === 'logos') && (
          <LogoStudioSection
            brandBible={currentBrand}
            onUpdateLogoConcept={handleUpdateLogoConcept}
            onUpdateSecondaryMarks={handleUpdateSecondaryMarks}
          />
        )}

        {/* 3. SUGGESTED GOOGLE FONT PAIRINGS FOR HEADERS & BODY TEXT */}
        {(activeSection === 'all' || activeSection === 'typography') && (
          <TypographySection
            typography={currentBrand.typography}
            brandName={currentBrand.brandName}
          />
        )}

        {/* 4. BRAND NARRATIVE, MISSION, VALUES & VOICE DIRECTIVES */}
        {(activeSection === 'all' || activeSection === 'narrative') && (
          <NarrativeSection brandBible={currentBrand} />
        )}

        {/* 5. IN-SITU TOUCHPOINT COLLATERAL MOCKUPS */}
        {(activeSection === 'all' || activeSection === 'mockups') && (
          <MockupsSection brandBible={currentBrand} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-10 px-4 md:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">AuraBrand Identity Studio</span>
            <span aria-hidden="true">·</span>
            <span>Powered by Gemini 3.8 Flash, Gemini 4 Argon, and Gemini 3 Pro Image</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              Generate Brand
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              Consult Brand Advisor
            </button>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              Export Tokens
            </button>
          </div>
        </div>
      </footer>

      {/* Generator Modal */}
      <GeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onBrandGenerated={handleBrandGenerated}
      />

      {/* Gemini Multi-Turn Chat Drawer */}
      <BrandChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        brandBible={currentBrand}
      />

      {/* Export Deliverables Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        brandBible={currentBrand}
      />
    </div>
  );
}
