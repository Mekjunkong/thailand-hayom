import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ArticleListProps {
  onEdit: (id: number) => void;
}

export default function ArticleList({ onEdit }: ArticleListProps) {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const { data, isLoading, refetch } = trpc.article.list.useQuery({
    page,
    limit: 20,
    search: search || undefined,
    category,
    isPublished: undefined, // Show all articles (published and drafts)
  });

  const deleteMutation = trpc.article.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article deleted successfully",
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

  const categories = [
    { value: "food", label: "Food", labelHe: "אוכל" },
    { value: "visa", label: "Visa", labelHe: "ויזה" },
    { value: "attractions", label: "Attractions", labelHe: "אטרקציות" },
    { value: "events", label: "Events", labelHe: "אירועים" },
    { value: "lifestyle", label: "Lifestyle", labelHe: "אורח חיים" },
    { value: "safety", label: "Safety", labelHe: "בטיחות" },
  ];

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading articles...</p>
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
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={category || ""}
          onChange={(e) => setCategory(e.target.value || undefined)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Views</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.articles.map((article) => (
              <tr key={article.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="font-medium">{article.title}</div>
                  <div className="text-sm text-gray-500" dir="rtl">{article.titleHe}</div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline">{article.category}</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {article.isPublished ? (
                      <Badge className="bg-green-100 text-green-800">Published</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                    )}
                    {article.isPremium && (
                      <Badge className="bg-amber-100 text-amber-800">Premium</Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-gray-400" />
                    {article.views}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(article.id)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this article?")) {
                          deleteMutation.mutate({ id: article.id });
                        }
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {(!data?.articles || data.articles.length === 0) && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No articles found. Create your first article!
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
