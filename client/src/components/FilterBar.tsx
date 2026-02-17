import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterOption {
  id: string;
  nameEn: string;
  nameHe: string;
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters?: FilterOption[];
  selectedFilter?: string;
  onFilterChange?: (filterId: string | undefined) => void;
  searchPlaceholderEn?: string;
  searchPlaceholderHe?: string;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  filters,
  selectedFilter,
  onFilterChange,
  searchPlaceholderEn = "Search...",
  searchPlaceholderHe = "חיפוש...",
}: FilterBarProps) {
  const { language, t } = useLanguage();

  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-5xl mx-auto space-y-6 px-4">
        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder={language === "he" ? searchPlaceholderHe : searchPlaceholderEn}
            className="pl-12 pr-4 py-5 text-base rounded-xl border-2 border-gray-200 focus:border-gray-400"
          />
        </div>

        {/* Filter pills */}
        {filters && filters.length > 0 && onFilterChange && (
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedFilter === undefined ? "default" : "outline"}
              className="rounded-full px-5"
              size="sm"
              onClick={() => onFilterChange(undefined)}
            >
              {t({ en: "All", he: "הכל" })}
            </Button>
            {filters.map(filter => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                className="rounded-full px-5"
                size="sm"
                onClick={() => onFilterChange(filter.id)}
              >
                {language === "he" ? filter.nameHe : filter.nameEn}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export type { FilterOption, FilterBarProps };
