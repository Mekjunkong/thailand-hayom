import { Link } from "wouter";
import { Calendar, Eye, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { getCategoryByArticleCategory } from "@/data/categories";

// ---------------------------------------------------------------------------
// Prop types
// ---------------------------------------------------------------------------

interface ArticleCardProps {
  variant: "article";
  id: number;
  title: string;
  titleHe: string;
  excerpt?: string | null;
  excerptHe?: string | null;
  category: string;
  coverImage?: string | null;
  isPremium?: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
  views?: number;
  slug: string;
}

interface LessonCardProps {
  variant: "lesson";
  id: number;
  title: string;
  titleHe: string;
  icon: string;
  phraseCount: number;
  progress?: number;
  isCompleted?: boolean;
  onClick?: () => void;
}

interface EventCardProps {
  variant: "event";
  id: number;
  title: string;
  titleHe: string;
  excerpt?: string | null;
  excerptHe?: string | null;
  coverImage?: string | null;
  date: string;
  location: string;
  isOpen?: boolean;
}

type ContentCardProps = ArticleCardProps | LessonCardProps | EventCardProps;

// ---------------------------------------------------------------------------
// Shared card wrapper styles
// ---------------------------------------------------------------------------

const cardBase =
  "bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer group";

// ---------------------------------------------------------------------------
// Article variant
// ---------------------------------------------------------------------------

function ArticleVariant(props: ArticleCardProps) {
  const { language, t } = useLanguage();
  const cat = getCategoryByArticleCategory(props.category);

  const displayTitle = language === "he" ? props.titleHe : props.title;
  const displayExcerpt =
    language === "he" ? props.excerptHe : props.excerpt;

  const dateStr = new Date(
    props.publishedAt || props.createdAt,
  ).toLocaleDateString(language === "he" ? "he-IL" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/articles/${props.slug}`}>
      <div className={cardBase}>
        {/* Image area -- 16:9 */}
        <div className="relative aspect-video overflow-hidden">
          {props.coverImage ? (
            <img
              src={props.coverImage}
              alt={displayTitle}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cat?.gradientFrom ?? "from-blue-400"} ${cat?.gradientTo ?? "to-teal-400"}`}
            />
          )}

          {/* Category badge -- top-left */}
          {cat && (
            <span
              className={`absolute top-3 left-3 ${cat.color} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
            >
              {language === "he" ? cat.nameHe : cat.nameEn}
            </span>
          )}

          {/* Premium badge -- top-right */}
          {props.isPremium && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              {t({ he: "פרימיום", en: "Premium" })}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-1">
            {displayTitle}
          </h3>

          {displayExcerpt && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {displayExcerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {dateStr}
            </span>
            {props.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {props.views.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Lesson variant
// ---------------------------------------------------------------------------

function LessonVariant(props: LessonCardProps) {
  const { language, t } = useLanguage();

  const displayTitle = language === "he" ? props.titleHe : props.title;
  const progress = props.progress ?? 0;

  const inner = (
    <div className={cardBase}>
      {/* Image area -- emoji on amber gradient */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
        <span className="text-6xl select-none" role="img" aria-label="lesson icon">
          {props.icon}
        </span>

        {/* "Lesson N" badge -- top-left */}
        <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {t({ he: `שיעור ${props.id}`, en: `Lesson ${props.id}` })}
        </span>

        {/* Done badge -- top-right */}
        {props.isCompleted && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {t({ he: "הושלם", en: "Done" })}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-1">
          {displayTitle}
        </h3>

        {/* Meta row */}
        <p className="text-xs text-gray-500 mb-2">
          {t({
            he: `${props.phraseCount} ביטויים`,
            en: `${props.phraseCount} phrases`,
          })}
        </p>

        {/* Progress bar */}
        {progress > 0 && (
          <Progress value={progress} className="h-1.5" />
        )}
      </div>
    </div>
  );

  if (props.onClick) {
    return (
      <div onClick={props.onClick} role="button" tabIndex={0}>
        {inner}
      </div>
    );
  }

  return <Link href={`/lesson/${props.id}`}>{inner}</Link>;
}

// ---------------------------------------------------------------------------
// Event variant
// ---------------------------------------------------------------------------

function EventVariant(props: EventCardProps) {
  const { language, t } = useLanguage();

  const displayTitle = language === "he" ? props.titleHe : props.title;
  const displayExcerpt =
    language === "he" ? props.excerptHe : props.excerpt;

  return (
    <div className={cardBase}>
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden">
        {props.coverImage ? (
          <img
            src={props.coverImage}
            alt={displayTitle}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-violet-600" />
        )}

        {/* "Event" badge -- top-left */}
        <span className="absolute top-3 left-3 bg-violet-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {t({ he: "אירוע", en: "Event" })}
        </span>

        {/* Open badge -- top-right */}
        {props.isOpen && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {t({ he: "פתוח", en: "Open" })}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-1">
          {displayTitle}
        </h3>

        {displayExcerpt && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {displayExcerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {props.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {props.location}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardSkeleton
// ---------------------------------------------------------------------------

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Image placeholder */}
      <div className="aspect-video bg-gray-200 animate-pulse" />

      <div className="p-4 space-y-3">
        {/* Title bar */}
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
        {/* Description bar */}
        <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-gray-200 animate-pulse" />
        {/* Meta bar */}
        <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main ContentCard component
// ---------------------------------------------------------------------------

export default function ContentCard(props: ContentCardProps) {
  switch (props.variant) {
    case "article":
      return <ArticleVariant {...props} />;
    case "lesson":
      return <LessonVariant {...props} />;
    case "event":
      return <EventVariant {...props} />;
  }
}
