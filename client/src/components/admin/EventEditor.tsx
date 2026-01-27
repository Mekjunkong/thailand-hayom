import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EventEditorProps {
  eventId: number | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function EventEditor({ eventId, onCancel, onSave }: EventEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    titleHe: "",
    description: "",
    descriptionHe: "",
    location: "",
    locationHe: "",
    eventDate: "",
    endDate: "",
    price: "",
    coverImage: "",
    category: "",
    isPremium: false,
    isFeatured: false,
    registrationUrl: "",
  });

  const { data: event, isLoading } = trpc.event.getById.useQuery(
    { id: eventId! },
    { enabled: !!eventId }
  );

  const createMutation = trpc.event.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      onSave();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = trpc.event.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
      onSave();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        titleHe: event.titleHe,
        description: event.description,
        descriptionHe: event.descriptionHe,
        location: event.location || "",
        locationHe: event.locationHe || "",
        eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
        endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : "",
        price: event.price?.toString() || "",
        coverImage: event.coverImage || "",
        category: event.category || "",
        isPremium: event.isPremium,
        isFeatured: event.isFeatured,
        registrationUrl: event.registrationUrl || "",
      });
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: formData.price ? parseInt(formData.price) : undefined,
      endDate: formData.endDate || undefined,
    };

    if (eventId) {
      updateMutation.mutate({ id: eventId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const categories = [
    "Concert",
    "Festival",
    "Market",
    "Workshop",
    "Sports",
    "Cultural",
    "Nightlife",
    "Food & Drink",
    "Other",
  ];

  if (isLoading && eventId) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading event...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="text-xl font-semibold">
          {eventId ? "Edit Event" : "Create New Event"}
        </h3>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {eventId ? "Update" : "Create"}
          </Button>
        </div>
      </div>

      {/* Two-column layout for bilingual content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* English Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-blue-600">English Content</h4>

          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Event title in English"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Full event description in English"
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Event location in English"
            />
          </div>
        </div>

        {/* Hebrew Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg text-blue-600">תוכן בעברית (Hebrew Content)</h4>

          <div>
            <Label htmlFor="titleHe">כותרת (Title) *</Label>
            <Input
              id="titleHe"
              value={formData.titleHe}
              onChange={(e) => setFormData({ ...formData, titleHe: e.target.value })}
              required
              placeholder="שם האירוע בעברית"
              dir="rtl"
            />
          </div>

          <div>
            <Label htmlFor="descriptionHe">תיאור (Description) *</Label>
            <Textarea
              id="descriptionHe"
              value={formData.descriptionHe}
              onChange={(e) => setFormData({ ...formData, descriptionHe: e.target.value })}
              required
              placeholder="תיאור מלא של האירוע בעברית"
              rows={6}
              dir="rtl"
            />
          </div>

          <div>
            <Label htmlFor="locationHe">מיקום (Location)</Label>
            <Input
              id="locationHe"
              value={formData.locationHe}
              onChange={(e) => setFormData({ ...formData, locationHe: e.target.value })}
              placeholder="מיקום האירוע בעברית"
              dir="rtl"
            />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="pt-6 border-t space-y-4">
        <h4 className="font-semibold text-lg">Event Details</h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="eventDate">Event Date & Time *</Label>
            <Input
              id="eventDate"
              type="datetime-local"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date & Time (Optional)</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="price">Price (Shekels)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0 for free events"
              min="0"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <Label htmlFor="registrationUrl">Registration URL</Label>
            <Input
              id="registrationUrl"
              type="url"
              value={formData.registrationUrl}
              onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
              placeholder="https://example.com/register"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="isPremium"
              checked={formData.isPremium}
              onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
            />
            <Label htmlFor="isPremium" className="cursor-pointer">
              Premium Event (requires subscription)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
            />
            <Label htmlFor="isFeatured" className="cursor-pointer">
              Featured Event (shown on homepage)
            </Label>
          </div>
        </div>
      </div>
    </form>
  );
}
