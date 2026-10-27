import React, { useState } from 'react';
import { BrandBible } from '../types';
import { BrandMarkSvg } from './BrandMarkSvg';
import { CreditCard, Smartphone, Monitor, ShoppingBag, Eye } from 'lucide-react';

interface MockupsSectionProps {
  brandBible: BrandBible;
}

export const MockupsSection: React.FC<MockupsSectionProps> = ({ brandBible }) => {
  const { brandName, tagline, colorPalette, typography, logoConcept } = brandBible;
  const [activeMockup, setActiveMockup] = useState<'card' | 'web' | 'mobile' | 'merch'>('card');

  const primaryColor = colorPalette.find((c) => c.role === 'Primary')?.hex || '#2563EB';
  const secondaryColor = colorPalette.find((c) => c.role === 'Secondary')?.hex || '#06B6D4';
  const accentColor = colorPalette.find((c) => c.role === 'Accent')?.hex || '#10B981';
  const darkColor = colorPalette.find((c) => c.role === 'Neutral Dark')?.hex || '#0F172A';
  const lightColor = colorPalette.find((c) => c.role === 'Neutral Light')?.hex || '#F8FAFC';

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide uppercase mb-1">
            <span>Real-World Collateral</span>
            <span aria-hidden="true">·</span>
            <span>Touchpoint Application Mockups</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Brand In Situ Previews
          </h2>
        </div>

        {/* Mockup Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setActiveMockup('card')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeMockup === 'card'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Business Card
          </button>
          <button
            onClick={() => setActiveMockup('web')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeMockup === 'web'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Website Hero
          </button>
          <button
            onClick={() => setActiveMockup('mobile')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeMockup === 'mobile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile App
          </button>
          <button
            onClick={() => setActiveMockup('merch')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeMockup === 'merch'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Merchandise
          </button>
        </div>
      </div>

      {/* MOCKUP 1: LUXURY BUSINESS CARDS */}
      {activeMockup === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-100/70 rounded-xl border border-slate-200">
          {/* Front of Card */}
          <div
            className="aspect-[1.75/1] rounded-xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden transition-transform hover:-translate-y-1"
            style={{ backgroundColor: darkColor }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400">
                OFFICIAL IDENTITY
              </span>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            <div className="flex items-center gap-3">
              {logoConcept.generatedImageUrl ? (
                <img
                  src={logoConcept.generatedImageUrl}
                  alt={brandName}
                  className="w-12 h-12 object-contain rounded-md"
                />
              ) : (
                <BrandMarkSvg
                  brandName={brandName}
                  palette={colorPalette}
                  shapeType={logoConcept.svgShapeType}
                  variant="primary"
                  size={42}
                  showWordmark={false}
                />
              )}
              <div>
                <h3
                  className="text-2xl font-bold text-white tracking-tight leading-none"
                  style={{ fontFamily: typography.headerFont }}
                >
                  {brandName}
                </h3>
                <p className="text-[11px] text-slate-300 mt-1 font-light tracking-wide">
                  {tagline}
                </p>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Designed in 2026 · Confidential & Proprietary
            </div>
          </div>

          {/* Back of Card */}
          <div
            className="aspect-[1.75/1] rounded-xl p-8 flex flex-col justify-between shadow-lg bg-white border border-slate-200/90 relative overflow-hidden transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <div
                  className="text-base font-bold text-slate-900"
                  style={{ fontFamily: typography.headerFont }}
                >
                  Elena Vance
                </div>
                <div className="text-xs text-slate-500 font-medium">Chief Executive Officer</div>
              </div>
              <BrandMarkSvg
                brandName={brandName}
                palette={colorPalette}
                shapeType={logoConcept.svgShapeType}
                variant="monogram"
                size={32}
              />
            </div>

            <div className="space-y-1 text-xs text-slate-600 font-mono">
              <p>vance@{brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</p>
              <p>+1 (415) 890-2400</p>
              <p>{brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>San Francisco · Zurich · Tokyo</span>
              <span style={{ color: primaryColor }} className="font-semibold">
                EST. 2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MOCKUP 2: WEBSITE HERO */}
      {activeMockup === 'web' && (
        <div className="rounded-xl border border-slate-300 shadow-lg overflow-hidden bg-white">
          {/* Browser Bar */}
          <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 max-w-sm mx-auto bg-white border border-slate-200 rounded text-[11px] font-mono text-center text-slate-500 py-0.5">
              https://www.{brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
            </div>
          </div>

          {/* Hero Content */}
          <div className="p-8 md:p-14 bg-gradient-to-b from-slate-50/50 to-white flex flex-col items-center text-center">
            {/* Header Nav */}
            <div className="w-full flex justify-between items-center mb-10 max-w-3xl">
              <div className="flex items-center gap-2">
                <BrandMarkSvg
                  brandName={brandName}
                  palette={colorPalette}
                  shapeType={logoConcept.svgShapeType}
                  variant="primary"
                  size={28}
                  showWordmark={false}
                />
                <span
                  className="font-bold text-slate-900 tracking-tight text-lg"
                  style={{ fontFamily: typography.headerFont }}
                >
                  {brandName}
                </span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
                <span className="hover:text-slate-900 cursor-pointer">Platform</span>
                <span className="hover:text-slate-900 cursor-pointer">Solutions</span>
                <span className="hover:text-slate-900 cursor-pointer">Manifesto</span>
                <span className="hover:text-slate-900 cursor-pointer">Changelog</span>
              </div>
              <button
                className="text-xs font-semibold px-3 py-1.5 rounded-md text-white transition-opacity hover:opacity-90 shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                Launch App
              </button>
            </div>

            {/* Hero Copy */}
            <div className="max-w-2xl space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Next Generation Infrastructure
              </span>
              <h1
                className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
                style={{ fontFamily: typography.headerFont }}
              >
                {tagline}
              </h1>
              <p
                className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto"
                style={{ fontFamily: typography.bodyFont }}
              >
                {brandBible.elevatorPitch}
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  className="px-5 py-2.5 text-xs md:text-sm font-bold text-white rounded-lg shadow-sm hover:opacity-95 transition-all"
                  style={{ backgroundColor: primaryColor }}
                >
                  Start Building Today
                </button>
                <button className="px-5 py-2.5 text-xs md:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  Explore Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOCKUP 3: MOBILE APP */}
      {activeMockup === 'mobile' && (
        <div className="p-8 bg-slate-100/70 rounded-xl border border-slate-200 flex justify-center">
          <div className="w-72 bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800">
            {/* Screen */}
            <div className="bg-slate-900 rounded-[32px] p-4 text-white min-h-[460px] flex flex-col justify-between">
              {/* Dynamic Island / Notch */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-4" />

              {/* Home Screen Icons */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-light">09:41</div>
                  <div className="text-xs text-slate-400">Wednesday, October 26</div>
                </div>

                {/* Brand Push Notification */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2">
                    <BrandMarkSvg
                      brandName={brandName}
                      palette={colorPalette}
                      shapeType={logoConcept.svgShapeType}
                      variant="icon"
                      size={18}
                    />
                    <span className="text-[11px] font-bold text-white">{brandName}</span>
                    <span className="text-[9px] text-slate-400 ml-auto">Now</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    System synchronization complete. Your workspace is calibrated.
                  </p>
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-4 gap-3 pt-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="shadow-md rounded-2xl overflow-hidden">
                      <BrandMarkSvg
                        brandName={brandName}
                        palette={colorPalette}
                        shapeType={logoConcept.svgShapeType}
                        variant="icon"
                        size={52}
                      />
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium truncate max-w-[56px]">
                      {brandName}
                    </span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-[52px] h-[52px] rounded-2xl bg-white/10" />
                      <span className="text-[10px] text-slate-500">App {i}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav Bar */}
              <div className="w-28 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      )}

      {/* MOCKUP 4: MERCHANDISE */}
      {activeMockup === 'merch' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-100/70 rounded-xl border border-slate-200">
          {/* Canvas Tote Bag Mockup */}
          <div className="p-8 rounded-xl bg-amber-50/40 border border-amber-100 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
              Heavyweight Organic Canvas Tote
            </span>
            <div className="w-56 h-64 bg-[#E8E4D9] rounded-b-3xl border-2 border-[#D5D0C3] p-6 flex flex-col items-center justify-center relative shadow-md">
              {/* Tote Handle */}
              <div className="w-28 h-16 border-t-4 border-l-4 border-r-4 border-[#C8C2B3] rounded-t-full absolute -top-16" />
              <BrandMarkSvg
                brandName={brandName}
                palette={colorPalette}
                shapeType={logoConcept.svgShapeType}
                variant="badge"
                size={90}
                headerFont={typography.headerFont}
              />
              <span
                className="text-xs font-bold text-slate-800 uppercase tracking-widest mt-3"
                style={{ fontFamily: typography.headerFont }}
              >
                {brandName}
              </span>
            </div>
          </div>

          {/* Ceramic Mug Mockup */}
          <div className="p-8 rounded-xl bg-slate-200/50 border border-slate-300/60 flex flex-col items-center justify-center text-center shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
              Matte Ceramic Coffee Tumbler
            </span>
            <div
              className="w-44 h-52 rounded-b-2xl p-6 flex flex-col items-center justify-center relative shadow-md"
              style={{ backgroundColor: darkColor }}
            >
              {/* Mug Handle */}
              <div
                className="w-10 h-24 border-4 rounded-r-2xl absolute -right-9 top-14"
                style={{ borderColor: darkColor }}
              />
              <div className="p-2">
                <BrandMarkSvg
                  brandName={brandName}
                  palette={colorPalette}
                  shapeType={logoConcept.svgShapeType}
                  variant="monogram"
                  size={58}
                  headerFont={typography.headerFont}
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 mt-2">
                {brandName}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
