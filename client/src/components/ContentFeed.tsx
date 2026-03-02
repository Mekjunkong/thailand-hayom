import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { categories } from "@/data/categories";
import ContentFeedCard from "./ContentFeedCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function ContentFeed() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Map category ID -> articleCategory value for the query
  const articleCategory = activeCategory
    ? categories.find(c => c.id === activeCategory)?.articleCategory
    : undefined;

  const { data, isLoading } = trpc.article.list.useQuery({
    page,
    limit,
    category: articleCategory,
    isPublished: true,
    isPremium: activeCategory === "premium" ? true : undefined,
  });

  const filterPills = [
    { id: null, labelEn: "All", labelHe: "\u05d4\u05db\u05dc" },
    ...categories
      .filter(c => c.id !== "lessons") // lessons aren't in the article feed
      .map(c => ({ id: c.id, labelEn: c.nameEn, labelHe: c.nameHe })),
  ];

  const handleCategoryChange = (catId: string | null) => {
    setActiveCategory(catId);
    setPage(1);
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  return (
    <section className="px-4 py-4">
      <div className="max-w-lg mx-auto">
        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {filterPills.map(pill => (
            <button
              key={pill.id ?? "all"}
              onClick={() => handleCategoryChange(pill.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === pill.id
                  ? "bg-slate-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {language === "he" ? pill.labelHe : pill.labelEn}
            </button>
          ))}
        </div>

        {/* Feed cards */}
        <div className="space-y-2">
          {isLoading ? (
            Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex gap-4 p-3">
                <Skeleton className="w-[100px] h-[75px] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))
          ) : data?.articles?.length ? (
            data.articles.map(article => (
              <ContentFeedCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                titleHe={article.titleHe}
                excerpt={article.excerpt}
                excerptHe={article.excerptHe}
                category={article.category}
                coverImage={article.coverImage}
                isPremium={article.isPremium}
                publishedAt={article.publishedAt}
                createdAt={article.createdAt}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              {t({ he: "\u05d0\u05d9\u05df \u05de\u05d0\u05de\u05e8\u05d9\u05dd \u05e2\u05d3\u05d9\u05d9\u05df", en: "No articles yet" })}
            </div>
          )}
        </div>

        {/* Load more */}
        {data && totalPages > 1 && page < totalPages && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage(p => p + 1)}
              className="text-sm text-gray-500"
            >
              {t({ he: "\u05d8\u05e2\u05df \u05e2\u05d5\u05d3", en: "Load more" })}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
