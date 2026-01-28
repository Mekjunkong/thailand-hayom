import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { DollarSign, ShoppingCart, Users, MessageSquare, Download } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { data: isAdmin, isLoading: checkingAdmin } = trpc.admin.isAdmin.useQuery();
  const { data: analytics } = trpc.admin.getPaymentAnalytics.useQuery(undefined, {
    enabled: isAdmin === true,
  });
  const { data: chatData } = trpc.admin.getChatLogs.useQuery({ limit: 20, offset: 0 }, {
    enabled: isAdmin === true,
  });
  const { data: users } = trpc.admin.getUsers.useQuery(undefined, {
    enabled: isAdmin === true,
  });
  const { data: bulkOrders } = trpc.admin.getBulkOrders.useQuery(undefined, {
    enabled: isAdmin === true,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
            <CardDescription>You don't have permission to access the admin dashboard.</CardDescription>
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

  const formatCurrency = (cents: number | string | null) => {
    if (!cents) return "₪0.00";
    const amount = typeof cents === "string" ? parseFloat(cents) : cents;
    return `₪${(amount / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-300 mt-2">LearnThaiB4Fly Management</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8 grid md:grid-cols-2 gap-4">
          <Link href="/admin/content">
            <Button size="lg" className="w-full">
              📝 Manage Content (Articles, Events, Newsletter)
            </Button>
          </Link>
          <Link href="/admin/financial">
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
              💰 Financial Management & AI Assistant
            </Button>
          </Link>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {formatCurrency(analytics?.totalRevenue || 0)}
              </div>
              <p className="text-xs text-gray-500 mt-2">All completed payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Transactions</CardTitle>
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">
                {analytics?.totalTransactions || 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">Completed purchases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">
                {users?.length || 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chat Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-700">
                {chatData?.total || 0}
              </div>
              <p className="text-xs text-gray-500 mt-2">AI conversations</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Purchases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Recent Purchases</CardTitle>
            <CardDescription>Latest 10 completed transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics?.recentPurchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {new Date(purchase.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{purchase.customerName || "N/A"}</div>
                          <div className="text-sm text-gray-500">{purchase.customerEmail}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{purchase.productType}</td>
                      <td className="py-3 px-4 font-semibold">
                        {formatCurrency(purchase.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          purchase.status === "completed" 
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {purchase.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!analytics?.recentPurchases || analytics.recentPurchases.length === 0) && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">
                        No purchases yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Orders */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Bulk Orders (Tour Agents)</CardTitle>
                <CardDescription>Orders with 10+ licenses</CardDescription>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Invoices
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Agent</th>
                    <th className="text-left py-3 px-4">Quantity</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkOrders?.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customerName || "N/A"}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {order.productType === "bulk_10" ? "10" : "20"} licenses
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Invoice
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {(!bulkOrders || bulkOrders.length === 0) && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">
                        No bulk orders yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Chat Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Chat Conversations</CardTitle>
            <CardDescription>Latest 20 AI chatbot interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {chatData?.logs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">Session: {log.sessionId.slice(0, 8)}...</span>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-blue-700 mb-1">User:</div>
                    <div className="text-sm bg-blue-50 p-2 rounded">{log.userMessage}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-700 mb-1">Assistant:</div>
                    <div className="text-sm bg-green-50 p-2 rounded">{log.assistantMessage}</div>
                  </div>
                </div>
              ))}
              {(!chatData?.logs || chatData.logs.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No chat conversations yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
