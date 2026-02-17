import { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

interface City {
  id: string;
  name: string;
  nameHe: string;
  x: number; // SVG coordinates
  y: number;
  keywords: string[]; // Keywords to match in articles
  description: string;
  descriptionHe: string;
}

const cities: City[] = [
  {
    id: "chiang-mai",
    name: "Chiang Mai",
    nameHe: "צ'אנג מאי",
    x: 150,
    y: 115,
    keywords: ["chiang mai", "chiangmai", "צ'אנג מאי"],
    description: "Mountains & temples",
    descriptionHe: "הרים ומקדשים",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    nameHe: "בנגקוק",
    x: 230,
    y: 330,
    keywords: ["bangkok", "בנגקוק"],
    description: "Capital city & cultural hub",
    descriptionHe: "בירה ומרכז תרבותי",
  },
  {
    id: "pattaya",
    name: "Pattaya",
    nameHe: "פטאיה",
    x: 255,
    y: 360,
    keywords: ["pattaya", "פטאיה"],
    description: "Beach resort city",
    descriptionHe: "עיר נופש על החוף",
  },
  {
    id: "phuket",
    name: "Phuket",
    nameHe: "פוקט",
    x: 145,
    y: 500,
    keywords: ["phuket", "פוקט"],
    description: "Beaches & islands",
    descriptionHe: "חופים ואיים",
  },
  {
    id: "krabi",
    name: "Krabi",
    nameHe: "קראבי",
    x: 165,
    y: 480,
    keywords: ["krabi", "קראבי"],
    description: "Limestone cliffs & beaches",
    descriptionHe: "צוקי גיר וחופים",
  },
];

export default function ThailandMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const { language, t } = useLanguage();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Map SVG */}
        <div className="relative bg-white/5 rounded-3xl p-8">
          <svg
            viewBox="0 0 400 600"
            className="w-full h-auto"
            style={{ maxHeight: "600px" }}
          >
            {/* Thailand outline — recognizable shape with northern mountains, central plains, and southern peninsula */}
            <path
              d="M 170 60 L 190 55 L 210 60 L 225 50 L 240 55 L 250 70 L 260 65 L 270 75 L 265 90 L 255 100 L 260 115 L 255 130 L 265 140 L 275 155 L 280 170 L 290 180 L 295 195 L 290 210 L 280 220 L 275 240 L 280 255 L 290 270 L 300 280 L 305 295 L 295 310 L 280 320 L 270 335 L 260 345 L 255 360 L 250 375 L 240 385 L 225 390 L 215 400 L 210 415 L 200 425 L 195 440 L 185 450 L 175 460 L 168 475 L 160 485 L 150 495 L 140 510 L 135 525 L 130 540 L 140 545 L 148 535 L 155 520 L 160 510 L 170 505 L 175 495 L 168 485 L 175 475 L 185 465 L 190 450 L 200 440 L 205 425 L 215 415 L 220 400 L 210 395 L 195 390 L 185 380 L 175 370 L 165 355 L 155 340 L 145 330 L 135 320 L 130 305 L 125 290 L 120 275 L 115 260 L 110 245 L 115 230 L 120 215 L 115 200 L 110 185 L 115 170 L 125 155 L 130 140 L 125 125 L 130 110 L 140 100 L 145 85 L 155 75 L 170 60 Z"
              fill="url(#gradient)"
              stroke="#60a5fa"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* City pins */}
            {cities.map((city) => {
              const isHovered = hoveredCity === city.id;
              const isSelected = selectedCity?.id === city.id;
              const isActive = isHovered || isSelected;

              return (
                <g
                  key={city.id}
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => setSelectedCity(city)}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                    transformOrigin: `${city.x}px ${city.y}px`,
                  }}
                >
                  {/* Pin shadow */}
                  <circle
                    cx={city.x}
                    cy={city.y + 2}
                    r={isActive ? 8 : 6}
                    fill="rgba(0,0,0,0.2)"
                    className="transition-all duration-300"
                  />
                  {/* Pin */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isActive ? 8 : 6}
                    fill={isActive ? "#f59e0b" : "#3b82f6"}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  {/* Permanent subtle pulse glow */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="6"
                    fill="none"
                    stroke={isActive ? "#f59e0b" : "#3b82f6"}
                    strokeWidth="1"
                    opacity="0"
                  >
                    <animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Pulse animation for selected */}
                  {isSelected && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="12"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      opacity="0"
                    >
                      <animate
                        attributeName="r"
                        from="8"
                        to="20"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.8"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  {/* City label */}
                  {isHovered && (
                    <text
                      x={city.x}
                      y={city.y - 15}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {language === 'he' ? city.nameHe : city.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="mt-4 text-center text-sm text-gray-400">
            <MapPin className="inline-block w-4 h-4 mr-1 text-blue-400" />
            {t({ he: "לחץ על עיר לראות תוכן", en: "Click a city to see content" })}
          </div>
        </div>

        {/* City info panel */}
        <div className="space-y-6">
          {selectedCity ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {language === 'he' ? selectedCity.nameHe : selectedCity.name}
                  </h3>
                  <p className="text-gray-400">
                    {language === 'he' ? selectedCity.descriptionHe : selectedCity.description}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                {t({
                  he: "גלה מאמרים, מדריכים ואירועים עבור " + selectedCity.nameHe,
                  en: "Discover articles, guides and events for " + selectedCity.name,
                })}
              </p>

              <Link
                href={`/articles?search=${encodeURIComponent(selectedCity.keywords[0])}`}
              >
                <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                  {t({ he: "ראה תוכן", en: "View Content" })}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-white/5 rounded-3xl p-8 border-2 border-dashed border-white/20">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-400 font-medium">
                  {t({
                    he: "בחר עיר במפה כדי לראות מידע",
                    en: "Select a city on the map to see information",
                  })}
                </p>
                <p className="text-gray-500 mt-2">
                  {t({
                    he: "כל העיקריות בתאילנד במקום אחד",
                    en: "All major Thailand destinations in one place",
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Quick city links */}
          <div className="grid grid-cols-2 gap-3">
            {cities.slice(0, 4).map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedCity?.id === city.id
                    ? "border-blue-500 bg-blue-500/10 shadow-md"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:shadow-md"
                }`}
              >
                <div className="font-semibold text-white">
                  {language === 'he' ? city.nameHe : city.name}
                </div>
                <div className="text-sm text-gray-400">
                  {language === 'he' ? city.descriptionHe : city.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
