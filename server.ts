import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '20mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System prompts for different Brand Advisor personas
const SYSTEM_PROMPTS: Record<string, string> = {
  strategist: `You are an elite Brand Strategist and Creative Director from a top global design agency (like Pentagram or Wolff Olins). 
Your expertise is crafting indelible brand identities, razor-sharp value propositions, and resonant brand stories.
Provide insightful, articulate, constructive feedback on branding, positioning, competitive differentiation, and design choices.
Keep your responses well-structured with clear actionable recommendations.`,

  copywriter: `You are a world-class Naming & Copywriting Specialist.
Your superpower is turning complex missions into punchy 3-word taglines, memorable brand names, distinct voice pillars, and sticky messaging matrices.
Offer creative variations, tone tests, and rationale for every copy recommendation.`,

  auditor: `You are a Design Systems Architect and Visual Accessibility Auditor.
You analyze color contrast ratios (WCAG AA/AAA compliance), typography hierarchy, scalable vector marks, favicon legibility at 16px, and multi-platform consistency (dark mode, print, outdoor signage, mobile app icons).
Provide rigorous, practical design system feedback and specific hex/font/layout tweaks.`
};

// 1. Generate comprehensive Brand Bible JSON
app.post('/api/brand/generate', async (req, res) => {
  try {
    const { mission, industry = 'Technology & Innovation', brandName = '', vibe = 'Modern & Sophisticated' } = req.body;

    if (!mission || typeof mission !== 'string' || !mission.trim()) {
      return res.status(400).json({ error: 'Company mission or description is required.' });
    }

    const prompt = `You are a world-class Brand Identity Studio Creative Director.
Generate a comprehensive, complete Brand Bible for the following company:
- Company Name: ${brandName ? brandName : 'Suggest an iconic, memorable name based on the mission'}
- Mission & Description: ${mission}
- Industry: ${industry}
- Desired Vibe: ${vibe}

Create an extraordinary, cohesive brand identity including:
1. Brand Name (if not provided, create a distinctive one)
2. Tagline (punchy, memorable, 3 to 7 words)
3. Brand Narrative: Mission statement refinement, Vision statement, Elevator Pitch
4. Brand Values: 3 distinct core values with brief descriptions
5. Brand Voice & Tone: 3 key personality traits, with concrete "Do this" and "Don't do this" examples
6. 5-Color Hex Palette:
   - Must contain exactly 5 complementary, beautifully harmonized colors
   - Provide: Name, Hex code (e.g. #1E293B), Role ('Primary', 'Secondary', 'Accent', 'Neutral Dark', 'Neutral Light'), and specific Usage Notes (e.g., '60% dominant backgrounds', 'Call-to-action buttons only', etc.)
7. Typography Pairings (Select real, popular Google Fonts):
   - Header Font (e.g., 'Syne', 'Plus Jakarta Sans', 'Cinzel', 'Playfair Display', 'Space Grotesk', 'Outfit', 'Fraunces', 'DM Sans')
   - Body Font (e.g., 'Inter', 'DM Sans', 'Plus Jakarta Sans', 'Work Sans')
   - Accent / Monospace Font (e.g., 'JetBrains Mono', 'Space Grotesk')
   - Font Pairing Rationale
   - Suggested weights and letter-spacing for headers and body
8. Logo Design Concept:
   - Primary Logo concept description
   - Visual metaphor / symbology explanation
   - Detailed text prompt to feed into an image generation model for the primary logo mark (clean, minimalist vector aesthetic on clean solid background, no realistic photos, no mockups)
   - SVG Icon Shape preset suggestion ('geometric-abstract', 'organic-flow', 'monogram-crest', 'tech-nodes', 'minimal-duo')
9. Secondary Marks & Sub-marks:
   - Monogram / App Icon concept
   - Badge / Seal / Stamp concept
   - Horizontal wordmark concept
10. Imagery & Art Direction:
    - Photography mood & lighting style
    - 3 visual 'Dos' and 3 visual 'Don'ts'`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brandName: { type: Type.STRING },
            tagline: { type: Type.STRING },
            missionStatement: { type: Type.STRING },
            visionStatement: { type: Type.STRING },
            elevatorPitch: { type: Type.STRING },
            brandValues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['title', 'description'],
              },
            },
            brandVoice: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trait: { type: Type.STRING },
                  description: { type: Type.STRING },
                  doExample: { type: Type.STRING },
                  dontExample: { type: Type.STRING },
                },
                required: ['trait', 'description', 'doExample', 'dontExample'],
              },
            },
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                  role: { type: Type.STRING },
                  usageNotes: { type: Type.STRING },
                },
                required: ['name', 'hex', 'role', 'usageNotes'],
              },
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                headerFont: { type: Type.STRING },
                headerWeight: { type: Type.STRING },
                bodyFont: { type: Type.STRING },
                bodyWeight: { type: Type.STRING },
                accentFont: { type: Type.STRING },
                rationale: { type: Type.STRING },
                headerLetterSpacing: { type: Type.STRING },
                bodyLetterSpacing: { type: Type.STRING },
              },
              required: ['headerFont', 'headerWeight', 'bodyFont', 'bodyWeight', 'accentFont', 'rationale'],
            },
            logoConcept: {
              type: Type.OBJECT,
              properties: {
                primaryDescription: { type: Type.STRING },
                visualMetaphor: { type: Type.STRING },
                imagePrompt: { type: Type.STRING },
                svgShapeType: { type: Type.STRING },
              },
              required: ['primaryDescription', 'visualMetaphor', 'imagePrompt', 'svgShapeType'],
            },
            secondaryMarks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  promptSuggestion: { type: Type.STRING },
                },
                required: ['type', 'name', 'description'],
              },
            },
            artDirection: {
              type: Type.OBJECT,
              properties: {
                photographyStyle: { type: Type.STRING },
                moodKeywords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                visualDos: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                visualDonts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['photographyStyle', 'moodKeywords', 'visualDos', 'visualDonts'],
            },
          },
          required: [
            'brandName',
            'tagline',
            'missionStatement',
            'visionStatement',
            'elevatorPitch',
            'brandValues',
            'brandVoice',
            'colorPalette',
            'typography',
            'logoConcept',
            'secondaryMarks',
            'artDirection',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, brandBible: parsed });
  } catch (err: any) {
    console.error('Error generating brand bible:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate Brand Bible. Please try again.',
    });
  }
});

// 2. High-quality Image Generation with gemini-3-pro-image-preview
// Supports 1K, 2K, and 4K imageSize affordance as required!
app.post('/api/brand/generate-image', async (req, res) => {
  try {
    const {
      prompt,
      imageSize = '1K',
      aspectRatio = '1:1',
      brandColors = [],
      style = 'minimalist vector mark',
    } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Image prompt is required.' });
    }

    const validSizes = ['1K', '2K', '4K'];
    const selectedSize = validSizes.includes(imageSize) ? imageSize : '1K';

    const validAspects = ['1:1', '4:3', '3:4', '16:9', '9:16'];
    const selectedAspect = validAspects.includes(aspectRatio) ? aspectRatio : '1:1';

    const colorHint = brandColors.length ? ` Dominant brand palette: ${brandColors.join(', ')}.` : '';
    const fullPrompt = `Graphic design logo asset: ${prompt}. Style: ${style}, high-end branding identity mark, crisp clean vector lines, pure flat design, solid neutral background, vector graphics aesthetic, pristine vector icon.${colorHint} No realistic photorealistic faces, no mockup angles, no messy text distortion.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        // @ts-ignore
        imageConfig: {
          aspectRatio: selectedAspect,
          imageSize: selectedSize,
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    let imageUrl = '';
    let textExplanation = '';

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      } else if (part.text) {
        textExplanation += part.text;
      }
    }

    if (!imageUrl) {
      return res.status(500).json({
        error: 'No image was returned by the model.',
        details: textExplanation,
      });
    }

    return res.json({
      success: true,
      imageUrl,
      imageSize: selectedSize,
      aspectRatio: selectedAspect,
      textExplanation,
    });
  } catch (err: any) {
    console.error('Error generating image with gemini-3-pro-image-preview:', err);
    return res.status(500).json({
      error: err.message || 'Image generation failed. Please check your prompt or API configuration.',
    });
  }
});

// 3. Multi-turn Chat interface using Gemini
// Supports gemini-4-argon (complex tasks), gemini-3.8-flash (general tasks), gemini-3.1-flash-lite (fast tasks)
app.post('/api/chat', async (req, res) => {
  try {
    const {
      messages = [],
      rolePreset = 'strategist',
      model = 'gemini-3.8-flash',
      brandContext = null,
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Supported models as specified by feature instructions
    const allowedModels = ['gemini-3.8-flash', 'gemini-4-argon', 'gemini-3.1-flash-lite'];
    const chosenModel = allowedModels.includes(model) ? model : 'gemini-3.8-flash';

    let systemInstruction = SYSTEM_PROMPTS[rolePreset] || SYSTEM_PROMPTS.strategist;
    if (brandContext) {
      systemInstruction += `\n\nCURRENT BRAND CONTEXT IN PROGRESS:
- Brand Name: ${brandContext.brandName || 'Untitled'}
- Tagline: ${brandContext.tagline || 'None'}
- Mission: ${brandContext.missionStatement || 'In definition'}
- Palette: ${(brandContext.colorPalette || []).map((c: any) => `${c.name} (${c.hex})`).join(', ')}
- Typography: Headers in ${brandContext.typography?.headerFont || 'Inter'}, Body in ${brandContext.typography?.bodyFont || 'Inter'}
Keep your suggestions tightly aligned with this brand context, and provide concrete adjustments the user can make.`;
    }

    // Convert messages into Gemini format
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I apologize, but I could not formulate a response.';
    return res.json({
      success: true,
      modelUsed: chosenModel,
      reply: replyText,
    });
  } catch (err: any) {
    console.error('Error in brand chat:', err);
    return res.status(500).json({
      error: err.message || 'Chat service error. Please try again.',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brand Identity Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
