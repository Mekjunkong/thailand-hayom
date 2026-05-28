import { useState, useCallback, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Heart,
  RotateCcw,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// ─── types ────────────────────────────────────────────────────────────────────

type Phase = "listen" | "drill" | "quiz" | "score";

interface DialogueLine {
  speakerHe: string;
  speakerEn: string;
  thai: string;
  transliteration: string;
  translationHe: string;
  translationEn: string;
}

interface DrillPhrase {
  id: number;
  thai: string;
  transliteration: string;
  translationHe: string;
  translationEn: string;
  noteHe: string;
  noteEn: string;
}

type QuizQuestion =
  | {
      id: number;
      type: "meaning";
      promptHe: string;
      promptEn: string;
      thai: string;
      transliteration: string;
      options: Array<{ labelHe: string; labelEn: string }>;
      correctIndex: number;
    }
  | {
      id: number;
      type: "listen";
      promptHe: string;
      promptEn: string;
      thai: string;
      transliteration: string;
      options: Array<{ labelHe: string; labelEn: string }>;
      correctIndex: number;
    }
  | {
      id: number;
      type: "complete";
      promptHe: string;
      promptEn: string;
      beforeThai: string;
      missingThai: string;
      afterThai: string;
      transliteration: string;
      options: Array<{ labelHe: string; labelEn: string }>;
      correctIndex: number;
    };

interface MockLesson {
  id: string;
  titleHe: string;
  titleEn: string;
  chapterHe: string;
  chapterEn: string;
  dialogue: DialogueLine[];
  drillPhrases: DrillPhrase[];
  quiz: QuizQuestion[];
}

// ─── lesson data ──────────────────────────────────────────────────────────────

const LESSONS: Record<string, MockLesson> = {
  "airport-arrival": {
    id: "airport-arrival",
    titleHe: "שיעור 1 · הגעה לשדה התעופה",
    titleEn: "Lesson 1 · Airport Arrival",
    chapterHe: "פרק 1 · הגעה",
    chapterEn: "Chapter 1 · Arrival",
    dialogue: [
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "ขอโทษครับ",
        transliteration: "Kor-toht-krap",
        translationHe: "סליחה",
        translationEn: "Excuse me",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "ครับ มีอะไรให้ช่วยไหมครับ",
        transliteration: "Krap, mee a-rai hai chuay mai krap",
        translationHe: "כן, איך אפשר לעזור?",
        translationEn: "Yes, how can I help?",
      },
      {
        speakerHe: "תייר ישראלי",
        speakerEn: "Israeli tourist",
        thai: "แท็กซี่อยู่ที่ไหนครับ",
        transliteration: "Taek-si yoo tee-nai krap",
        translationHe: "איפה המונית?",
        translationEn: "Where is the taxi?",
      },
      {
        speakerHe: "אדם מקומי",
        speakerEn: "Thai person",
        thai: "ออกไปทางนี้ครับ แล้วเลี้ยวขวา",
        transliteration: "Ork bpai tahng nee krap laew liao kwa",
        translationHe: "לך לכיוון הזה ואז פנה ימינה",
        translationEn: "Go this way, then turn right",
      },
    ],
    drillPhrases: [
      {
        id: 1,
        thai: "ขอโทษครับ",
        transliteration: "Kor-toht-krap",
        translationHe: "סליחה (גבר)",
        translationEn: "Excuse me (male)",
        noteHe: "משפט פתיחה בטוח כשאתם צריכים עזרה.",
        noteEn: "Your safest opener when you need help.",
      },
      {
        id: 2,
        thai: "ขอโทษค่ะ",
        transliteration: "Kor-toht-kha",
        translationHe: "סליחה (אישה)",
        translationEn: "Excuse me (female)",
        noteHe: "אותה מילה — רק הסיומת משתנה לפי מגדר.",
        noteEn: "Same word — only the particle changes by gender.",
      },
      {
        id: 3,
        thai: "ช่วยได้ไหม",
        transliteration: "Chuay dai mai",
        translationHe: "אתה יכול לעזור?",
        translationEn: "Can you help?",
        noteHe: "שימושי כשאתם תקועים.",
        noteEn: "Useful when you are stuck.",
      },
      {
        id: 4,
        thai: "อยู่ที่ไหน",
        transliteration: "Yoo tee-nai",
        translationHe: "איפה נמצא...?",
        translationEn: "Where is...?",
        noteHe: "שאלת הכיוון הבסיסית.",
        noteEn: "The basic direction question.",
      },
      {
        id: 5,
        thai: "ไปทางนี้",
        transliteration: "Bpai tahng nee",
        translationHe: "לך לכיוון הזה",
        translationEn: "Go this way",
        noteHe: "תשמעו את זה הרבה מאנשים שמכוונים אתכם.",
        noteEn: "You will hear this a lot from people directing you.",
      },
      {
        id: 6,
        thai: "เลี้ยวขวา",
        transliteration: "Liao kwa",
        translationHe: "פנה ימינה",
        translationEn: "Turn right",
        noteHe: "זכרו: ขวา = ימין, ซ้าย = שמאל",
        noteEn: "Remember: ขวา = right, ซ้าย = left",
      },
      {
        id: 7,
        thai: "เลี้ยวซ้าย",
        transliteration: "Liao sai",
        translationHe: "פנה שמאלה",
        translationEn: "Turn left",
        noteHe: "זוג של עם הביטוי הקודם.",
        noteEn: "Pair this with the previous phrase.",
      },
      {
        id: 8,
        thai: "ขอบคุณครับ",
        transliteration: "Korp-kun-krap",
        translationHe: "תודה (גבר)",
        translationEn: "Thank you (male)",
        noteHe: "תמיד לסיים בתודה — זה מאוד מכובד בתאילנד.",
        noteEn: "Always close with thanks — very respected in Thailand.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ขอโทษครับ",
        transliteration: "Kor-toht-krap",
        options: [
          { labelHe: "תודה", labelEn: "Thank you" },
          { labelHe: "סליחה", labelEn: "Excuse me" },
          { labelHe: "שלום", labelEn: "Hello" },
          { labelHe: "להתראות", labelEn: "Goodbye" },
        ],
        correctIndex: 1,
      },
      {
        id: 2,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "อยู่ที่ไหน",
        transliteration: "Yoo tee-nai",
        options: [
          { labelHe: "כמה זה עולה?", labelEn: "How much?" },
          { labelHe: "איפה נמצא?", labelEn: "Where is...?" },
          { labelHe: "מה השם שלך?", labelEn: "What's your name?" },
          { labelHe: "אני רוצה", labelEn: "I want" },
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        type: "listen",
        promptHe: "שמעו וזהו:",
        promptEn: "Listen and identify:",
        thai: "เลี้ยวขวา",
        transliteration: "Liao kwa",
        options: [
          { labelHe: "פנה ימינה", labelEn: "Turn right" },
          { labelHe: "פנה שמאלה", labelEn: "Turn left" },
          { labelHe: "לך ישר", labelEn: "Go straight" },
          { labelHe: "עצור כאן", labelEn: "Stop here" },
        ],
        correctIndex: 0,
      },
      {
        id: 4,
        type: "complete",
        promptHe: "השלימו את המשפט:",
        promptEn: "Complete the sentence:",
        beforeThai: "แท็กซี่",
        missingThai: "___",
        afterThai: "ที่ไหนครับ",
        transliteration: "Taek-si ___ tee-nai krap",
        options: [
          { labelHe: "อยู่ (yoo)", labelEn: "อยู่ (yoo)" },
          { labelHe: "ไป (bpai)", labelEn: "ไป (bpai)" },
          { labelHe: "มา (ma)", labelEn: "มา (ma)" },
          { labelHe: "ดี (dee)", labelEn: "ดี (dee)" },
        ],
        correctIndex: 0,
      },
      {
        id: 5,
        type: "meaning",
        promptHe: "מה המשמעות של:",
        promptEn: "What does this mean?",
        thai: "ขอบคุณครับ",
        transliteration: "Korp-kun-krap",
        options: [
          { labelHe: "בבקשה", labelEn: "Please" },
          { labelHe: "לא", labelEn: "No" },
          { labelHe: "תודה", labelEn: "Thank you" },
          { labelHe: "כן", labelEn: "Yes" },
        ],
        correctIndex: 2,
      },
    ],
  },
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function speakThai(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const raw = text.split("/")[0].trim();
  const utterance = new SpeechSynthesisUtterance(raw);
  utterance.lang = "th-TH";
  utterance.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const thaiVoice = voices.find(v => v.lang === "th-TH");
  if (thaiVoice) utterance.voice = thaiVoice;
  window.speechSynthesis.speak(utterance);
}

// ─── design tokens (dark lesson player) ───────────────────────────────────────

const C = {
  bg: "oklch(12% 0.01 264)",
  surface: "oklch(18% 0.015 264)",
  surfaceHigh: "oklch(22% 0.018 264)",
  border: "oklch(28% 0.02 264)",
  text: "oklch(93% 0.005 264)",
  muted: "oklch(58% 0.012 264)",
  indigo: "oklch(52% 0.24 264)",
  indigoLight: "oklch(70% 0.18 264)",
  orange: "oklch(68% 0.19 40)",
  orangeLight: "oklch(80% 0.14 40)",
  green: "oklch(62% 0.18 145)",
  red: "oklch(55% 0.22 27)",
  amber: "oklch(72% 0.18 75)",
};

const SLIDE = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
  transition: {
    duration: 0.25,
    ease: [0.25, 0, 0, 1] as [number, number, number, number],
  },
};

// ─── sub-components ───────────────────────────────────────────────────────────

function PlayButton({
  text,
  size = "md",
}: {
  text: string;
  size?: "sm" | "md" | "lg";
}) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    speakThai(text);
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1800);
  }, [text]);

  const sz = size === "lg" ? 52 : size === "md" ? 40 : 32;
  const iconSz = size === "lg" ? 20 : size === "md" ? 16 : 13;

  return (
    <button
      onClick={handlePlay}
      style={{
        width: sz,
        height: sz,
        borderRadius: "50%",
        backgroundColor: playing ? C.orange : C.indigo,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.15s ease",
        flexShrink: 0,
      }}
    >
      <Volume2 size={iconSz} color="white" />
    </button>
  );
}

function HeartsRow({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[0, 1, 2].map(i => (
        <Heart
          key={i}
          size={18}
          fill={i < count ? C.red : "none"}
          color={i < count ? C.red : C.muted}
          style={{ transition: "all 0.2s ease" }}
        />
      ))}
    </div>
  );
}

function PhaseBar({ phase }: { phase: Phase }) {
  const phases: Phase[] = ["listen", "drill", "quiz"];
  const currentIdx = phases.indexOf(phase);

  return (
    <div style={{ display: "flex", gap: 6, flex: 1 }}>
      {phases.map((p, i) => (
        <div
          key={p}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: i <= currentIdx ? C.orange : C.border,
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

// ─── Phase 1 — Listen ─────────────────────────────────────────────────────────

function ListenPhase({
  lesson,
  onComplete,
}: {
  lesson: MockLesson;
  onComplete: () => void;
}) {
  const { t, language } = useLanguage();
  const [lineIndex, setLineIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [played, setPlayed] = useState(false);

  const line = lesson.dialogue[lineIndex];
  const isLast = lineIndex === lesson.dialogue.length - 1;
  const dir = language === "he" ? "rtl" : "ltr";

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setLineIndex(i => i + 1);
      setRevealed(false);
      setPlayed(false);
    }
  };

  const handlePlay = useCallback(() => {
    speakThai(line.thai);
    setPlayed(true);
  }, [line.thai]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lineIndex}
        {...SLIDE}
        style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}
      >
        {/* speaker chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            direction: dir,
          }}
        >
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              backgroundColor: C.surfaceHigh,
              fontSize: 12,
              color: C.muted,
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {language === "he" ? line.speakerHe : line.speakerEn}
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>
            {lineIndex + 1} / {lesson.dialogue.length}
          </div>
        </div>

        {/* Thai card */}
        <div
          style={{
            backgroundColor: C.surface,
            borderRadius: 16,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            border: `1px solid ${C.border}`,
          }}
        >
          <PlayButton text={line.thai} size="lg" />

          {played ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  color: C.text,
                  letterSpacing: "0.03em",
                  marginBottom: 8,
                }}
              >
                {line.thai}
              </div>
              <div style={{ fontSize: 14, color: C.muted }}>
                {line.transliteration}
              </div>
            </motion.div>
          ) : (
            <button
              onClick={handlePlay}
              style={{
                background: "none",
                border: `1px dashed ${C.border}`,
                borderRadius: 8,
                padding: "10px 20px",
                color: C.muted,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              {t({ he: "לחץ כדי לשמוע", en: "Tap to hear" })}
            </button>
          )}
        </div>

        {/* translation reveal */}
        {played && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {revealed ? (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: C.surfaceHigh,
                  borderRadius: 12,
                  padding: "14px 20px",
                  textAlign: "center",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                  direction: dir,
                  color: C.indigoLight,
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {language === "he" ? line.translationHe : line.translationEn}
              </motion.div>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                style={{
                  width: "100%",
                  background: "none",
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "14px 20px",
                  color: C.muted,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                }}
              >
                {t({ he: "הצג תרגום", en: "Show translation" })}
              </button>
            )}
          </motion.div>
        )}

        {/* advance button */}
        {played && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleNext}
            style={{
              marginTop: "auto",
              padding: "16px 0",
              borderRadius: 14,
              backgroundColor: C.orange,
              border: "none",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Noto Sans Hebrew, sans-serif",
              direction: dir,
            }}
          >
            {isLast
              ? t({ he: "עברו לתרגול ←", en: "Start Drill →" })
              : t({ he: "השורה הבאה ←", en: "Next line →" })}
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Phase 2 — Drill ──────────────────────────────────────────────────────────

function DrillPhase({
  lesson,
  onComplete,
}: {
  lesson: MockLesson;
  onComplete: () => void;
}) {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const dir = language === "he" ? "rtl" : "ltr";
  const phrase = lesson.drillPhrases[index];
  const isLast = index === lesson.drillPhrases.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setIndex(i => i + 1);
      setFlipped(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        {...SLIDE}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        {/* progress dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {lesson.drillPhrases.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 20 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i <= index ? C.orange : C.border,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>

        {/* counter */}
        <div
          style={{
            textAlign: "center",
            color: C.muted,
            fontSize: 13,
            fontFamily: "Noto Sans Hebrew, sans-serif",
          }}
        >
          {index + 1} / {lesson.drillPhrases.length}
        </div>

        {/* flip card */}
        <div
          className="perspective-1000"
          style={{ flex: 1, cursor: "pointer", minHeight: 220 }}
          onClick={() => {
            if (!flipped) {
              speakThai(phrase.thai);
              setFlipped(true);
            }
          }}
        >
          <motion.div
            className="preserve-3d"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: 220,
            }}
          >
            {/* front */}
            <div
              className="backface-hidden"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: C.surface,
                borderRadius: 20,
                border: `1px solid ${C.border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: 24,
              }}
            >
              <PlayButton text={phrase.thai} size="lg" />
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: "0.02em",
                  textAlign: "center",
                }}
              >
                {phrase.thai}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.muted,
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                }}
              >
                {t({ he: "לחץ לגלות", en: "Tap to reveal" })}
              </div>
            </div>

            {/* back */}
            <div
              className="backface-hidden rotate-y-180"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: C.surfaceHigh,
                borderRadius: 20,
                border: `1px solid ${C.indigo}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: 24,
                direction: dir,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  color: C.indigoLight,
                  fontWeight: 700,
                  textAlign: "center",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                }}
              >
                {language === "he"
                  ? phrase.translationHe
                  : phrase.translationEn}
              </div>
              <div
                style={{ fontSize: 15, color: C.muted, textAlign: "center" }}
              >
                {phrase.transliteration}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: C.muted,
                  textAlign: "center",
                  fontFamily: "Noto Sans Hebrew, sans-serif",
                  marginTop: 4,
                }}
              >
                {language === "he" ? phrase.noteHe : phrase.noteEn}
              </div>
            </div>
          </motion.div>
        </div>

        {/* actions */}
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", gap: 10 }}
          >
            <button
              onClick={() => {
                speakThai(phrase.thai);
                setFlipped(false);
              }}
              style={{
                flex: 1,
                padding: "14px 0",
                borderRadius: 12,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                color: C.muted,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              <RotateCcw size={14} />
              {t({ he: "חזור", en: "Repeat" })}
            </button>
            <button
              onClick={handleNext}
              style={{
                flex: 2,
                padding: "14px 0",
                borderRadius: 12,
                backgroundColor: C.orange,
                border: "none",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              {isLast
                ? t({ he: "למבחן ←", en: "To Quiz →" })
                : t({ he: "הבנתי ←", en: "Got it →" })}
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Phase 3 — Quiz ───────────────────────────────────────────────────────────

function QuizPhase({
  lesson,
  hearts,
  onAnswer,
  onComplete,
}: {
  lesson: MockLesson;
  hearts: number;
  onAnswer: (correct: boolean) => void;
  onComplete: () => void;
}) {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const dir = language === "he" ? "rtl" : "ltr";
  const q = lesson.quiz[index];

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.correctIndex;
    onAnswer(correct);
    setTimeout(() => {
      if (index + 1 >= lesson.quiz.length) {
        onComplete();
      } else {
        setIndex(idx => idx + 1);
        setSelected(null);
        setAnswered(false);
      }
    }, 1200);
  };

  const optionColor = (i: number) => {
    if (!answered) return C.surface;
    if (i === q.correctIndex) return "oklch(22% 0.05 145)";
    if (i === selected) return "oklch(22% 0.05 27)";
    return C.surface;
  };

  const optionBorder = (i: number) => {
    if (!answered) return C.border;
    if (i === q.correctIndex) return C.green;
    if (i === selected) return C.red;
    return C.border;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        {...SLIDE}
        style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}
      >
        {/* progress */}
        <div style={{ display: "flex", gap: 6 }}>
          {lesson.quiz.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: i <= index ? C.orange : C.border,
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* prompt */}
        <div
          style={{ direction: dir, fontFamily: "Noto Sans Hebrew, sans-serif" }}
        >
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 10 }}>
            {language === "he" ? q.promptHe : q.promptEn}
          </div>

          {q.type === "complete" ? (
            <div
              style={{
                backgroundColor: C.surface,
                borderRadius: 14,
                padding: "20px 20px",
                border: `1px solid ${C.border}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  color: C.text,
                  letterSpacing: "0.03em",
                  marginBottom: 8,
                }}
              >
                {q.beforeThai}{" "}
                <span
                  style={{
                    color: C.orange,
                    borderBottom: `2px solid ${C.orange}`,
                  }}
                >
                  {q.missingThai}
                </span>{" "}
                {q.afterThai}
              </div>
              <div style={{ fontSize: 13, color: C.muted }}>
                {q.transliteration}
              </div>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: C.surface,
                borderRadius: 14,
                padding: "20px 24px",
                border: `1px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                direction: "ltr",
              }}
            >
              {q.type === "listen" && <PlayButton text={q.thai} size="md" />}
              <div>
                <div
                  style={{
                    fontSize: 30,
                    color: C.text,
                    letterSpacing: "0.02em",
                  }}
                >
                  {q.thai}
                </div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
                  {q.transliteration}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            direction: dir,
          }}
        >
          {q.options.map((opt, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileTap={answered ? {} : { scale: 0.98 }}
              style={{
                padding: "14px 18px",
                borderRadius: 12,
                backgroundColor: optionColor(i),
                border: `1.5px solid ${optionBorder(i)}`,
                color:
                  answered && (i === q.correctIndex || i === selected)
                    ? C.text
                    : C.text,
                fontSize: 15,
                cursor: answered ? "default" : "pointer",
                textAlign: language === "he" ? "right" : "left",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition:
                  "background-color 0.15s ease, border-color 0.15s ease",
                fontFamily: "Noto Sans Hebrew, sans-serif",
              }}
            >
              <span>{language === "he" ? opt.labelHe : opt.labelEn}</span>
              {answered && i === q.correctIndex && (
                <Check size={16} color={C.green} />
              )}
              {answered && i === selected && i !== q.correctIndex && (
                <X size={16} color={C.red} />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Score screen ─────────────────────────────────────────────────────────────

function ScoreScreen({
  xp,
  hearts,
  lesson,
}: {
  xp: number;
  hearts: number;
  lesson: MockLesson;
}) {
  const { t, language } = useLanguage();
  const [displayXp, setDisplayXp] = useState(0);
  const dir = language === "he" ? "rtl" : "ltr";

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(xp / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, xp);
      setDisplayXp(current);
      if (current >= xp) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [xp]);

  const stars = hearts === 3 ? 3 : hearts >= 1 ? 2 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        direction: dir,
      }}
    >
      {/* stars */}
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: i < stars ? 1 : 0.5 }}
            transition={{
              delay: 0.1 * i + 0.2,
              type: "spring",
              stiffness: 300,
            }}
            style={{
              fontSize: i < stars ? 40 : 32,
              opacity: i < stars ? 1 : 0.25,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      {/* headline */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "Noto Sans Hebrew, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: C.text,
            marginBottom: 6,
          }}
        >
          {hearts === 3
            ? t({ he: "מושלם! ✨", en: "Perfect! ✨" })
            : t({ he: "כל הכבוד! 🎉", en: "Great job! 🎉" })}
        </div>
        <div style={{ fontSize: 14, color: C.muted }}>
          {language === "he" ? lesson.titleHe : lesson.titleEn}
        </div>
      </div>

      {/* XP */}
      <motion.div
        style={{
          backgroundColor: C.surface,
          borderRadius: 20,
          padding: "24px 40px",
          border: `1px solid ${C.border}`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Zap size={28} fill={C.amber} color={C.amber} />
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: C.amber,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            +{displayXp}
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: C.muted,
            marginTop: 4,
            fontFamily: "Noto Sans Hebrew, sans-serif",
          }}
        >
          {t({ he: "XP הרווחתם", en: "XP earned" })}
          {hearts === 3 && (
            <span
              style={{
                color: C.orangeLight,
                marginRight: language === "he" ? 6 : 0,
                marginLeft: language === "en" ? 6 : 0,
              }}
            >
              {" "}
              · {t({ he: "בונוס מושלם! +10", en: "Perfect bonus! +10" })}
            </span>
          )}
        </div>
      </motion.div>

      {/* lives remaining */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "Noto Sans Hebrew, sans-serif",
        }}
      >
        <HeartsRow count={hearts} />
        <span style={{ fontSize: 13, color: C.muted }}>
          {t({ he: `נשארו ${hearts} לבבות`, en: `${hearts} hearts remaining` })}
        </span>
      </div>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        <Link href="/interactive-lessons">
          <button
            style={{
              width: "100%",
              padding: "16px 0",
              borderRadius: 14,
              backgroundColor: C.orange,
              border: "none",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {t({ he: "חזרה לקורס", en: "Back to Course" })}
          </button>
        </Link>
        <Link href="/lesson/street-food">
          <button
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 14,
              backgroundColor: "transparent",
              border: `1px solid ${C.border}`,
              color: C.muted,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {t({ he: "שיעור הבא ←", en: "Next Lesson →" })}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── labels ───────────────────────────────────────────────────────────────────

const PHASE_LABELS = {
  listen: { he: "הקשיבו", en: "Listen" },
  drill: { he: "תרגלו", en: "Drill" },
  quiz: { he: "מבחן קצר", en: "Quick Quiz" },
  score: { he: "תוצאות", en: "Results" },
} as const;

// ─── main page ────────────────────────────────────────────────────────────────

export default function LessonPlayer() {
  const [, params] = useRoute("/lesson/:id");
  const lessonId = params?.id ?? "airport-arrival";
  const lesson = LESSONS[lessonId] ?? LESSONS["airport-arrival"];

  const { t, language } = useLanguage();
  const dir = language === "he" ? "rtl" : "ltr";

  const [phase, setPhase] = useState<Phase>("listen");
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [shakeHearts, setShakeHearts] = useState(false);

  const handleListenComplete = () => {
    setXp(x => x + 10);
    setPhase("drill");
  };

  const handleDrillComplete = () => {
    setXp(x => x + 20);
    setPhase("quiz");
  };

  const handleQuizAnswer = (correct: boolean) => {
    if (!correct) {
      setHearts(h => Math.max(0, h - 1));
      setShakeHearts(true);
      setTimeout(() => setShakeHearts(false), 500);
    }
  };

  const handleQuizComplete = () => {
    const base = 30;
    const bonus = hearts === 3 ? 10 : 0;
    setXp(x => x + base + bonus);
    setPhase("score");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
      }}
    >
      {/* top bar */}
      <div
        style={{
          padding: "16px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          direction: dir,
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        <Link href="/interactive-lessons">
          <button
            style={{
              background: "none",
              border: "none",
              color: C.muted,
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowLeft
              size={20}
              style={{ transform: language === "he" ? "scaleX(-1)" : "none" }}
            />
          </button>
        </Link>

        {phase !== "score" && <PhaseBar phase={phase} />}

        {phase !== "score" && (
          <motion.div
            animate={shakeHearts ? { x: [0, -5, 5, -5, 0] } : {}}
            transition={{ duration: 0.35 }}
          >
            <HeartsRow count={hearts} />
          </motion.div>
        )}
      </div>

      {/* phase label */}
      {phase !== "score" && (
        <div
          style={{
            padding: "12px 20px 0",
            direction: dir,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 2,
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {language === "he" ? lesson.chapterHe : lesson.chapterEn}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: C.text,
              fontFamily: "Noto Sans Hebrew, sans-serif",
            }}
          >
            {PHASE_LABELS[phase][language]}
          </div>
        </div>
      )}

      {/* content */}
      <div
        style={{
          flex: 1,
          padding: "16px 20px 24px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AnimatePresence mode="wait">
          {phase === "listen" && (
            <motion.div
              key="listen"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <ListenPhase lesson={lesson} onComplete={handleListenComplete} />
            </motion.div>
          )}
          {phase === "drill" && (
            <motion.div
              key="drill"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <DrillPhase lesson={lesson} onComplete={handleDrillComplete} />
            </motion.div>
          )}
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <QuizPhase
                lesson={lesson}
                hearts={hearts}
                onAnswer={handleQuizAnswer}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}
          {phase === "score" && (
            <motion.div
              key="score"
              {...SLIDE}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <ScoreScreen xp={xp} hearts={hearts} lesson={lesson} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
