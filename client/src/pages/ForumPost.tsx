import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, ArrowLeft, Send } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

interface Post {
  id: number;
  title: string;
  titleHe?: string;
  content: string;
  contentHe?: string;
  authorName: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isPinned: boolean;
  isLocked: boolean;
}

interface Comment {
  id: number;
  content: string;
  authorName: string;
  createdAt: string;
  likeCount: number;
}

export default function ForumPost() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  const loadPost = async () => {
    try {
      const res = await fetch(`/api/forum/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
    } catch (error) {
      console.error("Failed to load post:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const res = await fetch(`/api/forum/posts/${id}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !isAuthenticated) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/forum/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        setNewComment("");
        loadComments();
        loadPost(); // Refresh to update comment count
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikePost = async () => {
    if (!isAuthenticated) return;

    try {
      await fetch(`/api/forum/posts/${id}/like`, { method: "POST" });
      loadPost();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    if (!isAuthenticated) return;

    try {
      await fetch(`/api/forum/comments/${commentId}/like`, { method: "POST" });
      loadComments();
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">Post not found</p>
          <div className="text-center mt-4">
            <Link href="/forum">
              <Button variant="outline">← Back to Forum</Button>
            </Link>
          </div>
        </div>
      </div>
    );
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

        {/* Post Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {post.categoryName}
                  </span>
                  {post.isPinned && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Pinned
                    </span>
                  )}
                  {post.isLocked && (
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      Locked
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h1>
                {post.titleHe && (
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4 hebrew-text" dir="rtl">
                    {post.titleHe}
                  </h2>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>By {post.authorName}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.viewCount} views</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none mb-6">
              <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
              {post.contentHe && (
                <p className="text-gray-700 mt-4 hebrew-text whitespace-pre-wrap" dir="rtl">
                  {post.contentHe}
                </p>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLikePost}
                disabled={!isAuthenticated}
                className="gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                {post.likeCount}
              </Button>
              <div className="flex items-center gap-2 text-gray-600">
                <MessageSquare className="h-4 w-4" />
                {post.commentCount} comments
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Comments ({comments.length})
          </h2>

          {/* New Comment Form */}
          {isAuthenticated ? (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                  rows={4}
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || submitting}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Posting..." : "Post Comment"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="text-gray-600 text-center">
                  Please log in to post a comment
                </p>
              </CardContent>
            </Card>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{comment.authorName}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4 whitespace-pre-wrap">{comment.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    disabled={!isAuthenticated}
                    className="gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {comment.likeCount}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {comments.length === 0 && (
              <p className="text-center text-gray-600 py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
