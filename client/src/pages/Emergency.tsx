import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, MapPin, AlertCircle } from "lucide-react";

export default function Emergency() {
  const emergencyContacts = [
    {
      title: "Tourist Police",
      titleHebrew: "משטרת תיירים",
      number: "1155",
      description: "24/7 English-speaking support for tourists",
      descriptionHebrew: "תמיכה באנגלית 24/7 לתיירים",
      icon: "🚔",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Emergency Services",
      titleHebrew: "שירותי חירום",
      number: "191",
      description: "Police emergency hotline",
      descriptionHebrew: "קו חירום משטרתי",
      icon: "🚨",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Ambulance",
      titleHebrew: "אמבולנס",
      number: "1669",
      description: "Medical emergency services",
      descriptionHebrew: "שירותי חירום רפואיים",
      icon: "🚑",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Fire Department",
      titleHebrew: "כבאות",
      number: "199",
      description: "Fire and rescue services",
      descriptionHebrew: "שירותי כיבוי והצלה",
      icon: "🚒",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const embassies = [
    {
      name: "Israeli Embassy Bangkok",
      nameHebrew: "שגרירות ישראל בבנגקוק",
      address: "25th Floor, Ocean Tower 2, 75/24 Sukhumvit Soi 19, Bangkok 10110",
      addressHebrew: "קומה 25, אושן טאוור 2, 75/24 סוקהומวิט סוי 19, בנגקוק 10110",
      phone: "+66 2 204 9200",
      emergency: "+66 81 837 7744",
      email: "consular@bangkok.mfa.gov.il",
      hours: "Sunday-Thursday: 9:00-17:00",
      hoursHebrew: "ראשון-חמישי: 9:00-17:00"
    }
  ];

  const hospitals = [
    {
      name: "Bumrungrad International Hospital",
      nameHebrew: "בית חולים בומרונגראד",
      address: "33 Sukhumvit 3, Bangkok",
      phone: "+66 2 066 8888",
      services: "24/7 Emergency, English-speaking staff",
      servicesHebrew: "חירום 24/7, צוות דובר אנגלית"
    },
    {
      name: "Bangkok Hospital",
      nameHebrew: "בית חולים בנגקוק",
      address: "2 Soi Soonvijai 7, New Petchburi Rd, Bangkok",
      phone: "+66 2 310 3000",
      services: "24/7 Emergency, International patients",
      servicesHebrew: "חירום 24/7, מטופלים בינלאומיים"
    },
    {
      name: "Samitivej Hospital",
      nameHebrew: "בית חולים סמיטיוויג'",
      address: "133 Sukhumvit 49, Bangkok",
      phone: "+66 2 022 2222",
      services: "24/7 Emergency, Multiple languages",
      servicesHebrew: "חירום 24/7, מספר שפות"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white pt-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🆘</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
            Emergency Contacts
          </h1>
          <p className="text-xl md:text-2xl mb-2">Essential numbers for your safety</p>
          <p className="text-lg md:text-xl hebrew-text" dir="rtl">מספרים חיוניים לבטיחותכם</p>
        </div>
      </header>

      {/* Emergency Numbers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Emergency Hotlines
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg hebrew-text" dir="rtl">קווי חירום</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, idx) => (
              <Card key={idx} className="border-2 hover:shadow-xl transition-all">
                <CardHeader className={`bg-gradient-to-r ${contact.color} text-white rounded-t-lg`}>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{contact.icon}</div>
                    <div>
                      <CardTitle className="text-2xl">{contact.title}</CardTitle>
                      <CardDescription className="text-white/90 hebrew-text" dir="rtl">
                        {contact.titleHebrew}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <a href={`tel:${contact.number}`} className="text-5xl font-bold text-gray-900 hover:text-blue-600">
                      {contact.number}
                    </a>
                  </div>
                  <p className="text-gray-700 text-center">{contact.description}</p>
                  <p className="text-gray-600 text-sm text-center mt-2 hebrew-text" dir="rtl">
                    {contact.descriptionHebrew}
                  </p>
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={() => window.location.href = `tel:${contact.number}`}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Israeli Embassy */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Israeli Embassy
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg hebrew-text" dir="rtl">שגרירות ישראל</p>
          
          {embassies.map((embassy, idx) => (
            <Card key={idx} className="border-2 border-blue-300 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🇮🇱</div>
                  <div>
                    <CardTitle className="text-3xl">{embassy.name}</CardTitle>
                    <CardDescription className="text-white/90 text-lg hebrew-text mt-2" dir="rtl">
                      {embassy.nameHebrew}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{embassy.address}</p>
                    <p className="text-gray-600 text-sm hebrew-text mt-1" dir="rtl">{embassy.addressHebrew}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border-2">
                    <p className="text-sm text-gray-600 mb-1">Regular Phone</p>
                    <a href={`tel:${embassy.phone}`} className="text-xl font-bold text-blue-600 hover:underline">
                      {embassy.phone}
                    </a>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                    <p className="text-sm text-red-600 mb-1 font-semibold">Emergency 24/7</p>
                    <a href={`tel:${embassy.emergency}`} className="text-xl font-bold text-red-600 hover:underline">
                      {embassy.emergency}
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a href={`mailto:${embassy.email}`} className="text-blue-600 hover:underline">
                    {embassy.email}
                  </a>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-300">
                  <p className="text-sm text-gray-600 mb-1">Office Hours</p>
                  <p className="font-semibold">{embassy.hours}</p>
                  <p className="text-sm text-gray-600 hebrew-text" dir="rtl">{embassy.hoursHebrew}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hospitals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            International Hospitals
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg hebrew-text" dir="rtl">בתי חולים בינלאומיים</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {hospitals.map((hospital, idx) => (
              <Card key={idx} className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="text-4xl mb-2 text-center">🏥</div>
                  <CardTitle className="text-xl text-center">{hospital.name}</CardTitle>
                  <CardDescription className="text-center hebrew-text" dir="rtl">
                    {hospital.nameHebrew}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="text-gray-900 text-sm">{hospital.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <a href={`tel:${hospital.phone}`} className="text-blue-600 hover:underline font-semibold">
                      {hospital.phone}
                    </a>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-900">{hospital.services}</p>
                    <p className="text-xs text-gray-600 mt-1 hebrew-text" dir="rtl">{hospital.servicesHebrew}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Tips */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 border-yellow-400 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8" />
                <CardTitle className="text-2xl">Important Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <p className="text-gray-900">Save these numbers in your phone immediately upon arrival</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📄</span>
                <p className="text-gray-900">Keep a copy of your passport and travel insurance with you</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💳</span>
                <p className="text-gray-900">Know your travel insurance emergency number</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🗺️</span>
                <p className="text-gray-900">Share your location with family/friends when traveling</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mt-4 border-2 border-blue-300" dir="rtl">
                <p className="hebrew-text text-gray-900 font-semibold">
                  שמרו את המספרים האלה בטלפון שלכם מיד עם ההגעה. תמיד שמרו עותק של הדרכון וביטוח הנסיעה איתכם.
                </p>
              </div>
            </CardContent>
          </Card>
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
