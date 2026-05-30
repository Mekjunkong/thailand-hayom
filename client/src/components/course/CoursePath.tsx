import { ArrowUpRight, Lock } from "lucide-react";
import { Link } from "wouter";
import { TOURIST_COURSE, TOURIST_COURSE_MODULES } from "@/data/touristCourse";
import { useLanguage } from "@/contexts/LanguageContext";

const LESSON_IMAGES: Record<string, string> = {
  arrival: "/images/lesson1-greetings.jpg",
  taxi: "/images/lesson5-transportation.jpg",
  food: "/images/lesson3-food.jpg",
  shopping: "/images/lesson4-shopping.jpg",
  hotel: "/images/lesson6-accommodation.jpg",
  emergency: "/images/lesson7-emergency.jpg",
  social: "/images/lesson8-culture.jpg",
};

const LESSON_SLUGS: Record<number, string> = {
  1: "airport-arrival",
  3: "food-restaurant",
  4: "shopping-market",
  5: "taxi-transport",
  6: "emergency-health",
  7: "small-talk",
  9: "hotel-checkin",
};

const PHRASE_COUNTS: Record<string, number> = {
  arrival: 8,
  taxi: 9,
  food: 10,
  shopping: 8,
  hotel: 7,
  emergency: 9,
  social: 8,
};

export function CoursePath() {
  const { language, t } = useLanguage();
  const freeSet = new Set<number>(TOURIST_COURSE.freeLessonIds);
  const dir = language === "he" ? "rtl" : "ltr";
  const he = language === "he";

  return (
    <section
      dir={dir}
      style={{ background: "#FFFFFF", padding: "80px 0" }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ maxWidth: 600, marginBottom: 48 }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.02em",
              fontFamily: he ? "Assistant, sans-serif" : "Outfit, sans-serif",
              marginBottom: 12,
            }}
          >
            {t({ he: "גלו 7 שיעורי תאית 🔥", en: "Explore 7 Thai Lessons 🔥" })}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#64748B",
              lineHeight: 1.7,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {t({
              he: "כל שיעור מכסה סיטואציה אמיתית מהטיול. פחות דקדוק, יותר לדבר.",
              en: "Each lesson covers one real travel situation. Less grammar, more speaking.",
            })}
          </p>
        </div>

        {/* Destination chips grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 20,
          }}
        >
          {TOURIST_COURSE_MODULES.map(module => {
            const img = LESSON_IMAGES[module.situation] ?? LESSON_IMAGES["arrival"];
            const isFree = freeSet.has(module.lessonId);
            const slug = LESSON_SLUGS[module.lessonId] ?? "airport-arrival";
            const phraseCount = PHRASE_COUNTS[module.situation] ?? 8;
            const title = he ? module.titleHe : module.titleEn;

            return (
              <Link href={`/lesson/${slug}`} key={module.day}>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #F1F5F9",
                    borderRadius: 20,
                    padding: 16,
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 12px 32px rgba(0,0,0,0.12)";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.06)";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {/* Circular image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingBottom: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: 14,
                    }}
                  >
                    <img
                      src={img}
                      alt={title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Day badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: 6,
                        left: 6,
                        background: "rgba(255,255,255,0.92)",
                        borderRadius: 999,
                        padding: "2px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#0F172A",
                      }}
                    >
                      {he ? `יום ${module.day}` : `Day ${module.day}`}
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 4,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#0F172A",
                          margin: 0,
                          lineHeight: 1.3,
                          fontFamily: he ? "Assistant, sans-serif" : "Outfit, sans-serif",
                        }}
                      >
                        {title}
                      </p>
                      <ArrowUpRight
                        style={{
                          width: 14,
                          height: 14,
                          color: "#94A3B8",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                    </div>

                    <p
                      style={{
                        fontSize: 11,
                        color: "#94A3B8",
                        margin: "4px 0 8px",
                        fontFamily: "Outfit, sans-serif",
                      }}
                    >
                      {phraseCount} {t({ he: "משפטים", en: "phrases" })}
                    </p>

                    {isFree ? (
                      <span
                        style={{
                          display: "inline-block",
                          background: "#ECFDF5",
                          color: "#059669",
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: 999,
                          padding: "3px 10px",
                        }}
                      >
                        {t({ he: "חינם", en: "Free" })}
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: "#F8FAFC",
                          color: "#94A3B8",
                          fontSize: 10,
                          fontWeight: 600,
                          borderRadius: 999,
                          padding: "3px 10px",
                        }}
                      >
                        <Lock style={{ width: 9, height: 9 }} />
                        {t({ he: "קורס מלא", en: "Full course" })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/course">
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#0F172A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 999,
                padding: "14px 32px",
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
              {t({ he: "ראו את כל הקורס", en: "View Full Course" })}
              <ArrowUpRight style={{ width: 16, height: 16 }} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
