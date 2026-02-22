import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { getCategoryById } from "@/data/categories";
import { lessonsData } from "@/data/lessonsData";
import ContentCard, { CardSkeleton } from "@/components/ContentCard";
import ScrollReveal from "@/components/ScrollReveal";

interface CategorySectionProps {
  categoryId: string;
  limit?: number;
}

export default function CategorySection({
  categoryId,
  limit = 3,
}: CategorySectionProps) {
  const { language, t } = useLanguage();
  const cat = getCategoryById(categoryId);

  // For lessons category, we use local data; for others, fetch articles
  const isLessons = categoryId === "lessons";

  const { data, isLoading } = trpc.article.list.useQuery(
    {
      page: 1,
      limit,
      category: cat?.articleCategory,
      isPublished: true,
    },
    { enabled: !isLessons && !!cat?.articleCategory },
  );

  if (!cat) return null;

  const catName = language === "he" ? cat.nameHe : cat.nameEn;

  // Determine cards to show
  const renderCards = () => {
    if (isLessons) {
      const lessons = lessonsData.slice(0, limit);
      return lessons.map(lesson => (
        <ScrollReveal key={lesson.id} delay={0.05 * lesson.id}>
          <ContentCard
            variant="lesson"
            id={lesson.id}
            title={lesson.title}
            titleHe={lesson.titleHebrew}
            icon={lesson.icon}
            phraseCount={lesson.phrases.length}
          />
        </ScrollReveal>
      ));
    }

    if (isLoading) {
      return Array.from({ length: limit }, (_, i) => (
        <CardSkeleton key={i} />
      ));
    }

    const articles = data?.articles;
    if (!articles?.length) {
      return (
        <div className="col-span-full text-center py-8 text-gray-400">
          <p>
            {t({
              he: "תוכן חדש בקרוב...",
              en: "New content coming soon...",
            })}
          </p>
        </div>
      );
    }

    return articles.map((article, i) => (
      <ScrollReveal key={article.id} delay={0.05 * i}>
        <ContentCard
          variant="article"
          id={article.id}
          title={article.title}
          titleHe={article.titleHe}
          excerpt={article.excerpt}
          excerptHe={article.excerptHe}
          category={article.category}
          coverImage={article.coverImage}
          isPremium={article.isPremium}
          publishedAt={article.publishedAt ? new Date(article.publishedAt) : null}
          createdAt={new Date(article.createdAt)}
          views={article.views ?? undefined}
          slug={article.slug}
        />
      </ScrollReveal>
    ));
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-1 h-8 rounded-full ${cat.color}`} />
            <h2 className="text-2xl font-bold text-gray-900">{catName}</h2>
          </div>
          <Link
            href={cat.route}
            className={`flex items-center gap-1 text-sm font-medium ${cat.textColor} hover:underline`}
          >
            {t({ he: "הכל", en: "See all" })}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">{renderCards()}</div>
      </div>
    </section>
  );
}
