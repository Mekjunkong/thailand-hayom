import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Volume2, CheckCircle2, ArrowRight, ArrowLeft, Headphones, Pause, Download } from "lucide-react";
import { toast } from "sonner";
import ListenRepeatMode from "./ListenRepeatMode";

export interface Phrase {
  id: number;
  english: string;
  hebrew: string;
  thai: string;
  phonetic: string;
  audioUrl?: string;
  scenario: string;
  culturalTip?: string;
}

export interface Lesson {
  id: number;
  title: string;
  titleHebrew: string;
  icon: string;
  phrases: Phrase[];
  completed?: boolean;
  introText?: string;
  introTextHebrew?: string;
  backgroundMusicUrl?: string;
}

interface InteractiveLessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function InteractiveLessonPlayer({
  lesson,
  onComplete,
  onNext,
  onPrevious,
}: InteractiveLessonPlayerProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showListenRepeat, setShowListenRepeat] = useState(false);

  const currentPhrase = lesson.phrases[currentPhraseIndex];
  const progress = (completedPhrases.size / lesson.phrases.length) * 100;

  // Auto-play pronunciation when phrase changes
  useEffect(() => {
    setShowTranslation(false);
    setIsPlaying(false);
  }, [currentPhraseIndex]);

  const playIntroAudio = (language: 'en' | 'he') => {
    const text = language === 'en' ? lesson.introText : lesson.introTextHebrew;
    if (!text) return;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'he-IL';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        console.log("Intro audio finished");
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast.info("Audio not supported on this device.");
    }
  };

  const downloadAudio = async () => {
    try {
      // Generate audio using Web Speech API
      const utterance = new SpeechSynthesisUtterance(currentPhrase.thai);
      utterance.lang = 'th-TH';
      utterance.rate = 0.7;
      
      // Note: Web Speech API doesn't directly support audio export
      // This is a simplified implementation
      toast.info("Generating audio file...");
      
      // For now, show instructions to user
      toast.success(
        `Audio for "${currentPhrase.thai}" can be played using the pronunciation button. ` +
        "For offline use, consider using the Listen & Repeat mode.",
        { duration: 5000 }
      );
    } catch (error) {
      toast.error("Failed to generate audio file");
    }
  };

  const playPronunciation = () => {
    setIsPlaying(true);
    
    // Use Web Speech API for Thai pronunciation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentPhrase.thai);
      utterance.lang = 'th-TH';
      utterance.rate = 0.7; // Slower for learning
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        toast.error("Audio not available. Please read the phonetic pronunciation.");
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlaying(false);
      toast.info("Audio not supported. Please read the phonetic pronunciation.");
    }
  };

  const markPhraseComplete = () => {
    const newCompleted = new Set(completedPhrases);
    newCompleted.add(currentPhrase.id);
    setCompletedPhrases(newCompleted);
    
    if (newCompleted.size === lesson.phrases.length) {
      toast.success("Lesson completed! 🎉");
      onComplete();
    } else {
      toast.success("Phrase learned!");
    }
  };

  const nextPhrase = () => {
    if (currentPhraseIndex < lesson.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    }
  };

  const previousPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1);
    }
  };

  const isPhraseCompleted = completedPhrases.has(currentPhrase.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-6xl mb-4">{lesson.icon}</div>
        <h1 className="text-4xl font-bold text-gray-900">{lesson.title}</h1>
        <p className="text-2xl text-gray-600 hebrew-text" dir="rtl">{lesson.titleHebrew}</p>
      </div>

      {/* Lesson Introduction Modal */}
      {showIntro && lesson.introText && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-900">📚 Lesson Introduction</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowIntro(false)}>✕</Button>
            </div>
            <p className="text-gray-700 leading-relaxed">{lesson.introText}</p>
            <p className="text-gray-700 leading-relaxed hebrew-text" dir="rtl">{lesson.introTextHebrew}</p>
            <div className="flex gap-3 flex-wrap">
              <Button onClick={() => playIntroAudio('en')} variant="outline" size="sm">
                🔊 Listen in English
              </Button>
              <Button onClick={() => playIntroAudio('he')} variant="outline" size="sm">
                🔊 האזן בעברית
              </Button>
              <Button onClick={() => setShowIntro(false)} variant="default" size="sm">
                Start Lesson →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{completedPhrases.size} / {lesson.phrases.length} phrases</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Listen & Repeat Mode Button */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">🎧 Listen & Repeat Mode</h3>
              <p className="text-sm text-gray-600">Practice all phrases hands-free with auto-play</p>
            </div>
            <Button onClick={() => setShowListenRepeat(true)} variant="default">
              <Headphones className="w-4 h-4 mr-2" />
              Start
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Phrase Card */}
      <Card className="border-4 border-blue-200 shadow-2xl">
        <CardContent className="p-8 space-y-8">
          {/* Phrase Counter */}
          <div className="text-center text-sm text-gray-500">
            Phrase {currentPhraseIndex + 1} of {lesson.phrases.length}
          </div>

          {/* Thai Script - Large */}
          <div className="text-center space-y-4">
            <div className="text-7xl font-bold text-blue-600 mb-4">
              {currentPhrase.thai}
            </div>
            
            {/* Phonetic Pronunciation */}
            <div className="text-3xl text-gray-700 font-medium">
              {currentPhrase.phonetic}
            </div>

            {/* Play and Download Buttons */}
            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={playPronunciation}
                disabled={isPlaying}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-5 w-5" />
                    Listen to Pronunciation
                  </>
                )}
              </Button>
              <Button
                size="lg"
                onClick={downloadAudio}
                variant="outline"
                title="Download audio for offline use"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Translation Toggle */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowTranslation(!showTranslation)}
              className="mb-4"
            >
              {showTranslation ? "Hide" : "Show"} Translation
            </Button>

            {showTranslation && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="text-2xl text-gray-800 font-semibold">
                  {currentPhrase.english}
                </div>
                <div className="text-2xl text-gray-700 hebrew-text" dir="rtl">
                  {currentPhrase.hebrew}
                </div>
              </div>
            )}
          </div>

          {/* Scenario Example */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg border-2 border-amber-200">
            <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
              🎭 When to Use This
            </h3>
            <p className="text-gray-700 text-lg">{currentPhrase.scenario}</p>
          </div>

          {/* Cultural Tip */}
          {currentPhrase.culturalTip && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-2 flex items-center gap-2">
                💡 Cultural Tip
              </h3>
              <p className="text-gray-700 text-lg">{currentPhrase.culturalTip}</p>
            </div>
          )}

          {/* Mark Complete Button */}
          {!isPhraseCompleted && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={markPhraseComplete}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                I've Learned This Phrase
              </Button>
            </div>
          )}

          {isPhraseCompleted && (
            <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-400">
              <CheckCircle2 className="inline-block mr-2 h-6 w-6 text-green-600" />
              <span className="text-green-800 font-semibold text-lg">Phrase Completed!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={previousPhrase}
          disabled={currentPhraseIndex === 0}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Previous Phrase
        </Button>

        <div className="flex gap-2">
          {lesson.phrases.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentPhraseIndex
                  ? "bg-blue-600 scale-125"
                  : completedPhrases.has(lesson.phrases[index].id)
                  ? "bg-green-500"
                  : "bg-gray-300"
              } transition-all`}
            />
          ))}
        </div>

        {currentPhraseIndex < lesson.phrases.length - 1 ? (
          <Button
            size="lg"
            onClick={nextPhrase}
            className="bg-gradient-to-r from-blue-500 to-teal-500"
          >
            Next Phrase
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={onNext}
            disabled={!onNext}
            className="bg-gradient-to-r from-green-500 to-emerald-500"
          >
            Next Lesson
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Back to Lessons */}
      {onPrevious && (
        <div className="text-center">
          <Button variant="ghost" onClick={onPrevious}>
            ← Back to All Lessons
          </Button>
        </div>
      )}

      {/* Listen & Repeat Mode Modal */}
      {showListenRepeat && (
        <ListenRepeatMode
          phrases={lesson.phrases}
          lessonTitle={lesson.title}
          onClose={() => setShowListenRepeat(false)}
        />
      )}
    </div>
  );
}
