import { useState } from "react";
import { Link } from "wouter";
import { useGamification } from "@/contexts/GamificationContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
  gold: "oklch(72% 0.15 85)",
  goldLight: "oklch(95% 0.05 85)",
};

// ─── mock leaderboard ─────────────────────────────────────────────────────────
const MOCK_PLAYERS = [
  { name: "Noa", xp: 940 },
  { name: "Lior", xp: 820 },
  { name: "Yael", xp: 760 },
  { name: "Eitan", xp: 680 },
  { name: "Maya", xp: 570 },
  { name: "Avi", xp: 490 },
  { name: "Shira", xp: 410 },
  { name: "Dan", xp: 310 },
  { name: "Tal", xp: 210 },
  { name: "Ron", xp: 150 },
];

const MEDAL: Record<number, string> = { 0: "🥇", 1: "🥈", 2: "🥉" };

// ─── week helpers ─────────────────────────────────────────────────────────────
const DAY_LABELS_HE = ["ב", "ג", "ד", "ה", "ו", "ש", "א"];
const DAY_LABELS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function todayDayIndex(): number {
  const dow = new Date().getDay();
  return dow === 0 ? 6 : dow - 1;
}

// ─── sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon,
  value,
  label,
  accent,
  accentLight,
}: {
  icon: string;
  value: string;
  label: string;
  accent: string;
  accentLight: string;
}) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1.5px solid ${C.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: accentLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: accent,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

function WeeklyCalendar({
  activity,
  language,
}: {
  activity: boolean[];
  language: string;
}) {
  const todayIdx = todayDayIndex();
  const labels = language === "he" ? DAY_LABELS_HE : DAY_LABELS_EN;

  return (
    <div
      style={{
        background: C.surface,
        border: `1.5px solid ${C.border}`,
        borderRadius: 16,
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: C.muted,
          marginBottom: 14,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {language === "he" ? "פעילות שבועית" : "Weekly Activity"}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
        }}
      >
        {activity.map((active, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: active ? C.orangeLight : "oklch(94% 0.005 264)",
                border: i === todayIdx ? `2px solid ${C.orange}` : `2px solid transparent`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                transition: "background 0.15s",
              }}
            >
              {active ? "🔥" : ""}
            </div>
            <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardSection({
  weeklyXp,
  language,
}: {
  weeklyXp: number;
  language: string;
}) {
  const meEntry = { name: language === "he" ? "אתם" : "You", xp: weeklyXp };
  const combined = [...MOCK_PLAYERS, meEntry]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10);
  const meRank = combined.findIndex(p => p.name === meEntry.name);

  return (
    <div
      style={{
        background: C.surface,
        border: `1.5px solid ${C.border}`,
        borderRadius: 16,
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: C.muted,
          marginBottom: 14,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {language === "he" ? "טבלת דירוג שבועית" : "Weekly Leaderboard"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {combined.map((player, i) => {
          const isMe = i === meRank;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: isMe ? C.indigoLight : "transparent",
                border: isMe ? `1.5px solid ${C.indigo}` : `1.5px solid transparent`,
              }}
            >
              <span
                style={{
                  fontSize: i < 3 ? 20 : 13,
                  fontWeight: 700,
                  color: C.muted,
                  width: 28,
                  textAlign: "center",
                }}
              >
                {i < 3 ? MEDAL[i] : `${i + 1}`}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: isMe ? 700 : 500,
                  color: isMe ? C.indigo : C.text,
                }}
              >
                {player.name}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.muted,
                  fontVariantNumeric: "tabular-nums",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                ⚡ {player.xp.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface FreezeModalProps {
  gems: number;
  onFreeze: () => void;
  onClose: () => void;
  language: string;
}

function FreezeModal({ gems, onFreeze, onClose, language }: FreezeModalProps) {
  const he = language === "he";
  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "oklch(0% 0 0 / 0.4)",
          zIndex: 100,
        }}
      />
      {/* sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: C.surface,
          borderRadius: "20px 20px 0 0",
          padding: "28px 24px 40px",
          zIndex: 101,
          maxWidth: 480,
          margin: "0 auto",
          boxShadow: "0 -8px 40px oklch(0% 0 0 / 0.15)",
        }}
        dir={he ? "rtl" : "ltr"}
      >
        {/* handle */}
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            background: C.border,
            margin: "0 auto 24px",
          }}
        />
        <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>🛡️</div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.text,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {he ? "הגן על הרצף שלך" : "Protect Your Streak"}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: C.muted,
            textAlign: "center",
            marginBottom: 28,
            lineHeight: 1.6,
          }}
        >
          {he
            ? "הוצא 💎 1 אבן יקרה כדי להגן על הרצף שלך ליום אחד שלא תלמד."
            : "Spend 1 💎 gem to protect your streak for one missed day."}
        </p>
        <div
          style={{
            background: C.goldLight,
            border: `1.5px solid ${C.gold}`,
            borderRadius: 12,
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
            {he ? "יתרת אבנים" : "Gem balance"}
          </span>
          <span style={{ fontSize: 20, fontWeight: 800, color: C.gold }}>
            💎 {gems}
          </span>
        </div>
        <button
          onClick={gems >= 1 ? onFreeze : undefined}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 12,
            background: gems >= 1 ? C.indigo : C.border,
            color: gems >= 1 ? "white" : C.muted,
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: gems >= 1 ? "pointer" : "not-allowed",
            marginBottom: 12,
          }}
        >
          {gems >= 1
            ? he
              ? "הוצא 💎 1 — הגן על הרצף"
              : "Spend 💎 1 — Protect streak"
            : he
              ? "אין מספיק אבנים"
              : "Not enough gems"}
        </button>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 12,
            background: "transparent",
            color: C.muted,
            fontSize: 14,
            fontWeight: 600,
            border: `1.5px solid ${C.border}`,
            cursor: "pointer",
          }}
        >
          {he ? "ביטול" : "Cancel"}
        </button>
      </div>
    </>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function Progress() {
  const { streak, xp, gems, weeklyActivity, weeklyXp, spendGemForFreeze } =
    useGamification();
  const { language, t } = useLanguage();
  const [freezeOpen, setFreezeOpen] = useState(false);
  const he = language === "he";

  const handleFreeze = () => {
    spendGemForFreeze();
    setFreezeOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        paddingTop: 80,
        paddingBottom: 60,
      }}
      dir={he ? "rtl" : "ltr"}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 4 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: C.text,
              marginBottom: 4,
            }}
          >
            {t({ he: "ההתקדמות שלי", en: "My Progress" })}
          </h1>
          <p style={{ fontSize: 14, color: C.muted }}>
            {t({ he: "מסע הלמידה שלך", en: "Your learning journey" })}
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <StatCard
            icon="🔥"
            value={String(streak)}
            label={t({ he: "רצף ימים", en: "Day streak" })}
            accent={C.orange}
            accentLight={C.orangeLight}
          />
          <StatCard
            icon="⚡"
            value={xp.toLocaleString()}
            label={t({ he: "ניקוד XP", en: "Total XP" })}
            accent="oklch(52% 0.22 75)"
            accentLight="oklch(95% 0.06 75)"
          />
          <StatCard
            icon="💎"
            value={String(gems)}
            label={t({ he: "אבנים יקרות", en: "Gems" })}
            accent={C.indigo}
            accentLight={C.indigoLight}
          />
        </div>

        {/* Streak freeze CTA */}
        {streak > 0 && (
          <button
            onClick={() => setFreezeOpen(true)}
            style={{
              background: C.surface,
              border: `1.5px solid ${C.border}`,
              borderRadius: 12,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              textAlign: he ? "right" : "left",
              width: "100%",
            }}
          >
            <span style={{ fontSize: 24 }}>🛡️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                {t({ he: "הגן על הרצף", en: "Protect your streak" })}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>
                {t({ he: "הוצא אבן יקרה כדי לשמור על הרצף", en: "Spend a gem to keep your streak safe" })}
              </div>
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.gold,
                background: C.goldLight,
                borderRadius: 20,
                padding: "4px 10px",
              }}
            >
              💎 {gems}
            </span>
          </button>
        )}

        {/* Weekly calendar */}
        <WeeklyCalendar activity={weeklyActivity} language={language} />

        {/* Leaderboard */}
        <LeaderboardSection weeklyXp={weeklyXp} language={language} />

        {/* CTA */}
        <Link href="/lesson/airport-arrival">
          <button
            style={{
              width: "100%",
              padding: "16px 0",
              borderRadius: 14,
              background: C.orange,
              color: "white",
              fontSize: 16,
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            {t({ he: "המשך שיעור ✈️", en: "Continue lesson ✈️" })}
          </button>
        </Link>
      </div>

      {/* Freeze modal */}
      {freezeOpen && (
        <FreezeModal
          gems={gems}
          onFreeze={handleFreeze}
          onClose={() => setFreezeOpen(false)}
          language={language}
        />
      )}
    </div>
  );
}
