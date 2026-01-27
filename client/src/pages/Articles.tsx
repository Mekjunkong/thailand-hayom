import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { Search, Calendar, Tag } from "lucide-react";

// Sample articles data - will be replaced with database queries
const sampleArticles = [
  {
    id: 1,
    slug: "best-vegan-restaurants-chiang-mai",
    titleHe: "10 המסעדות הטבעוניות הטובות ביותר בצ'אנג מאי",
    titleEn: "10 Best Vegan Restaurants in Chiang Mai",
    excerptHe: "מדריך מקיף למסעדות הטבעוניות הטובות ביותר בצ'אנג מאי, כולל כתובות, מחירים וטיפים",
    excerptEn: "Complete guide to the best vegan restaurants in Chiang Mai, including addresses, prices and tips",
    category: "food",
    categoryHe: "אוכל",
    categoryEn: "Food",
    date: "2026-01-20",
    image: "/images/vegan-food.jpg",
    isPremium: false
  },
  {
    id: 2,
    slug: "thailand-visa-update-2026",
    titleHe: "עדכון ויזה לתאילנד 2026 - כל מה שצריך לדעת",
    titleEn: "Thailand Visa Update 2026 - Everything You Need to Know",
    excerptHe: "המדריך המלא לדרישות הויזה החדשות לתאילנד, כולל ויזה תיירות, ויזה ארוכת טווח ועוד",
    excerptEn: "Complete guide to new Thailand visa requirements, including tourist visa, long-term visa and more",
    category: "visa",
    categoryHe: "ויזה",
    categoryEn: "Visa",
    date: "2026-01-18",
    image: "/images/visa.jpg",
    isPremium: false
  },
  {
    id: 3,
    slug: "hidden-temples-chiang-mai",
    titleHe: "מקדשים נסתרים בצ'אנג מאי שחובה לבקר בהם",
    titleEn: "Hidden Temples in Chiang Mai You Must Visit",
    excerptHe: "גלה מקדשים מדהימים מחוץ למסלול התיירותי, עם כתובות מדויקות וטיפים לביקור",
    excerptEn: "Discover amazing temples off the beaten path, with exact addresses and visiting tips",
    category: "attractions",
    categoryHe: "אטרקציות",
    categoryEn: "Attractions",
    date: "2026-01-15",
    image: "/images/temple.jpg",
    isPremium: true
  },
  {
    id: 4,
    slug: "songkran-festival-2026-guide",
    titleHe: "מדריך פסטיבל סונגקראן 2026 - כל מה שצריך לדעת",
    titleEn: "Songkran Festival 2026 Guide - Everything You Need to Know",
    excerptHe: "המדריך המלא לפסטיבל המים הגדול ביותר בתאילנד, כולל תאריכים, מקומות ואירועים",
    excerptEn: "Complete guide to Thailand's biggest water festival, including dates, locations and events",
    category: "events",
    categoryHe: "אירועים",
    categoryEn: "Events",
    date: "2026-01-12",
    image: "/images/songkran.jpg",
    isPremium: false
  },
  {
    id: 5,
    slug: "chiang-mai-digital-nomad-guide",
    titleHe: "מדריך נוודים דיגיטליים לצ'אנג מאי 2026",
    titleEn: "Digital Nomad Guide to Chiang Mai 2026",
    excerptHe: "כל מה שנוודים דיגיטליים צריכים לדעת על חיים בצ'אנג מאי - דיור, עבודה, קהילה",
    excerptEn: "Everything digital nomads need to know about living in Chiang Mai - housing, work, community",
    category: "lifestyle",
    categoryHe: "אורח חיים",
    categoryEn: "Lifestyle",
    date: "2026-01-10",
    image: "/images/coworking.jpg",
    isPremium: true
  },
];

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = sampleArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.titleHe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 rounded-full transition-all ${
                    selectedCategory === category.id 
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
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">
                  {t({ he: "לא נמצאו מאמרים", en: "No articles found" })}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map(article => (
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
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 group-hover:scale-110 transition-transform duration-500" />
                      </div>

                      {/* Article Content */}
                      <div className="p-6">
                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-semibold text-blue-600">
                            {language === 'he' ? article.categoryHe : article.categoryEn}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {language === 'he' ? article.titleHe : article.titleEn}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {language === 'he' ? article.excerptHe : article.excerptEn}
                        </p>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
