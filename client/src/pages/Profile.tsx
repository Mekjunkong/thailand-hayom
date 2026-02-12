import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, BookmarkIcon, TrendingUp, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'wouter';

export default function Profile() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: progress = [] } = trpc.user.getProgress.useQuery();
  const { data: bookmarks = [] } = trpc.user.getBookmarks.useQuery();
  const { data: purchases = [] } = trpc.user.getPurchaseHistory.useQuery();
  
  const removeBookmarkMutation = trpc.user.removeBookmark.useMutation({
    onSuccess: () => {
      window.location.reload();
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 pt-16">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Please Sign In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">You need to sign in to view your profile</p>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedLessons = progress.filter(p => p.completed === true).length;
  const totalLessons = 10;
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">← Back to Home</Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 font-playfair mb-2">My Profile</h1>
          <p className="text-gray-600">Track your progress and manage your learning</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name || 'Not set'}</p>
              <p><strong>Email:</strong> {user.email || 'Not set'}</p>
              <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Overall Completion</span>
                  <span className="text-amber-600 font-bold">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-amber-600">{completedLessons}</p>
                  <p className="text-gray-600">Lessons Completed</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-orange-600">{bookmarks.length}</p>
                  <p className="text-gray-600">Bookmarked Phrases</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {progress.filter(p => p.quizScore && p.quizScore >= 80).length}
                  </p>
                  <p className="text-gray-600">Quizzes Passed</p>
                </div>
              </div>

              {/* Lesson Progress Details */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Lesson Details</h3>
                <div className="space-y-2">
                  {progress.length > 0 ? (
                    progress.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span>Lesson {p.lessonId}</span>
                        <div className="flex items-center gap-4">
                          {p.completed === true && <span className="text-green-600">✓ Completed</span>}
                          {p.quizScore && <span className="text-gray-600">Quiz: {p.quizScore}%</span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No progress yet. Start learning!</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookmarked Phrases */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookmarkIcon className="w-5 h-5" />
              Bookmarked Phrases ({bookmarks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookmarks.length > 0 ? (
              <div className="space-y-3">
                {bookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{bookmark.phraseText}</p>
                      <p className="text-sm text-gray-600">Lesson {bookmark.lessonId}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBookmarkMutation.mutate({ bookmarkId: bookmark.id })}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No bookmarked phrases yet. Click the bookmark icon on any phrase to save it!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Purchase History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Purchase History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {purchases.length > 0 ? (
              <div className="space-y-3">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {purchase.productType.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ₪{(purchase.amount / 100).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">{purchase.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No purchases yet.{' '}
                <Link href="/welcome-kit" className="text-amber-600 hover:underline">
                  Get the Smart Tourist Pack
                </Link>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
