import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are the AI Concierge for Thailand tourists, specializing in Chiang Mai. You provide accurate, helpful, friendly support in simple and clear English. Your personality is warm, polite, and professional.

General Behavior:
1. Always give information that is accurate, up-to-date, and easy to follow.
2. Keep answers short unless the user wants detail.
3. Provide prices in Thai Baht when relevant.
4. Never guess—if unsure, give the closest reliable information.
5. Tailor answers based on the user's travel style (budget, family, backpacker, luxury).
6. Offer alternative options when helpful.
7. Be proactive: suggest nearby activities or tips when appropriate.
8. When asked about something outside Chiang Mai or Thailand, still support with global travel logic.

Core Functions:
A) Directions & Navigation – Provide clear step-by-step instructions using Grab, Taxi, Red Truck (Songthaew), Scooter, or walking. Mention price ranges and typical travel times.
B) Food & Restaurant Recommendations – Suggest places by style (vegan, cheap eats, Israeli, Northern Thai, halal, street food, romantic). Include opening hours when known.
C) Thai Culture & Etiquette – Explain temple rules, polite Thai phrases, cultural behaviors, how to dress, etc.
D) Safety & Practical Tips – Cover scams, motorbike rules, what to avoid, and emergency contacts. Provide calm, helpful guidance.
E) Itinerary Builder – Create itineraries based on the user's number of days, weather, preferences (nature, food, temples, adventure, nightlife). Keep itineraries simple, clear, and flexible.
F) Translation Mode – Translate between English ↔ Thai politely and naturally.
G) Connect to Tourist Welcome Kit – When useful, guide users to sections of the existing Welcome Kit on the website.

Tone & Style: Friendly, concise, and professional — like a helpful local host. Avoid slang. No unnecessary emojis unless the user uses them first.`;

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Sawasdee! 🙏 I\'m your Chiang Mai AI Concierge. How can I help you plan your Thailand adventure today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('ai_concierge_chat');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('ai_concierge_chat', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response (in production, this would call an actual AI API)
      const response = await simulateAIResponse(input);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI response error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (userInput: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const input = userInput.toLowerCase();

    // Simple rule-based responses (in production, replace with actual AI API)
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! Welcome to Chiang Mai! How can I assist you today? I can help with directions, food recommendations, cultural tips, safety advice, or create a custom itinerary for you.';
    }

    if (input.includes('temple') || input.includes('wat')) {
      return 'Chiang Mai has beautiful temples! Here are my top recommendations:\n\n🏛️ **Wat Phra That Doi Suthep** - The most iconic temple with stunning city views. Take a red truck (60-80 THB) or Grab (150-200 THB). Entry: 30 THB.\n\n🏛️ **Wat Chedi Luang** - Historic temple in Old City. Free entry, donations welcome.\n\n🏛️ **Wat Phra Singh** - Beautiful Lanna architecture. Entry: 40 THB.\n\n**Temple Etiquette**: Cover shoulders and knees, remove shoes before entering, speak quietly, and don\'t point feet at Buddha images.';
    }

    if (input.includes('food') || input.includes('restaurant') || input.includes('eat')) {
      return 'Chiang Mai has amazing food! What style are you looking for?\n\n🍜 **Khao Soi** (Northern Thai curry noodles) - Try Khao Soi Khun Yai (40-60 THB)\n\n🥘 **Street Food** - Visit Ploen Ruedee Night Market or Chang Phueak Gate\n\n🌱 **Vegan** - Goodsouls Kitchen, Pun Pun Organic Restaurant\n\n🇮🇱 **Israeli Food** - Shalom Hummus, Baba\'s House\n\nLet me know your preferences and budget!';
    }

    if (input.includes('scam') || input.includes('safety') || input.includes('safe')) {
      return 'Here are important safety tips for Chiang Mai:\n\n⚠️ **Common Scams to Avoid**:\n- Gem shop scams (don\'t buy expensive gems)\n- Overpriced tuk-tuks (agree on price first)\n- Fake tour operators (book through hotels)\n\n🏍️ **Motorbike Safety**:\n- Always wear a helmet (500 THB fine)\n- Need International Driving Permit\n- Insurance recommended\n\n📞 **Emergency Numbers**:\n- Tourist Police: 1155\n- Emergency: 191\n- Ambulance: 1669\n\nChiang Mai is generally very safe! Just use common sense.';
    }

    if (input.includes('itinerary') || input.includes('plan') || input.includes('day')) {
      return 'I\'d love to help you plan your Chiang Mai itinerary! Could you tell me:\n\n📅 How many days will you be here?\n🌤️ What season are you visiting?\n💰 What\'s your budget style? (budget/mid-range/luxury)\n🎯 What interests you most? (temples, nature, food, adventure, nightlife)\n\nOnce I know this, I can create a perfect itinerary for you!';
    }

    if (input.includes('translate') || input.includes('thai') || input.includes('say')) {
      return 'I can help with Thai translations! Here are some essential phrases:\n\n🙏 **Hello** - Sawasdee krap/ka (สวัสดีครับ/ค่ะ)\n🙏 **Thank you** - Khob khun krap/ka (ขอบคุณครับ/ค่ะ)\n🙏 **How much?** - Tao rai? (เท่าไหร่)\n🙏 **Delicious** - Aroi mak (อร่อยมาก)\n🙏 **Where is...?** - ...yoo tee nai? (...อยู่ที่ไหน)\n\nWhat specific phrase would you like to learn?';
    }

    if (input.includes('price') || input.includes('cost') || input.includes('expensive')) {
      return 'Here are typical Chiang Mai prices:\n\n🍜 **Food**:\n- Street food: 30-60 THB\n- Local restaurant: 60-150 THB\n- Mid-range restaurant: 150-400 THB\n\n🚗 **Transport**:\n- Red truck (shared): 20-40 THB\n- Red truck (charter): 100-200 THB\n- Grab: 50-200 THB (depending on distance)\n- Motorbike rental: 150-250 THB/day\n\n🏨 **Accommodation**:\n- Hostel: 150-400 THB/night\n- Budget hotel: 400-1,000 THB/night\n- Mid-range: 1,000-2,500 THB/night\n\nWhat specific prices do you need?';
    }

    // Default response
    return `I can help you with:\n\n📍 **Directions & Navigation** - How to get anywhere in Chiang Mai\n🍜 **Food Recommendations** - Best places to eat\n🏛️ **Cultural Tips** - Temple etiquette and Thai customs\n⚠️ **Safety Advice** - Scams to avoid and emergency contacts\n📅 **Itinerary Planning** - Custom trip planning\n🗣️ **Thai Translations** - Learn useful phrases\n\nWhat would you like to know about "${userInput}"?`;
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Sawasdee! 🙏 I\'m your Chiang Mai AI Concierge. How can I help you plan your Thailand adventure today?',
      timestamp: new Date()
    }]);
    localStorage.removeItem('ai_concierge_chat');
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 z-50 flex items-center justify-center"
          size="lg"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Chiang Mai Concierge</CardTitle>
                  <p className="text-xs text-white/80">AI Travel Assistant</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  title="Clear chat"
                >
                  🗑️
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Ask me anything about Chiang Mai..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by AI • For Chiang Mai travelers
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
