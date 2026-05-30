import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── design tokens ────────────────────────────────────────────────────────────
const C = {
  orange: "oklch(68% 0.19 40)",
  orangeDark: "oklch(55% 0.19 40)",
  orangeLight: "oklch(95% 0.06 78)",
  teal: "oklch(52% 0.15 175)",
  tealLight: "oklch(95% 0.04 175)",
  surface: "oklch(100% 0 0)",
  bg: "oklch(98% 0.012 82)",
  border: "oklch(90% 0.015 82)",
  text: "oklch(16% 0.015 55)",
  muted: "oklch(52% 0.015 55)",
};

// ─── types ───────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── system prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the official AI assistant for Thailand Hayom — a bilingual Hebrew/English travel platform for Israeli tourists in Thailand.

Your primary role is to help users with the Tourist Survival Thai Course and general Thailand travel questions.

**LANGUAGE RULE:**
- If the user writes in Hebrew, respond ENTIRELY in Hebrew (natural, conversational, not formal)
- If the user writes in English, respond in English
- Match the user's language in every response

**About the product:**
The Tourist Survival Thai Course (₪79 one-time, no subscription) includes:
• 7 interactive lessons covering real travel situations
• Lesson 1: Greetings & Politeness (FREE)
• Lesson 2: Taxis & Directions (paid)
• Lesson 3: Food & Restaurants (FREE)
• Lesson 4: Shopping & Bargaining (paid)
• Lesson 5: Hotel Check-in (paid)
• Lesson 6: Emergency & Health (paid)
• Lesson 7: Small Talk & Review (paid)
• Audio pronunciation for every phrase (Web Speech API)
• Gamification: XP, streaks, gems, quiz with heart lives
• PDF phrase cards for offline use
• Emergency scripts

**Your goals:**
1. Help users understand what they'll learn in the course
2. Encourage them to try the 2 free lessons (airport-arrival, food-restaurant)
3. Answer Thailand travel questions (food, transport, culture, safety, visa)
4. Help with Thai language questions
5. Guide users to purchase if they ask about the full course

**Behavior:**
- Be warm, practical, and direct
- Use real Thai phrases with transliteration when relevant
- For travel questions, give specific, actionable answers
- Never make up phone numbers or prices you're not sure of
- Emergency numbers in Thailand: Tourist Police 1155, Emergency 191, Ambulance 1669`;

// ─── quick actions ────────────────────────────────────────────────────────────
const QUICK_ACTIONS_HE = [
  { label: "🎓 מה בקורס?", query: "מה כלול בקורס התאית?" },
  { label: "✈️ שיעור חינם", query: "איך מתחילים שיעור חינם?" },
  { label: "🍜 אוכל בתאילנד", query: "מה כדאי לאכול בתאילנד?" },
  { label: "🚕 מוניות ו-Grab", query: "איך להשתמש ב-Grab בתאילנד?" },
  { label: "🆘 חירום", query: "מה מספרי החירום בתאילנד?" },
  { label: "💳 ויזה לתאילנד", query: "איזה ויזה צריך לתאילנד?" },
];

const QUICK_ACTIONS_EN = [
  { label: "🎓 What's in the course?", query: "What does the Thai course include?" },
  { label: "✈️ Free lesson", query: "How do I start a free lesson?" },
  { label: "🍜 Food in Thailand", query: "What food should I try in Thailand?" },
  { label: "🚕 Taxis & Grab", query: "How do I use Grab in Thailand?" },
  { label: "🆘 Emergency", query: "What are emergency numbers in Thailand?" },
  { label: "💳 Thailand visa", query: "What visa do I need for Thailand?" },
];

// ─── component ────────────────────────────────────────────────────────────────
export default function AIConcierge() {
  const { language } = useLanguage();
  const he = language === "he";

  const greeting: Message = {
    role: "assistant",
    content: he
      ? "สวัสดี! 🙏 שלום! אני העוזר של Thailand Hayom.\n\nאני יכול לעזור לך עם קורס התאית, שאלות על טיול בתאילנד, אוכל, תחבורה, ויזה ועוד.\n\nמה תרצה לדעת?"
      : "สวัสดี! 🙏 Hi! I'm the Thailand Hayom assistant.\n\nI can help with the Thai Survival Course, travel questions, food, transport, visas, and more.\n\nWhat would you like to know?",
    timestamp: new Date(),
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [sessionId] = useState(
    () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Speech recognition setup
  useEffect(() => {
    const SR =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = he ? "he-IL" : "en-US";
    rec.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
  }, [he]);

  // Persist chat
  useEffect(() => {
    const saved = localStorage.getItem("th_concierge_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(
          parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
        );
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1)
      localStorage.setItem("th_concierge_chat", JSON.stringify(messages));
  }, [messages]);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setShowQuickActions(false);
    setMessages(prev => [...prev, { role: "user", content: msg, timestamp: new Date() }]);
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const res = await sendMessageMutation.mutateAsync({ message: msg, sessionId, history });
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: res.message, timestamp: new Date() },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: he
            ? "מצטער, יש תקלה כרגע. נסה שוב בעוד רגע."
            : "Sorry, something went wrong. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ ...greeting, timestamp: new Date() }]);
    setShowQuickActions(true);
    localStorage.removeItem("th_concierge_chat");
  };

  const quickActions = he ? QUICK_ACTIONS_HE : QUICK_ACTIONS_EN;

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label={he ? "פתח עוזר AI" : "Open AI assistant"}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 24px oklch(68% 0.19 40 / 40%)",
            zIndex: 50,
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <MessageCircle style={{ width: 26, height: 26, color: "#fff" }} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 360,
            height: 580,
            borderRadius: 20,
            boxShadow: "0 8px 48px oklch(16% 0.015 55 / 18%)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 50,
            border: `1px solid ${C.border}`,
            background: C.surface,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "oklch(100% 0 0 / 22%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Bot style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>
                {he ? "עוזר תאילנד היום" : "Thailand Hayom Assistant"}
              </p>
              <p style={{ color: "oklch(100% 0 0 / 78%)", fontSize: 11, margin: 0 }}>
                {he ? "עוזר AI לטיול בתאילנד" : "AI travel & course assistant"}
              </p>
            </div>
            <button
              onClick={clearChat}
              aria-label={he ? "נקה שיחה" : "Clear chat"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 6,
                borderRadius: 8,
                color: "oklch(100% 0 0 / 80%)",
                display: "flex",
              }}
            >
              <Trash2 style={{ width: 16, height: 16 }} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={he ? "סגור" : "Close"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 6,
                borderRadius: 8,
                color: "oklch(100% 0 0 / 80%)",
                display: "flex",
              }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: C.bg,
            }}
            dir={he ? "rtl" : "ltr"}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                }}
              >
                {m.role === "assistant" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: C.orange,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Bot style={{ width: 15, height: 15, color: "#fff" }} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: m.role === "user" ? C.orange : C.surface,
                    color: m.role === "user" ? "#fff" : C.text,
                    border: m.role === "user" ? "none" : `1px solid ${C.border}`,
                    fontSize: 13,
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                    boxShadow: m.role === "assistant" ? "0 1px 4px oklch(16% 0.015 55 / 8%)" : "none",
                  }}
                >
                  {m.content}
                  <p
                    style={{
                      fontSize: 10,
                      marginTop: 4,
                      color: m.role === "user" ? "oklch(100% 0 0 / 65%)" : C.muted,
                    }}
                  >
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {m.role === "user" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: C.tealLight,
                      border: `1px solid ${C.teal}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <User style={{ width: 14, height: 14, color: C.teal }} />
                  </div>
                )}
              </div>
            ))}

            {/* Quick actions */}
            {showQuickActions && messages.length === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
                <p style={{ fontSize: 11, color: C.muted, textAlign: "center", fontWeight: 600 }}>
                  {he ? "שאלות נפוצות:" : "Quick questions:"}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {quickActions.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(a.query)}
                      style={{
                        padding: "7px 10px",
                        borderRadius: 10,
                        border: `1px solid ${C.border}`,
                        background: C.surface,
                        color: C.text,
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: "pointer",
                        textAlign: he ? "right" : "left",
                        lineHeight: 1.4,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLButtonElement).style.background = C.orangeLight)
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLButtonElement).style.background = C.surface)
                      }
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: C.orange,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bot style={{ width: 15, height: 15, color: "#fff" }} />
                </div>
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "16px 16px 16px 4px",
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    gap: 4,
                  }}
                >
                  {[0, 150, 300].map(delay => (
                    <div
                      key={delay}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: C.muted,
                        animation: `bounce 1s infinite ${delay}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: `1px solid ${C.border}`,
              background: C.surface,
            }}
            dir={he ? "rtl" : "ltr"}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !isLoading && handleSend()}
                placeholder={he ? "שאל אותי כל דבר..." : "Ask me anything..."}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "9px 14px",
                  borderRadius: 12,
                  border: `1px solid ${C.border}`,
                  fontSize: 13,
                  outline: "none",
                  background: C.bg,
                  color: C.text,
                  direction: he ? "rtl" : "ltr",
                }}
              />
              <button
                onClick={toggleVoice}
                disabled={isLoading}
                aria-label={isListening ? "Stop voice" : "Voice input"}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "none",
                  background: isListening ? "oklch(55% 0.22 27)" : C.tealLight,
                  color: isListening ? "#fff" : C.teal,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isListening ? (
                  <MicOff style={{ width: 16, height: 16 }} />
                ) : (
                  <Mic style={{ width: 16, height: 16 }} />
                )}
              </button>
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                aria-label={he ? "שלח" : "Send"}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "none",
                  background: input.trim() && !isLoading ? C.orange : C.border,
                  color: input.trim() && !isLoading ? "#fff" : C.muted,
                  cursor: input.trim() && !isLoading ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.15s",
                }}
              >
                <Send style={{ width: 16, height: 16 }} />
              </button>
            </div>
            <p
              style={{
                fontSize: 10,
                color: C.muted,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {he ? "קורס תאית · ₪79 תשלום חד פעמי" : "Thai Course · ₪79 one-time payment"}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
