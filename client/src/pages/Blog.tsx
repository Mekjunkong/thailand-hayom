import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

export default function Blog() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t({
              he: "בלוג טיולים בתאילנד",
              en: "Thailand Travel Blog",
            })}
          </h1>
          <p className="text-xl md:text-2xl">
            {t({
              he: "טיפים, מדריכים וסיפורים למטיילים ישראלים",
              en: "Tips, guides, and stories for Israeli travelers",
            })}
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.05}>
                <Card className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl hover:text-purple-600 transition-colors">
                      {language === "he" ? post.titleHebrew : post.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {language === "he" ? post.title : post.titleHebrew}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 line-clamp-3">
                      {language === "he" ? post.excerptHebrew : post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString(
                            language === "he" ? "he-IL" : "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                        {t({ he: "קרא עוד", en: "Read More" })}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-indigo-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              {t({
                he: "רוצה עוד טיפים על תאילנד?",
                en: "Want More Thailand Tips?",
              })}
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              {t({
                he: "קבלו את ערכת הקבלה המלאה שלנו עם מדריכים חיוניים",
                en: "Get our complete Welcome Kit with essential guides",
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/welcome-kit">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-xl"
                >
                  {t({
                    he: "ערכת קבלה (₪20)",
                    en: "Get Welcome Kit (₪20)",
                  })}
                </Button>
              </Link>
              <Link href="/interactive-lessons">
                <Button size="lg" variant="outline" className="border-2">
                  {t({
                    he: "התחל שיעורים חינם",
                    en: "Start Free Lessons",
                  })}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
