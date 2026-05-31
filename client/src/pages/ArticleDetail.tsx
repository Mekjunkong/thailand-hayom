import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Calendar,
  Tag,
  Clock,
  ArrowLeft,
  Crown,
  Loader2,
} from "lucide-react";
import { useEffect } from "react";
import { trpc } from "@/lib/trpc";
import PremiumPaywall from "@/components/PremiumPaywall";
import { getCategoryByArticleCategory } from "@/data/categories";
import { getFeaturedArticleBySlug } from "@/data/featuredArticles";

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const { language, t } = useLanguage();
  const slug = params?.slug || "";
  const staticArticle = getFeaturedArticleBySlug(slug);

  const { data: dbArticle, isLoading, error } = trpc.article.getBySlug.useQuery(
    { slug },
    { enabled: !!slug && !staticArticle },
  );
  const article = staticArticle ?? dbArticle;

  // Set page title for SEO
  useEffect(() => {
    if (article) {
      const title =
        language === "he" ? article.titleHe : article.title;
      document.title = `${title} | Thailand Hayom`;
    }
  }, [article, language]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-16">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  // Error / not found state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {t({ he: "המאמר לא נמצא", en: "Article Not Found" })}
          </h1>
          <Link href="/articles">
            <Button>
              {t({ he: "חזרה למאמרים", en: "Back to Articles" })}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const content =
    language === "he" ? article.contentHe : article.content;
  const title =
    language === "he" ? article.titleHe : article.title;
  const excerpt =
    language === "he" ? article.excerptHe : article.excerpt;

  const categoryInfo = getCategoryByArticleCategory(article.category);
  const categoryName = categoryInfo
    ? language === "he"
      ? categoryInfo.nameHe
      : categoryInfo.nameEn
    : article.category;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/articles">
          <Button variant="ghost" className="mb-8 hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t({ he: "חזרה למאמרים", en: "Back to Articles" })}
          </Button>
        </Link>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-blue-500" />
          <span className="text-lg font-semibold text-blue-600">
            {categoryName}
          </span>
          {article.isPremium && (
            <div className="ml-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Crown className="w-4 h-4" />
              {t({ he: "פרימיום", en: "Premium" })}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
          {article.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString(
                  language === "he" ? "he-IL" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </span>
            </div>
          )}
          {article.views != null && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>
                {article.views}{" "}
                {t({ he: "צפיות", en: "views" })}
              </span>
            </div>
          )}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed italic">
            {excerpt}
          </p>
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-ul:my-6 prose-li:my-2
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{
            __html: content
              .replace(/^### (.*$)/gim, "<h3>$1</h3>")
              .replace(/^## (.*$)/gim, "<h2>$1</h2>")
              .replace(/^# (.*$)/gim, "<h1>$1</h1>")
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br />"),
          }}
        />

        {/* Premium Paywall (gated content) */}
        {article.gated && <PremiumPaywall />}
      </article>

      {/* CTA Section (only for non-gated articles) */}
      {!article.gated && (
        <section className="py-20 bg-[oklch(50%_0.20_265)] text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t({ he: "רוצים לתרגל את זה לפני הטיסה?", en: "Want to practice this before the flight?" })}
              </h2>
              <p className="text-xl mb-10 opacity-90">
                {t({
                  he: "הורידו את חבילת 50 הביטויים בחינם, ואז המשיכו לשני השיעורים החינמיים בקורס. אין כאן הבטחות קסם — רק תרגול מעשי למטיילים.",
                  en: "Download the free 50-phrase pack, then continue to the two free course lessons. No magic promises — just practical practice for travelers.",
                })}
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/free">
                  <Button
                    size="lg"
                    className="px-10 py-7 text-lg bg-white text-[oklch(50%_0.20_265)] hover:bg-gray-50 font-bold rounded-xl shadow-2xl"
                  >
                    {t({ he: "פתחו את החבילה החינמית", en: "Open the free pack" })}
                  </Button>
                </Link>
                <Link href="/course">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-10 py-7 text-lg border-white bg-transparent text-white hover:bg-white/10 font-bold rounded-xl"
                  >
                    {t({ he: "ראו את הקורס", en: "See the course" })}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
