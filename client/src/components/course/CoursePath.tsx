import { TOURIST_COURSE_MODULES } from "@/data/touristCourse";

export function CoursePath() {
  return (
    <section className="bg-[oklch(0.97_0.015_80)] py-18" dir="rtl">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-stone-950 md:text-5xl">מסלול של 7 ימים</h2>
          <p className="mt-4 text-lg leading-8 text-stone-700">
            כל יום מתמקד בסיטואציה אחת אמיתית מהטיול. פחות דקדוק, יותר לדבר.
          </p>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-7">
          {TOURIST_COURSE_MODULES.map(module => (
            <article key={module.day} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="text-sm font-black text-emerald-800">יום {module.day}</p>
              <h3 className="mt-3 min-h-12 text-lg font-bold leading-tight text-stone-950">{module.titleHe}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{module.outcomeHe}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
