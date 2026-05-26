import { type FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitAuth, type AuthMode } from "@/lib/authApi";

const FALLBACK_REDIRECT = "/interactive-lessons";

function getSafeRedirect(search: string) {
  const redirect = new URLSearchParams(search).get("redirect");

  if (!redirect) return FALLBACK_REDIRECT;
  if (!redirect.startsWith("/") || redirect.startsWith("//")) {
    return FALLBACK_REDIRECT;
  }
  if (
    redirect === "/login" ||
    redirect.startsWith("/login?") ||
    redirect.startsWith("/login#")
  ) {
    return FALLBACK_REDIRECT;
  }

  return redirect;
}

export default function Auth() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<AuthMode>("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.success(isRegister ? "החשבון נוצר בהצלחה" : "התחברת בהצלחה");
      setLocation(redirect);
      window.location.reload();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentication failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-[oklch(0.97_0.015_80)] px-4 pb-16 pt-24"
      dir="rtl"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_420px] md:items-center">
        <section>
          <Link
            href="/"
            className="text-sm font-semibold text-stone-600 hover:text-stone-950"
          >
            חזרה לעמוד הבית
          </Link>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-stone-950 md:text-6xl">
            התחילו לתרגל תאית לטיול שלכם
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700">
            חשבון חינמי שומר את ההתקדמות שלכם ופותח שיעורי ניסיון. אחרי זה
            תוכלו לפתוח את הקורס המלא.
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
              הרשמה
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg px-4 py-2 ${
                !isRegister ? "bg-stone-950 text-white" : "text-stone-600"
              }`}
            >
              כניסה
            </button>
          </div>

          <h2 className="text-2xl font-bold text-stone-950">
            {isRegister ? "צרו חשבון חינמי" : "כניסה לחשבון"}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {isRegister
              ? "שני שיעורי ניסיון מחכים לכם בפנים."
              : "חזרו לשיעור הבא שלכם."}
          </p>

          {isRegister && (
            <label className="mt-6 block text-sm font-semibold text-stone-700">
              שם
              <Input
                value={name}
                onChange={event => setName(event.target.value)}
                className="mt-2"
                autoComplete="name"
              />
            </label>
          )}

          <label className="mt-5 block text-sm font-semibold text-stone-700">
            אימייל
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
            סיסמה
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
            {isSubmitting ? "שולח..." : isRegister ? "התחילו חינם" : "כניסה לקורס"}
          </Button>

          <p className="mt-4 text-center text-xs text-stone-500">
            בלי מנוי חודשי. אפשר לפתוח את הקורס המלא רק אם תרצו.
          </p>
        </form>
      </div>
    </main>
  );
}
