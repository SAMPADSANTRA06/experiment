import React, { useState, useRef, useEffect } from 'react';
import { BrandBible, ChatMessage } from '../types';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Sliders,
  ChevronDown,
  Copy,
  Check,
  Zap,
  Brain,
  ShieldAlert,
  Flame
} from 'lucide-react';

interface BrandChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  brandBible: BrandBible;
}

const ROLE_PRESETS = [
  {
    id: 'strategist',
    label: 'Brand Strategist & Creative Director',
    icon: Brain,
    description: 'Deep strategic positioning, market differentiation & narrative architecture',
  },
  {
    id: 'copywriter',
    label: 'Naming & Tagline Specialist',
    icon: Flame,
    description: 'Sticky mantras, punchy 3-word slogans & distinctive voice pillars',
  },
  {
    id: 'auditor',
    label: 'Visual Identity & Accessibility Auditor',
    icon: ShieldAlert,
    description: 'WCAG contrast compliance, typography scale & multi-format brand rigor',
  },
];

const MODEL_OPTIONS = [
  {
    id: 'gemini-3.8-flash',
    label: 'Gemini 3.8 Flash (General Tasks - Default)',
    badge: 'Balanced & Fast',
  },
  {
    id: 'gemini-4-argon',
    label: 'Gemini 4 Argon (Complex Strategy & Reasoning)',
    badge: 'Frontier Intelligence',
  },
  {
    id: 'gemini-3.1-flash-lite',
    label: 'Gemini 3.1 Flash Lite (Instant Spitballing)',
    badge: 'Ultra Fast',
  },
];

const QUICK_PROMPTS = [
  'Critique our 5-color palette for WCAG AA contrast',
  'Suggest 5 alternative punchy taglines under 6 words',
  'How should we apply this visual identity to mobile UI?',
  'Draft a 15-second elevator pitch for venture investors',
  'What are 3 potential brand risks with this positioning?',
];

export const BrandChatDrawer: React.FC<BrandChatDrawerProps> = ({
  isOpen,
  onClose,
  brandBible,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Welcome to the Brand Strategy Room! I am your AI Brand Consultant for **${brandBible.brandName}**. 
      
I have ingested your current Brand Bible:
· **Mission**: "${brandBible.missionStatement}"
· **Tagline**: "${brandBible.tagline}"
· **Palette**: 5 harmonized tokens (${brandBible.colorPalette.map(c => c.name).join(', ')})
· **Typography**: ${brandBible.typography.headerFont} + ${brandBible.typography.bodyFont}

How can I help refine, stress-test, or expand your brand identity today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash',
      rolePreset: 'strategist',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedRole, setSelectedRole] = useState('strategist');
  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, text: m.text })),
          rolePreset: selectedRole,
          model: selectedModel,
          brandContext: brandBible,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Chat request failed');
      }

      const botMessage: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
        rolePreset: selectedRole,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `⚠️ I encountered an issue connecting to Gemini: ${err.message}. Please check your connection or try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600 text-white shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                Brand Strategy Consultant
                <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Gemini Multi-Turn
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Direct strategic advisor for {brandBible.brandName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Advisor Role & Model Configuration Controls */}
        <div className="p-3 bg-slate-100/60 border-b border-slate-200/80 space-y-2 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Persona Role Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Consultant Persona Role:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5 font-medium text-slate-800 focus:outline-hidden"
              >
                {ROLE_PRESETS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Selector (Argon, Flash 3.8, Flash Lite) */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Gemini Model:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5 font-medium text-slate-800 focus:outline-hidden"
              >
                {MODEL_OPTIONS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Chat Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-xs'
                      : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1 text-[10px] opacity-70">
                    <span className="font-semibold uppercase tracking-wider">
                      {isUser ? 'You' : 'Brand Consultant'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Body */}
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {!isUser && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{msg.modelUsed || selectedModel}</span>
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="hover:text-slate-800 flex items-center gap-1"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-100 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2 border border-slate-200/60">
                <span className="animate-pulse">Thinking with {selectedModel}...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0 ml-1">
            Prompts:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] whitespace-nowrap bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 px-2.5 py-1 rounded-md transition-colors shrink-0 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for feedback, taglines, tone tweaks, or color audits..."
              disabled={isLoading}
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-slate-800"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-lg transition-colors shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
