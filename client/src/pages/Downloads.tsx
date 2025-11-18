import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Download, FileText, Book, Map } from "lucide-react";
import { toast } from "sonner";

export default function Downloads() {
  const handleDownload = (type: string, filename?: string) => {
    if (filename) {
      // Download the PDF
      const link = document.createElement('a');
      link.href = filename;
      link.download = filename.split('/').pop() || 'download.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`${type} downloaded successfully!`);
    } else {
      toast.info(`${type} will be available soon. For now, check out the FREE SAMPLE!`);
    }
  };

  const resources = [
    {
      id: 1,
      title: "Essential Phrases Cheat Sheet",
      titleHebrew: "דף רמאות ביטויים חיוניים",
      description: "100 most important Thai phrases for travelers",
      descriptionHebrew: "100 הביטויים התאילנדיים החשובים ביותר למטיילים",
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      pages: "4 pages",
      type: "phrases"
    },
    {
      id: 2,
      title: "Welcome Kit - FREE SAMPLE",
      titleHebrew: "ערכת קבלה - דוגמה חינמית",
      description: "3 sample modules: Arrival, Scams, SIM Card (Full version has 15 modules)",
      descriptionHebrew: "3 מודולים לדוגמה: הגעה, הונאות, כרטיס SIM (גרסה מלאה כוללת 15 מודולים)",
      icon: <Book className="w-12 h-12 text-amber-600" />,
      pages: "6 pages (Sample)",
      type: "welcome-kit-sample",
      downloadUrl: "/Thailand_Smart_Tourist_Pack_FREE_SAMPLE.pdf"
    },
    {
      id: 3,
      title: "Emergency Contacts Card",
      titleHebrew: "כרטיס אנשי קשר לחירום",
      description: "Essential phone numbers and embassy info - pocket-sized",
      descriptionHebrew: "מספרי טלפון חיוניים ומידע שגרירות - בגודל כיס",
      icon: <Map className="w-12 h-12 text-red-600" />,
      pages: "1 page",
      type: "emergency"
    },
    {
      id: 4,
      title: "Numbers & Time Reference",
      titleHebrew: "מספרים וזמן - עזר",
      description: "Thai numbers, time expressions, and money",
      descriptionHebrew: "מספרים תאילנדיים, ביטויי זמן וכסף",
      icon: <FileText className="w-12 h-12 text-green-600" />,
      pages: "2 pages",
      type: "numbers"
    },
    {
      id: 5,
      title: "Food & Restaurant Guide",
      titleHebrew: "מדריך אוכל ומסעדות",
      description: "Menu items, ordering phrases, and dietary restrictions",
      descriptionHebrew: "פריטי תפריט, ביטויי הזמנה והגבלות תזונתיות",
      icon: <FileText className="w-12 h-12 text-orange-600" />,
      pages: "3 pages",
      type: "food"
    },
    {
      id: 6,
      title: "Transportation Phrases",
      titleHebrew: "ביטויי תחבורה",
      description: "Taxi, tuk-tuk, bus, and direction phrases",
      descriptionHebrew: "מונית, טוק-טוק, אוטובוס וביטויי כיוון",
      icon: <FileText className="w-12 h-12 text-purple-600" />,
      pages: "2 pages",
      type: "transport"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">📥</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
            Downloadable Resources
          </h1>
          <p className="text-xl md:text-2xl mb-2">Print and take these guides with you to Thailand</p>
          <p className="text-lg md:text-xl hebrew-text" dir="rtl">הדפיסו וקחו את המדריכים האלה איתכם לתאילנד</p>
        </div>
      </header>

      {/* Info Banner */}
      <section className="py-8 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg p-6 shadow-md border-2 border-blue-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Download className="w-6 h-6 text-blue-600" />
              How to Use These Resources
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>• <strong>Print</strong>: Download and print for offline access during your trip</p>
              <p>• <strong>Pocket-sized</strong>: Fold the cheat sheets to fit in your wallet or pocket</p>
              <p>• <strong>Laminate</strong>: Consider laminating for durability in humid weather</p>
              <p>• <strong>Share</strong>: Send to friends traveling with you</p>
            </div>
            <p className="text-sm text-gray-600 mt-4 hebrew-text" dir="rtl">
              הדפיסו, קפלו לגודל כיס, למינטו לעמידות במזג אוויר לח, ושתפו עם חברים
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Card key={resource.id} className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {resource.icon}
                  </div>
                  <CardTitle className="text-xl text-center">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="hebrew-text text-base text-center" dir="rtl">
                    {resource.titleHebrew}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-center">{resource.description}</p>
                  <p className="text-gray-600 text-sm hebrew-text text-center" dir="rtl">{resource.descriptionHebrew}</p>
                  
                  <div className="text-center text-sm text-gray-500 pt-2 border-t">
                    📄 {resource.pages}
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    onClick={() => handleDownload(resource.title, (resource as any).downloadUrl)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Resources CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-100 to-yellow-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Want the Complete Package?
          </h2>
          <p className="text-xl text-gray-700 mb-2">Get our Welcome Kit with all guides + bonus content</p>
          <p className="text-lg text-gray-600 mb-8 hebrew-text" dir="rtl">קבלו את ערכת הקבלה שלנו עם כל המדריכים + תוכן בונוס</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/welcome-kit">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-xl">
                ✈️ Get Welcome Kit (₪20)
              </Button>
            </Link>
            <Link href="/lessons">
              <Button size="lg" variant="outline" className="border-2">
                🎓 Start Free Lessons
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-8 text-center">
        <Link href="/">
          <Button size="lg" variant="outline" className="border-2">
            🏠 Back to Home
          </Button>
        </Link>
      </section>
    </div>
  );
}
