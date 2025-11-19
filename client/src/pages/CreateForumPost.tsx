import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface Category {
  id: number;
  name: string;
  nameHe?: string;
  icon?: string;
}

export default function CreateForumPost() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [titleHe, setTitleHe] = useState("");
  const [content, setContent] = useState("");
  const [contentHe, setContentHe] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/forum");
      return;
    }
    loadCategories();
  }, [isAuthenticated]);

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/forum/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          titleHe: titleHe.trim() || undefined,
          content: content.trim(),
          contentHe: contentHe.trim() || undefined,
          categoryId: parseInt(categoryId),
        }),
      });

      if (res.ok) {
        setLocation("/forum");
      } else {
        alert("Failed to create post. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/forum">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Button>
        </Link>

        {/* Create Post Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Create New Post</CardTitle>
            <p className="text-gray-600 hebrew-text" dir="rtl">צור פוסט חדש</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category / קטגוריה *
                </label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.icon} {cat.name} - {cat.nameHe}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* English Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title (English) *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title in English"
                  required
                  maxLength={200}
                />
              </div>

              {/* Hebrew Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title (Hebrew) - Optional
                </label>
                <Input
                  value={titleHe}
                  onChange={(e) => setTitleHe(e.target.value)}
                  placeholder="כותרת בעברית (אופציונלי)"
                  dir="rtl"
                  className="hebrew-text"
                  maxLength={200}
                />
              </div>

              {/* English Content */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content (English) *
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content in English..."
                  required
                  rows={10}
                  className="resize-y"
                />
              </div>

              {/* Hebrew Content */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content (Hebrew) - Optional
                </label>
                <Textarea
                  value={contentHe}
                  onChange={(e) => setContentHe(e.target.value)}
                  placeholder="תוכן בעברית (אופציונלי)..."
                  dir="rtl"
                  className="hebrew-text resize-y"
                  rows={10}
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={!title.trim() || !content.trim() || !categoryId || submitting}
                  className="flex-1"
                >
                  {submitting ? "Creating Post..." : "Create Post / צור פוסט"}
                </Button>
                <Link href="/forum">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">💡 Tips for a Great Post</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Choose the most relevant category for your post</li>
              <li>• Write a clear, descriptive title</li>
              <li>• Provide detailed information to help others</li>
              <li>• Be respectful and follow community guidelines</li>
              <li>• Adding Hebrew translation helps Israeli travelers!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
