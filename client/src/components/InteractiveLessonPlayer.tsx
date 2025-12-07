import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Volume2, CheckCircle2, ArrowRight, ArrowLeft, Play, Pause, MessageSquare, BookOpen, CheckSquare } from "lucide-react";
import { toast } from "sonner";

export interface Phrase {
  id: number;
  english: string;
  hebrew: string;
  thai: string;
  phonetic: string;
  audioUrl?: string;
  scenario: string;
  culturalTip?: string;
  usageTip?: string;
}

export interface DialogueLine {
  speaker: string;
  speakerHebrew: string;
  thai: string;
  phonetic: string;
  hebrew: string;
}

export interface Exercise {
  id: number;
  question: string;
  questionHebrew: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationHebrew: string;
}

export interface Lesson {
  id: number;
  title: string;
  titleHebrew: string;
  icon: string;
  phrases: Phrase[];
  dialogue?: DialogueLine[];
  exercises?: Exercise[];
  completed?: boolean;
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
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'phrases' | 'dialogue' | 'exercises'>('phrases');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const currentPhrase = lesson.phrases[currentPhraseIndex];
  const progress = (completedPhrases.size / lesson.phrases.length) * 100;

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    // Voices might already be loaded
    loadVoices();

    // Or they might load asynchronously
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Auto-play pronunciation when phrase changes
  useEffect(() => {
    setShowTranslation(false);
    setIsPlaying(false);
  }, [currentPhraseIndex]);

  const playPronunciation = () => {
    setIsPlaying(true);
    
    // Use Web Speech API for Thai pronunciation
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(currentPhrase.thai);
      
      // Try to find a Thai voice
      const voices = window.speechSynthesis.getVoices();
      const thaiVoice = voices.find(v => v.lang.startsWith('th'));
      
      if (thaiVoice) {
        utterance.voice = thaiVoice;
        utterance.lang = 'th-TH';
      } else {
        // Fallback: use default voice with Thai language setting
        utterance.lang = 'th-TH';
        console.log('No Thai voice found, using default with th-TH lang');
      }
      
      utterance.rate = 0.7; // Slower for learning
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => {
        console.log('Speech started');
      };
      
      utterance.onend = () => {
        console.log('Speech ended');
        setIsPlaying(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        setIsPlaying(false);
        toast.error("Audio playback failed. Please read the phonetic pronunciation: " + currentPhrase.phonetic);
      };
      
      try {
        window.speechSynthesis.speak(utterance);
        toast.success("🔊 Playing pronunciation...");
      } catch (error) {
        console.error('Speech synthesis error:', error);
        setIsPlaying(false);
        toast.error("Audio not available. Please read: " + currentPhrase.phonetic);
      }
    } else {
      setIsPlaying(false);
      toast.info("Audio not supported in this browser. Please read: " + currentPhrase.phonetic);
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

      {/* Tabs */}
      <div className="flex gap-2 justify-center">
        <Button
          variant={activeTab === 'phrases' ? 'default' : 'outline'}
          onClick={() => setActiveTab('phrases')}
          className="flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Phrases
        </Button>
        {lesson.dialogue && lesson.dialogue.length > 0 && (
          <Button
            variant={activeTab === 'dialogue' ? 'default' : 'outline'}
            onClick={() => setActiveTab('dialogue')}
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Dialogue
          </Button>
        )}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <Button
            variant={activeTab === 'exercises' ? 'default' : 'outline'}
            onClick={() => setActiveTab('exercises')}
            className="flex items-center gap-2"
          >
            <CheckSquare className="w-4 h-4" />
            Exercises
          </Button>
        )}
      </div>

      {/* Main Content Card */}
      <Card className="border-4 border-blue-200 shadow-2xl">
        <CardContent className="p-8 space-y-8">
          {activeTab === 'phrases' && (
            <>
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

            {/* Play Button */}
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

              {/* Simple instruction */}
              <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-blue-900 text-lg">🎯 Listen and repeat until you feel confident with the pronunciation</p>
              </div>
            </>
          )}

          {activeTab === 'dialogue' && lesson.dialogue && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">💬 Practice Dialogue</h2>
              {lesson.dialogue.map((line, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                  <div className="font-bold text-blue-900 mb-2">
                    {line.speaker} ({line.speakerHebrew})
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{line.thai}</div>
                  <div className="text-xl italic text-gray-600 mb-2">{line.phonetic}</div>
                  <div className="text-lg text-gray-700">{line.hebrew}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exercises' && lesson.exercises && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">📝 Practice Exercises</h2>
              {lesson.exercises.map((exercise) => (
                <div key={exercise.id} className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <div className="mb-4">
                    <div className="text-xl font-bold text-gray-900 mb-2">{exercise.question}</div>
                    <div className="text-lg text-blue-600" dir="rtl">{exercise.questionHebrew}</div>
                  </div>
                  <div className="space-y-2">
                    {exercise.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [exercise.id]: optIndex })}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswers[exercise.id] === optIndex
                            ? optIndex === exercise.correctAnswer
                              ? 'bg-green-100 border-green-500 text-green-900'
                              : 'bg-red-100 border-red-500 text-red-900'
                            : 'bg-white border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {selectedAnswers[exercise.id] !== undefined && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-900 mb-1">Explanation:</div>
                      <div className="text-gray-700">{exercise.explanation}</div>
                      <div className="text-blue-600 mt-1" dir="rtl">{exercise.explanationHebrew}</div>
                    </div>
                  )}
                </div>
              ))}
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

        <div className="flex gap-2 items-center">
          {lesson.phrases.map((_, index) => {
            const isActive = index === currentPhraseIndex;
            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  isActive ? "bg-blue-600 scale-125" : "bg-gray-300"
                }`}
              />
            );
          })}
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
    </div>
  );
}
