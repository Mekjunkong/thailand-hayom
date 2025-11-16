import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressData {
  completedLessons: number[];
  quizScores: { [lessonId: number]: number };
  lastVisited: string;
  streak: number;
  lastStreakDate: string;
}

interface ProgressContextType {
  progress: ProgressData;
  markLessonComplete: (lessonId: number) => void;
  saveQuizScore: (lessonId: number, score: number) => void;
  updateStreak: () => void;
  getCompletionPercentage: () => number;
  isLessonCompleted: (lessonId: number) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'thai_course_progress';

const defaultProgress: ProgressData = {
  completedLessons: [],
  quizScores: {},
  lastVisited: new Date().toISOString(),
  streak: 0,
  lastStreakDate: new Date().toISOString().split('T')[0]
};

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (lessonId: number) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        lastVisited: new Date().toISOString()
      };
    });
  };

  const saveQuizScore = (lessonId: number, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [lessonId]: score
      },
      lastVisited: new Date().toISOString()
    }));
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = progress.lastStreakDate;
    
    setProgress(prev => {
      if (lastDate === today) {
        return prev; // Already updated today
      }
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastDate === yesterdayStr) {
        // Continue streak
        return {
          ...prev,
          streak: prev.streak + 1,
          lastStreakDate: today,
          lastVisited: new Date().toISOString()
        };
      } else {
        // Reset streak
        return {
          ...prev,
          streak: 1,
          lastStreakDate: today,
          lastVisited: new Date().toISOString()
        };
      }
    });
  };

  const getCompletionPercentage = () => {
    const totalLessons = 10;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  const isLessonCompleted = (lessonId: number) => {
    return progress.completedLessons.includes(lessonId);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      markLessonComplete,
      saveQuizScore,
      updateStreak,
      getCompletionPercentage,
      isLessonCompleted
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
