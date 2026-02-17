import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Play, Volume2, XCircle, CheckCircle2 } from "lucide-react";

export default function Pronunciation() {
  const pronunciationGuides = [
    {
      id: 1,
      sound: "ง (ng)",
      example: "ง้วง (nguang) - sesame",
      difficulty: "Hard",
      tip: "Like 'ng' in 'sing' but at the start of a word",
      tipHebrew: "כמו 'ng' ב-'sing' אבל בתחילת מילה",
      videoPlaceholder: "https://via.placeholder.com/640x360/4F46E5/FFFFFF?text=NG+Sound+Video"
    },
    {
      id: 2,
      sound: "ร (r)",
      example: "ร้อน (ron) - hot",
      difficulty: "Medium",
      tip: "Rolled 'r' like in Spanish, but softer",
      tipHebrew: "R מגולגל כמו בספרדית, אבל רך יותר",
      videoPlaceholder: "https://via.placeholder.com/640x360/7C3AED/FFFFFF?text=R+Sound+Video"
    },
    {
      id: 3,
      sound: "ท (th)",
      example: "ทาน (than) - eat",
      difficulty: "Medium",
      tip: "Aspirated 't' - put your hand in front of your mouth and feel the air",
      tipHebrew: "T עם נשימה - שימו יד מול הפה והרגישו את האוויר",
      videoPlaceholder: "https://via.placeholder.com/640x360/EC4899/FFFFFF?text=TH+Sound+Video"
    },
    {
      id: 4,
      sound: "ป (bp)",
      example: "ปลา (bpla) - fish",
      difficulty: "Hard",
      tip: "Between 'b' and 'p' - don't fully voice it",
      tipHebrew: "בין B ל-P - אל תבטאו אותו לגמרי",
      videoPlaceholder: "https://via.placeholder.com/640x360/F59E0B/FFFFFF?text=BP+Sound+Video"
    },
    {
      id: 5,
      sound: "Tones",
      example: "มา (ma) - come vs. ม้า (mâa) - horse",
      difficulty: "Hard",
      tip: "Thai has 5 tones: mid, low, falling, high, rising",
      tipHebrew: "לתאילנדית יש 5 טונים: אמצעי, נמוך, יורד, גבוה, עולה",
      videoPlaceholder: "https://via.placeholder.com/640x360/10B981/FFFFFF?text=Tones+Guide+Video"
    },
    {
      id: 6,
      sound: "ข (kh)",
      example: "ข้าว (khao) - rice",
      difficulty: "Easy",
      tip: "Aspirated 'k' - like 'k' in 'key' with more breath",
      tipHebrew: "K עם נשימה - כמו K ב-'key' עם יותר אוויר",
      videoPlaceholder: "https://via.placeholder.com/640x360/3B82F6/FFFFFF?text=KH+Sound+Video"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Pronouncing 'ร' (r) as English 'r'",
      mistakeHebrew: "לבטא ר' (r) כמו R אנגלי",
      correct: "Use a rolled/trilled 'r' like in Spanish",
      correctHebrew: "השתמשו ב-R מגולגל כמו בספרדית"
    },
    {
      mistake: "Ignoring tones",
      mistakeHebrew: "להתעלם מטונים",
      correct: "Tones change meaning! Practice with native audio",
      correctHebrew: "טונים משנים משמעות! תרגלו עם אודיו מקורי"
    },
    {
      mistake: "Not aspirating ท, ค, ป",
      mistakeHebrew: "לא להוסיף נשימה ל-ท, ค, ป",
      correct: "Add a puff of air after these consonants",
      correctHebrew: "הוסיפו נשימה אחרי העיצורים האלה"
    },
    {
      mistake: "Pronouncing final consonants fully",
      mistakeHebrew: "לבטא עיצורים סופיים במלואם",
      correct: "Final consonants are often unreleased (stopped)",
      correctHebrew: "עיצורים סופיים לרוב לא משוחררים (נעצרים)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🗣️</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
            Pronunciation Guide
          </h1>
          <p className="text-xl md:text-2xl mb-2">Master difficult Thai sounds with video demonstrations</p>
          <p className="text-lg md:text-xl hebrew-text" dir="rtl">שלטו בצלילים תאילנדיים קשים עם הדגמות וידאו</p>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl">Why Pronunciation Matters</CardTitle>
              <CardDescription className="text-lg hebrew-text" dir="rtl">למה הגייה חשובה</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                Thai pronunciation can be challenging for Israeli speakers because:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Thai has <strong>5 tones</strong> that change word meanings</li>
                <li>Some consonant sounds don't exist in Hebrew or English</li>
                <li>Vowel lengths matter (short vs. long vowels)</li>
                <li>Final consonants are often unreleased</li>
              </ul>
              <p className="hebrew-text" dir="rtl">
                הגייה תאילנדית יכולה להיות מאתגרת לדוברי עברית כי: יש 5 טונים שמשנים משמעויות, יש צלילים שלא קיימים בעברית או אנגלית, אורך תנועות משנה, ועיצורים סופיים לרוב לא משוחררים.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pronunciation Videos */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Video Demonstrations
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg hebrew-text" dir="rtl">הדגמות וידאו</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pronunciationGuides.map((guide) => (
              <Card key={guide.id} className="border-2 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{guide.sound}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      guide.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                      guide.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {guide.difficulty}
                    </span>
                  </div>
                  <CardDescription className="text-lg">
                    <span className="font-semibold">Example:</span> {guide.example}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Video Placeholder */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden group cursor-pointer">
                    <img src={guide.videoPlaceholder} alt={`${guide.sound} pronunciation`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-pink-600 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Tip */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <div className="flex items-start gap-2">
                      <Volume2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-gray-800 font-medium">{guide.tip}</p>
                        <p className="text-gray-600 text-sm mt-1 hebrew-text" dir="rtl">{guide.tipHebrew}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Common Mistakes to Avoid
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg hebrew-text" dir="rtl">טעויות נפוצות להימנע מהן</p>

          <div className="space-y-6">
            {commonMistakes.map((item, idx) => (
              <Card key={idx} className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg text-red-700 mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Mistake
                      </h3>
                      <p className="text-gray-800">{item.mistake}</p>
                      <p className="text-gray-600 text-sm mt-2 hebrew-text" dir="rtl">{item.mistakeHebrew}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Correct
                      </h3>
                      <p className="text-gray-800">{item.correct}</p>
                      <p className="text-gray-600 text-sm mt-2 hebrew-text" dir="rtl">{item.correctHebrew}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Tips */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Practice Tips</CardTitle>
              <CardDescription className="text-lg hebrew-text" dir="rtl">טיפי תרגול</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div className="space-y-3">
                <p>✅ <strong>Listen and repeat</strong> - Use the audio in our lessons daily</p>
                <p>✅ <strong>Record yourself</strong> - Compare your pronunciation to native speakers</p>
                <p>✅ <strong>Practice with Thais</strong> - Don't be shy! They appreciate the effort</p>
                <p>✅ <strong>Focus on tones</strong> - Spend extra time on tone practice</p>
                <p>✅ <strong>Start slow</strong> - Speed comes with practice, accuracy first</p>
              </div>
              <p className="text-sm text-gray-600 mt-4 hebrew-text" dir="rtl">
                האזינו וחזרו, הקליטו את עצמכם, תרגלו עם תאילנדים, התמקדו בטונים, התחילו לאט
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Ready to Practice?
          </h2>
          <p className="text-xl text-gray-700 mb-2">Start our interactive lessons with native audio</p>
          <p className="text-lg text-gray-600 mb-8 hebrew-text" dir="rtl">התחילו את השיעורים האינטראקטיביים שלנו עם אודיו מקורי</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/interactive-lessons">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl">
                🎓 Start Learning
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-2">
                🏠 Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
