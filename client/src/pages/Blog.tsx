import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{fontFamily: 'Playfair Display, serif'}}>
            Thailand Travel Blog
          </h1>
          <p className="text-xl md:text-2xl mb-2">Tips, guides, and stories for Israeli travelers</p>
          <p className="text-lg md:text-xl hebrew-text" dir="rtl">טיפים, מדריכים וסיפורים למטיילים ישראלים</p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
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
                    {post.title}
                  </CardTitle>
                  <CardDescription className="hebrew-text text-base" dir="rtl">
                    {post.titleHebrew}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
                  <p className="text-gray-600 text-sm hebrew-text line-clamp-2" dir="rtl">{post.excerptHebrew}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-indigo-100">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Want More Thailand Tips?
          </h2>
          <p className="text-xl text-gray-700 mb-2">Get our complete Welcome Kit with essential guides</p>
          <p className="text-lg text-gray-600 mb-8 hebrew-text" dir="rtl">קבלו את ערכת הקבלה המלאה שלנו עם מדריכים חיוניים</p>
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
