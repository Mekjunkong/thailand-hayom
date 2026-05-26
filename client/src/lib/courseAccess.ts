import { TOURIST_COURSE } from "@/data/touristCourse";

export const COURSE_PRODUCT_TYPES = [
  "tourist_survival_thai_course",
] as const;

const courseProductTypeSet = new Set<string>(COURSE_PRODUCT_TYPES);
const freeLessonIdSet = new Set<number>(TOURIST_COURSE.freeLessonIds);
const paidLessonIdSet = new Set<number>(TOURIST_COURSE.paidLessonIds);

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
    courseProductTypeSet.has(purchase.productType ?? "")
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
  if (hasPaidAccess) return paidLessonIdSet.has(lessonId);
  return freeLessonIdSet.has(lessonId);
}

export function isFreeLesson(lessonId: number): boolean {
  return freeLessonIdSet.has(lessonId);
}
