import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFile(path.join(root, relativePath), "utf-8");

describe("Stripe product and currency configuration", () => {
  it("uses ILS currency in the Stripe router", async () => {
    const stripeRouterContent = await read("server/stripeRouter.ts");

    expect(stripeRouterContent).toContain('currency: "ils"');
    expect(stripeRouterContent).not.toContain('currency: "thb"');
  });

  it("uses ILS as default currency in webhook handler", async () => {
    const webhookContent = await read("server/webhookHandler.ts");

    expect(webhookContent).toContain('|| "ils"');
    expect(webhookContent).not.toContain('|| "thb"');
  });

  it("names the one-time product as the Thai speaking course", async () => {
    const productsContent = await read("shared/products.ts");

    expect(productsContent).toContain("Tourist Survival Thai Course");
    expect(productsContent).toContain("Hebrew-first Thai speaking course");
  });

  it("normalizes legacy single checkout metadata to course access", async () => {
    const stripeRouterContent = await read("server/stripeRouter.ts");

    expect(stripeRouterContent).toContain(
      'const COURSE_PRODUCT_TYPE = "tourist_survival_thai_course";'
    );
    expect(stripeRouterContent).toContain("const purchasedProductType =");
    expect(stripeRouterContent).toContain(
      'productType === "single" ? COURSE_PRODUCT_TYPE : productType'
    );
    expect(stripeRouterContent).toContain("product_type: purchasedProductType");
    expect(stripeRouterContent).toContain(
      "purchasedProductType === COURSE_PRODUCT_TYPE"
    );
    expect(stripeRouterContent).toContain("if (purchasedProductType === COURSE_PRODUCT_TYPE)");
    expect(stripeRouterContent).not.toContain("product_type: productType");
  });

  it("still displays shekel symbol in admin and profile pages", async () => {
    const adminContent = await read("client/src/pages/Admin.tsx");
    const profileContent = await read("client/src/pages/Profile.tsx");

    expect(adminContent).toContain("₪");
    expect(profileContent).toContain("₪");
  });
});
