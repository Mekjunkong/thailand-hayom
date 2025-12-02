import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { welcomeKitModules } from "@/data/welcomeKit";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function WelcomeKit() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const module = selectedModule ? welcomeKitModules.find(m => m.id === selectedModule) : null;

  const handlePurchase = async () => {
    try {
      toast.info("Redirecting to secure checkout...");
      const result = await createCheckout.mutateAsync({
        productType: "single",
      });
      
      if (result.url) {
        window.open(result.url, "_blank");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to create checkout session. Please try WhatsApp instead.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
            Landing in Thailand Welcome Kit
          </h1>
          <p className="text-xl md:text-2xl mb-2">Your Complete Survival Guide</p>
          <p className="text-lg md:text-xl hebrew-text" dir="rtl">המדריך המלא שלך להישרדות</p>
          <div className="mt-8 inline-block bg-white/20 backdrop-blur-md px-8 py-4 rounded-full">
            <p className="text-3xl font-bold">₪20</p>
            <p className="text-sm">One-time payment • Lifetime access</p>
          </div>
        </div>
      </header>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            What's Included
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg hebrew-text" dir="rtl">מה כלול בחבילה</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {welcomeKitModules.map((module) => (
              <Card 
                key={module.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-amber-300"
                onClick={() => setSelectedModule(module.id)}
              >
                <CardHeader>
                  <div className="text-5xl mb-4 text-center">{module.icon}</div>
                  <CardTitle className="text-lg text-center">{module.title}</CardTitle>
                  <CardDescription className="text-center text-sm hebrew-text" dir="rtl">
                    {module.titleHebrew}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Module Detail Modal */}
      {module && (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-2 border-amber-300 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{module.icon}</div>
                    <div>
                      <CardTitle className="text-3xl">{module.title}</CardTitle>
                      <CardDescription className="text-lg hebrew-text mt-2" dir="rtl">
                        {module.titleHebrew}
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedModule(null)}
                    className="border-2"
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <div className="bg-white p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">English</h3>
                    <div className="whitespace-pre-wrap">{module.content}</div>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-lg mt-6" dir="rtl">
                    <h3 className="text-xl font-bold mb-4">עברית</h3>
                    <div className="whitespace-pre-wrap hebrew-text">{module.contentHebrew}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Why You Need This Kit
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Save Money", hebrew: "חסכו כסף", desc: "Avoid scams and overcharging" },
              { title: "Stay Safe", hebrew: "הישארו בטוחים", desc: "Know emergency contacts and procedures" },
              { title: "Navigate Easily", hebrew: "נווטו בקלות", desc: "Master transport and communication" },
              { title: "Respect Culture", hebrew: "כבדו את התרבות", desc: "Learn proper etiquette and customs" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                <div className="text-green-600 mt-1">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 hebrew-text mt-1" dir="rtl">{feature.hebrew}</p>
                  <p className="text-gray-700 mt-2">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get Your Welcome Kit Now
          </h2>
          <p className="text-xl mb-2">₪20 • Lifetime Access • Instant Download</p>
          <p className="text-lg mb-8 hebrew-text" dir="rtl">₪20 • גישה לכל החיים • הורדה מיידית</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-xl px-12 py-8 bg-white text-amber-600 hover:bg-gray-100 shadow-2xl rounded-full font-semibold"
              onClick={handlePurchase}
              disabled={createCheckout.isPending}
            >
              💳 {createCheckout.isPending ? "Processing..." : "Buy Now with Card"}
            </Button>
            <a href="https://wa.me/66929894495?text=Hi!%20I%20want%20to%20purchase%20the%20Welcome%20Kit%20(₪20)" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 bg-green-600 text-white hover:bg-green-700 shadow-2xl rounded-full font-semibold"
              >
                💬 Purchase via WhatsApp
              </Button>
            </a>
            <Link href="/">
              <Button 
                size="lg" 
                variant="outline"
                className="text-xl px-12 py-8 bg-transparent border-2 border-white text-white hover:bg-white/20 rounded-full font-semibold"
              >
                🏠 Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
