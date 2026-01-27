import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, MapPin, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EventListProps {
  onEdit: (id: number) => void;
}

export default function EventList({ onEdit }: EventListProps) {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [upcoming, setUpcoming] = useState(true);

  const { data, isLoading, refetch } = trpc.event.list.useQuery({
    page,
    limit: 20,
    search: search || undefined,
    upcoming,
  });

  const deleteMutation = trpc.event.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading events...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={upcoming ? "upcoming" : "all"}
          onChange={(e) => setUpcoming(e.target.value === "upcoming")}
          className="border rounded-md px-3 py-2"
        >
          <option value="upcoming">Upcoming Events</option>
          <option value="all">All Events</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {data?.events.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600" dir="rtl">{event.titleHe}</p>
              </div>
              <div className="flex gap-1">
                {event.isFeatured && (
                  <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                )}
                {event.isPremium && (
                  <Badge className="bg-amber-100 text-amber-800">Premium</Badge>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>

              {event.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              )}

              <div className="text-sm font-semibold">
                {event.price ? `₪${event.price}` : 'Free Event'}
              </div>

              {event.category && (
                <Badge variant="outline">{event.category}</Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event.id)}
                className="flex-1"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this event?")) {
                    deleteMutation.mutate({ id: event.id });
                  }
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        {(!data?.events || data.events.length === 0) && (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No events found. Create your first event!
          </div>
        )}
      </div>

      {/* Pagination */}
      {data && data.total > data.limit && (
        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {page} of {Math.ceil(data.total / data.limit)}
          </span>
          <Button
            variant="outline"
            disabled={page >= Math.ceil(data.total / data.limit)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
