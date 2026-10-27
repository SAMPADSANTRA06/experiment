export interface ColorToken {
  name: string;
  hex: string;
  role: 'Primary' | 'Secondary' | 'Accent' | 'Neutral Dark' | 'Neutral Light' | string;
  usageNotes: string;
  contrastWhite?: number;
  contrastBlack?: number;
}

export interface BrandVoiceTrait {
  trait: string;
  description: string;
  doExample: string;
  dontExample: string;
}

export interface BrandValue {
  title: string;
  description: string;
}

export interface TypographySpec {
  headerFont: string;
  headerWeight: string;
  bodyFont: string;
  bodyWeight: string;
  accentFont: string;
  rationale: string;
  headerLetterSpacing?: string;
  bodyLetterSpacing?: string;
}

export interface SecondaryMark {
  type: 'submark' | 'icon' | 'monogram' | 'badge' | string;
  name: string;
  description: string;
  promptSuggestion?: string;
  generatedImageUrl?: string;
}

export interface LogoConcept {
  primaryDescription: string;
  visualMetaphor: string;
  imagePrompt: string;
  svgShapeType: string;
  generatedImageUrl?: string;
}

export interface ArtDirection {
  photographyStyle: string;
  moodKeywords: string[];
  visualDos: string[];
  visualDonts: string[];
}

export interface BrandBible {
  id?: string;
  brandName: string;
  tagline: string;
  missionStatement: string;
  visionStatement: string;
  elevatorPitch: string;
  brandValues: BrandValue[];
  brandVoice: BrandVoiceTrait[];
  colorPalette: ColorToken[];
  typography: TypographySpec;
  logoConcept: LogoConcept;
  secondaryMarks: SecondaryMark[];
  artDirection: ArtDirection;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
  rolePreset?: string;
}
