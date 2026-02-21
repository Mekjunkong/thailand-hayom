import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import TripStopCard from "@/components/trips/TripStopCard";
import RouteMap from "@/components/trips/RouteMap";
import TripSummaryFooter from "@/components/trips/TripSummaryFooter";
import { chiangMaiOneDay } from "@shared/tripRoutes";

export default function ChiangMaiTrip() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const handleApiChange = useCallback(
    (emblaApi: CarouselApi) => {
      setApi(emblaApi);
      if (!emblaApi) return;

      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    },
    []
  );

  const scrollToStop = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const route = chiangMaiOneDay;
  const currentStop = route.stops[currentIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background gradient that changes with current stop */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${currentStop.gradient} opacity-10`}
          key={currentStop.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative max-w-5xl mx-auto px-4 pt-6 pb-2">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Title */}
          <div className="flex items-start gap-3 mb-1">
            <div className="bg-primary/10 p-2.5 rounded-xl mt-0.5">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {route.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {route.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini route map */}
      <div className="max-w-5xl mx-auto px-4">
        <RouteMap
          stops={route.stops}
          currentIndex={currentIndex}
          onStopClick={scrollToStop}
        />
      </div>

      {/* Card carousel */}
      <div className="max-w-5xl mx-auto px-4 pb-2">
        <Carousel
          setApi={handleApiChange}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {route.stops.map((stop, i) => (
              <CarouselItem
                key={stop.id}
                className="pl-3 basis-[85%] sm:basis-[45%] lg:basis-[35%]"
              >
                <TripStopCard stop={stop} isActive={i === currentIndex} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-3 sm:-left-5 bg-background/80 backdrop-blur-sm border shadow-lg" />
          <CarouselNext className="-right-3 sm:-right-5 bg-background/80 backdrop-blur-sm border shadow-lg" />
        </Carousel>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {route.stops.map((stop, i) => (
            <button
              key={stop.id}
              onClick={() => scrollToStop(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to stop ${i + 1}: ${stop.name}`}
            />
          ))}
        </div>
      </div>

      {/* Summary footer */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <TripSummaryFooter route={route} />
      </div>
    </div>
  );
}
