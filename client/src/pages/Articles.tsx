import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { Search, Calendar, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";

const categories = [
  { id: "all", nameHe: "הכל", nameEn: "All" },
  { id: "food", nameHe: "אוכל", nameEn: "Food" },
  { id: "visa", nameHe: "ויזה", nameEn: "Visa" },
  { id: "attractions", nameHe: "אטרקציות", nameEn: "Attractions" },
  { id: "events", nameHe: "אירועים", nameEn: "Events" },
  { id: "lifestyle", nameHe: "אורח חיים", nameEn: "Lifestyle" },
  { id: "safety", nameHe: "בטיחות", nameEn: "Safety" },
];

export default function Articles() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = trpc.article.list.useQuery({
    page: 1,
    limit: 100,
    category: selectedCategory,
    search: searchQuery || undefined,
    isPublished: true,
  });

  const articles = data?.articles || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageToggle />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t({ he: "מאמרים ומדריכים", en: "Articles & Guides" })}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {t({ 
                he: "כל מה שצריך לדעת על תאילנד וצ'אנג מאי",
                en: "Everything you need to know about Thailand and Chiang Mai"
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={t({ he: "חפש מאמרים...", en: "Search articles..." })}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id === "all" ? undefined : category.id)}
                  variant={(category.id === "all" && !selectedCategory) || selectedCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 rounded-full transition-all ${
                    (category.id === "all" && !selectedCategory) || selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                      : "hover:border-blue-400"
                  }`}
                >
                  {language === 'he' ? category.nameHe : category.nameEn}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{t({ he: "טוען מאמרים...", en: "Loading articles..." })}</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">
                  {t({ he: "לא נמצאו מאמרים", en: "No articles found" })}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map(article => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer group">
                      {/* Article Image */}
                      <div className="relative h-56 bg-gradient-to-br from-blue-100 to-teal-100 overflow-hidden">
                        {article.isPremium && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10 flex items-center gap-2">
                            <span>👑</span>
                            {t({ he: "פרימיום", en: "Premium" })}
                          </div>
                        )}
                        {article.coverImage ? (
                          <img
                            src={article.coverImage}
                            alt={language === 'he' ? article.titleHe : article.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 group-hover:scale-110 transition-transform duration-500" />
                        )}
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-semibold text-blue-600 capitalize">
                            {article.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {language === 'he' ? article.titleHe : article.title}
                        </h3>

                        {/* Excerpt */}
                        {(article.excerpt || article.excerptHe) && (
                          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {language === 'he' ? article.excerptHe : article.excerpt}
                          </p>
                        )}

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                              language === 'he' ? 'he-IL' : 'en-US',
                              { year: 'numeric', month: 'long', day: 'numeric' }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t({ he: "רוצה גישה לכל המאמרים?", en: "Want Access to All Articles?" })}
            </h2>
            <p className="text-xl mb-10 opacity-90">
              {t({ 
                he: "שדרג לפרימיום וקבל גישה בלתי מוגבלת לכל התוכן, כולל מדריכים בלעדיים והנחות",
                en: "Upgrade to Premium and get unlimited access to all content, including exclusive guides and discounts"
              })}
            </p>
            <Link href="/#pricing">
              <Button size="lg" className="px-12 py-7 text-xl bg-white text-blue-600 hover:bg-gray-50 font-bold rounded-xl shadow-2xl">
                {t({ he: "שדרג לפרימיום", en: "Upgrade to Premium" })}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
