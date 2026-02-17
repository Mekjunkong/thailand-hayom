import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import ContentCard, { CardSkeleton } from "@/components/ContentCard";
import CategoryHeader from "@/components/CategoryHeader";
import FilterBar from "@/components/FilterBar";
import { getCategoryById, categories } from "@/data/categories";

const articleFilters = [
  { id: "food", nameEn: "Food", nameHe: "אוכל" },
  { id: "visa", nameEn: "Visa", nameHe: "ויזה" },
  { id: "attractions", nameEn: "Attractions", nameHe: "אטרקציות" },
  { id: "events", nameEn: "Events", nameHe: "אירועים" },
  { id: "lifestyle", nameEn: "Lifestyle", nameHe: "אורח חיים" },
  { id: "safety", nameEn: "Safety", nameHe: "בטיחות" },
];

export default function Articles() {
  const { t } = useLanguage();

  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category") || undefined;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = trpc.article.list.useQuery({
    page: 1,
    limit: 100,
    category: selectedCategory,
    search: searchQuery || undefined,
    isPublished: true,
  });

  const articles = data?.articles || [];

  const headerCategory =
    (selectedCategory &&
      categories.find(c => c.articleCategory === selectedCategory)) ||
    getCategoryById("travel")!;

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader category={headerCategory} count={articles.length} />

      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={articleFilters}
        selectedFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
        searchPlaceholderEn="Search articles..."
        searchPlaceholderHe="חפש מאמרים..."
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                {t({ he: "לא נמצאו מאמרים", en: "No articles found" })}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ContentCard
                  key={article.id}
                  variant="article"
                  id={article.id}
                  title={article.title}
                  titleHe={article.titleHe}
                  excerpt={article.excerpt ?? undefined}
                  excerptHe={article.excerptHe ?? undefined}
                  category={article.category}
                  coverImage={article.coverImage ?? undefined}
                  isPremium={article.isPremium}
                  publishedAt={article.publishedAt ?? undefined}
                  createdAt={article.createdAt}
                  slug={article.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
