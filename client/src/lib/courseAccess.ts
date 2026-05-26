import { TOURIST_COURSE } from "@/data/touristCourse";

export const COURSE_PRODUCT_TYPES = [
  "tourist_survival_thai_course",
  "smart_tourist_pack",
  "single",
] as const;

export type CourseAccessKind = "visitor" | "free" | "paid";

export type PurchaseLike = {
  productType?: string | null;
  status?: string | null;
};

export type UserLike = {
  id?: number | string | null;
} | null;

export function isCoursePurchase(purchase: PurchaseLike): boolean {
  return (
    purchase.status === "completed" &&
    COURSE_PRODUCT_TYPES.includes(purchase.productType as (typeof COURSE_PRODUCT_TYPES)[number])
  );
}

export function hasCourseAccess(purchases: PurchaseLike[] = []): boolean {
  return purchases.some(isCoursePurchase);
}

export function getCourseAccessState({
  user,
  purchases,
}: {
  user: UserLike;
  purchases: PurchaseLike[];
}): { kind: CourseAccessKind; hasPaidAccess: boolean } {
  if (!user) return { kind: "visitor", hasPaidAccess: false };
  const paid = hasCourseAccess(purchases);
  return { kind: paid ? "paid" : "free", hasPaidAccess: paid };
}

export function canAccessLesson({
  lessonId,
  hasPaidAccess,
}: {
  lessonId: number;
  hasPaidAccess: boolean;
}): boolean {
  if (hasPaidAccess) return TOURIST_COURSE.paidLessonIds.includes(lessonId as never);
  return TOURIST_COURSE.freeLessonIds.includes(lessonId as never);
}

export function isFreeLesson(lessonId: number): boolean {
  return TOURIST_COURSE.freeLessonIds.includes(lessonId as never);
}
