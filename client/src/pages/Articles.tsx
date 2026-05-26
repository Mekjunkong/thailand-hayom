import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import ContentCard, { CardSkeleton } from "@/components/ContentCard";
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
  const HeaderIcon = headerCategory.icon;
  const trimmedSearchQuery = searchQuery.trim();
  const emptyStateKind = trimmedSearchQuery
    ? "search"
    : selectedCategory
      ? "category"
      : "general";
  const emptyState = {
    search: {
      title: t({
        he: "לא נמצאו מאמרים שמתאימים לחיפוש",
        en: "No matching articles found",
      }),
      description: t({
        he: "נסו חיפוש קצר יותר או נקו את שורת החיפוש כדי לראות את כל המדריכים.",
        en: "Try a shorter search or clear the search field to see all guides.",
      }),
    },
    category: {
      title: t({
        he: "אין מאמרים בקטגוריה הזאת כרגע",
        en: "No articles in this category yet",
      }),
      description: t({
        he: "אפשר להתחיל מהקורס ולחזור למדריכים כשנוסיף תוכן חדש.",
        en: "Start with the course now and come back to the guides when new articles are added.",
      }),
    },
    general: {
      title: t({
        he: "מדריכי התמיכה בדרך",
        en: "Supporting guides are on the way",
      }),
      description: t({
        he: "בינתיים אפשר להתחיל לתרגל תאית שימושית לטיול בתאילנד.",
        en: "For now, start practicing practical Thai for your trip to Thailand.",
      }),
    },
  }[emptyStateKind];

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className={`bg-gradient-to-r ${headerCategory.gradientFrom} ${headerCategory.gradientTo} py-16 pt-32 text-white`}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <HeaderIcon className="mx-auto mb-4 h-12 w-12 text-white/90" />
          <h1
            className="text-4xl font-black text-white md:text-6xl"
            dir={t({ he: "rtl", en: "ltr" })}
          >
            {t({
              he: "מדריכי טיול שעוזרים לדבר בתאילנד",
              en: "Travel guides that help you speak Thai in Thailand",
            })}
          </h1>
          <p
            className="mt-4 text-lg text-white/85 md:text-xl"
            dir={t({ he: "rtl", en: "ltr" })}
          >
            {t({
              he: "אוכל, תחבורה, ויזה ובטיחות, עם דגש על מה להגיד בפועל כשאתם שם.",
              en: "Food, transport, visas, and safety with a focus on what to actually say while you are there.",
            })}
          </p>
          <p className="mt-3 text-sm text-white/70">
            {t({ en: `${articles.length} items`, he: `${articles.length} פריטים` })}
          </p>
        </div>
      </section>

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
            <div
              className="mx-auto max-w-xl rounded-2xl border border-stone-200 bg-white p-8 text-center"
              dir={t({ he: "rtl", en: "ltr" })}
            >
              <h2 className="text-2xl font-bold text-stone-950">
                {emptyState.title}
              </h2>
              <p className="mt-3 text-stone-600">
                {emptyState.description}
              </p>
              {emptyStateKind === "search" ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-stone-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2"
                >
                  {t({ he: "נקו חיפוש", en: "Clear search" })}
                </button>
              ) : (
                <Link
                  href="/interactive-lessons"
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-stone-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2"
                >
                  {t({ he: "התחילו שיעור חינם", en: "Start a free lesson" })}
                </Link>
              )}
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
