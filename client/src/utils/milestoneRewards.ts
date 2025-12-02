import { toast } from "sonner";

export interface Milestone {
  id: string;
  threshold: number;
  type: 'lessons' | 'phrases';
  message: string;
  thaiMessage: string;
  thaiPhonetic: string;
}

export const milestones: Milestone[] = [
  {
    id: 'first_lesson',
    threshold: 1,
    type: 'lessons',
    message: 'Congratulations! You completed your first lesson!',
    thaiMessage: 'ยินดีด้วย',
    thaiPhonetic: 'yin-dee duay'
  },
  {
    id: 'five_lessons',
    threshold: 5,
    type: 'lessons',
    message: 'Amazing! You\'ve completed 5 lessons!',
    thaiMessage: 'เก่งมาก',
    thaiPhonetic: 'geng maak'
  },
  {
    id: 'all_lessons',
    threshold: 10,
    type: 'lessons',
    message: 'Incredible! You completed all 10 lessons!',
    thaiMessage: 'สุดยอด',
    thaiPhonetic: 'soot yot'
  },
  {
    id: 'ten_phrases',
    threshold: 10,
    type: 'phrases',
    message: 'Great progress! 10 phrases mastered!',
    thaiMessage: 'เยี่ยมมาก',
    thaiPhonetic: 'yiam maak'
  },
  {
    id: 'twentyfive_phrases',
    threshold: 25,
    type: 'phrases',
    message: 'Excellent! You\'ve learned 25 phrases!',
    thaiMessage: 'ดีเยี่ยม',
    thaiPhonetic: 'dee yiam'
  },
  {
    id: 'all_phrases',
    threshold: 50,
    type: 'phrases',
    message: 'Outstanding! All 50 phrases completed!',
    thaiMessage: 'ยอดเยี่ยม',
    thaiPhonetic: 'yot yiam'
  }
];

function playThaiAudio(text: string, onComplete?: () => void) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 0.8;
    utterance.pitch = 1.1; // Slightly higher pitch for celebration
    
    if (onComplete) {
      utterance.onend = onComplete;
    }
    
    window.speechSynthesis.speak(utterance);
  }
}

export function checkMilestone(
  completedCount: number,
  type: 'lessons' | 'phrases',
  achievedMilestones: Set<string>
): Milestone | null {
  const milestone = milestones.find(
    m => m.type === type && m.threshold === completedCount && !achievedMilestones.has(m.id)
  );
  
  if (milestone) {
    // Play celebration audio
    playThaiAudio(milestone.thaiMessage, () => {
      // Show toast after audio
      const message = `${milestone.message}\n\n${milestone.thaiMessage} (${milestone.thaiPhonetic})`;
      toast.success(message, {
        duration: 6000,
      });
    });
    
    return milestone;
  }
  
  return null;
}

// LocalStorage keys for milestone tracking
const MILESTONES_KEY = 'thai_course_achieved_milestones';

export function getAchievedMilestones(): Set<string> {
  try {
    const stored = localStorage.getItem(MILESTONES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

export function saveAchievedMilestone(milestoneId: string) {
  try {
    const achieved = getAchievedMilestones();
    achieved.add(milestoneId);
    localStorage.setItem(MILESTONES_KEY, JSON.stringify(Array.from(achieved)));
  } catch (error) {
    console.error('Failed to save milestone:', error);
  }
}
