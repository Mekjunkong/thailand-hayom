import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, Search, User, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { hasCourseAccess } from "@/lib/courseAccess";
import { trpc } from "@/lib/trpc";
import SearchOverlay from "./SearchOverlay";
import GamificationBar from "./GamificationBar";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: user } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { data: purchases = [] } = trpc.user.getPurchaseHistory.useQuery(
    undefined,
    {
      enabled: Boolean(user),
    }
  );
  const hasPaidAccess = hasCourseAccess(purchases);
  const cta = !user
    ? { href: "/free", label: t({ he: "קבלו 50 ביטויים", en: "Get 50 phrases" }) }
    : hasPaidAccess
      ? {
          href: "/course",
          label: t({ he: "המשך שיעור", en: "Continue lesson" }),
        }
      : {
          href: "/welcome-kit",
          label: t({ he: "פתח קורס", en: "Unlock course" }),
        };
  const navLinks = [
    {
      href: "/course",
      label: t({ he: "הקורס", en: "Course" }),
    },
    {
      href: "/lesson/airport-arrival",
      label: t({ he: "שיעור חינם", en: "Free lesson" }),
    },
    {
      href: "/free",
      label: t({ he: "50 ביטויים", en: "50 phrases" }),
    },
    {
      href: "/articles",
      label: t({ he: "מאמרים", en: "Articles" }),
    },
    {
      href: "/emergency",
      label: t({ he: "חירום", en: "Emergency" }),
    },
  ];
  const profileHref = user ? "/profile" : "/login";
  const profileLabel = user
    ? t({ he: "פרופיל", en: "Profile" })
    : t({ he: "כניסה", en: "Login" });

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

            <div className="hidden items-center gap-5 md:flex">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gray-600 transition-colors hover:text-gray-950"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <GamificationBar />
              </div>

              <Link href={cta.href} className="hidden sm:block">
                <Button className="h-9 rounded-full bg-stone-950 px-4 text-sm font-bold text-white hover:bg-stone-800">
                  {cta.label}
                </Button>
              </Link>

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
              <Link href={profileHref}>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={profileLabel}
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
