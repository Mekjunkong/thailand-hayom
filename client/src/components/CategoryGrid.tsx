import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories } from "@/data/categories";
import ScrollReveal from "@/components/ScrollReveal";

export default function CategoryGrid() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={cat.id} delay={index * 0.05}>
                <Link href={cat.route}>
                  <div
                    className={`${cat.color} rounded-2xl p-6 md:p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[160px] md:min-h-[200px] flex flex-col justify-between group`}
                  >
                    <div>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {language === "he" ? cat.nameHe : cat.nameEn}
                      </h3>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {language === "he"
                        ? cat.descriptionHe
                        : cat.descriptionEn}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
