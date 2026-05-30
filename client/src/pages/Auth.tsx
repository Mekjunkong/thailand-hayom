import { type FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitAuth, type AuthMode } from "@/lib/authApi";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTitle } from "@/hooks/usePageTitle";

const FALLBACK_REDIRECT = "/interactive-lessons";

function getSafeRedirect(search: string) {
  const redirect = new URLSearchParams(search).get("redirect");
  if (!redirect) return FALLBACK_REDIRECT;
  if (!redirect.startsWith("/") || redirect.startsWith("//"))
    return FALLBACK_REDIRECT;
  if (
    redirect === "/login" ||
    redirect.startsWith("/login?") ||
    redirect.startsWith("/login#")
  )
    return FALLBACK_REDIRECT;
  return redirect;
}

export default function Auth() {
  const [, setLocation] = useLocation();
  const { language, t } = useLanguage();
  const dir = language === "he" ? "rtl" : "ltr";
  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePageTitle(t({ he: "כניסה / הרשמה", en: "Login / Register" }));

  const redirect = getSafeRedirect(window.location.search);
  const isRegister = mode === "register";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitAuth(mode, {
        email,
        password,
        name: isRegister ? name : undefined,
      });
      toast.success(
        isRegister
          ? t({ he: "החשבון נוצר בהצלחה", en: "Account created successfully" })
          : t({ he: "התחברת בהצלחה", en: "Logged in successfully" })
      );
      setLocation(redirect);
      window.location.reload();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentication failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-[oklch(0.98_0.012_82)] px-4 pb-16 pt-24"
      dir={dir}
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_420px] md:items-center">
        <section>
          <Link
            href="/"
            className="text-sm font-semibold text-stone-600 hover:text-stone-950"
          >
            {t({ he: "חזרה לעמוד הבית", en: "Back to home" })}
          </Link>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-stone-950 md:text-6xl">
            {t({
              he: "התחילו לתרגל תאית לטיול שלכם",
              en: "Start practicing Thai for your trip",
            })}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700">
            {t({
              he: "חשבון חינמי שומר את ההתקדמות שלכם ופותח שיעורי ניסיון. אחרי זה תוכלו לפתוח את הקורס המלא.",
              en: "A free account saves your progress and unlocks trial lessons. You can then unlock the full course.",
            })}
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-stone-100 p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-lg px-4 py-2 ${
                isRegister ? "bg-stone-950 text-white" : "text-stone-600"
              }`}
            >
              {t({ he: "הרשמה", en: "Register" })}
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg px-4 py-2 ${
                !isRegister ? "bg-stone-950 text-white" : "text-stone-600"
              }`}
            >
              {t({ he: "כניסה", en: "Login" })}
            </button>
          </div>

          <h2 className="text-2xl font-bold text-stone-950">
            {isRegister
              ? t({ he: "צרו חשבון חינמי", en: "Create a free account" })
              : t({ he: "כניסה לחשבון", en: "Sign in to your account" })}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {isRegister
              ? t({
                  he: "שני שיעורי ניסיון מחכים לכם בפנים.",
                  en: "Two free trial lessons are waiting for you.",
                })
              : t({
                  he: "חזרו לשיעור הבא שלכם.",
                  en: "Continue your next lesson.",
                })}
          </p>

          {isRegister && (
            <label className="mt-6 block text-sm font-semibold text-stone-700">
              {t({ he: "שם", en: "Name" })}
              <Input
                value={name}
                onChange={event => setName(event.target.value)}
                className="mt-2"
                autoComplete="name"
              />
            </label>
          )}

          <label className="mt-5 block text-sm font-semibold text-stone-700">
            {t({ he: "אימייל", en: "Email" })}
            <Input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="mt-2"
              autoComplete="email"
              required
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-stone-700">
            {t({ he: "סיסמה", en: "Password" })}
            <Input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="mt-2"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </label>

          <Button
            type="submit"
            className="mt-6 h-12 w-full rounded-xl bg-stone-950 text-base font-bold text-white hover:bg-stone-800"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? t({ he: "שולח...", en: "Submitting..." })
              : isRegister
                ? t({ he: "התחילו חינם", en: "Start for free" })
                : t({ he: "כניסה לקורס", en: "Sign in" })}
          </Button>

          <p className="mt-4 text-center text-xs text-stone-500">
            {t({
              he: "בלי מנוי חודשי. אפשר לפתוח את הקורס המלא רק אם תרצו.",
              en: "No monthly subscription. Unlock the full course only if you want to.",
            })}
          </p>
        </form>
      </div>
    </main>
  );
}
