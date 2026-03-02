import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = trpc.article.list.useQuery(
    { page: 1, limit: 8, search: query, isPublished: true },
    { enabled: query.length >= 2 },
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex flex-col">
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t({ he: "חפש מאמרים...", en: "Search articles..." })}
          className="flex-1 text-lg bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
        />
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {query.length < 2 ? (
          <p className="text-center text-gray-400 text-sm mt-8">
            {t({
              he: "הקלד לפחות 2 תווים לחיפוש",
              en: "Type at least 2 characters to search",
            })}
          </p>
        ) : data?.articles?.length ? (
          <div className="space-y-1 max-w-lg mx-auto">
            {data.articles.map(article => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                onClick={onClose}
              >
                <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {language === "he" ? article.titleHe : article.title}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {article.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm mt-8">
            {t({ he: "לא נמצאו תוצאות", en: "No results found" })}
          </p>
        )}
      </div>
    </div>
  );
}
