import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Newspaper } from "lucide-react";

export default function NewsTicker() {
  const { language, t } = useLanguage();
  const { data } = trpc.article.list.useQuery({
    page: 1,
    limit: 5,
    isPublished: true,
  });

  const articles = data?.articles;
  if (!articles?.length) return null;

  // Duplicate for seamless infinite scroll
  const items = [...articles, ...articles];

  return (
    <div className="bg-slate-900 text-white overflow-hidden border-b border-slate-700">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 bg-red-600 px-4 py-2 flex items-center gap-2 z-10">
          <Newspaper className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-wide">
            {t({ he: "חדשות", en: "Latest" })}
          </span>
        </div>

        {/* Scrolling headlines */}
        <div className="relative flex-1 overflow-hidden py-2">
          <div
            className="flex gap-8 whitespace-nowrap animate-ticker"
            style={{
              animationDirection:
                language === "he" ? "reverse" : "normal",
            }}
          >
            {items.map((article, i) => (
              <Link
                key={`${article.id}-${i}`}
                href={`/articles/${article.slug}`}
                className="text-sm text-gray-300 hover:text-white transition-colors flex-shrink-0"
              >
                <span className="text-red-400 mx-2">●</span>
                {language === "he" ? article.titleHe : article.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
