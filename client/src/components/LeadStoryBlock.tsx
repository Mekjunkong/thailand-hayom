import { useState } from "react";
import { Link } from "wouter";
import { Calendar, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { getCategoryByArticleCategory } from "@/data/categories";
import { CardSkeleton } from "@/components/ContentCard";

export default function LeadStoryBlock() {
  const { language, t } = useLanguage();
  const { data, isLoading } = trpc.article.list.useQuery({
    page: 1,
    limit: 4,
    isPublished: true,
  });
  const [leadImgError, setLeadImgError] = useState(false);

  if (isLoading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <CardSkeleton />
            </div>
            <div className="md:col-span-2 space-y-4">
              {[1, 2, 3].map(i => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const articles = data?.articles;
  if (!articles?.length) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p className="text-lg">
            {t({ he: "מאמרים בקרוב...", en: "Articles coming soon..." })}
          </p>
        </div>
      </section>
    );
  }

  const lead = articles[0];
  const sideStories = articles.slice(1, 4);
  const leadCat = getCategoryByArticleCategory(lead.category);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(
      language === "he" ? "he-IL" : "en-US",
      { year: "numeric", month: "short", day: "numeric" },
    );
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Lead story — 60% */}
          <Link
            href={`/articles/${lead.slug}`}
            className="md:col-span-3 group"
          >
            <article className="relative rounded-2xl overflow-hidden bg-gray-100 cursor-pointer">
              {/* Cover image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* Image or gradient fallback */}
                {lead.coverImage && !leadImgError ? (
                  <img
                    src={lead.coverImage}
                    alt=""
                    onError={() => setLeadImgError(true)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${leadCat?.gradientFrom ?? "from-blue-400"} ${leadCat?.gradientTo ?? "to-teal-400"}`}
                  />
                )}
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category badge */}
                {leadCat && (
                  <span
                    className={`absolute top-4 left-4 ${leadCat.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}
                  >
                    {language === "he" ? leadCat.nameHe : leadCat.nameEn}
                  </span>
                )}

                {/* Premium badge */}
                {lead.isPremium && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {t({ he: "פרימיום", en: "Premium" })}
                  </span>
                )}

                {/* Title + excerpt overlaid on image bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {language === "he" ? lead.titleHe : lead.title}
                  </h2>
                  {(lead.excerpt || lead.excerptHe) && (
                    <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-3">
                      {language === "he" ? lead.excerptHe : lead.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(lead.publishedAt || lead.createdAt)}
                    </span>
                    {lead.views != null && lead.views > 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {lead.views!.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Link>

          {/* Side stories — 40% */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {sideStories.map(article => {
              const cat = getCategoryByArticleCategory(article.category);
              return (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group"
                >
                  <article className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={
                            language === "he"
                              ? article.titleHe
                              : article.title
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${cat?.gradientFrom ?? "from-blue-400"} ${cat?.gradientTo ?? "to-teal-400"}`}
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      {cat && (
                        <span
                          className={`text-xs font-medium ${cat.textColor} mb-1 block`}
                        >
                          {language === "he" ? cat.nameHe : cat.nameEn}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1">
                        {language === "he"
                          ? article.titleHe
                          : article.title}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {formatDate(
                          article.publishedAt || article.createdAt,
                        )}
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
