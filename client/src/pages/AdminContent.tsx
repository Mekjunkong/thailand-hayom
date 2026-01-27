import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { Plus, ArrowLeft } from "lucide-react";
import ArticleList from "@/components/admin/ArticleList";
import ArticleEditor from "@/components/admin/ArticleEditor";
import EventList from "@/components/admin/EventList";
import EventEditor from "@/components/admin/EventEditor";
import NewsletterComposer from "@/components/admin/NewsletterComposer";

export default function AdminContent() {
  const [, setLocation] = useLocation();
  const { data: isAdmin, isLoading: checkingAdmin } = trpc.admin.isAdmin.useQuery();
  const [activeTab, setActiveTab] = useState("articles");

  // Article management state
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);

  // Event management state
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
            <CardDescription>You don't have permission to access the admin content management.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Go to Homepage</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Content Management</h1>
              <p className="text-gray-300 mt-2">Manage articles, events, and newsletters</p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">Articles</CardTitle>
                    <CardDescription>
                      Manage articles for News & Updates, Local Guides, and more
                    </CardDescription>
                  </div>
                  {!isCreatingArticle && !editingArticleId && (
                    <Button onClick={() => setIsCreatingArticle(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      New Article
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isCreatingArticle || editingArticleId ? (
                  <ArticleEditor
                    articleId={editingArticleId}
                    onCancel={() => {
                      setIsCreatingArticle(false);
                      setEditingArticleId(null);
                    }}
                    onSave={() => {
                      setIsCreatingArticle(false);
                      setEditingArticleId(null);
                    }}
                  />
                ) : (
                  <ArticleList
                    onEdit={(id) => setEditingArticleId(id)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">Events & Festivals</CardTitle>
                    <CardDescription>
                      Manage upcoming events, concerts, and festivals
                    </CardDescription>
                  </div>
                  {!isCreatingEvent && !editingEventId && (
                    <Button onClick={() => setIsCreatingEvent(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      New Event
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isCreatingEvent || editingEventId ? (
                  <EventEditor
                    eventId={editingEventId}
                    onCancel={() => {
                      setIsCreatingEvent(false);
                      setEditingEventId(null);
                    }}
                    onSave={() => {
                      setIsCreatingEvent(false);
                      setEditingEventId(null);
                    }}
                  />
                ) : (
                  <EventList
                    onEdit={(id) => setEditingEventId(id)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletter Tab */}
          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Newsletter Composer</CardTitle>
                <CardDescription>
                  Compose and send newsletters to subscribers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsletterComposer />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
