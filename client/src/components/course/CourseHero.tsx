import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Play, Star } from "lucide-react";
import { TOURIST_COURSE } from "@/data/touristCourse";
import { useLanguage } from "@/contexts/LanguageContext";

const SAMPLE_PHRASES = [
  {
    thai: "ไม่เผ็ดครับ",
    roman: "mai phet khrap",
    he: "לא חריף בבקשה",
    en: "Not spicy please",
    contextHe: "במסעדה",
    contextEn: "At a restaurant",
  },
  {
    thai: "เท่าไหร่ครับ",
    roman: "thao rai khrap",
    he: "כמה זה עולה?",
    en: "How much is this?",
    contextHe: "בשוק",
    contextEn: "At the market",
  },
  {
    thai: "ไปสนามบินครับ",
    roman: "pai sanam bin khrap",
    he: "לשדה התעופה",
    en: "To the airport",
    contextHe: "במונית",
    contextEn: "In a taxi",
  },
];

const TRUST_STATS = [
  {
    valueHe: "1,200+",
    valueEn: "1,200+",
    labelHe: "תיירים ישראלים",
    labelEn: "Israeli travelers",
    color: "#F97316",
  },
  {
    valueHe: "7",
    valueEn: "7",
    labelHe: "שיעורים",
    labelEn: "Lessons",
    color: "#0D9488",
  },
  {
    valueHe: "50+",
    valueEn: "50+",
    labelHe: "משפטים מעשיים",
    labelEn: "Real phrases",
    color: "#6366F1",
  },
  {
    valueHe: "4.9 ★",
    valueEn: "4.9 ★",
    labelHe: "דירוג ממוצע",
    labelEn: "Avg. rating",
    color: "#F59E0B",
  },
  {
    valueHe: "₪79",
    valueEn: "₪79",
    labelHe: "תשלום חד פעמי",
    labelEn: "One-time payment",
    color: "#0F172A",
  },
];

const STATS = [
  { valueHe: "7 שיעורים", valueEn: "7 Lessons" },
  { valueHe: "50+ משפטים", valueEn: "50+ Phrases" },
  { valueHe: "הגייה בשמע", valueEn: "Audio" },
  { valueHe: "ללא מנוי", valueEn: "No Sub." },
];

export function CourseHero() {
  const { language, t } = useLanguage();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const phrase = SAMPLE_PHRASES[phraseIdx];
  const dir = language === "he" ? "rtl" : "ltr";
  const he = language === "he";

  const playAudio = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(phrase.thai);
    u.lang = "th-TH";
    u.rate = 0.72;
    window.speechSynthesis.speak(u);
  };

  return (
    <section
      dir={dir}
      style={{
        background: "#FFFFFF",
        paddingTop: 80,
        paddingBottom: 0,
        overflow: "hidden",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        {/* ── LEFT: copy ── */}
        <div style={{ paddingBottom: 80 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#F1F5F9",
              borderRadius: 999,
              padding: "8px 16px",
              marginBottom: 28,
            }}
          >
            <span style={{ fontSize: 16 }}>🌏</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1E293B",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              {t({
                he: "הכינו את הטיול שלכם עם שפה",
                en: "Prepare Your Travel With Language",
              })}
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              color: "#0F172A",
              letterSpacing: "-0.02em",
              fontFamily: he ? "Assistant, sans-serif" : "Outfit, sans-serif",
              marginBottom: 24,
            }}
          >
            {he ? (
              <>
                לדבר תאית
                <br />
                לטייל טוב יותר.
                <br />
                <span style={{ color: "#F97316" }}>✈️</span>
              </>
            ) : (
              <>
                Speak Thai.
                <br />
                Travel Better.
                <br />
                <span style={{ color: "#F97316" }}>✈️</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.75,
              color: "#64748B",
              maxWidth: 480,
              marginBottom: 36,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {t({
              he: "המשפטים שבאמת צריך: מונית, אוכל, מלון, שוק, עזרה וחיוך מכבד מול מקומיים.",
              en: "The phrases you actually need: taxis, food, hotels, markets, help, and a respectful smile with locals.",
            })}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            <Link href="/lesson/airport-arrival">
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0F172A",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 999,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Outfit, sans-serif",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#1E293B")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#0F172A")
                }
              >
                {t({ he: "התחילו שיעור חינם", en: "Get Started" })}
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>
            </Link>

            <button
              onClick={playAudio}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "#0F172A",
                border: "2px solid #E2E8F0",
                borderRadius: 999,
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Outfit, sans-serif",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#0F172A")
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#E2E8F0")
              }
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Play
                  style={{
                    width: 12,
                    height: 12,
                    color: "#fff",
                    marginLeft: 2,
                  }}
                  fill="white"
                />
              </div>
              {t({ he: "שמע דוגמה", en: "Watch Demo" })}
            </button>
          </div>

          {/* Social proof */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex" }}>
              {["#F97316", "#0D9488", "#6366F1", "#EC4899"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: c,
                    border: "2px solid white",
                    marginLeft: i === 0 ? 0 : -8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {["א", "ב", "ג", "ד"][i]}
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    style={{ width: 14, height: 14, color: "#F97316" }}
                    fill="#F97316"
                  />
                ))}
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0F172A",
                    marginLeft: 4,
                  }}
                >
                  4.9
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
                {t({
                  he: "לקוחות מרוצים",
                  en: "Happy Customers",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: hero image + phrase card ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "80vh",
            maxHeight: 700,
          }}
        >
          {/* Background blob */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 80% at 50% 60%, oklch(95% 0.06 78) 0%, transparent 70%)",
              borderRadius: "50%",
            }}
          />

          {/* Hero image */}
          <img
            src="/images/hero-beach.png"
            alt="Thailand travel"
            style={{
              position: "relative",
              height: "95%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Floating phrase card */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: he ? "auto" : 0,
              right: he ? 0 : "auto",
              background: "white",
              borderRadius: 16,
              padding: "14px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              minWidth: 200,
              cursor: "pointer",
            }}
            onClick={() => {
              setPhraseIdx(i => (i + 1) % SAMPLE_PHRASES.length);
              playAudio();
            }}
          >
            <p
              style={{
                fontSize: 10,
                color: "#94A3B8",
                marginBottom: 4,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {he ? phrase.contextHe : phrase.contextEn}
            </p>
            <p
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#0F172A",
                fontFamily: "Kanit, sans-serif",
                margin: 0,
                lineHeight: 1.2,
              }}
              lang="th"
            >
              {phrase.thai}
            </p>
            <p style={{ fontSize: 12, color: "#94A3B8", margin: "2px 0 0" }}>
              {phrase.roman}
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1E293B",
                margin: "2px 0 0",
              }}
            >
              {he ? phrase.he : phrase.en}
            </p>
          </div>

          {/* Stats chip */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: he ? "auto" : 0,
              left: he ? 0 : "auto",
              background: "white",
              borderRadius: 16,
              padding: "12px 16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              display: "flex",
              gap: 16,
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#0F172A",
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {he ? s.valueHe : s.valueEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats trust bar ── */}
      <div
        style={{
          borderTop: "1px solid #F1F5F9",
          padding: "28px 0",
          background: "#FAFAFA",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              flexWrap: "wrap",
            }}
          >
            {TRUST_STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    padding: "0 32px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: s.color,
                      margin: 0,
                      fontFamily: "Outfit, sans-serif",
                      lineHeight: 1.1,
                    }}
                  >
                    {he ? s.valueHe : s.valueEn}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#94A3B8",
                      margin: "3px 0 0",
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {he ? s.labelHe : s.labelEn}
                  </p>
                </div>
                {i < TRUST_STATS.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      height: 36,
                      background: "#E2E8F0",
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
