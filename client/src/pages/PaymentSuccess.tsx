import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4 pt-20">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-24 h-24 text-green-600" />
          </div>
          <CardTitle className="text-4xl font-bold text-green-700">
            Payment Successful!
          </CardTitle>
          <p className="text-xl text-gray-600 mt-4">
            Thank you for purchasing the Smart Tourist Pack
          </p>
          <p className="text-lg text-gray-600 hebrew-text mt-2" dir="rtl">
            תודה שרכשת את חבילת התייר החכם
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-4 text-green-900">What's Next?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Check your email for the Welcome Kit PDF and access instructions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>The AI Concierge chatbot is now available - click the purple button in the bottom-right corner</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Download the phrase cheat sheets and pronunciation guides from the Downloads page</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Start learning Thai with our 10 comprehensive lessons</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="font-bold text-xl mb-3 text-amber-900">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              If you have any questions or didn't receive your confirmation email, contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://wa.me/66929894495" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  💬 WhatsApp Support
                </Button>
              </a>
              <a href="mailto:Pasuthunjunkong@gmail.com" className="flex-1">
                <Button variant="outline" className="w-full">
                  📧 Email Us
                </Button>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/interactive-lessons" className="flex-1">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                🎓 Start Learning Thai
              </Button>
            </Link>
            <Link href="/welcome-kit" className="flex-1">
              <Button variant="outline" className="w-full">
                📚 View Welcome Kit
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                🏠 Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
