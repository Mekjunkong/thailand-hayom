import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, SkipForward, SkipBack, X } from "lucide-react";
import { Phrase } from "./InteractiveLessonPlayer";
import { toast } from "sonner";

interface ListenRepeatModeProps {
  phrases: Phrase[];
  lessonTitle: string;
  onClose: () => void;
}

export default function ListenRepeatMode({ phrases, lessonTitle, onClose }: ListenRepeatModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(3); // seconds
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentPhrase = phrases[currentIndex];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakPhrase = (phrase: Phrase, onComplete: () => void) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.thai);
      utterance.lang = 'th-TH';
      utterance.rate = 0.7;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        onComplete();
      };
      
      utterance.onerror = () => {
        console.error("Speech synthesis error");
        onComplete();
      };
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Audio not supported on this device");
      onComplete();
    }
  };

  const playNext = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all phrases
      setIsPlaying(false);
      toast.success("🎉 Completed all phrases!");
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(false);
      window.speechSynthesis.cancel();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  const startPlaylist = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pausePlaylist = () => {
    setIsPaused(true);
    setIsPlaying(false);
    window.speechSynthesis.cancel();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resumePlaylist = () => {
    setIsPaused(false);
    setIsPlaying(true);
  };

  // Auto-play logic
  useEffect(() => {
    if (isPlaying && !isPaused) {
      // Speak current phrase
      speakPhrase(currentPhrase, () => {
        // After speaking, wait for pause duration
        timeoutRef.current = setTimeout(() => {
          playNext();
        }, pauseDuration * 1000);
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, isPaused, currentIndex]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">🎧 Listen & Repeat Mode</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{lessonTitle}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Phrase Display */}
          <div className="text-center space-y-4 p-6 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">
              Phrase {currentIndex + 1} of {phrases.length}
            </div>
            <div className="text-5xl font-bold text-blue-600">
              {currentPhrase.thai}
            </div>
            <div className="text-2xl text-gray-700">
              {currentPhrase.phonetic}
            </div>
            <div className="text-lg text-gray-600">
              {currentPhrase.english}
            </div>
            <div className="text-lg text-gray-600 hebrew-text" dir="rtl">
              {currentPhrase.hebrew}
            </div>
          </div>

          {/* Pause Duration Control */}
          <div className="flex items-center justify-center gap-4">
            <label className="text-sm text-gray-600">Pause between phrases:</label>
            <select
              value={pauseDuration}
              onChange={(e) => setPauseDuration(Number(e.target.value))}
              className="border rounded px-3 py-1"
              disabled={isPlaying}
            >
              <option value={2}>2 seconds</option>
              <option value={3}>3 seconds</option>
              <option value={4}>4 seconds</option>
              <option value={5}>5 seconds</option>
            </select>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={playPrevious}
              disabled={currentIndex === 0 || isPlaying}
              variant="outline"
              size="lg"
            >
              <SkipBack className="w-5 h-5" />
            </Button>

            {!isPlaying ? (
              <Button
                onClick={isPaused ? resumePlaylist : startPlaylist}
                size="lg"
                className="px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                {isPaused ? "Resume" : "Start"}
              </Button>
            ) : (
              <Button
                onClick={pausePlaylist}
                size="lg"
                variant="secondary"
                className="px-8"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            )}

            <Button
              onClick={() => {
                if (currentIndex < phrases.length - 1) {
                  window.speechSynthesis.cancel();
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setCurrentIndex(currentIndex + 1);
                  setIsPlaying(false);
                }
              }}
              disabled={currentIndex === phrases.length - 1 || isPlaying}
              variant="outline"
              size="lg"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{currentIndex + 1} / {phrases.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / phrases.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="text-sm text-gray-600 text-center space-y-1">
            <p>🎯 Listen to each phrase, then repeat it out loud during the pause</p>
            <p>💡 Perfect for hands-free practice while commuting or exercising</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
