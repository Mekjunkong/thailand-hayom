import { describe, expect, it } from "vitest";
import { TOURIST_COURSE } from "@/data/touristCourse";
import {
  COURSE_PRODUCT_TYPES,
  canAccessLesson,
  getCourseAccessState,
  isCoursePurchase,
} from "./courseAccess";

const completedPurchase = {
  productType: COURSE_PRODUCT_TYPES[0],
  status: "completed",
};

describe("courseAccess", () => {
  it("allows free lessons without a paid purchase", () => {
    expect(canAccessLesson({ lessonId: 1, hasPaidAccess: false })).toBe(true);
    expect(canAccessLesson({ lessonId: 3, hasPaidAccess: false })).toBe(true);
    expect(canAccessLesson({ lessonId: 5, hasPaidAccess: false })).toBe(false);
  });

  it("allows all mapped course lessons for paid users", () => {
    for (const lessonId of TOURIST_COURSE.paidLessonIds) {
      expect(canAccessLesson({ lessonId, hasPaidAccess: true })).toBe(true);
    }
  });

  it("treats completed course-compatible product purchases as paid access", () => {
    expect(isCoursePurchase(completedPurchase)).toBe(true);
    expect(isCoursePurchase({ productType: "single", status: "completed" })).toBe(false);
    expect(isCoursePurchase({ productType: "single", status: "pending" })).toBe(false);
    expect(isCoursePurchase({ productType: "monthly", status: "completed" })).toBe(false);
  });

  it("returns visitor, free, and paid access states", () => {
    expect(getCourseAccessState({ user: null, purchases: [] }).kind).toBe("visitor");
    expect(getCourseAccessState({ user: { id: 1 }, purchases: [] }).kind).toBe("free");
    expect(getCourseAccessState({ user: { id: 1 }, purchases: [completedPurchase] }).kind).toBe("paid");
  });
});
