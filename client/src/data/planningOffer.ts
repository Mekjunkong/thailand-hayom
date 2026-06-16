export const PLANNING_OFFER = {
  whatsappNumber: "66929894495",
  priceIls: 149,
  itineraryPriceRangeIls: "399–699",
  callMinutes: 45,
};

export function getPlanningWhatsAppHref(language: "he" | "en" = "he") {
  const text =
    language === "he"
      ? "שלום, הגעתי מתאילנד היום. אני רוצה שיחת תכנון לטיול בתאילנד ב-₪149."
      : "Hi, I came from Thailand Hayom. I want a Thailand planning call for ₪149.";

  return `https://wa.me/${PLANNING_OFFER.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
