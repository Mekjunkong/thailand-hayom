import { Link } from "wouter";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Article {
  id: number;
  title: string;
  titleHe: string;
  slug: string;
  excerpt?: string | null;
  excerptHe?: string | null;
  category: string;
  coverImage?: string | null;
  isPremium: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { language, t } = useLanguage();

  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden cursor-pointer group relative">
        {/* Article Image with Overlay */}
        <div className="relative h-56 bg-gradient-to-br from-blue-100 to-teal-100 overflow-hidden">
          {/* Premium Badge */}
          {article.isPremium && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10 flex items-center gap-2">
              <span>👑</span>
              {t({ he: "פרימיום", en: "Premium" })}
            </div>
          )}

          {/* Cover Image */}
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={language === 'he' ? article.titleHe : article.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 group-hover:scale-110 transition-transform duration-700" />
          )}

          {/* Hover Overlay with "Read More" */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
            <div className="flex items-center gap-2 text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {t({ he: "קרא עוד", en: "Read More" })}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-600 capitalize">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {language === 'he' ? article.titleHe : article.title}
          </h3>

          {/* Excerpt - Expands slightly on hover */}
          {(article.excerpt || article.excerptHe) && (
            <p className="text-gray-600 mb-4 leading-relaxed transition-all duration-300 line-clamp-3 group-hover:text-gray-800">
              {language === 'he' ? article.excerptHe : article.excerpt}
            </p>
          )}

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(article.publishedAt || article.createdAt).toLocaleDateString(
                language === 'he' ? 'he-IL' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
          </div>
        </div>

        {/* Bottom border accent that appears on hover */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Link>
  );
}
