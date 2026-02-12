import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BlogCardSkeleton() {
  return (
    <Card className="border-2 overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="h-48 w-full rounded-none" />

      <CardHeader>
        {/* Title */}
        <Skeleton className="h-6 w-full mb-2" />
        {/* Hebrew subtitle */}
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Excerpt */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        {/* Hebrew excerpt */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />

        {/* Date row */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
