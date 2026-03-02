import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span className="text-lg">🇹🇭</span>
                <span
                  className="text-lg font-bold text-gray-900"
                  style={{
                    fontFamily:
                      language === "he"
                        ? "Assistant, sans-serif"
                        : "Playfair Display, serif",
                  }}
                >
                  {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
                </span>
              </div>
            </Link>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={t({ he: "חיפוש", en: "Search" })}
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Language Toggle */}
              <div className="flex gap-0.5 bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage("he")}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    language === "he"
                      ? "bg-slate-800 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="עברית"
                >
                  HE
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    language === "en"
                      ? "bg-slate-800 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="English"
                >
                  EN
                </button>
              </div>

              {/* Profile */}
              <Link href="/profile">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={t({ he: "פרופיל", en: "Profile" })}
                >
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
