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
    x: 105,
    y: 99,
    keywords: ["chiang mai", "chiangmai", "צ'אנג מאי"],
    description: "Mountains & temples",
    descriptionHe: "הרים ומקדשים",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    nameHe: "בנגקוק",
    x: 163,
    y: 276,
    keywords: ["bangkok", "בנגקוק"],
    description: "Capital city & cultural hub",
    descriptionHe: "בירה ומרכז תרבותי",
  },
  {
    id: "pattaya",
    name: "Pattaya",
    nameHe: "פטאיה",
    x: 178,
    y: 304,
    keywords: ["pattaya", "פטאיה"],
    description: "Beach resort city",
    descriptionHe: "עיר נופש על החוף",
  },
  {
    id: "phuket",
    name: "Phuket",
    nameHe: "פוקט",
    x: 107,
    y: 480,
    keywords: ["phuket", "פוקט"],
    description: "Beaches & islands",
    descriptionHe: "חופים ואיים",
  },
  {
    id: "krabi",
    name: "Krabi",
    nameHe: "קראבי",
    x: 127,
    y: 440,
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
            {/* Thailand outline — accurate country shape from geographic data */}
            <path
              d="M 301.4 257.0 L 309.7 240.9 L 306.9 210.9 L 278.1 180.4 L 270.9 145.4 L 243.7 116.6 L 219.8 114.4 L 215.4 126.6 L 197.6 127.7 L 187.6 121.0 L 158.2 142.1 L 152.7 110.5 L 154.9 73.3 L 133.8 71.6 L 128.8 50.5 L 114.4 40.0 L 97.7 47.8 L 82.2 63.3 L 60.5 65.0 L 52.2 103.3 L 40.0 109.4 L 59.4 140.4 L 82.2 166.0 L 98.3 189.3 L 90.5 220.4 L 81.1 226.5 L 90.5 244.2 L 113.8 272.5 L 119.4 292.0 L 120.5 308.6 L 136.0 340.8 L 121.6 373.5 L 109.4 410.2 L 102.2 444.0 L 100.5 465.7 L 107.2 485.6 L 111.0 464.5 L 127.1 481.8 L 144.9 501.2 L 151.0 518.9 L 164.3 532.3 L 169.3 526.1 L 195.4 541.7 L 198.7 560.0 L 219.3 555.6 L 228.7 541.1 L 211.5 522.8 L 192.6 518.4 L 174.3 498.4 L 166.5 467.9 L 152.1 435.7 L 131.6 434.6 L 127.7 409.1 L 135.5 378.0 L 147.7 326.4 L 146.6 287.5 L 173.7 287.0 L 172.1 314.7 L 198.2 314.2 L 227.6 330.2 L 215.9 287.5 L 232.6 258.7 L 272.0 251.4 L 301.4 257.0 Z"
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
