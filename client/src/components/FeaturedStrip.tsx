import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { lessonsData } from "@/data/lessonsData";
import ContentCard, { CardSkeleton } from "@/components/ContentCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function FeaturedStrip() {
  const { t } = useLanguage();

  const { data, isLoading } = trpc.article.list.useQuery({
    page: 1,
    limit: 3,
    isPublished: true,
  });

  const articles = data?.articles ?? [];
  const featuredLesson = lessonsData[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {t({ he: "מומלצים", en: "Featured" })}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured lesson card */}
          <ScrollReveal delay={0}>
            <ContentCard
              variant="lesson"
              id={featuredLesson.id}
              title={featuredLesson.title}
              titleHe={featuredLesson.titleHebrew}
              icon={featuredLesson.icon}
              phraseCount={featuredLesson.phrases.length}
            />
          </ScrollReveal>

          {/* Featured articles */}
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ScrollReveal key={`skeleton-${i}`} delay={0.1 * (i + 1)}>
                  <CardSkeleton />
                </ScrollReveal>
              ))
            : articles.map((article, i) => (
                <ScrollReveal key={article.id} delay={0.1 * (i + 1)}>
                  <ContentCard
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
                </ScrollReveal>
              ))}
        </div>
      </div>
    </section>
  );
}
