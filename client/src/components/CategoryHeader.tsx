import { useLanguage } from "@/contexts/LanguageContext";
import type { Category } from "@/data/categories";

interface CategoryHeaderProps {
  category: Category;
  count?: number;
}

export default function CategoryHeader({
  category,
  count,
}: CategoryHeaderProps) {
  const { language, t } = useLanguage();
  const Icon = category.icon;

  return (
    <section
      className={`bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} text-white py-16 pt-32`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <Icon className="w-12 h-12 mx-auto mb-4 text-white/90" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {language === "he" ? category.nameHe : category.nameEn}
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          {language === "he" ? category.descriptionHe : category.descriptionEn}
        </p>
        {count !== undefined && (
          <p className="text-sm text-white/70 mt-2">
            {t({ en: `${count} items`, he: `${count} פריטים` })}
          </p>
        )}
      </div>
    </section>
  );
}
