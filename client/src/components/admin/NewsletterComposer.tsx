import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Eye, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterComposer() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: "",
    subjectHe: "",
    customContent: "",
    customContentHe: "",
    tier: "all" as "all" | "free" | "premium",
    selectedArticleIds: [] as number[],
    selectedEventIds: [] as number[],
  });

  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  // Get articles and events for selection
  const { data: articles } = trpc.article.list.useQuery({
    page: 1,
    limit: 50,
    isPublished: true,
  });

  const { data: events } = trpc.event.list.useQuery({
    page: 1,
    limit: 50,
    upcoming: true,
  });

  const { data: stats } = trpc.newsletter.getStats.useQuery();

  const sendMutation = trpc.newsletter.sendNewsletter.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Newsletter Sent!",
        description: `Successfully sent to ${data.sentCount} subscribers. ${data.failedCount} failed.`,
      });
      // Reset form
      setFormData({
        subject: "",
        subjectHe: "",
        customContent: "",
        customContentHe: "",
        tier: "all",
        selectedArticleIds: [],
        selectedEventIds: [],
      });
      setPreviewHtml(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const previewMutation = trpc.newsletter.previewNewsletter.useQuery(
    {
      articleIds: formData.selectedArticleIds.length > 0 ? formData.selectedArticleIds : undefined,
      eventIds: formData.selectedEventIds.length > 0 ? formData.selectedEventIds : undefined,
      customContent: formData.customContent || undefined,
      customContentHe: formData.customContentHe || undefined,
    },
    { enabled: false }
  );

  const handlePreview = async () => {
    const result = await previewMutation.refetch();
    if (result.data?.html) {
      setPreviewHtml(result.data.html);
    }
  };

  const handleSend = () => {
    if (!formData.subject || !formData.subjectHe) {
      toast({
        title: "Error",
        description: "Please provide subject lines in both languages",
        variant: "destructive",
      });
      return;
    }

    if (formData.selectedArticleIds.length === 0 && formData.selectedEventIds.length === 0 && !formData.customContent) {
      toast({
        title: "Error",
        description: "Please select at least one article, event, or add custom content",
        variant: "destructive",
      });
      return;
    }

    if (confirm(`Are you sure you want to send this newsletter to ${
      formData.tier === "all" ? stats?.active :
      formData.tier === "free" ? stats?.free : stats?.premium
    } subscribers?`)) {
      sendMutation.mutate({
        subject: formData.subject,
        subjectHe: formData.subjectHe,
        articleIds: formData.selectedArticleIds.length > 0 ? formData.selectedArticleIds : undefined,
        eventIds: formData.selectedEventIds.length > 0 ? formData.selectedEventIds : undefined,
        customContent: formData.customContent || undefined,
        customContentHe: formData.customContentHe || undefined,
        tier: formData.tier,
      });
    }
  };

  const toggleArticle = (id: number) => {
    setFormData(prev => ({
      ...prev,
      selectedArticleIds: prev.selectedArticleIds.includes(id)
        ? prev.selectedArticleIds.filter(aid => aid !== id)
        : [...prev.selectedArticleIds, id]
    }));
  };

  const toggleEvent = (id: number) => {
    setFormData(prev => ({
      ...prev,
      selectedEventIds: prev.selectedEventIds.includes(id)
        ? prev.selectedEventIds.filter(eid => eid !== id)
        : [...prev.selectedEventIds, id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Subscriber Stats */}
      {stats && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Subscriber Statistics</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Total Active</div>
              <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            </div>
            <div>
              <div className="text-gray-600">Free Tier</div>
              <div className="text-2xl font-bold">{stats.free}</div>
            </div>
            <div>
              <div className="text-gray-600">Premium Tier</div>
              <div className="text-2xl font-bold text-amber-600">{stats.premium}</div>
            </div>
            <div>
              <div className="text-gray-600">Unsubscribed</div>
              <div className="text-2xl font-bold text-gray-400">{stats.unsubscribed}</div>
            </div>
          </div>
        </div>
      )}

      {/* Subject Lines */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Newsletter Subject</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="subject">Subject (English) *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Your weekly Thailand update"
            />
          </div>
          <div>
            <Label htmlFor="subjectHe">נושא (Hebrew) *</Label>
            <Input
              id="subjectHe"
              value={formData.subjectHe}
              onChange={(e) => setFormData({ ...formData, subjectHe: e.target.value })}
              placeholder="העדכון השבועי שלכם מתאילנד"
              dir="rtl"
            />
          </div>
        </div>
      </div>

      {/* Recipient Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Recipients</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value="all"
              checked={formData.tier === "all"}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
            />
            <span>All Subscribers ({stats?.active})</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value="free"
              checked={formData.tier === "free"}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
            />
            <span>Free Tier Only ({stats?.free})</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value="premium"
              checked={formData.tier === "premium"}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
            />
            <span>Premium Tier Only ({stats?.premium})</span>
          </label>
        </div>
      </div>

      {/* Custom Content */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Custom Message (Optional)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customContent">English</Label>
            <Textarea
              id="customContent"
              value={formData.customContent}
              onChange={(e) => setFormData({ ...formData, customContent: e.target.value })}
              placeholder="Add a personal message or announcement..."
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="customContentHe">עברית (Hebrew)</Label>
            <Textarea
              id="customContentHe"
              value={formData.customContentHe}
              onChange={(e) => setFormData({ ...formData, customContentHe: e.target.value })}
              placeholder="הוסף הודעה אישית או הכרזה..."
              rows={4}
              dir="rtl"
            />
          </div>
        </div>
      </div>

      {/* Article Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Select Articles ({formData.selectedArticleIds.length} selected)
        </h3>
        <div className="border rounded-lg max-h-96 overflow-y-auto p-4 space-y-2">
          {articles?.articles.map((article) => (
            <div
              key={article.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => toggleArticle(article.id)}
            >
              <Checkbox
                checked={formData.selectedArticleIds.includes(article.id)}
                onCheckedChange={() => toggleArticle(article.id)}
              />
              <div className="flex-1">
                <div className="font-medium">{article.title}</div>
                <div className="text-sm text-gray-600" dir="rtl">{article.titleHe}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {article.category} • {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          {(!articles?.articles || articles.articles.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No published articles available
            </div>
          )}
        </div>
      </div>

      {/* Event Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Select Events ({formData.selectedEventIds.length} selected)
        </h3>
        <div className="border rounded-lg max-h-96 overflow-y-auto p-4 space-y-2">
          {events?.events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => toggleEvent(event.id)}
            >
              <Checkbox
                checked={formData.selectedEventIds.includes(event.id)}
                onCheckedChange={() => toggleEvent(event.id)}
              />
              <div className="flex-1">
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-gray-600" dir="rtl">{event.titleHe}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(event.eventDate).toLocaleDateString()} •
                  {event.location} • {event.price ? `₪${event.price}` : 'Free'}
                </div>
              </div>
            </div>
          ))}
          {(!events?.events || events.events.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No upcoming events available
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      {previewHtml && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Preview</h3>
          <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handlePreview}
          disabled={previewMutation.isFetching}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button
          onClick={handleSend}
          disabled={sendMutation.isPending}
          className="bg-green-600 hover:bg-green-700"
        >
          {sendMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Newsletter
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
