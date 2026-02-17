import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Streamdown } from "streamdown";
import { useState } from "react";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id || "0"));
  const [language, setLanguage] = useState<"english" | "hebrew">("english");

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                {language === "english" ? post.category : post.categoryHebrew}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
                {language === "english" ? post.title : post.titleHebrew}
              </h1>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Language Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border-2 border-purple-300 p-1 bg-white">
              <button
                onClick={() => setLanguage("english")}
                className={`px-6 py-2 rounded-md transition-all ${
                  language === "english"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("hebrew")}
                className={`px-6 py-2 rounded-md transition-all ${
                  language === "hebrew"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                עברית
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className={`prose prose-lg max-w-none ${language === "hebrew" ? "hebrew-text" : ""}`}
            dir={language === "hebrew" ? "rtl" : "ltr"}
          >
            <Streamdown>
              {language === "english" ? post.content : post.contentHebrew}
            </Streamdown>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-300">
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">
              {language === "english" ? "Ready for Your Thailand Adventure?" : "מוכנים להרפתקה התאילנדית שלכם?"}
            </h3>
            <p className="text-center text-gray-700 mb-6">
              {language === "english" 
                ? "Get our complete Welcome Kit with essential survival guides" 
                : "קבלו את ערכת הקבלה המלאה שלנו עם מדריכי הישרדות חיוניים"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/welcome-kit">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
                  ✈️ Get Welcome Kit (₪20)
                </Button>
              </Link>
              <Link href="/interactive-lessons">
                <Button size="lg" variant="outline" className="border-2">
                  🎓 Start Free Thai Lessons
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="border-2">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Blog
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="border-2">
                🏠 Home
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
