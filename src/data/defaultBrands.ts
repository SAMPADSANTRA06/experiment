import { BrandBible } from '../types';

export const SHOWCASE_BRANDS: BrandBible[] = [
  {
    id: 'aetheris',
    brandName: 'Aetheris',
    tagline: 'Autonomous Intelligence. Grounded Clarity.',
    missionStatement: 'To demystify frontier machine intelligence into seamless, trustworthy everyday workflows that amplify human curiosity and engineering potential.',
    visionStatement: 'A world where autonomous intelligence feels as natural, calm, and foundational as oxygen.',
    elevatorPitch: 'Aetheris is an adaptive enterprise cognitive engine that synthesizes complex unstructured telemetry into decisive organizational clarity in real time.',
    brandValues: [
      {
        title: 'Calm Omniscience',
        description: 'We prioritize serene, uncluttered user experiences over chaotic data feeds and algorithmic spectacle.',
      },
      {
        title: 'Verifiable Integrity',
        description: 'Every inference and recommendation is traceable to verifiable first principles and transparent audit trails.',
      },
      {
        title: 'Fluid Symbiosis',
        description: 'We do not replace human discernment; we elevate the velocity and elegance of human decision-making.',
      },
    ],
    brandVoice: [
      {
        trait: 'Lucid & Incisive',
        description: 'We speak with geometric precision, cutting through jargon with calm confidence.',
        doExample: 'Our model converges in 40 milliseconds with zero context degradation.',
        dontExample: 'Our revolutionary disruptive AI paradigm will blow your mind with magic.',
      },
      {
        trait: 'Architectural & Composed',
        description: 'We maintain quiet authority, avoiding hyperbole, exclamation marks, or manufactured urgency.',
        doExample: 'System stability preserved. Ready for batch distribution.',
        dontExample: 'BOOM! Unbelievable performance unlocked right now!',
      },
      {
        trait: 'Empathetic Rigor',
        description: 'We pair rigorous mathematical discipline with deep respect for the engineer’s craft.',
        doExample: 'Engineered for reliability when downtime is not an option.',
        dontExample: 'You probably do not understand how hard this was to build.',
      },
    ],
    colorPalette: [
      {
        name: 'Deep Celestial',
        hex: '#0A0F1D',
        role: 'Neutral Dark',
        usageNotes: 'Dominant 60% background canvas in dark mode; primary typography in light mode.',
      },
      {
        name: 'Quantum Cobalt',
        hex: '#2563EB',
        role: 'Primary',
        usageNotes: 'Primary brand identity mark, key navigational anchors, and active state highlights.',
      },
      {
        name: 'Aether Cyan',
        hex: '#06B6D4',
        role: 'Secondary',
        usageNotes: 'Data visualizations, interactive focus rings, and secondary accent flourishes.',
      },
      {
        name: 'Phosphor Mint',
        hex: '#10B981',
        role: 'Accent',
        usageNotes: 'Strictly reserved for positive operational status, primary CTAs, and success confirmations.',
      },
      {
        name: 'Opal Mist',
        hex: '#F8FAFC',
        role: 'Neutral Light',
        usageNotes: 'Card surfaces, high-contrast text against dark backgrounds, and subtle hairline borders.',
      },
    ],
    typography: {
      headerFont: 'Syne',
      headerWeight: '700',
      bodyFont: 'Plus Jakarta Sans',
      bodyWeight: '400',
      accentFont: 'Space Grotesk',
      rationale: 'Syne provides an avant-garde, geometric authority with distinct architectural flair, balanced against the crystal-clear readability and neutral humanist warmth of Plus Jakarta Sans for body prose.',
      headerLetterSpacing: '-0.03em',
      bodyLetterSpacing: '-0.01em',
    },
    logoConcept: {
      primaryDescription: 'A continuous, interlocking Möbius ribbon converging into a central prism of light, signifying perpetual cognitive synthesis and balance.',
      visualMetaphor: 'The infinite flow between raw entropy and crystallized intelligence.',
      imagePrompt: 'Minimalist vector logo emblem of an interlocking infinite geometric ribbon forming a central prism, ultra-clean solid dark blue background, flat modern corporate tech identity mark, precise lines, vector graphics aesthetic, high resolution',
      svgShapeType: 'geometric-abstract',
    },
    secondaryMarks: [
      {
        type: 'monogram',
        name: 'The A-Prism Monogram',
        description: 'An architectural capital letter A sliced with a dynamic diagonal conduit, designed for 16px to 64px micro-scales.',
        promptSuggestion: 'Minimalist geometric monogram letter A icon, vector style, flat cobalt blue on white, clean sharp lines',
      },
      {
        type: 'badge',
        name: 'Certified Cognitive Seal',
        description: 'A circular verification stamp with dual concentric hairline borders and coordinate hash markers for official documentation.',
        promptSuggestion: 'Circular security emblem seal badge with clean typographic border, vector graphic, dark sapphire',
      },
      {
        type: 'icon',
        name: 'App Tile Icon',
        description: 'A rounded-squircle app icon featuring the glowing dual-arc core against deep celestial blue.',
        promptSuggestion: 'Mobile app icon tile with glowing geometric dual arcs on dark slate background, modern minimalist iOS style',
      },
    ],
    artDirection: {
      photographyStyle: 'Cinematic architectural photography featuring natural side-raking sunlight, honest materials (brushed aluminum, optical glass, cast concrete), and candid human collaboration.',
      moodKeywords: ['Architectural', 'Prismatic', 'Lucid', 'Serene', 'Frontier'],
      visualDos: [
        'Use asymmetric, generous whitespace (minimum 32px between content clusters)',
        'Treat typography as a primary sculptural graphic element',
        'Frame real engineers and creators in authentic, focused work environments',
      ],
      visualDonts: [
        'Never use glowing neon cyber grids, floating holograms, or generic humanoid robot hands',
        'Avoid gradient mesh rainbow clutters or skeuomorphic glass reflections',
        'Never drop drop-shadows with blur exceeding 16px on vector marks',
      ],
    },
    createdAt: '2026-10-26T12:00:00Z',
  },
  {
    id: 'lumora',
    brandName: 'Lumora Botanicals',
    tagline: 'Formulated by Nature. Calibrated by Botany.',
    missionStatement: 'To restore skin equilibrium through cold-extracted high-altitude botanical actives and radical bio-transparency.',
    visionStatement: 'A cosmetic industry liberated from synthetic fillers, where pure earthen alchemy and clinical verification thrive as one.',
    elevatorPitch: 'Lumora pairs sustainably harvested Alpine flora with cold-fermentation biotechnology to create clinical-grade regenerative skincare.',
    brandValues: [
      {
        title: 'Botanical Fidelity',
        description: 'We preserve whole-plant chemical profiles rather than stripping away synergistic micronutrients.',
      },
      {
        title: 'Radical Traceability',
        description: 'Every tincture is lot-stamped with the harvest micro-climate, altitude, and farmer co-op.',
      },
      {
        title: 'Circular Stewardship',
        description: '100% infinitely recyclable amber apothecary glass with mycelium compostable outer cartons.',
      },
    ],
    brandVoice: [
      {
        trait: 'Poetic Botanical Authority',
        description: 'Eloquent, reverent toward natural cycles, and grounded in cellular biology.',
        doExample: 'Cold-pressed sea buckthorn and calendula maceration soothe lipid barrier disruption.',
        dontExample: 'Get instantly younger looking skin with this crazy miracle herb!',
      },
      {
        trait: 'Sensory & Tactile',
        description: 'Evoking the crisp scent of sub-alpine meadows, dew, and herbal infusions.',
        doExample: 'Melts on contact with an herbaceous aroma of wild clary sage and damp stone.',
        dontExample: 'Smells nice and feels good on your face.',
      },
      {
        trait: 'Honest & Unrushed',
        description: 'Promoting regenerative skin longevity over instant quick-fix cosmetics.',
        doExample: 'True barrier restoration unfolds over 28-day cellular cycles.',
        dontExample: 'Erase 10 years of wrinkles overnight!',
      },
    ],
    colorPalette: [
      {
        name: 'Alpine Sage',
        hex: '#4A5B4C',
        role: 'Primary',
        usageNotes: 'Primary brand identity, packaging paper stock, and primary header typography.',
      },
      {
        name: 'Rose Terracotta',
        hex: '#C87D65',
        role: 'Secondary',
        usageNotes: 'Active highlights, seasonal editorial banners, and product label accents.',
      },
      {
        name: 'Solar Marigold',
        hex: '#E0A96D',
        role: 'Accent',
        usageNotes: 'Special edition stickers, certification emblems, and subtle UI accent points.',
      },
      {
        name: 'Forest Umber',
        hex: '#242D26',
        role: 'Neutral Dark',
        usageNotes: 'High-contrast editorial body text and luxury packaging embossing.',
      },
      {
        name: 'Porcelain Linen',
        hex: '#F7F5F0',
        role: 'Neutral Light',
        usageNotes: 'Warm background canvas, card backing, and unbleached cotton brand collateral.',
      },
    ],
    typography: {
      headerFont: 'Playfair Display',
      headerWeight: '600',
      bodyFont: 'DM Sans',
      bodyWeight: '400',
      accentFont: 'Cormorant Garamond',
      rationale: 'Playfair Display evokes heritage apothecary bottles and high-fashion editorial grace, while DM Sans delivers serene readability across digital e-commerce and regulatory ingredient panels.',
      headerLetterSpacing: '-0.02em',
      bodyLetterSpacing: '0em',
    },
    logoConcept: {
      primaryDescription: 'A single continuous botanical stem unfurling into a stylized crescent leaf and morning dew drop, balanced with classical serif typography.',
      visualMetaphor: 'The unfurling spiral of life and botanical renewal.',
      imagePrompt: 'Luxury botanical skincare minimalist vector emblem of an elegant unfurling leaf and dew drop, organic sage green on warm linen background, editorial beauty brand mark, vector flat design',
      svgShapeType: 'organic-flow',
    },
    secondaryMarks: [
      {
        type: 'monogram',
        name: 'Botanical Crest Monogram',
        description: 'An interlocking botanical L intertwined with twin laurel leaves for jar lids and wax seals.',
        promptSuggestion: 'Luxury apothecary monogram letter L with subtle laurel leaf, vector graphic, sage green',
      },
      {
        type: 'badge',
        name: 'Alpine Certified Apothecary Stamp',
        description: 'An octagonal vintage botanical certification stamp denoting altitude harvest verification.',
        promptSuggestion: 'Vintage botanical apothecary octagonal stamp badge, clean linework, vector emblem',
      },
      {
        type: 'icon',
        name: 'Dewdrop Favicon',
        description: 'A pure geometric droplet with an embedded chlorophyll leaf vein.',
        promptSuggestion: 'Minimalist water drop and leaf icon, flat green vector, high contrast',
      },
    ],
    artDirection: {
      photographyStyle: 'Macro natural lighting, shallow depth of field highlighting botanical oil viscosities, unpolished sandstone surfaces, and raw botanical cuttings.',
      moodKeywords: ['Apothecary', 'Earthen', 'Regenerative', 'Tactile', 'Sunlit'],
      visualDos: [
        'Celebrate natural skin textures, freckles, and unretouched epidermal wellness',
        'Use warm, natural daylight with soft organic cast shadows',
        'Feature real harvested herbs, amber glass reflections, and linen textures',
      ],
      visualDonts: [
        'Never airbrush or plasticize skin in beauty photography',
        'Avoid sterile, clinical white hospital lighting',
        'Never use fake cartoon flower clipart or chemical laboratory beakers',
      ],
    },
    createdAt: '2026-10-26T12:00:00Z',
  },
  {
    id: 'veloce',
    brandName: 'Veloce Kinetic',
    tagline: 'Velocity Without Friction.',
    missionStatement: 'To engineer hyper-efficient personal electric mobility platforms that reclaim urban streets for human joy and instantaneous movement.',
    visionStatement: 'Cities where transit is zero-emission, dynamically synchronized, and exhilaratingly effortless.',
    elevatorPitch: 'Veloce builds lightweight titanium-carbon electric vehicles with swappable solid-state batteries and predictive kinetic telemetry.',
    brandValues: [
      {
        title: 'Aerodynamic Reduction',
        description: 'Every curve and weld exists solely to reduce drag, eliminate mass, and maximize torque efficiency.',
      },
      {
        title: 'Instantaneous Feedback',
        description: 'Zero latency in throttle response, telemetry updates, and rider control surfaces.',
      },
      {
        title: 'Enduring Craft',
        description: 'Grade-5 titanium frames warrantied for 100,000 urban kilometers.',
      },
    ],
    brandVoice: [
      {
        trait: 'Kinetic & Direct',
        description: 'Short, propulsive sentences. High cadence and visceral velocity.',
        doExample: '0 to 45 km/h in 2.1 seconds. Zero lag. Instant pull.',
        dontExample: 'We think you might like our electric bikes because they go pretty fast.',
      },
      {
        trait: 'Precision Engineering',
        description: 'Exact metrics, aerospace grade specifications, and mechanical clarity.',
        doExample: 'CNC-machined from single-billet 7075 aluminum to 0.02mm tolerance.',
        dontExample: 'Built super tough with top quality metal stuff.',
      },
      {
        trait: 'Urban Rebel Elegance',
        description: 'Challenging bloated automobile congestion with sleek, agile independence.',
        doExample: 'Reclaim your commute. Glide past stalled traffic.',
        dontExample: 'Cars are bad and drivers should feel bad.',
      },
    ],
    colorPalette: [
      {
        name: 'Kinetic Ochre',
        hex: '#F59E0B',
        role: 'Primary',
        usageNotes: 'Primary brand accent, vehicle hazard indicators, and signature chassis striping.',
      },
      {
        name: 'Hyper Velocity Red',
        hex: '#EF4444',
        role: 'Accent',
        usageNotes: 'Sport mode indicator, brake light graphics, and urgent mobile push notifications.',
      },
      {
        name: 'Carbon Titanium',
        hex: '#1E293B',
        role: 'Secondary',
        usageNotes: 'Chassis matte finishes, app dark mode container backgrounds, and technical schematics.',
      },
      {
        name: 'Asphalt Black',
        hex: '#0F172A',
        role: 'Neutral Dark',
        usageNotes: 'Base interface canvas, tire rubber branding, and premium packaging.',
      },
      {
        name: 'Pure Alpine',
        hex: '#FFFFFF',
        role: 'Neutral Light',
        usageNotes: 'High-visibility safety decals, typography on dark carbon surfaces, and headlamp beams.',
      },
    ],
    typography: {
      headerFont: 'Outfit',
      headerWeight: '800',
      bodyFont: 'Inter',
      bodyWeight: '400',
      accentFont: 'JetBrains Mono',
      rationale: 'Outfit delivers aerodynamic, modern automotive geometry with athletic energy, counterbalanced by Inter’s flawless digital interface legibility and JetBrains Mono for telemetry metrics.',
      headerLetterSpacing: '-0.04em',
      bodyLetterSpacing: '-0.01em',
    },
    logoConcept: {
      primaryDescription: 'Two forward-raked chevron arrows intersecting with a lightning kinetic vector, evoking unstoppable forward velocity.',
      visualMetaphor: 'The piercing of aerodynamic friction and instantaneous torque.',
      imagePrompt: 'Bold automotive racing logo emblem of aerodynamic twin chevrons slicing forward, kinetic electric vehicle brand mark, flat vector design, energetic amber ochre and matte carbon black, crisp linework',
      svgShapeType: 'tech-nodes',
    },
    secondaryMarks: [
      {
        type: 'monogram',
        name: 'The VK Speed Monogram',
        description: 'An angular dual-stroke VK glyph slotted at a 22-degree aerodynamic forward rake.',
        promptSuggestion: 'Dynamic racing monogram VK logo glyph, forward italicized angle, modern automotive vector mark',
      },
      {
        type: 'badge',
        name: 'Solid-State Certified Shield',
        description: 'A diamond shield emblem with kinetic energy lines, stamped onto swappable battery packs.',
        promptSuggestion: 'Aerospace shield badge with energy pulse vector, clean linework, amber and dark titanium',
      },
      {
        type: 'icon',
        name: 'Kinetic App Launcher',
        description: 'High-contrast amber chevron on deep carbon backdrop with subtle rim lighting.',
        promptSuggestion: 'Mobile app icon with glowing amber automotive chevron on carbon slate texture',
      },
    ],
    artDirection: {
      photographyStyle: 'Low-angle tracking shots of electric riders slicing through twilight cityscapes with long-exposure light trails and crisp vehicle reflections on wet asphalt.',
      moodKeywords: ['Kinetic', 'Aerodynamic', 'Nocturnal', 'Titanium', 'Precision'],
      visualDos: [
        'Use dynamic diagonal composition angles (15° to 25° horizon tilt)',
        'Capture authentic wet street reflections and streetlamp rim lighting',
        'Highlight physical vehicle weld beads and carbon fiber weaves in macro shots',
      ],
      visualDonts: [
        'Never shoot in generic sunny suburban parks with smiling models',
        'Avoid comic book speed lines or cartoon electricity lightning bolts',
        'Never use sluggish or static composition framing',
      ],
    },
    createdAt: '2026-10-26T12:00:00Z',
  },
];
