import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RevenueChart() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("day");
  const { data: trends, isLoading } = trpc.financial.getRevenueTrends.useQuery({
    period,
    limit: period === "day" ? 30 : period === "week" ? 12 : 6,
  });

  const formatCurrency = (cents: number) => {
    return `₪${(cents / 100).toFixed(0)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    switch (period) {
      case "day":
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      case "week":
        return `Week ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      case "month":
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading chart...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxRevenue = Math.max(...(trends?.map((t) => t.revenue) || [0]));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Track revenue over time</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={period === "day" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("day")}
            >
              Daily
            </Button>
            <Button
              variant={period === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("week")}
            >
              Weekly
            </Button>
            <Button
              variant={period === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("month")}
            >
              Monthly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {trends && trends.length > 0 ? (
          <div className="space-y-4">
            {/* Simple bar chart */}
            <div className="h-64 flex items-end gap-2">
              {trends.map((trend, idx) => {
                const height = maxRevenue > 0 ? (trend.revenue / maxRevenue) * 100 : 0;
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center group cursor-pointer"
                  >
                    <div className="relative w-full">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all hover:from-green-700 hover:to-green-500"
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap z-10">
                        <div className="font-bold">{formatCurrency(trend.revenue)}</div>
                        <div>{trend.transactions} transactions</div>
                        <div className="text-gray-300">
                          Avg: {formatCurrency(trend.avgTransactionValue)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left w-20">
                      {formatDate(trend.period)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-sm text-gray-600">Total Revenue</div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(trends.reduce((sum, t) => sum + t.revenue, 0))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Total Transactions</div>
                <div className="text-xl font-bold">
                  {trends.reduce((sum, t) => sum + t.transactions, 0)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Average/Period</div>
                <div className="text-xl font-bold text-purple-600">
                  {formatCurrency(
                    trends.reduce((sum, t) => sum + t.revenue, 0) / trends.length
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No revenue data available</div>
        )}
      </CardContent>
    </Card>
  );
}
