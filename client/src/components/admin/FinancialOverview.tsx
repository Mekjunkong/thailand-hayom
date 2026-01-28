import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FinancialOverview() {
  const { data: revenue, isLoading } = trpc.financial.getRevenueOverview.useQuery({});
  const { data: subscriptions } = trpc.financial.getSubscriptionAnalytics.useQuery();

  const formatCurrency = (cents: number) => {
    return `₪${(cents / 100).toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading overview...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Revenue by Product */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Product</CardTitle>
          <CardDescription>Sales breakdown by product type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenue?.revenueByProduct.map((product) => (
              <div key={product.productType} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="capitalize">
                    {product.productType}
                  </Badge>
                  <span className="text-sm text-gray-600">{product.count} sales</span>
                </div>
                <div className="font-bold text-green-600">
                  {formatCurrency(product.revenue)}
                </div>
              </div>
            ))}
            {(!revenue?.revenueByProduct || revenue.revenueByProduct.length === 0) && (
              <div className="text-center py-8 text-gray-500">No revenue data yet</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Subscription Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Breakdown</CardTitle>
          <CardDescription>Active subscriptions by tier</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions?.subscriberTiers.map((tier) => (
              <div key={`${tier.tier}-${tier.status}`} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={tier.status === "active" ? "default" : "outline"}
                    className="capitalize"
                  >
                    {tier.tier}
                  </Badge>
                  <span className="text-sm text-gray-600 capitalize">{tier.status}</span>
                </div>
                <div className="font-bold">{tier.count}</div>
              </div>
            ))}

            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">New this month</span>
                <span className="font-semibold text-green-600">
                  +{subscriptions?.newSubscriptionsCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-600">Churned this month</span>
                <span className="font-semibold text-red-600">
                  -{subscriptions?.churnCount || 0}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
