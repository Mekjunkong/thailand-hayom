import { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, BookOpen, Eye } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { lessonsData } from "@/data/lessonsData";

const categoryColorMap: Record<string, string> = {
  Food: "bg-green-500",
  "Travel Tips": "bg-blue-500",
  "Visa Updates": "bg-red-500",
  Events: "bg-purple-500",
  Safety: "bg-orange-500",
  Deals: "bg-pink-500",
  Vegan: "bg-emerald-500",
  Attractions: "bg-cyan-500",
  Lesson: "bg-amber-500",
};

function getCategoryColor(category: string): string {
  return categoryColorMap[category] || "bg-gray-500";
}

interface CarouselCard {
  type: "article" | "lesson";
  id: number;
  title: string;
  titleHe: string;
  subtitle: string;
  subtitleHe: string;
  category: string;
  image: string | null;
  href: string;
  icon?: string;
  views?: number | null;
}

export default function ContentCarousel() {
  const { language, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardCount, setCardCount] = useState(0);

  const { data, isLoading } = trpc.article.list.useQuery({
    page: 1,
    limit: 8,
    isPublished: true,
  });

  const articles = data?.articles || [];

  // Build mixed cards: articles + 2 lessons
  const lessonCards: CarouselCard[] = lessonsData.slice(0, 2).map((lesson) => ({
    type: "lesson" as const,
    id: lesson.id,
    title: lesson.title,
    titleHe: lesson.titleHebrew,
    subtitle: `${lesson.phrases.length} phrases`,
    subtitleHe: `${lesson.phrases.length} ביטויים`,
    category: "Lesson",
    image: null,
    href: `/interactive-lessons?lesson=${lesson.id}`,
    icon: lesson.icon,
  }));

  const articleCards: CarouselCard[] = articles.map((article) => ({
    type: "article" as const,
    id: article.id,
    title: article.title,
    titleHe: article.titleHe,
    subtitle: article.excerpt || "",
    subtitleHe: article.excerptHe || "",
    category: article.category,
    image: article.coverImage || null,
    href: `/articles/${article.slug}`,
    views: article.views,
  }));

  // Interleave: insert lessons at positions 2 and 5
  const cards: CarouselCard[] = [];
  let lessonIdx = 0;
  for (let i = 0; i < articleCards.length; i++) {
    if ((i === 2 || i === 5) && lessonIdx < lessonCards.length) {
      cards.push(lessonCards[lessonIdx]);
      lessonIdx++;
    }
    cards.push(articleCards[i]);
  }
  // Add remaining lessons if not enough articles
  while (lessonIdx < lessonCards.length) {
    cards.push(lessonCards[lessonIdx]);
    lessonIdx++;
  }

  useEffect(() => {
    setCardCount(cards.length);
  }, [cards.length]);

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 304; // ~w-76 with gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, cardCount - 1));
  }, [cardCount]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => container.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 304;
    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const dotCount = Math.max(1, Math.ceil(cards.length / 3));

  const isRtl = language === "he";

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-96 mb-8 mx-auto" />
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-72 h-72 bg-gray-200 rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (cards.length === 0) return null;

  return (
    <ScrollReveal>
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {t({ he: "גלה את תאילנד", en: "Discover Thailand" })}
              </h2>
              <p className="text-gray-600 text-lg">
                {t({
                  he: "מאמרים, טיפים ושיעורי תאילנדית לטיול המושלם",
                  en: "Articles, tips and Thai lessons for the perfect trip",
                })}
              </p>
            </div>
            <Link href="/articles">
              <span className="hidden md:inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                {t({ he: "הצג הכל", en: "View All" })}
                {isRtl ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </Link>
          </div>

          {/* Carousel wrapper */}
          <div className="relative group">
            {/* Left arrow */}
            <button
              onClick={() => scroll(isRtl ? "right" : "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:shadow-xl -translate-x-1/2 hidden md:flex items-center justify-center"
              aria-label={t({ he: "הקודם", en: "Previous" })}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => scroll(isRtl ? "left" : "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:shadow-xl translate-x-1/2 hidden md:flex items-center justify-center"
              aria-label={t({ he: "הבא", en: "Next" })}
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Right-edge fade gradient */}
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-[5] pointer-events-none" />

            {/* Scrollable container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
              dir="ltr"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {cards.map((card) => (
                <Link
                  key={`${card.type}-${card.id}`}
                  href={card.href}
                >
                  <div className="flex-shrink-0 w-72 sm:w-76 md:w-80 snap-start cursor-pointer group/card">
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                      {/* Image area */}
                      <div className="relative h-44 overflow-hidden">
                        {card.image ? (
                          <img
                            src={card.image}
                            alt={language === "he" ? card.titleHe : card.title}
                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center group-hover/card:scale-105 transition-transform duration-500">
                            {card.icon ? (
                              <span className="text-5xl">{card.icon}</span>
                            ) : (
                              <BookOpen className="w-12 h-12 text-white/70" />
                            )}
                          </div>
                        )}

                        {/* Category tag pill */}
                        <div
                          className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} ${getCategoryColor(card.category)} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}
                        >
                          {card.category}
                        </div>

                        {/* Views badge for articles */}
                        {card.type === "article" && card.views != null && card.views > 0 && (
                          <div className={`absolute top-3 ${isRtl ? "left-3" : "right-3"} bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1`}>
                            <Eye className="w-3 h-3" />
                            {card.views}
                          </div>
                        )}
                      </div>

                      {/* Content area */}
                      <div className="p-4" dir={isRtl ? "rtl" : "ltr"}>
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover/card:text-blue-600 transition-colors text-base">
                          {language === "he" ? card.titleHe : card.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {language === "he"
                            ? card.subtitleHe
                            : card.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const container = scrollRef.current;
                  if (!container) return;
                  container.scrollTo({
                    left: i * 304 * 3,
                    behavior: "smooth",
                  });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(activeIndex / 3) === i
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`${t({ he: "עמוד", en: "Page" })} ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile "View All" link */}
          <div className="flex justify-center mt-6 md:hidden">
            <Link href="/articles">
              <span className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                {t({ he: "הצג הכל", en: "View All" })}
                {isRtl ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
