export const PRODUCTS = {
  SMART_TOURIST_PACK: {
    name: "Smart Tourist Pack",
    description: "Complete travel companion for Thailand with 24/7 AI Concierge, Welcome Kit, and local guidance",
    price: 1000, // THB
    priceUSD: 28, // Approximate USD equivalent
    currency: "thb",
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
      price: 8000, // THB
      pricePerPack: 800,
      savings: 2000
    },
    "20_PACKS": {
      quantity: 20,
      price: 15000, // THB
      pricePerPack: 750,
      savings: 5000
    }
  }
} as const;

export type ProductKey = keyof typeof PRODUCTS;
