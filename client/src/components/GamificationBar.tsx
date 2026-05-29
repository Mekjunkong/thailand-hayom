import { Link } from "wouter";
import { useGamification } from "@/contexts/GamificationContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GamificationBar() {
  const { streak, xp, gems } = useGamification();
  const { language } = useLanguage();
  const dir = language === "he" ? "rtl" : "ltr";

  // Don't show to visitors who haven't started any lessons yet
  if (streak === 0 && xp === 0 && gems === 0) return null;

  return (
    <div
      dir={dir}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Link href="/progress">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            borderRadius: 20,
            background: "none",
            border: "1px solid oklch(88% 0.01 264)",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "oklch(94% 0.01 264)")
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLButtonElement).style.background = "none")
          }
        >
          <span style={{ fontSize: 15 }}>🔥</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: streak > 0 ? "oklch(55% 0.22 40)" : "oklch(55% 0.01 264)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {streak}
          </span>
        </button>
      </Link>

      <Link href="/progress">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            borderRadius: 20,
            background: "none",
            border: "1px solid oklch(88% 0.01 264)",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "oklch(94% 0.01 264)")
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLButtonElement).style.background = "none")
          }
        >
          <span style={{ fontSize: 15 }}>⚡</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "oklch(52% 0.22 75)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {xp.toLocaleString()}
          </span>
        </button>
      </Link>

      <Link href="/progress">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            borderRadius: 20,
            background: "none",
            border: "1px solid oklch(88% 0.01 264)",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "oklch(94% 0.01 264)")
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLButtonElement).style.background = "none")
          }
        >
          <span style={{ fontSize: 15 }}>💎</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "oklch(50% 0.2 230)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {gems}
          </span>
        </button>
      </Link>
    </div>
  );
}
