import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArticleEditorProps {
  articleId: number | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function ArticleEditor({ articleId, onCancel, onSave }: ArticleEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    titleHe: "",
    excerpt: "",
    excerptHe: "",
    content: "",
    contentHe: "",
    category: "food",
    coverImage: "",
    isPremium: false,
    isPublished: false,
  });

  const { data: article, isLoading } = trpc.article.getById.useQuery(
    { id: articleId! },
    { enabled: !!articleId }
  );

  const createMutation = trpc.article.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article created successfully",
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

  const updateMutation = trpc.article.update.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article updated successfully",
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
    if (article) {
      setFormData({
        title: article.title,
        titleHe: article.titleHe,
        excerpt: article.excerpt || "",
        excerptHe: article.excerptHe || "",
        content: article.content,
        contentHe: article.contentHe,
        category: article.category,
        coverImage: article.coverImage || "",
        isPremium: article.isPremium,
        isPublished: article.isPublished,
      });
    }
  }, [article]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (articleId) {
      updateMutation.mutate({ id: articleId, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const categories = [
    { value: "food", label: "Food / אוכל" },
    { value: "visa", label: "Visa / ויזה" },
    { value: "attractions", label: "Attractions / אטרקציות" },
    { value: "events", label: "Events / אירועים" },
    { value: "lifestyle", label: "Lifestyle / אורח חיים" },
    { value: "safety", label: "Safety / בטיחות" },
  ];

  if (isLoading && articleId) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading article...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="text-xl font-semibold">
          {articleId ? "Edit Article" : "Create New Article"}
        </h3>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {articleId ? "Update" : "Create"}
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
              placeholder="Enter article title in English"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary (optional)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              placeholder="Full article content in English"
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              You can use markdown or HTML for formatting
            </p>
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
              placeholder="הזן כותרת בעברית"
              dir="rtl"
            />
          </div>

          <div>
            <Label htmlFor="excerptHe">תקציר (Excerpt)</Label>
            <Textarea
              id="excerptHe"
              value={formData.excerptHe}
              onChange={(e) => setFormData({ ...formData, excerptHe: e.target.value })}
              placeholder="תקציר קצר (אופציונלי)"
              rows={3}
              dir="rtl"
            />
          </div>

          <div>
            <Label htmlFor="contentHe">תוכן (Content) *</Label>
            <Textarea
              id="contentHe"
              value={formData.contentHe}
              onChange={(e) => setFormData({ ...formData, contentHe: e.target.value })}
              required
              placeholder="תוכן המאמר המלא בעברית"
              rows={12}
              className="font-mono text-sm"
              dir="rtl"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              ניתן להשתמש ב-markdown או HTML לעיצוב
            </p>
          </div>
        </div>
      </div>

      {/* Article Settings */}
      <div className="pt-6 border-t space-y-4">
        <h4 className="font-semibold text-lg">Article Settings</h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
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
        </div>

        <div className="flex gap-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="isPremium"
              checked={formData.isPremium}
              onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
            />
            <Label htmlFor="isPremium" className="cursor-pointer">
              Premium Content (requires subscription)
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
            />
            <Label htmlFor="isPublished" className="cursor-pointer">
              Published (visible to public)
            </Label>
          </div>
        </div>
      </div>
    </form>
  );
}
