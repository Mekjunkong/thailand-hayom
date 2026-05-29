import { useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGamification } from "@/contexts/GamificationContext";
import { TOURIST_COURSE, TOURIST_COURSE_MODULES } from "@/data/touristCourse";
import { hasCourseAccess } from "@/lib/courseAccess";
import { trpc } from "@/lib/trpc";

// ─── design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "oklch(97% 0.005 264)",
  surface: "oklch(100% 0 0)",
  border: "oklch(88% 0.01 264)",
  text: "oklch(20% 0.01 264)",
  muted: "oklch(55% 0.01 264)",
  orange: "oklch(68% 0.19 40)",
  orangeLight: "oklch(94% 0.06 40)",
  indigo: "oklch(52% 0.24 264)",
  indigoLight: "oklch(94% 0.06 264)",
  green: "oklch(58% 0.18 145)",
  greenLight: "oklch(94% 0.06 145)",
  locked: "oklch(90% 0.005 264)",
  lockedText: "oklch(65% 0.01 264)",
};

// ─── lesson slug map ──────────────────────────────────────────────────────────
const LESSON_SLUG: Record<number, string | null> = {
  1: "airport-arrival",
  3: "taxi-transport",
  4: "food-restaurant",
  5: "shopping-market",
  6: "hotel-checkin",
  7: "emergency-health",
  9: "small-talk",
};

// ─── situation decorations ────────────────────────────────────────────────────
const SITUATION_ICON: Record<string, string> = {
  arrival: "✈️",
  taxi: "🚕",
  food: "🍜",
  shopping: "🛍️",
  hotel: "🏨",
  emergency: "🚨",
  social: "💬",
};

const SITUATION_BG: Record<string, { bg: string; border: string }> = {
  arrival: { bg: C.indigoLight, border: C.indigo },
  taxi: { bg: "oklch(94% 0.06 240)", border: "oklch(55% 0.18 240)" },
  food: { bg: "oklch(94% 0.07 40)", border: "oklch(62% 0.19 40)" },
  shopping: { bg: "oklch(94% 0.06 320)", border: "oklch(55% 0.18 320)" },
  hotel: { bg: "oklch(94% 0.05 200)", border: "oklch(55% 0.15 200)" },
  emergency: { bg: "oklch(94% 0.06 20)", border: "oklch(55% 0.18 20)" },
  social: { bg: C.greenLight, border: C.green },
};

// ─── placement quiz ───────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    promptHe: "מה פירוש המילה ״สวัสดี״?",
    promptEn: 'What does "สวัสดี" mean?',
    options: [
      { he: "שלום / היי", en: "Hello / Hi" },
      { he: "תודה", en: "Thank you" },
      { he: "מצטער", en: "Sorry" },
      { he: "ביי", en: "Goodbye" },
    ],
    correct: 0,
  },
  {
    promptHe: "איך אומרים ״תודה״ בתאית?",
    promptEn: 'How do you say "thank you" in Thai?',
    options: [
      { he: "กินข้าว", en: "Gin khao" },
      { he: "ขอบคุณ", en: "Khob khun" },
      { he: "ไม่เป็นไร", en: "Mai pen rai" },
      { he: "เท่าไร", en: "Tao rai" },
    ],
    correct: 1,
  },
  {
    promptHe: "מה פירוש ״ไม่เผ็ด״?",
    promptEn: 'What does "ไม่เผ็ด" mean?',
    options: [
      { he: "לא יקר", en: "Not expensive" },
      { he: "לא חריף", en: "Not spicy" },
      { he: "לא רחוק", en: "Not far" },
      { he: "לא קר", en: "Not cold" },
    ],
    correct: 1,
  },
];

const QUIZ_STORAGE_KEY = "th_placement_v1";

function PlacementQuiz({
  language,
  onDone,
}: {
  language: string;
  onDone: (score: number) => void;
}) {
  const he = language === "he";
  const [step, setStep] = useState(0); // 0 = intro, 1..3 = question, 4 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const q = step >= 1 && step <= 3 ? QUIZ_QUESTIONS[step - 1] : null;
  const score = answers.filter(
    (a, i) => a === QUIZ_QUESTIONS[i].correct
  ).length;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setRevealed(false);
    if (step < 3) {
      setStep(s => s + 1);
    } else {
      const finalScore = newAnswers.filter(
        (a, i) => a === QUIZ_QUESTIONS[i].correct
      ).length;
      localStorage.setItem(QUIZ_STORAGE_KEY, String(finalScore));
      setStep(4);
      onDone(finalScore);
    }
  };

  const progress = step <= 3 ? ((step - 1) / 3) * 100 : 100;

  return (
    <>
      {/* backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "oklch(0% 0 0 / 0.5)",
          zIndex: 200,
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 201,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0, 0, 1] as [number, number, number, number],
          }}
          style={{
            background: C.surface,
            borderRadius: 20,
            padding: "32px 28px",
            maxWidth: 440,
            width: "100%",
            boxShadow: "0 20px 60px oklch(0% 0 0 / 0.2)",
          }}
          dir={he ? "rtl" : "ltr"}
        >
          {step === 0 && (
            <>
              <div
                style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}
              >
                🎯
              </div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: C.text,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {he ? "3 שאלות קצרות" : "3 Quick Questions"}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: C.muted,
                  textAlign: "center",
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                {he
                  ? "נגלה מאיפה להתחיל כדי שהקורס יתאים בדיוק לרמת התאית שלך."
                  : "We'll find where to start so the course matches your Thai level."}
              </p>
              <button
                onClick={() => setStep(1)}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  borderRadius: 12,
                  background: C.orange,
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {he ? "בואו נתחיל ›" : "Let's go ›"}
              </button>
              <button
                onClick={() => onDone(-1)}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 12,
                  background: "transparent",
                  color: C.muted,
                  fontSize: 13,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  marginTop: 8,
                }}
              >
                {he ? "דלג" : "Skip"}
              </button>
            </>
          )}

          {step >= 1 && step <= 3 && q && (
            <>
              {/* progress bar */}
              <div
                style={{
                  height: 4,
                  background: C.border,
                  borderRadius: 2,
                  marginBottom: 24,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                  style={{
                    height: "100%",
                    background: C.orange,
                    borderRadius: 2,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                }}
              >
                {he ? `שאלה ${step} מתוך 3` : `Question ${step} of 3`}
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 20,
                  lineHeight: 1.4,
                }}
              >
                {he ? q.promptHe : q.promptEn}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === q.correct;
                  let bg = C.surface;
                  let border = C.border;
                  let color = C.text;
                  if (revealed) {
                    if (isCorrect) {
                      bg = C.greenLight;
                      border = C.green;
                      color = C.green;
                    } else if (isSelected) {
                      bg = "oklch(95% 0.04 20)";
                      border = "oklch(55% 0.18 20)";
                      color = "oklch(45% 0.18 20)";
                    }
                  } else if (isSelected) {
                    bg = C.indigoLight;
                    border = C.indigo;
                    color = C.indigo;
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: bg,
                        border: `1.5px solid ${border}`,
                        color,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: revealed ? "default" : "pointer",
                        textAlign: he ? "right" : "left",
                        transition: "all 0.15s",
                      }}
                    >
                      {he ? opt.he : opt.en}
                    </button>
                  );
                })}
              </div>
              {revealed && (
                <button
                  onClick={handleNext}
                  style={{
                    width: "100%",
                    padding: "13px 0",
                    borderRadius: 12,
                    background: C.indigo,
                    color: "white",
                    fontSize: 15,
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {step < 3
                    ? he
                      ? "הבא ›"
                      : "Next ›"
                    : he
                      ? "סיום ›"
                      : "Done ›"}
                </button>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <div
                style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}
              >
                {score === 3 ? "🏆" : score >= 1 ? "👍" : "🌱"}
              </div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: C.text,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {score === 3
                  ? he
                    ? "יש לך בסיס!"
                    : "You have a base!"
                  : score >= 1
                    ? he
                      ? "מכיר קצת!"
                      : "Some Thai already!"
                    : he
                      ? "מתחיל מאפס — כמונו!"
                      : "Starting fresh — great!"}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: C.muted,
                  textAlign: "center",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                {he
                  ? `ענית נכון על ${score} מתוך 3. הקורס מותאם לך מיום 1.`
                  : `You got ${score}/3. The course is set up from Day 1.`}
              </p>
              <button
                onClick={() => onDone(score)}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  borderRadius: 12,
                  background: C.orange,
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {he ? "לתוכנית הקורס ›" : "See the course map ›"}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}

// ─── day card ─────────────────────────────────────────────────────────────────

type DayState = "free" | "paid-locked" | "coming-soon" | "done";

function DayCard({
  module,
  dayNum,
  state,
  slug,
  language,
}: {
  module: (typeof TOURIST_COURSE_MODULES)[number];
  dayNum: number;
  state: DayState;
  slug: string | null;
  language: string;
}) {
  const he = language === "he";
  const icon = SITUATION_ICON[module.situation] ?? "📖";
  const colors = SITUATION_BG[module.situation] ?? {
    bg: C.indigoLight,
    border: C.indigo,
  };
  const isFree = state === "free";
  const isDone = state === "done";
  const isLocked = state === "paid-locked";
  const comingSoon = state === "coming-soon";

  const content = (
    <div
      style={{
        background: isLocked || comingSoon ? C.locked : C.surface,
        border: `1.5px solid ${isLocked || comingSoon ? C.border : colors.border}`,
        borderRadius: 16,
        padding: "18px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        cursor: isFree && slug ? "pointer" : "default",
        opacity: isLocked || comingSoon ? 0.65 : 1,
        transition: "transform 0.15s, box-shadow 0.15s",
        position: "relative",
        overflow: "hidden",
      }}
      dir={he ? "rtl" : "ltr"}
    >
      {/* day number strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          ...(he ? { right: 0 } : { left: 0 }),
          bottom: 0,
          width: 4,
          background: isLocked || comingSoon ? C.border : colors.border,
          borderRadius: he ? "0 16px 16px 0" : "16px 0 0 16px",
        }}
      />

      {/* icon badge */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background:
            isLocked || comingSoon ? "oklch(93% 0.005 264)" : colors.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          flexShrink: 0,
          ...(he ? { marginRight: 4 } : { marginLeft: 4 }),
        }}
      >
        {isLocked ? "🔒" : icon}
      </div>

      {/* text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: isLocked || comingSoon ? C.lockedText : colors.border,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: 3,
          }}
        >
          {he ? `יום ${dayNum}` : `Day ${dayNum}`}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: isLocked || comingSoon ? C.lockedText : C.text,
            marginBottom: 4,
          }}
        >
          {he ? module.titleHe : module.titleEn}
        </div>
        <div
          style={{
            fontSize: 12,
            color: C.muted,
            lineHeight: 1.5,
          }}
        >
          {he ? module.outcomeHe : module.outcomeEn}
        </div>
      </div>

      {/* right badge */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
        {isDone && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.green,
              background: C.greenLight,
              borderRadius: 20,
              padding: "4px 10px",
            }}
          >
            {he ? "הושלם ✓" : "Done ✓"}
          </div>
        )}
        {isFree && !isDone && slug && (
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: C.orange,
              background: C.orangeLight,
              borderRadius: 20,
              padding: "4px 10px",
            }}
          >
            {he ? "חינם ›" : "Free ›"}
          </div>
        )}
        {isFree && !isDone && !slug && (
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              background: C.locked,
              borderRadius: 20,
              padding: "4px 10px",
            }}
          >
            {he ? "בקרוב" : "Soon"}
          </div>
        )}
        {isLocked && <Lock size={16} color={C.lockedText} />}
        {comingSoon && (
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              background: C.locked,
              borderRadius: 20,
              padding: "4px 10px",
            }}
          >
            {he ? "בקרוב" : "Soon"}
          </div>
        )}
      </div>
    </div>
  );

  if (isFree && slug) {
    return (
      <Link href={`/lesson/${slug}`}>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          {content}
        </motion.div>
      </Link>
    );
  }
  return <div>{content}</div>;
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function CourseDashboard() {
  const { language, t } = useLanguage();
  const { streak, xp } = useGamification();
  const { data: user } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { data: purchases = [] } = trpc.user.getPurchaseHistory.useQuery(
    undefined,
    { enabled: Boolean(user) }
  );
  const hasPaid = hasCourseAccess(purchases);

  const alreadyPlaced = localStorage.getItem(QUIZ_STORAGE_KEY) !== null;
  const [showQuiz, setShowQuiz] = useState(!alreadyPlaced);
  const [, setPlacedScore] = useState<number | null>(
    alreadyPlaced ? Number(localStorage.getItem(QUIZ_STORAGE_KEY)) : null
  );

  const handleQuizDone = (score: number) => {
    setPlacedScore(score);
    setShowQuiz(false);
  };

  const he = language === "he";

  const freeLessonIds = new Set<number>(TOURIST_COURSE.freeLessonIds);

  const getDayState = (lessonId: number, slug: string | null): DayState => {
    if (hasPaid) return slug ? "free" : "coming-soon";
    if (freeLessonIds.has(lessonId)) return slug ? "free" : "coming-soon";
    return "paid-locked";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        paddingTop: 80,
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 20px",
        }}
        dir={he ? "rtl" : "ltr"}
      >
        {/* Track header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: C.indigoLight,
              border: `1.5px solid ${C.indigo}`,
              borderRadius: 20,
              padding: "5px 14px",
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 14 }}>🎓</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.indigo }}>
              {he ? "קורס הישרדות תאית לתיירים" : "Tourist Survival Thai"}
            </span>
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: C.text,
              marginBottom: 6,
              lineHeight: 1.3,
            }}
          >
            {he ? TOURIST_COURSE.headlineHe : TOURIST_COURSE.headlineEn}
          </h1>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
            {t({
              he: "7 שיעורים — שיחה ביומיומית שאפשר להשתמש בה מחר בשוק",
              en: "7 lessons — practical Thai you can use tomorrow at the market",
            })}
          </p>
        </div>

        {/* Stats strip */}
        {(streak > 0 || xp > 0) && (
          <div
            style={{
              background: C.surface,
              border: `1.5px solid ${C.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              gap: 20,
              marginBottom: 24,
            }}
          >
            {streak > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18 }}>🔥</span>
                <span
                  style={{ fontSize: 14, fontWeight: 700, color: C.orange }}
                >
                  {streak}
                </span>
                <span style={{ fontSize: 12, color: C.muted }}>
                  {he ? "ימים ברצף" : "day streak"}
                </span>
              </div>
            )}
            {xp > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18 }}>⚡</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "oklch(52% 0.22 75)",
                  }}
                >
                  {xp.toLocaleString()}
                </span>
                <span style={{ fontSize: 12, color: C.muted }}>XP</span>
              </div>
            )}
            <Link href="/progress">
              <span
                style={{
                  fontSize: 12,
                  color: C.indigo,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginInlineStart: "auto",
                }}
              >
                {he ? "כל הסטטיסטיקות ›" : "Full stats ›"}
              </span>
            </Link>
          </div>
        )}

        {/* Chapter map */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 32,
          }}
        >
          {TOURIST_COURSE_MODULES.map((mod, i) => {
            const slug = LESSON_SLUG[mod.lessonId] ?? null;
            const state = getDayState(mod.lessonId, slug);
            return (
              <DayCard
                key={mod.lessonId}
                module={mod}
                dayNum={i + 1}
                state={state}
                slug={slug}
                language={language}
              />
            );
          })}
        </div>

        {/* Paywall CTA for visitors */}
        {!hasPaid && (
          <div
            style={{
              background:
                "linear-gradient(135deg, oklch(94% 0.06 264), oklch(94% 0.05 40))",
              border: `1.5px solid ${C.border}`,
              borderRadius: 16,
              padding: "24px 20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>🔓</div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: C.text,
                marginBottom: 8,
              }}
            >
              {he ? "פתח את כל 7 השיעורים" : "Unlock all 7 lessons"}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: C.muted,
                marginBottom: 20,
                lineHeight: 1.6,
              }}
            >
              {he
                ? `${TOURIST_COURSE.productNameHe} — ₪${TOURIST_COURSE.priceIls} בלבד`
                : `${TOURIST_COURSE.productName} — ₪${TOURIST_COURSE.priceIls} only`}
            </p>
            <Link href="/welcome-kit">
              <button
                style={{
                  padding: "13px 32px",
                  borderRadius: 12,
                  background: C.orange,
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {he
                  ? `פתח עכשיו — ₪${TOURIST_COURSE.priceIls} ›`
                  : `Unlock now — ₪${TOURIST_COURSE.priceIls} ›`}
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Placement quiz overlay */}
      <AnimatePresence>
        {showQuiz && (
          <PlacementQuiz language={language} onDone={handleQuizDone} />
        )}
      </AnimatePresence>
    </div>
  );
}
