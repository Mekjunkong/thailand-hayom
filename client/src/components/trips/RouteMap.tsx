import { motion } from "framer-motion";
import type { TripStop } from "@shared/tripRoutes";

interface RouteMapProps {
  stops: TripStop[];
  currentIndex: number;
  onStopClick: (index: number) => void;
}

export default function RouteMap({
  stops,
  currentIndex,
  onStopClick,
}: RouteMapProps) {
  return (
    <div className="w-full overflow-x-auto px-2 py-3">
      <svg
        viewBox="0 0 100 20"
        className="w-full min-w-[500px] h-16"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Route line connecting all stops */}
        <path
          d={stops
            .map((stop, i) => {
              const x = 8 + (i / (stops.length - 1)) * 84;
              return `${i === 0 ? "M" : "L"} ${x} 10`;
            })
            .join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-muted-foreground/30"
          strokeDasharray="1 0.5"
        />

        {/* Completed segment */}
        {currentIndex > 0 && (
          <motion.path
            d={stops
              .slice(0, currentIndex + 1)
              .map((_, i) => {
                const x = 8 + (i / (stops.length - 1)) * 84;
                return `${i === 0 ? "M" : "L"} ${x} 10`;
              })
              .join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Drive time labels between stops */}
        {stops.map((stop, i) => {
          if (i === stops.length - 1 || !stop.driveToNext) return null;
          const x1 = 8 + (i / (stops.length - 1)) * 84;
          const x2 = 8 + ((i + 1) / (stops.length - 1)) * 84;
          const midX = (x1 + x2) / 2;
          return (
            <text
              key={`drive-${i}`}
              x={midX}
              y="17.5"
              textAnchor="middle"
              className="fill-muted-foreground text-[1.8px] font-medium"
            >
              {stop.driveToNext}m
            </text>
          );
        })}

        {/* Stop dots */}
        {stops.map((stop, i) => {
          const x = 8 + (i / (stops.length - 1)) * 84;
          const isActive = i === currentIndex;
          const isPast = i < currentIndex;
          return (
            <g
              key={stop.id}
              onClick={() => onStopClick(i)}
              className="cursor-pointer"
            >
              {/* Stop name label */}
              <text
                x={x}
                y="4"
                textAnchor="middle"
                className={`text-[2.2px] font-semibold ${
                  isActive
                    ? "fill-primary"
                    : isPast
                      ? "fill-muted-foreground"
                      : "fill-muted-foreground/60"
                }`}
              >
                {stop.name}
              </text>

              {/* Dot */}
              {isActive ? (
                <>
                  <motion.circle
                    cx={x}
                    cy="10"
                    r="2"
                    className="fill-primary/20"
                    animate={{ r: [2, 3, 2] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <circle
                    cx={x}
                    cy="10"
                    r="1.5"
                    className="fill-primary"
                  />
                  <text
                    x={x}
                    y="10.7"
                    textAnchor="middle"
                    className="fill-primary-foreground text-[1.5px] font-bold"
                  >
                    {stop.stopNumber}
                  </text>
                </>
              ) : (
                <>
                  <circle
                    cx={x}
                    cy="10"
                    r="1.2"
                    className={
                      isPast
                        ? "fill-primary/60"
                        : "fill-muted-foreground/30"
                    }
                  />
                  <text
                    x={x}
                    y="10.6"
                    textAnchor="middle"
                    className={`text-[1.3px] font-bold ${
                      isPast
                        ? "fill-primary-foreground"
                        : "fill-muted-foreground"
                    }`}
                  >
                    {stop.stopNumber}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
