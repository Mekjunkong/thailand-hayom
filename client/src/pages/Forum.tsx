import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Eye, Pin, Lock, Plus } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface Category {
  id: number;
  name: string;
  nameHe: string | null;
  description: string | null;
  descriptionHe: string | null;
  icon: string | null;
  slug: string;
}

interface Post {
  post: {
    id: number;
    title: string;
    titleHe: string | null;
    content: string;
    likes: number;
    views: number;
    isPinned: number;
    isLocked: number;
    createdAt: string;
    categoryId: number;
  };
  author: {
    id: number;
    name: string | null;
  };
}

export default function Forum() {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/forum/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = selectedCategory
        ? `/api/forum/posts?categoryId=${selectedCategory}`
        : "/api/forum/posts";
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Forum</h1>
          <p className="text-xl mb-2">Connect with Israeli travelers in Thailand</p>
          <p className="text-lg hebrew-text" dir="rtl">התחבר למטיילים ישראלים בתאילנד</p>
          {isAuthenticated && (
            <Link href="/forum/new">
              <Button className="mt-6 bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="mr-2 h-4 w-4" />
                Create New Post / צור פוסט חדש
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categories / קטגוריות</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              className={`cursor-pointer hover:shadow-lg transition-all ${
                selectedCategory === null ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  All Posts
                </CardTitle>
                <CardDescription>כל הפוסטים</CardDescription>
              </CardHeader>
            </Card>
            {categories.map((cat) => (
              <Card
                key={cat.id}
                className={`cursor-pointer hover:shadow-lg transition-all ${
                  selectedCategory === cat.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{cat.icon || "📝"}</span>
                    {cat.name}
                  </CardTitle>
                  <CardDescription>{cat.nameHe}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name || "Posts"
              : "Recent Posts / פוסטים אחרונים"}
          </h2>
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <p>No posts yet. Be the first to post!</p>
                <p className="hebrew-text" dir="rtl">אין פוסטים עדיין. היה הראשון לפרסם!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map(({ post, author }) => (
                <Link key={post.id} href={`/forum/post/${post.id}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {post.isPinned === 1 && (
                              <Badge variant="default" className="bg-amber-500">
                                <Pin className="h-3 w-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                            {post.isLocked === 1 && (
                              <Badge variant="secondary">
                                <Lock className="h-3 w-3 mr-1" />
                                Locked
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                            {post.title}
                          </CardTitle>
                          {post.titleHe && (
                            <p className="text-sm text-gray-600 hebrew-text mt-1" dir="rtl">
                              {post.titleHe}
                            </p>
                          )}
                          <CardDescription className="mt-2 line-clamp-2">
                            {post.content.substring(0, 150)}...
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                        <span className="font-medium">{author.name || "Anonymous"}</span>
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
