import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, MessageSquare, FileText, Award } from "lucide-react";

interface UserProfile {
  id: number;
  name: string;
  email?: string;
  reputationPoints: number;
  postCount: number;
  commentCount: number;
  createdAt: string;
  badges: string[];
}

interface Post {
  id: number;
  title: string;
  categoryName: string;
  likes: number;
  views: number;
  createdAt: string;
}

interface Comment {
  id: number;
  content: string;
  postTitle: string;
  postId: number;
  likes: number;
  createdAt: string;
}

export default function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
    loadUserPosts();
    loadUserComments();
  }, [id]);

  const loadProfile = async () => {
    try {
      const res = await fetch(`/api/forum/users/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserPosts = async () => {
    try {
      const res = await fetch(`/api/forum/users/${id}/posts`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  const loadUserComments = async () => {
    try {
      const res = await fetch(`/api/forum/users/${id}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  };

  const getReputationLevel = (points: number) => {
    if (points >= 1000) return { level: "Expert", color: "bg-purple-500" };
    if (points >= 500) return { level: "Advanced", color: "bg-blue-500" };
    if (points >= 100) return { level: "Intermediate", color: "bg-green-500" };
    return { level: "Beginner", color: "bg-gray-500" };
  };

  const getBadges = (profile: UserProfile) => {
    const badges = [];
    if (profile.postCount >= 10) badges.push({ name: "Prolific Poster", icon: "📝", color: "bg-blue-100 text-blue-800" });
    if (profile.commentCount >= 50) badges.push({ name: "Active Commenter", icon: "💬", color: "bg-green-100 text-green-800" });
    if (profile.reputationPoints >= 500) badges.push({ name: "Community Star", icon: "⭐", color: "bg-yellow-100 text-yellow-800" });
    if (profile.postCount >= 1 && profile.commentCount >= 1) badges.push({ name: "Engaged Member", icon: "🎯", color: "bg-purple-100 text-purple-800" });
    return badges;
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">User not found</p>
          <div className="text-center mt-4">
            <Link href="/forum">
              <Button variant="outline">← Back to Forum</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const repLevel = getReputationLevel(profile.reputationPoints);
  const badges = getBadges(profile);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link href="/forum">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Button>
        </Link>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {profile.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={`${repLevel.color} text-white`}>
                    <Trophy className="mr-1 h-3 w-3" />
                    {repLevel.level}
                  </Badge>
                  <span className="text-gray-600">
                    {profile.reputationPoints} reputation points
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{profile.postCount} posts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{profile.commentCount} comments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>{badges.length} badges</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className={badge.color}>
                      <span className="mr-1">{badge.icon}</span>
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Posts and Comments Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="space-y-4">
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-gray-500">
                    No posts yet
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Link key={post.id} href={`/forum/post/${post.id}`}>
                    <Card className="hover:shadow-lg transition-all cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span className="text-blue-600">{post.categoryName}</span>
                              <span>•</span>
                              <span>{post.likes} likes</span>
                              <span>•</span>
                              <span>{post.views} views</span>
                              <span>•</span>
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <div className="space-y-4">
              {comments.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-gray-500">
                    No comments yet
                  </CardContent>
                </Card>
              ) : (
                comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="mb-3">
                        <Link href={`/forum/post/${comment.postId}`}>
                          <p className="text-sm text-blue-600 hover:underline">
                            On: {comment.postTitle}
                          </p>
                        </Link>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-gray-800 line-clamp-3">{comment.content}</p>
                      <div className="mt-3 text-sm text-gray-600">
                        {comment.likes} likes
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
