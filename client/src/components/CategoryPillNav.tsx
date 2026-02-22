import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/categories";

export default function CategoryPillNav() {
  const { language } = useLanguage();

  return (
    <section className="py-6 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} href={cat.route}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all hover:shadow-md hover:-translate-y-0.5 ${cat.borderColor} ${cat.textColor} bg-white hover:bg-gray-50`}
                >
                  <Icon className="h-4 w-4" />
                  {language === "he" ? cat.nameHe : cat.nameEn}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
