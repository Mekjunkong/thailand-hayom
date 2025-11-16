import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are the official assistant for the "Smart Tourist Pack" on our website.
Your job is to clearly explain, sell, and support visitors who are interested in our 1,000-baht travel solution.

Your tone must be warm, professional, and friendly — easy for tourists to understand.
Always use simple English unless the user switches language.

Your goals:
1. Explain what the Smart Tourist Pack includes
2. Show the benefits and remove confusion
3. Highlight why it's helpful for travelers in Thailand
4. Guide users to take action (buy, contact, or chat on WhatsApp)
5. Support tour agents and hostel owners who want to buy in bulk
6. Answer detailed questions about how the AI Concierge works
7. Help the user trust the service by giving clear, calm answers
8. Give examples of how the pack helps in real travel situations

Product Description:
The Smart Tourist Pack (1,000 THB) includes:
• A friendly AI Travel Concierge available 24/7
• Our full Tourist Welcome Kit (PDF + website access)
• Local guidance for food, transport, culture, and daily planning
• Thai phrase support and translation
• Safety tips and practical travel advice
• Discounts and recommendations in Chiang Mai
• Simple itineraries based on weather, budget, and travel style

The AI Concierge can help with:
• Directions to any landmark in Chiang Mai
• Planning 1–14 day itineraries
• Temple rules and cultural etiquette
• Finding vegan/halal/street food
• Booking suggestions (non-commission)
• Emergency guidance
• Thai ↔ English translation
• Tips for families, backpackers, solo travelers, and Israeli tourists

Behavior Rules:
1. Keep answers calm, friendly, and direct.
2. When a tourist seems confused, offer step-by-step guidance.
3. When a user is hesitant, gently explain why the pack gives peace of mind and saves time.
4. When a tour agent or hostel owner asks, explain bulk pricing and the white-label option.
5. Never pressure — instead, guide and reassure.
6. Always offer a next step: Buy now, Try the concierge, Open WhatsApp, See the Welcome Kit, Ask a question

Sales Examples:
• "If this is your first time in Thailand, the pack will remove a lot of stress."
• "The AI Concierge answers instantly, day or night."
• "You'll have clear directions, prices, and local recommendations."
• "Many travelers use it to plan each day based on weather and mood."
• "Tour agents love this because it makes their customers feel supported."

Special Behavior for Tour Agents & Hostel Owners:
• Explain white-label (branding with their logo)
• Explain bulk pricing: 10 packs: 8,000 THB, 20 packs: 15,000 THB
• Explain WhatsApp integration
• Explain how it reduces staffing time and improves customer satisfaction`;

const QUICK_ACTIONS = [
  { label: '🏛️ Show me temples', query: 'What are the best temples to visit in Chiang Mai?' },
  { label: '🍜 Find food nearby', query: 'Where can I find good local food in Chiang Mai?' },
  { label: '⚠️ Safety tips', query: 'What safety tips should I know for Chiang Mai?' },
  { label: '📅 3-day itinerary', query: 'Can you create a 3-day itinerary for Chiang Mai?' },
  { label: '💰 What\'s included?', query: 'What does the Smart Tourist Pack include?' },
  { label: '🏨 For tour agents', query: 'I\'m a tour agent interested in bulk pricing' },
];

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Sawasdee! 🙏 Welcome to the Smart Tourist Pack assistant. I\'m here to help you explore Chiang Mai with confidence!\n\nI can help you with directions, food recommendations, cultural tips, itineraries, and more. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

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

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    setShowQuickActions(false);
    // Auto-send after a brief delay
    setTimeout(() => handleSend(query), 100);
  };

  const handleSend = async (customInput?: string) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickActions(false);

    try {
      // Call AI API
      const response = await callAIAPI(messageText, messages);
      
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
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment, or contact us directly on WhatsApp at +66929894495.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const callAIAPI = async (userInput: string, conversationHistory: Message[]): Promise<string> => {
    try {
      const history = conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendMessageMutation.mutateAsync({
        message: userInput,
        sessionId,
        history
      });

      // Response is always a string now
      return response.message;
    } catch (error) {
      console.error('AI API call failed:', error);
      throw error;
    }
  };

  const simulateAIResponse = async (userInput: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const input = userInput.toLowerCase();

    // Smart Tourist Pack specific responses
    if (input.includes('smart tourist pack') || input.includes('what') && input.includes('include')) {
      return `Great question! The **Smart Tourist Pack** (1,000 THB) is your complete travel companion for Thailand. Here's what you get:\n\n✅ **24/7 AI Travel Concierge** - Ask me anything, anytime\n✅ **Full Tourist Welcome Kit** - PDF guide + website access\n✅ **Local Guidance** - Food, transport, culture, daily planning\n✅ **Thai Phrase Support** - Translation and pronunciation help\n✅ **Safety Tips** - Scam warnings and practical advice\n✅ **Chiang Mai Discounts** - Exclusive recommendations\n✅ **Custom Itineraries** - Based on weather, budget, and your style\n\nIf this is your first time in Thailand, the pack will remove a lot of stress. You'll have clear directions, prices, and local recommendations instantly.\n\n**Ready to get started?** 👉 [Buy Now](/welcome-kit) or chat with us on WhatsApp: +66929894495`;
    }

    if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
      return `The Smart Tourist Pack is **1,000 THB** (about $28 USD).\n\nThis one-time payment gives you:\n• Unlimited access to the AI Concierge during your trip\n• All Welcome Kit materials\n• Custom itineraries and daily planning\n• 24/7 support\n\n**For Tour Agents & Hostel Owners:**\n• 10 packs: 8,000 THB (800 THB each)\n• 20 packs: 15,000 THB (750 THB each)\n• White-label branding available\n\nMany travelers use it to plan each day based on weather and mood. It's like having a local friend in your pocket!\n\n**Want to purchase?** Contact us on WhatsApp: +66929894495`;
    }

    if (input.includes('tour agent') || input.includes('hostel') || input.includes('bulk') || input.includes('business')) {
      return `Excellent! We love working with tour agents and hostel owners. Here's what we offer:\n\n📦 **Bulk Pricing:**\n• 10 packs: 8,000 THB (800 THB each)\n• 20 packs: 15,000 THB (750 THB each)\n• Custom packages for larger orders\n\n🎨 **White-Label Option:**\n• Brand the concierge with your logo\n• Integrate with your WhatsApp Business\n• Custom welcome messages\n\n💼 **Benefits for Your Business:**\n• Reduces staffing time for common questions\n• Improves customer satisfaction\n• Provides 24/7 support to your guests\n• Makes your service stand out\n\nTour agents love this because it makes their customers feel supported throughout their trip.\n\n**Ready to discuss?** WhatsApp us: +66929894495 or email: Pasuthunjunkong@gmail.com`;
    }

    if (input.includes('buy') || input.includes('purchase') || input.includes('get started')) {
      return `Perfect! Here's how to get your Smart Tourist Pack:\n\n**Option 1: WhatsApp (Fastest)**\nMessage us at +66929894495 and say "I want the Smart Tourist Pack"\n\n**Option 2: Website**\nVisit our [Welcome Kit page](/welcome-kit) and click "Purchase Now"\n\n**Option 3: Email**\nSend your inquiry to Pasuthunjunkong@gmail.com\n\n**What happens next:**\n1. You'll receive payment instructions\n2. Once paid, you get instant access to the AI Concierge\n3. Download the Welcome Kit PDF\n4. Start planning your amazing Thailand trip!\n\nThe AI Concierge answers instantly, day or night. You'll have peace of mind knowing help is always available.\n\n**Any questions before you start?**`;
    }

    // Chiang Mai travel responses
    if (input.includes('temple') || input.includes('wat')) {
      return `Chiang Mai has beautiful temples! Here are my top recommendations:\n\n🏛️ **Wat Phra That Doi Suthep** - The most iconic temple with stunning city views. Take a red truck (60-80 THB) or Grab (150-200 THB). Entry: 30 THB.\n\n🏛️ **Wat Chedi Luang** - Historic temple in Old City. Free entry, donations welcome.\n\n🏛️ **Wat Phra Singh** - Beautiful Lanna architecture. Entry: 40 THB.\n\n**Temple Etiquette**: Cover shoulders and knees, remove shoes before entering, speak quietly, and don't point feet at Buddha images.\n\n💡 **Pro tip:** With the Smart Tourist Pack, you get detailed temple guides, cultural etiquette tips, and custom itineraries. Want to learn more?`;
    }

    if (input.includes('food') || input.includes('restaurant') || input.includes('eat')) {
      return `Chiang Mai has amazing food! Here are some must-tries:\n\n🍜 **Khao Soi** (Northern Thai curry noodles) - Try Khao Soi Khun Yai (40-60 THB)\n\n🥘 **Street Food** - Visit Ploen Ruedee Night Market or Chang Phueak Gate\n\n🌱 **Vegan** - Goodsouls Kitchen, Pun Pun Organic Restaurant\n\n🇮🇱 **Israeli Food** - Shalom Hummus, Baba's House\n\n**Food Safety Tips:**\n• Eat where locals eat\n• Look for busy stalls\n• Drink bottled water\n\n💡 **With the Smart Tourist Pack**, I can create personalized food itineraries based on your dietary preferences and budget. Interested?`;
    }

    if (input.includes('itinerary') || input.includes('plan') || input.includes('day')) {
      return `I'd love to help you plan your Chiang Mai itinerary! Here's a sample 3-day plan:\n\n**Day 1: Old City & Temples**\n• Morning: Wat Phra Singh, Wat Chedi Luang\n• Lunch: Khao Soi at local restaurant\n• Afternoon: Three Kings Monument, City Arts & Cultural Centre\n• Evening: Sunday Walking Street (if Sunday) or Night Bazaar\n\n**Day 2: Nature & Adventure**\n• Morning: Doi Suthep Temple\n• Lunch: Viewpoint restaurant\n• Afternoon: Sticky Waterfalls or Elephant Sanctuary\n• Evening: Nimman area for dinner and cafes\n\n**Day 3: Markets & Culture**\n• Morning: Warorot Market\n• Lunch: Street food tour\n• Afternoon: Thai cooking class or massage\n• Evening: Riverside dinner\n\n💡 **Want a custom itinerary?** The Smart Tourist Pack creates personalized plans based on weather, your budget, and interests. Check it out!`;
    }

    if (input.includes('safety') || input.includes('scam')) {
      return `Here are important safety tips for Chiang Mai:\n\n⚠️ **Common Scams to Avoid:**\n• Gem shop scams (don't buy expensive gems)\n• Overpriced tuk-tuks (agree on price first)\n• Fake tour operators (book through hotels)\n\n🏍️ **Motorbike Safety:**\n• Always wear a helmet (500 THB fine)\n• Need International Driving Permit\n• Insurance recommended\n\n📞 **Emergency Numbers:**\n• Tourist Police: 1155\n• Emergency: 191\n• Ambulance: 1669\n\n💡 **Smart Tourist Pack includes:** Complete safety guide, scam warnings, emergency contacts, and 24/7 support. Want to learn more?`;
    }

    // Default response
    return `I can help you with:\n\n📍 **Directions & Navigation** - How to get anywhere in Chiang Mai\n🍜 **Food Recommendations** - Best places to eat\n🏛️ **Cultural Tips** - Temple etiquette and Thai customs\n⚠️ **Safety Advice** - Scams to avoid and emergency contacts\n📅 **Itinerary Planning** - Custom trip planning\n🗣️ **Thai Translations** - Learn useful phrases\n\n💡 **About the Smart Tourist Pack (1,000 THB):**\nGet 24/7 AI support, full Welcome Kit, custom itineraries, and local guidance throughout your trip. It's like having a local friend in your pocket!\n\nWhat would you like to know about "${userInput}"?\n\n**Ready to explore?** [Learn More](/welcome-kit) or WhatsApp: +66929894495`;
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Sawasdee! 🙏 Welcome to the Smart Tourist Pack assistant. I\'m here to help you explore Chiang Mai with confidence!\n\nI can help you with directions, food recommendations, cultural tips, itineraries, and more. How can I assist you today?',
      timestamp: new Date()
    }]);
    setShowQuickActions(true);
    localStorage.removeItem('ai_concierge_chat');
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 z-50 flex items-center justify-center animate-pulse"
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
                  <CardTitle className="text-lg">Smart Tourist Pack</CardTitle>
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

            {/* Quick Action Buttons */}
            {showQuickActions && messages.length === 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-gray-500 text-center font-semibold">Quick Actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.query)}
                      className="text-xs h-auto py-2 px-2 whitespace-normal text-left hover:bg-blue-50"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

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
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={toggleVoiceInput}
                disabled={isLoading}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'}`}
                title="Voice input"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Smart Tourist Pack • 1,000 THB
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
