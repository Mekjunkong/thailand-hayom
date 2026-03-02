import { Link } from "wouter";
import { Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryByArticleCategory } from "@/data/categories";

interface ContentFeedCardProps {
  slug: string;
  title: string;
  titleHe: string;
  excerpt?: string | null;
  excerptHe?: string | null;
  category: string;
  coverImage?: string | null;
  isPremium?: boolean;
  publishedAt?: string | Date | null;
  createdAt: string | Date;
}

export default function ContentFeedCard({
  slug,
  title,
  titleHe,
  excerpt,
  excerptHe,
  category,
  coverImage,
  isPremium,
  publishedAt,
  createdAt,
}: ContentFeedCardProps) {
  const { language } = useLanguage();
  const cat = getCategoryByArticleCategory(category);

  const displayTitle = language === "he" ? titleHe : title;
  const displayExcerpt = language === "he" ? excerptHe : excerpt;

  const dateStr = new Date(publishedAt || createdAt).toLocaleDateString(
    language === "he" ? "he-IL" : "en-US",
    { month: "short", day: "numeric" },
  );

  return (
    <Link href={`/articles/${slug}`}>
      <div className="flex gap-4 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-[100px] h-[75px] rounded-lg overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={displayTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${cat?.gradientFrom ?? "from-blue-400"} ${cat?.gradientTo ?? "to-teal-400"}`}
            />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {cat && (
              <span className={`text-[10px] font-semibold ${cat.textColor}`}>
                {language === "he" ? cat.nameHe : cat.nameEn}
              </span>
            )}
            <span className="text-[10px] text-gray-400">{dateStr}</span>
            {isPremium && <Lock className="h-3 w-3 text-amber-500" />}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
            {displayTitle}
          </h3>
          {displayExcerpt && (
            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
              {displayExcerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
