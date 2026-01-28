import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, TrendingUp, DollarSign, Users, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function FinancialAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI financial assistant. I can help you analyze revenue trends, understand customer behavior, track subscriptions, and provide business insights. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: insights } = trpc.financial.getFinancialInsights.useQuery();
  const { data: revenue } = trpc.financial.getRevenueOverview.useQuery({});
  const { data: subscriptions } = trpc.financial.getSubscriptionAnalytics.useQuery();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatCurrency = (cents: number) => {
    return `₪${(cents / 100).toFixed(2)}`;
  };

  const generateFinancialContext = () => {
    if (!insights || !revenue || !subscriptions) {
      return "Financial data is still loading...";
    }

    return `
Current Financial Status:
- Current Month Revenue: ${formatCurrency(insights.currentMonth.revenue)} (${insights.currentMonth.transactions} transactions)
- Last Month Revenue: ${formatCurrency(insights.lastMonth.revenue)} (${insights.lastMonth.transactions} transactions)
- Growth Rate: ${insights.growthRate.toFixed(1)}%
- Average Transaction Value: ${formatCurrency(insights.avgTransactionValue)}
- Active Subscribers: ${insights.activeSubscribers}

Revenue by Product:
${revenue.revenueByProduct.map(p => `- ${p.productType}: ${formatCurrency(p.revenue)} (${p.count} sales)`).join('\n')}

Top Customers:
${insights.topCustomers.slice(0, 5).map((c, i) => `${i + 1}. ${c.email}: ${formatCurrency(c.totalSpent)} (${c.transactionCount} purchases)`).join('\n')}

Subscription Status:
- New Subscriptions (30 days): ${subscriptions.newSubscriptionsCount}
- Churned (30 days): ${subscriptions.churnCount}
- Active Subscriptions: ${subscriptions.activeSubscriptions.length}
`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    try {
      // Generate AI response based on financial data
      const financialContext = generateFinancialContext();
      const conversationHistory = messages
        .slice(-5)
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      // Simulate AI response (in production, this would call your LLM API)
      const assistantResponse = await generateFinancialInsight(
        input,
        financialContext,
        conversationHistory
      );

      const assistantMessage: Message = {
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error analyzing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Quick Insights Sidebar */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Insights</CardTitle>
            <CardDescription>Click to ask the assistant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => handleQuickQuestion("What's my revenue growth rate this month?")}
            >
              <TrendingUp className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Revenue growth analysis</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => handleQuickQuestion("Who are my top customers?")}
            >
              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Top customers</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => handleQuickQuestion("What products are selling best?")}
            >
              <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Product performance</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => handleQuickQuestion("Are there any concerning trends I should know about?")}
            >
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Warning signs</span>
            </Button>
          </CardContent>
        </Card>

        {insights && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue (MTD)</span>
                <span className="font-bold">{formatCurrency(insights.currentMonth.revenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Growth Rate</span>
                <span className={`font-bold ${insights.growthRate >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {insights.growthRate >= 0 ? "+" : ""}{insights.growthRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subscribers</span>
                <span className="font-bold">{insights.activeSubscribers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Order Value</span>
                <span className="font-bold">{formatCurrency(insights.avgTransactionValue)}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chat Interface */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>AI Financial Assistant</CardTitle>
          <CardDescription>Ask questions about your financial data and get insights</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === "user" ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your finances..."
              rows={2}
              className="resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" disabled={!input.trim() || isGenerating}>
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// AI Response Generator (placeholder - in production, use your LLM API)
async function generateFinancialInsight(
  question: string,
  financialContext: string,
  conversationHistory: string
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lowerQuestion = question.toLowerCase();

  // Pattern matching for common questions
  if (lowerQuestion.includes("growth") || lowerQuestion.includes("trend")) {
    const match = financialContext.match(/Growth Rate: ([-\d.]+)%/);
    const growthRate = match ? parseFloat(match[1]) : 0;

    if (growthRate > 10) {
      return `Great news! Your revenue is growing at ${growthRate.toFixed(1)}% month-over-month. This is excellent growth. Here are some insights:

✅ Strong upward trend - your business is scaling well
✅ Consider investing in marketing to capitalize on this momentum
✅ Review what's working well and double down on those strategies

Key recommendation: Now is a good time to optimize your customer acquisition cost (CAC) and focus on retention.`;
    } else if (growthRate > 0) {
      return `Your revenue is growing at ${growthRate.toFixed(1)}% month-over-month. This is positive but there's room for improvement:

📊 Steady growth - you're heading in the right direction
💡 Consider testing new marketing channels
💡 Analyze your top customers to understand what's working

Focus on: Improving conversion rates and average order value.`;
    } else {
      return `Your revenue declined by ${Math.abs(growthRate).toFixed(1)}% this month. Here's what you should focus on:

⚠️ Action needed - let's turn this around
🔍 Review: What changed from last month?
🔍 Check: Are there seasonal factors at play?
🎯 Priority: Re-engage existing customers and reduce churn

Recommendation: Analyze your customer churn rate and consider a win-back campaign.`;
    }
  }

  if (lowerQuestion.includes("top customer") || lowerQuestion.includes("best customer")) {
    const customersMatch = financialContext.match(/Top Customers:\n([\s\S]*?)(?:\n\n|$)/);
    if (customersMatch) {
      return `Here are your top customers by lifetime value:

${customersMatch[1]}

💎 These customers represent your most valuable relationships. Consider:
- Creating a VIP program to reward loyalty
- Personal outreach to thank them
- Understanding what makes them choose you repeatedly
- Using their behavior to find similar customers

Focus on customer retention - acquiring a new customer costs 5-7x more than retaining an existing one.`;
    }
  }

  if (lowerQuestion.includes("product") || lowerQuestion.includes("selling")) {
    const productsMatch = financialContext.match(/Revenue by Product:\n([\s\S]*?)(?:\n\n|$)/);
    if (productsMatch) {
      return `Here's your product performance breakdown:

${productsMatch[1]}

📈 Insights:
- Focus marketing spend on your best-performing products
- Consider bundling slow-moving products with popular ones
- Analyze why certain products perform better

Next steps: Review pricing strategy for underperforming products.`;
    }
  }

  if (lowerQuestion.includes("warning") || lowerQuestion.includes("concern") || lowerQuestion.includes("problem")) {
    const churnMatch = financialContext.match(/Churned \(30 days\): (\d+)/);
    const churnCount = churnMatch ? parseInt(churnMatch[1]) : 0;

    if (churnCount > 5) {
      return `⚠️ Warning: You have ${churnCount} churned subscriptions in the last 30 days.

This is something to monitor closely. Here's what I recommend:

🎯 Immediate actions:
1. Reach out to churned customers for feedback
2. Analyze common characteristics of churned users
3. Review your onboarding process
4. Consider a win-back campaign

💡 Prevention strategy:
- Improve customer engagement
- Add more value to your premium tier
- Better communicate the benefits

Healthy churn rate for SaaS is typically 5-7% monthly. Let's work on bringing yours down.`;
    } else {
      return `✅ Good news! Your business metrics look healthy:

- Low churn rate (${churnCount} in 30 days)
- Steady revenue growth
- Good customer retention

Areas to optimize:
💡 Focus on growing your subscriber base
💡 Test price optimization for premium tiers
💡 Expand your product offerings

Keep monitoring these metrics weekly to catch any early warning signs.`;
    }
  }

  // Default response
  return `Based on your current financial data:

${financialContext}

I can help you analyze specific aspects of your business. Try asking me about:
- Revenue trends and growth
- Top performing products
- Customer lifetime value
- Subscription metrics
- Warning signs or areas of concern

What would you like to dive deeper into?`;
}
