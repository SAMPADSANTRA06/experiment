import React from 'react';
import { ColorToken } from '../types';

interface BrandMarkSvgProps {
  brandName: string;
  palette: ColorToken[];
  shapeType?: string;
  variant?: 'primary' | 'monogram' | 'badge' | 'icon';
  size?: number;
  className?: string;
  showWordmark?: boolean;
  headerFont?: string;
}

export const BrandMarkSvg: React.FC<BrandMarkSvgProps> = ({
  brandName,
  palette,
  shapeType = 'geometric-abstract',
  variant = 'primary',
  size = 120,
  className = '',
  showWordmark = false,
  headerFont = 'Plus Jakarta Sans',
}) => {
  const primaryColor = palette.find((c) => c.role === 'Primary')?.hex || '#2563EB';
  const secondaryColor = palette.find((c) => c.role === 'Secondary')?.hex || '#06B6D4';
  const accentColor = palette.find((c) => c.role === 'Accent')?.hex || '#10B981';
  const darkColor = palette.find((c) => c.role === 'Neutral Dark')?.hex || '#0F172A';
  const lightColor = palette.find((c) => c.role === 'Neutral Light')?.hex || '#FFFFFF';

  const initials = brandName
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'AB';

  const renderShape = () => {
    switch (shapeType) {
      case 'organic-flow':
        return (
          <g>
            <path
              d="M50 15 C25 25 15 50 25 75 C35 100 65 95 75 75 C85 55 75 25 50 15 Z"
              fill={primaryColor}
              opacity="0.9"
            />
            <path
              d="M50 25 C65 35 75 55 68 72 C62 88 42 85 35 70 C28 55 35 35 50 25 Z"
              fill={secondaryColor}
              opacity="0.75"
            />
            <circle cx="52" cy="48" r="8" fill={accentColor} />
            <path
              d="M50 20 Q55 50 70 70"
              stroke={lightColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </g>
        );

      case 'tech-nodes':
        return (
          <g>
            <polygon
              points="50,15 82,33 82,67 50,85 18,67 18,33"
              fill="none"
              stroke={primaryColor}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M50 15 L50 85 M18 33 L82 67 M18 67 L82 33"
              stroke={secondaryColor}
              strokeWidth="2.5"
              opacity="0.6"
            />
            <polygon
              points="50,32 66,42 66,58 50,68 34,58 34,42"
              fill={accentColor}
            />
            <circle cx="50" cy="50" r="5" fill={darkColor} />
          </g>
        );

      case 'monogram-crest':
        return (
          <g>
            <rect
              x="18"
              y="18"
              width="64"
              height="64"
              rx="16"
              fill={primaryColor}
            />
            <rect
              x="25"
              y="25"
              width="50"
              height="50"
              rx="12"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2"
              opacity="0.5"
            />
            <text
              x="50"
              y="60"
              fontSize="30"
              fontWeight="800"
              fontFamily={headerFont}
              fill={lightColor}
              textAnchor="middle"
              letterSpacing="1"
            >
              {initials}
            </text>
            <circle cx="70" cy="30" r="4" fill={accentColor} />
          </g>
        );

      case 'minimal-duo':
        return (
          <g>
            <circle cx="40" cy="50" r="24" fill={primaryColor} opacity="0.85" />
            <circle cx="60" cy="50" r="24" fill={secondaryColor} opacity="0.85" />
            <path
              d="M48 30 A24 24 0 0 1 48 70 A24 24 0 0 1 48 30"
              fill={accentColor}
            />
          </g>
        );

      case 'badge-seal':
        return (
          <g>
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={primaryColor}
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <polygon
              points="50,22 55,36 70,36 58,45 62,60 50,51 38,60 42,45 30,36 45,36"
              fill={accentColor}
            />
            <text
              x="50"
              y="74"
              fontSize="9"
              fontWeight="700"
              fontFamily={headerFont}
              fill={primaryColor}
              textAnchor="middle"
              letterSpacing="2"
            >
              EST. 2026
            </text>
          </g>
        );

      case 'geometric-abstract':
      default:
        return (
          <g>
            <path
              d="M20 50 C20 30 35 18 50 18 C65 18 80 30 80 50 C80 70 65 82 50 82 C35 82 20 70 20 50 Z"
              fill="none"
              stroke={primaryColor}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M32 38 C42 28 58 28 68 38 C78 48 78 62 68 72 C58 82 42 82 32 72"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="50" cy="50" r="8" fill={accentColor} />
            <circle cx="68" cy="38" r="4" fill={primaryColor} />
          </g>
        );
    }
  };

  if (variant === 'monogram') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="24" fill={darkColor} />
        <circle cx="50" cy="50" r="38" fill="none" stroke={primaryColor} strokeWidth="3" />
        <text
          x="50"
          y="62"
          fontSize="36"
          fontWeight="800"
          fontFamily={headerFont}
          fill={lightColor}
          textAnchor="middle"
          letterSpacing="1"
        >
          {initials}
        </text>
        <circle cx="72" cy="28" r="5" fill={accentColor} />
      </svg>
    );
  }

  if (variant === 'badge') {
    return (
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="54" fill="none" stroke={primaryColor} strokeWidth="3.5" />
        <circle cx="60" cy="60" r="47" fill="none" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 3" />
        <path
          id="textCircle"
          d="M 25, 60 A 35, 35 0 0, 1 95, 60"
          fill="none"
        />
        <text fontSize="7" fontWeight="700" letterSpacing="2" fill={primaryColor}>
          <textPath href="#textCircle" startOffset="50%" textAnchor="middle">
            AUTHENTIC QUALITY
          </textPath>
        </text>
        <circle cx="60" cy="60" r="16" fill={darkColor} />
        <text
          x="60"
          y="65"
          fontSize="14"
          fontWeight="800"
          fontFamily={headerFont}
          fill={lightColor}
          textAnchor="middle"
        >
          {initials}
        </text>
        <path
          id="textCircleBottom"
          d="M 95, 60 A 35, 35 0 0, 1 25, 60"
          fill="none"
        />
        <text fontSize="7" fontWeight="700" letterSpacing="2" fill={accentColor}>
          <textPath href="#textCircleBottom" startOffset="50%" textAnchor="middle">
            EST. 2026
          </textPath>
        </text>
      </svg>
    );
  }

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="22" fill={primaryColor} />
        <circle cx="50" cy="50" r="28" fill={lightColor} opacity="0.18" />
        <path
          d="M32 68 L50 32 L68 68 M40 54 L60 54"
          stroke={lightColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="50" cy="28" r="4.5" fill={accentColor} />
      </svg>
    );
  }

  // Primary variant
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderShape()}
      </svg>
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className="text-xl md:text-2xl font-bold tracking-tight leading-none text-slate-900"
            style={{ fontFamily: headerFont }}
          >
            {brandName}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-widest text-slate-500 mt-1">
            Brand Identity
          </span>
        </div>
      )}
    </div>
  );
};
