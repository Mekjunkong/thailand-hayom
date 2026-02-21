import { Clock, Banknote, Route, Sunrise } from "lucide-react";
import type { TripRoute } from "@shared/tripRoutes";

interface TripSummaryFooterProps {
  route: TripRoute;
}

export default function TripSummaryFooter({ route }: TripSummaryFooterProps) {
  const totalStayMinutes = route.stops.reduce(
    (sum, s) => sum + s.stayMinutes,
    0
  );
  const totalDriveMinutes = route.stops.reduce(
    (sum, s) => sum + (s.driveToNext ?? 0),
    0
  );
  const totalEntranceFees = route.stops.reduce(
    (sum, s) => sum + s.entranceFee,
    0
  );

  const stats = [
    {
      icon: Sunrise,
      label: "Departure",
      value: route.departureTime,
    },
    {
      icon: Clock,
      label: "Total time",
      value: `~${route.totalHours} hrs`,
    },
    {
      icon: Route,
      label: "Driving",
      value: `${Math.round(totalDriveMinutes / 60 * 10) / 10} hrs`,
    },
    {
      icon: Banknote,
      label: "Budget",
      value: `฿${route.estimatedBudget.toLocaleString()}`,
    },
  ];

  return (
    <div className="bg-card/80 backdrop-blur-sm border rounded-xl p-4 mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(stat => (
          <div key={stat.label} className="flex items-center gap-2.5">
            <div className="bg-primary/10 p-2 rounded-lg">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                {stat.label}
              </p>
              <p className="text-sm font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
        <span>
          Exploring: {Math.round(totalStayMinutes / 60 * 10) / 10} hrs
        </span>
        <span>Entrance fees: ฿{totalEntranceFees}</span>
        <span>{route.stops.length} stops</span>
      </div>
    </div>
  );
}
