export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function hexToHsl(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'hsl(0, 0%, 0%)';
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

export function getTextColorForBackground(hex: string): '#FFFFFF' | '#0F172A' {
  const contrastWithWhite = getContrastRatio(hex, '#FFFFFF');
  const contrastWithDark = getContrastRatio(hex, '#0F172A');
  return contrastWithWhite >= contrastWithDark ? '#FFFFFF' : '#0F172A';
}

export function formatCssVariables(palette: { name: string; hex: string; role: string }[]): string {
  const lines = palette.map((color) => {
    const varName = color.role.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `  --brand-${varName}: ${color.hex}; /* ${color.name} */`;
  });
  return `:root {\n${lines.join('\n')}\n}`;
}

export function formatTailwindConfig(palette: { name: string; hex: string; role: string }[]): string {
  const colorsObj = palette.reduce((acc, color) => {
    const key = color.role.toLowerCase().replace(/[^a-z0-9]/g, '');
    acc[key] = color.hex;
    return acc;
  }, {} as Record<string, string>);

  return `// tailwind.config.js extend.colors\ncolors: ${JSON.stringify({ brand: colorsObj }, null, 2)}`;
}
