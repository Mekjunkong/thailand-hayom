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
