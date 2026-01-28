import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { Search } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ArticleCard from "@/components/ArticleCard";

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
                  <ArticleCard key={article.id} article={article} />
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
