import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TransactionList() {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const { data, isLoading } = trpc.financial.getRecentTransactions.useQuery({
    limit: 20,
    offset: page * 20,
    status: statusFilter,
  });

  const formatCurrency = (cents: number) => {
    return `₪${(cents / 100).toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex gap-2">
        <Button
          variant={statusFilter === undefined ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter(undefined)}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("completed")}
        >
          Completed
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("pending")}
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === "failed" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("failed")}
        >
          Failed
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Product</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">
                  {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <div className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">{transaction.customerName || "N/A"}</div>
                  <div className="text-sm text-gray-500">{transaction.customerEmail}</div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className="capitalize">
                    {transaction.productType}
                  </Badge>
                </td>
                <td className="py-3 px-4 font-semibold">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="py-3 px-4">
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-xs text-gray-500 font-mono">
                  {transaction.stripeSessionId.slice(0, 20)}...
                </td>
              </tr>
            ))}
            {(!data?.transactions || data.transactions.length === 0) && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.total > 20 && (
        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {page + 1} of {Math.ceil(data.total / 20)}
          </span>
          <Button
            variant="outline"
            disabled={(page + 1) * 20 >= data.total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
