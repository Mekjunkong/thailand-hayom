import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Menu,
  Home,
  FileText,
  GraduationCap,
  BookOpen,
  ShieldAlert,
} from "lucide-react";

const navLinks = [
  {
    href: "/",
    labelHe: "בית",
    labelEn: "Home",
    icon: Home,
  },
  {
    href: "/articles",
    labelHe: "מאמרים",
    labelEn: "Articles",
    icon: FileText,
  },
  {
    href: "/interactive-lessons",
    labelHe: "שיעורים",
    labelEn: "Lessons",
    icon: GraduationCap,
  },
  {
    href: "/blog",
    labelHe: "בלוג",
    labelEn: "Blog",
    icon: BookOpen,
  },
  {
    href: "/emergency",
    labelHe: "חירום",
    labelEn: "Emergency",
    icon: ShieldAlert,
  },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  scrolled || !isHome ? "text-gray-900" : "text-white"
                }`}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <button
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? scrolled || !isHome
                        ? "bg-blue-50 text-blue-600"
                        : "bg-white/20 text-white"
                      : scrolled || !isHome
                        ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {language === "he" ? link.labelHe : link.labelEn}
                </button>
              </Link>
            ))}
          </div>

          {/* Language Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Compact Language Toggle */}
            <div className="flex gap-1 bg-white/90 backdrop-blur-sm rounded-full p-0.5 shadow-sm">
              <button
                onClick={() => setLanguage("he")}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                  language === "he"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="עברית"
              >
                HE
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                  language === "en"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`md:hidden ${
                    scrolled || !isHome
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">
                    {t({ he: "תפריט", en: "Menu" })}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={language === "he" ? "right" : "left"}
                className="w-72"
              >
                <SheetHeader>
                  <SheetTitle
                    className="text-xl"
                    style={{
                      fontFamily:
                        language === "he"
                          ? "Assistant, sans-serif"
                          : "Playfair Display, serif",
                    }}
                  >
                    {t({ he: "תאילנד היום", en: "Thailand Hayom" })}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6">
                  {navLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link key={link.href} href={link.href}>
                        <button
                          onClick={() => setMobileOpen(false)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActive(link.href)
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {language === "he" ? link.labelHe : link.labelEn}
                        </button>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
