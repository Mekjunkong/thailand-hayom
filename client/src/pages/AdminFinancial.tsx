import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import {
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import FinancialOverview from "@/components/admin/FinancialOverview";
import RevenueChart from "@/components/admin/RevenueChart";
import TransactionList from "@/components/admin/TransactionList";
import FinancialAssistant from "@/components/admin/FinancialAssistant";

export default function AdminFinancial() {
  const [, setLocation] = useLocation();
  const { data: isAdmin, isLoading: checkingAdmin } = trpc.admin.isAdmin.useQuery();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: insights, isLoading: loadingInsights } = trpc.financial.getFinancialInsights.useQuery();

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
            <CardDescription>You don't have permission to access financial data.</CardDescription>
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

  const formatCurrency = (cents: number) => {
    return `₪${(cents / 100).toFixed(2)}`;
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-900 to-green-800 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Financial Management</h1>
              <p className="text-gray-300 mt-2">Revenue, subscriptions, and analytics</p>
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
        {/* Key Metrics Cards */}
        {!loadingInsights && insights && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Current Month Revenue
                </CardTitle>
                <DollarSign className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">
                  {formatCurrency(insights.currentMonth.revenue)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {insights.growthRate >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      insights.growthRate >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatPercentage(insights.growthRate)}
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Transactions
                </CardTitle>
                <CreditCard className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700">
                  {insights.currentMonth.transactions}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This month • {insights.lastMonth.transactions} last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Avg Transaction Value
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-700">
                  {formatCurrency(insights.avgTransactionValue)}
                </div>
                <p className="text-xs text-gray-500 mt-2">Average per transaction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Subscribers
                </CardTitle>
                <Users className="h-5 w-5 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-700">
                  {insights.activeSubscribers}
                </div>
                <p className="text-xs text-gray-500 mt-2">Newsletter subscribers</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="assistant">
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              <FinancialOverview />
              <RevenueChart />
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">Transaction History</CardTitle>
                    <CardDescription>All payment transactions</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TransactionList />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Customers */}
              {insights?.topCustomers && (
                <Card>
                  <CardHeader>
                    <CardTitle>Top Customers</CardTitle>
                    <CardDescription>Highest lifetime value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {insights.topCustomers.map((customer, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{customer.email}</div>
                            <div className="text-sm text-gray-500">
                              {customer.transactionCount} purchases
                            </div>
                          </div>
                          <div className="font-bold text-green-600">
                            {formatCurrency(customer.totalSpent)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Insights</CardTitle>
                  <CardDescription>Key financial metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Last Month Revenue</span>
                      <span className="font-bold">
                        {formatCurrency(insights?.lastMonth.revenue || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Growth Rate</span>
                      <span
                        className={`font-bold ${
                          (insights?.growthRate || 0) >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {formatPercentage(insights?.growthRate || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Active Subscribers</span>
                      <span className="font-bold">{insights?.activeSubscribers || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="assistant">
            <FinancialAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
