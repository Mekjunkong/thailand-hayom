import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, AlertTriangle, Phone, Hospital, ShieldAlert } from "lucide-react";
import { useState } from "react";

interface EmergencyScript {
  id: number;
  situation: string;
  situationHebrew: string;
  icon: React.ReactNode;
  phrases: {
    thai: string;
    phonetic: string;
    english: string;
    hebrew: string;
  }[];
  emergencyNumbers?: {
    service: string;
    number: string;
  }[];
}

const emergencyScripts: EmergencyScript[] = [
  {
    id: 1,
    situation: "Lost Wallet / Passport",
    situationHebrew: "ארנק / דרכון אבוד",
    icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
    phrases: [
      {
        thai: "ฉันทำกระเป๋าสตางค์หาย",
        phonetic: "chan tham gra-pao sa-tang hai",
        english: "I lost my wallet",
        hebrew: "איבדתי את הארנק שלי"
      },
      {
        thai: "ฉันทำพาสปอร์ตหาย",
        phonetic: "chan tham passport hai",
        english: "I lost my passport",
        hebrew: "איבדתי את הדרכון שלי"
      },
      {
        thai: "ช่วยโทรตำรวจให้หน่อยได้ไหม",
        phonetic: "chuay toh tam-ruat hai noi dai mai",
        english: "Can you call the police for me?",
        hebrew: "אתה יכול להתקשר למשטרה בשבילי?"
      },
      {
        thai: "ฉันต้องการไปสถานทูตอิสราเอล",
        phonetic: "chan tong-gaan pai sa-taan-toot Israel",
        english: "I need to go to the Israeli Embassy",
        hebrew: "אני צריך ללכת לשגרירות הישראלית"
      }
    ],
    emergencyNumbers: [
      { service: "Tourist Police", number: "1155" },
      { service: "Emergency", number: "191" },
      { service: "Israeli Embassy Bangkok", number: "+66 2 204 9200" }
    ]
  },
  {
    id: 2,
    situation: "Medical Emergency",
    situationHebrew: "מצב חירום רפואי",
    icon: <Hospital className="w-6 h-6 text-red-500" />,
    phrases: [
      {
        thai: "ช่วยด้วย ฉันป่วย",
        phonetic: "chuay duay chan puay",
        english: "Help! I'm sick",
        hebrew: "עזרה! אני חולה"
      },
      {
        thai: "ฉันต้องการหมอ",
        phonetic: "chan tong-gaan mor",
        english: "I need a doctor",
        hebrew: "אני צריך רופא"
      },
      {
        thai: "ช่วยโทรพยาบาลให้หน่อย",
        phonetic: "chuay toh pa-yaa-baan hai noi",
        english: "Please call an ambulance",
        hebrew: "בבקשה תתקשר לאמבולנס"
      },
      {
        thai: "ฉันแพ้ยานี้",
        phonetic: "chan phae yaa nee",
        english: "I'm allergic to this medicine",
        hebrew: "יש לי אלרגיה לתרופה הזו"
      },
      {
        thai: "โรงพยาบาลที่ไหนใกล้ที่สุด",
        phonetic: "rohng pa-yaa-baan tee nai glai tee sut",
        english: "Where is the nearest hospital?",
        hebrew: "איפה בית החולים הכי קרוב?"
      }
    ],
    emergencyNumbers: [
      { service: "Ambulance", number: "1669" },
      { service: "Emergency", number: "191" },
      { service: "Tourist Police", number: "1155" }
    ]
  },
  {
    id: 3,
    situation: "Taxi Problems",
    situationHebrew: "בעיות עם מונית",
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
    phrases: [
      {
        thai: "กรุณาใช้มิเตอร์",
        phonetic: "ga-ru-naa chai meter",
        english: "Please use the meter",
        hebrew: "בבקשה תשתמש במונה"
      },
      {
        thai: "นี่ไม่ใช่ทางที่ถูก",
        phonetic: "nee mai chai taang tee took",
        english: "This is not the right way",
        hebrew: "זה לא הדרך הנכונה"
      },
      {
        thai: "หยุดรถที่นี่",
        phonetic: "yut rot tee nee",
        english: "Stop the car here",
        hebrew: "עצור את המכונית כאן"
      },
      {
        thai: "ฉันจะไม่จ่ายเงินมากกว่านี้",
        phonetic: "chan ja mai jai ngern maak gwaa nee",
        english: "I won't pay more than this",
        hebrew: "אני לא אשלם יותר מזה"
      },
      {
        thai: "ฉันจะโทรตำรวจ",
        phonetic: "chan ja toh tam-ruat",
        english: "I will call the police",
        hebrew: "אני אתקשר למשטרה"
      }
    ]
  },
  {
    id: 4,
    situation: "Lost / Need Directions",
    situationHebrew: "אבוד / צריך הכוונה",
    icon: <Phone className="w-6 h-6 text-blue-500" />,
    phrases: [
      {
        thai: "ฉันหลงทาง",
        phonetic: "chan long taang",
        english: "I'm lost",
        hebrew: "אני אבוד"
      },
      {
        thai: "โรงแรมของฉันอยู่ที่ไหน",
        phonetic: "rohng raem khong chan yoo tee nai",
        english: "Where is my hotel?",
        hebrew: "איפה המלון שלי?"
      },
      {
        thai: "ช่วยพาฉันไปที่นี่ได้ไหม",
        phonetic: "chuay paa chan pai tee nee dai mai",
        english: "Can you take me here?",
        hebrew: "אתה יכול לקחת אותי לכאן?"
      },
      {
        thai: "ฉันต้องการกลับโรงแรม",
        phonetic: "chan tong-gaan glap rohng raem",
        english: "I need to go back to my hotel",
        hebrew: "אני צריך לחזור למלון"
      },
      {
        thai: "ที่นี่ชื่ออะไร",
        phonetic: "tee nee cheu a-rai",
        english: "What is this place called?",
        hebrew: "איך קוראים למקום הזה?"
      }
    ]
  },
  {
    id: 5,
    situation: "Motorbike Accident",
    situationHebrew: "תאונת אופנוע",
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    phrases: [
      {
        thai: "ช่วยด้วย มีอุบัติเหตุ",
        phonetic: "chuay duay mee u-bat-ti-het",
        english: "Help! There's an accident",
        hebrew: "עזרה! יש תאונה"
      },
      {
        thai: "ฉันบาดเจ็บ",
        phonetic: "chan baat jep",
        english: "I'm injured",
        hebrew: "אני פצוע"
      },
      {
        thai: "โทรพยาบาลด่วน",
        phonetic: "toh pa-yaa-baan duan",
        english: "Call an ambulance quickly",
        hebrew: "תתקשר לאמבולנס מהר"
      },
      {
        thai: "ฉันมีประกันภัย",
        phonetic: "chan mee pra-gan-pai",
        english: "I have insurance",
        hebrew: "יש לי ביטוח"
      },
      {
        thai: "อย่าขยับฉัน",
        phonetic: "yaa kha-yap chan",
        english: "Don't move me",
        hebrew: "אל תזיז אותי"
      }
    ],
    emergencyNumbers: [
      { service: "Ambulance", number: "1669" },
      { service: "Emergency", number: "191" },
      { service: "Tourist Police", number: "1155" }
    ]
  }
];

export default function EmergencyScripts() {
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  const playAudio = (thai: string) => {
    setPlayingPhrase(thai);
    const utterance = new SpeechSynthesisUtterance(thai);
    utterance.lang = "th-TH";
    utterance.rate = 0.8;
    utterance.onend = () => setPlayingPhrase(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white pt-16">
      {/* Header */}
      <div className="bg-red-600 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Emergency Survival Scripts</h1>
          </div>
          <p className="text-xl text-red-100">
            Essential Thai phrases for stressful situations
          </p>
          <p className="text-lg text-red-100 mt-2">
            ביטויים חיוניים בתאילנדית למצבי לחץ
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="container py-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Numbers in Thailand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600">1155</div>
                <div className="text-sm">Tourist Police</div>
                <div className="text-xs text-gray-500">משטרת תיירות</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600">191</div>
                <div className="text-sm">Emergency</div>
                <div className="text-xs text-gray-500">חירום</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600">1669</div>
                <div className="text-sm">Ambulance</div>
                <div className="text-xs text-gray-500">אמבולנס</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Scripts */}
      <div className="container pb-16">
        <div className="grid gap-6">
          {emergencyScripts.map((script) => (
            <Card key={script.id} className="border-2">
              <CardHeader>
                <div className="flex items-start gap-3">
                  {script.icon}
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{script.situation}</CardTitle>
                    <CardDescription className="text-lg mt-1">
                      {script.situationHebrew}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {script.phrases.map((phrase, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {phrase.thai}
                          </div>
                          <div className="text-lg text-gray-600 italic mb-2">
                            {phrase.phonetic}
                          </div>
                          <div className="text-sm text-gray-700">
                            <div>{phrase.english}</div>
                            <div className="text-blue-600">{phrase.hebrew}</div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => playAudio(phrase.thai)}
                          disabled={playingPhrase === phrase.thai}
                        >
                          <Volume2 className={playingPhrase === phrase.thai ? "animate-pulse" : ""} />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {script.emergencyNumbers && (
                    <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="font-bold text-red-700 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Emergency Contacts for this Situation:
                      </div>
                      <div className="grid gap-2">
                        {script.emergencyNumbers.map((contact, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-sm">{contact.service}</span>
                            <a
                              href={`tel:${contact.number}`}
                              className="text-lg font-bold text-red-600 hover:underline"
                            >
                              {contact.number}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Tips */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Safety Tips / טיפים לבטיחות</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Always keep a photo of your passport on your phone</li>
              <li>✓ Save your hotel address in Thai on your phone</li>
              <li>✓ Keep emergency numbers saved in your contacts</li>
              <li>✓ Download offline maps before traveling</li>
              <li>✓ Share your location with friends/family when taking taxis</li>
              <li>✓ Keep some cash hidden separately from your wallet</li>
              <li>✓ Know your blood type and allergies in Thai</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
