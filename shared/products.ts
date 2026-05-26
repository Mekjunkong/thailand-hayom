export const PRODUCTS = {
  SMART_TOURIST_PACK: {
    name: "Tourist Survival Thai Course",
    description:
      "Hebrew-first Thai speaking course for Israeli tourists, with survival phrases, audio practice, PDF phrasebook, and emergency scripts",
    price: 79, // ILS (Shekels)
    priceUSD: 22, // Approximate USD equivalent
    currency: "ils",
    features: [
      "7-day practical Thai speaking course",
      "Hebrew explanations for Israeli tourists",
      "Thai phrases for taxis, food, hotels, shopping, and emergencies",
      "Audio practice and listen-repeat flow",
      "Downloadable PDF phrasebook",
      "Emergency scripts and phone cheat sheet",
      "Lifetime access to the course materials",
    ],
  },
  BULK_PRICING: {
    "10_PACKS": {
      quantity: 10,
      price: 690, // ILS (Shekels)
      pricePerPack: 69,
      savings: 100,
    },
    "20_PACKS": {
      quantity: 20,
      price: 1180, // ILS (Shekels)
      pricePerPack: 59,
      savings: 400,
    },
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;

export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    name: "Thailand Hayom Premium",
    description: "Monthly premium subscription — exclusive articles, guides, and insider tips",
    price: 29,
    currency: "ils",
    interval: "month" as const,
    priceInAgorot: 2900,
  },
  ANNUAL: {
    name: "Thailand Hayom Premium (Annual)",
    description: "Annual premium subscription — save 41% compared to monthly",
    price: 199,
    currency: "ils",
    interval: "year" as const,
    priceInAgorot: 19900,
    savingsPercent: 41,
    monthlyEquivalent: 17,
  },
} as const;

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS;
