import React, { useState } from 'react';
import { ColorToken } from '../types';
import { hexToHsl, hexToRgb, getContrastRatio, formatCssVariables, formatTailwindConfig } from '../utils/colorUtils';
import { Copy, Check, Sliders, Download, Eye, FileCode, CheckCircle2 } from 'lucide-react';

interface PaletteSectionProps {
  palette: ColorToken[];
  onUpdatePalette?: (newPalette: ColorToken[]) => void;
}

export const PaletteSection: React.FC<PaletteSectionProps> = ({ palette, onUpdatePalette }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState<'visual' | 'css' | 'tailwind' | 'json'>('visual');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempHex, setTempHex] = useState('');
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleStartEdit = (index: number, currentHex: string) => {
    setEditingIndex(index);
    setTempHex(currentHex);
  };

  const handleSaveHex = (index: number) => {
    if (!onUpdatePalette) return;
    const clean = tempHex.startsWith('#') ? tempHex : `#${tempHex}`;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(clean)) {
      const updated = [...palette];
      updated[index] = { ...updated[index], hex: clean.toUpperCase() };
      onUpdatePalette(updated);
    }
    setEditingIndex(null);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyCodeSuccess(true);
    setTimeout(() => setCopyCodeSuccess(false), 2000);
  };

  const getExportString = () => {
    switch (activeFormat) {
      case 'css':
        return formatCssVariables(palette);
      case 'tailwind':
        return formatTailwindConfig(palette);
      case 'json':
        return JSON.stringify(palette, null, 2);
      default:
        return '';
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide uppercase mb-1">
            <span>Core Visual Tokens</span>
            <span aria-hidden="true">·</span>
            <span>5-Color Harmonic System</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Chromatic Identity & Usage Directives
          </h2>
        </div>

        {/* Segmented control for Export / View Modes */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setActiveFormat('visual')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeFormat === 'visual'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Visual Swatches
          </button>
          <button
            onClick={() => setActiveFormat('css')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeFormat === 'css'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            CSS Variables
          </button>
          <button
            onClick={() => setActiveFormat('tailwind')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeFormat === 'tailwind'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tailwind
          </button>
          <button
            onClick={() => setActiveFormat('json')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeFormat === 'json'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            JSON
          </button>
        </div>
      </div>

      {activeFormat === 'visual' ? (
        <>
          {/* Continuous Ribbon Palette Bar */}
          <div className="grid grid-cols-5 h-20 md:h-24 rounded-xl overflow-hidden mb-6 shadow-inner border border-slate-200/50">
            {palette.map((color, idx) => (
              <div
                key={idx}
                className="relative group transition-all duration-200 flex flex-col justify-end p-2 cursor-pointer"
                style={{ backgroundColor: color.hex }}
                onClick={() => handleCopyHex(color.hex)}
                title={`Click to copy ${color.hex}`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-900 text-[11px] font-bold px-2 py-1 rounded-md shadow-sm transition-opacity flex items-center gap-1">
                    {copiedHex === color.hex ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {color.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Cards for each 5 Colors with usage notes and accessibility metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {palette.map((color, idx) => {
              const rgb = hexToRgb(color.hex);
              const hsl = hexToHsl(color.hex);
              const contrastOnWhite = getContrastRatio(color.hex, '#FFFFFF');
              const contrastOnDark = getContrastRatio(color.hex, '#0F172A');
              const isEditing = editingIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/70 p-4 bg-slate-50/50 flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <div>
                    {/* Color Preview Block */}
                    <div
                      className="h-16 rounded-lg w-full mb-3 shadow-xs border border-black/5 relative group cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleCopyHex(color.hex)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyHex(color.hex);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 hover:bg-white text-slate-700 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Copy hex code"
                      >
                        {copiedHex === color.hex ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {/* Role & Name */}
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {color.role}
                      </span>
                      {onUpdatePalette && (
                        <button
                          onClick={() => (isEditing ? handleSaveHex(idx) : handleStartEdit(idx, color.hex))}
                          className="text-[11px] text-slate-400 hover:text-slate-700 p-0.5"
                          title="Edit color hex"
                        >
                          <Sliders className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm tracking-tight truncate">
                      {color.name}
                    </h3>

                    {/* Hex & Values */}
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 mt-2">
                        <input
                          type="text"
                          value={tempHex}
                          onChange={(e) => setTempHex(e.target.value)}
                          className="w-full text-xs font-mono font-medium px-2 py-1 bg-white border border-blue-400 rounded focus:outline-hidden"
                          placeholder="#HEX"
                        />
                        <button
                          onClick={() => handleSaveHex(idx)}
                          className="px-2 py-1 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800"
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <div className="mt-1.5 flex items-baseline justify-between font-mono text-xs">
                        <span className="font-bold text-slate-800">{color.hex}</span>
                        <span className="text-[10px] text-slate-400">
                          {rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : ''}
                        </span>
                      </div>
                    )}

                    {/* WCAG Contrast Ratios */}
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>vs White: {contrastOnWhite}:1</span>
                      <span
                        className={`font-semibold ${
                          contrastOnWhite >= 4.5 ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {contrastOnWhite >= 4.5 ? 'AA Pass' : 'Low'}
                      </span>
                    </div>

                    {/* Usage notes */}
                    <div className="mt-2.5 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-medium text-slate-700">Directive:</span> {color.usageNotes}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500 font-mono">
              {activeFormat.toUpperCase()} Code Snippet
            </span>
            <button
              onClick={() => handleCopyCode(getExportString())}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              {copyCodeSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            <code>{getExportString()}</code>
          </pre>
        </div>
      )}
    </section>
  );
};
