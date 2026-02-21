import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Timer,
  Banknote,
  ChevronDown,
  ChevronUp,
  Car,
} from "lucide-react";
import type { TripStop } from "@shared/tripRoutes";

interface TripStopCardProps {
  stop: TripStop;
  isActive: boolean;
}

export default function TripStopCard({ stop, isActive }: TripStopCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden bg-card border shadow-lg h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Photo / gradient hero */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${stop.gradient}`}
        />
        <img
          src={stop.photoUrl}
          alt={stop.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={e => {
            // Falls back to gradient if image fails
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Stop number badge */}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
          {stop.stopNumber}
        </div>

        {/* Entrance fee badge */}
        {stop.entranceFee > 0 && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <Banknote className="w-3 h-3" />
            ฿{stop.entranceFee}
          </div>
        )}

        {/* Name overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">
            {stop.name}
          </h3>
        </div>
      </div>

      {/* Info section */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* Time badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {stop.arrivalTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
            <Timer className="w-3 h-3" />
            {stop.stayMinutes} min
          </span>
          {stop.entranceFee === 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full">
              Free
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {stop.description}
        </p>

        {/* Activities list */}
        <div className="flex-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-2 hover:underline"
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
            {stop.activities.length} activities
          </button>

          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <ul className="space-y-1.5">
              {stop.activities.map((activity, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary/60 shrink-0" />
                    <span className="text-foreground">{activity.name}</span>
                  </span>
                  <span className="text-muted-foreground text-xs whitespace-nowrap ml-2">
                    {activity.duration} min
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Drive to next stop */}
        {stop.driveToNext != null && stop.driveToNext > 0 && (
          <div className="pt-2 border-t flex items-center gap-2 text-xs text-muted-foreground">
            <Car className="w-3.5 h-3.5" />
            <span>
              {stop.driveToNext} min drive to next stop
            </span>
            <div className="flex-1 border-t border-dashed border-muted-foreground/30" />
            <span className="text-primary font-medium">→</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
