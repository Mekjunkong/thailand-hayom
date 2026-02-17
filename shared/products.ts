export const PRODUCTS = {
  SMART_TOURIST_PACK: {
    name: "Smart Tourist Pack",
    description: "Complete travel companion for Thailand with 24/7 AI Concierge, Welcome Kit, and local guidance",
    price: 20, // ILS (Shekels)
    priceUSD: 5.50, // Approximate USD equivalent
    currency: "ils",
    features: [
      "24/7 AI Travel Concierge",
      "Full Tourist Welcome Kit (PDF + website access)",
      "Local guidance for food, transport, culture",
      "Thai phrase support and translation",
      "Safety tips and practical travel advice",
      "Chiang Mai discounts and recommendations",
      "Custom itineraries based on weather and budget"
    ]
  },
  BULK_PRICING: {
    "10_PACKS": {
      quantity: 10,
      price: 160, // ILS (Shekels)
      pricePerPack: 16,
      savings: 40
    },
    "20_PACKS": {
      quantity: 20,
      price: 300, // ILS (Shekels)
      pricePerPack: 15,
      savings: 100
    }
  }
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
