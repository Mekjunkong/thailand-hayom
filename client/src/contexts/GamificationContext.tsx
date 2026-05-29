import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// ─── types ────────────────────────────────────────────────────────────────────

interface GamificationState {
  streak: number;
  xp: number;
  gems: number;
  lastPracticeDate: string | null; // ISO date "YYYY-MM-DD"
  weeklyActivity: boolean[]; // index 0=Mon … 6=Sun for the current ISO week
  frozenUntil: string | null; // ISO date — streak freeze active until this day
  weeklyXp: number; // XP earned this ISO week (for leaderboard)
}

interface GamificationContextType extends GamificationState {
  recordPractice: (earnedXp: number) => void;
  spendGemForFreeze: () => boolean;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoWeekKey(dateStr: string): string {
  const d = new Date(dateStr);
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const weekNum = Math.ceil(
    ((d.getTime() - jan4.getTime()) / 86400000 + jan4.getDay() + 1) / 7,
  );
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

function dayOfWeekIndex(dateStr: string): number {
  // 0=Mon … 6=Sun (ISO weekday)
  const dow = new Date(dateStr).getDay();
  return dow === 0 ? 6 : dow - 1;
}

function daysBetween(a: string, b: string): number {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / 86400000,
  );
}

const GEM_PER_XP = 100; // earn 1 gem every 100 XP

const STORAGE_KEY = "th_gamification_v1";

const DEFAULT_STATE: GamificationState = {
  streak: 0,
  xp: 0,
  gems: 0,
  lastPracticeDate: null,
  weeklyActivity: [false, false, false, false, false, false, false],
  frozenUntil: null,
  weeklyXp: 0,
};

function loadState(): GamificationState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(s: GamificationState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

// ─── context ──────────────────────────────────────────────────────────────────

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined,
);

export function GamificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<GamificationState>(() => {
    const loaded = loadState();
    return reconcileStreak(loaded);
  });

  // Re-check streak on mount (handles overnight visits)
  useEffect(() => {
    setState(s => reconcileStreak(s));
  }, []);

  // Persist on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const recordPractice = useCallback((earnedXp: number) => {
    const today = todayISO();
    setState(prev => {
      const newXp = prev.xp + earnedXp;
      const prevGems = prev.gems;
      const gemsEarned =
        Math.floor(newXp / GEM_PER_XP) - Math.floor(prev.xp / GEM_PER_XP);
      const newGems = prevGems + gemsEarned;

      // streak
      let newStreak = prev.streak;
      if (prev.lastPracticeDate !== today) {
        newStreak = prev.streak + 1;
      }

      // weekly activity
      const currentWeek = isoWeekKey(today);
      const prevWeek = prev.lastPracticeDate
        ? isoWeekKey(prev.lastPracticeDate)
        : null;
      const activity =
        prevWeek === currentWeek
          ? [...prev.weeklyActivity]
          : [false, false, false, false, false, false, false];
      activity[dayOfWeekIndex(today)] = true;

      // weekly XP — reset if new week
      const weeklyXp =
        prevWeek === currentWeek ? prev.weeklyXp + earnedXp : earnedXp;

      return {
        ...prev,
        xp: newXp,
        gems: newGems,
        streak: newStreak,
        lastPracticeDate: today,
        weeklyActivity: activity as boolean[],
        weeklyXp,
      };
    });
  }, []);

  const spendGemForFreeze = useCallback((): boolean => {
    let success = false;
    setState(prev => {
      if (prev.gems < 1) return prev;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      success = true;
      return {
        ...prev,
        gems: prev.gems - 1,
        frozenUntil: tomorrow.toISOString().slice(0, 10),
      };
    });
    return success;
  }, []);

  return (
    <GamificationContext.Provider value={{ ...state, recordPractice, spendGemForFreeze }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
}

// ─── streak reconciliation (called on load / mount) ───────────────────────────

function reconcileStreak(state: GamificationState): GamificationState {
  const today = todayISO();
  const last = state.lastPracticeDate;
  if (!last) return state;

  const diff = daysBetween(last, today);
  if (diff === 0) return state; // practiced today — fine

  // Miss of exactly 1 day — check freeze
  if (diff === 1) {
    if (state.frozenUntil && state.frozenUntil >= today) {
      // streak protected; consume freeze
      return { ...state, frozenUntil: null };
    }
  }

  if (diff >= 2 || (diff === 1 && !state.frozenUntil)) {
    // streak broken
    return { ...state, streak: 0, frozenUntil: null };
  }

  return state;
}
