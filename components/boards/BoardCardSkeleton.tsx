import React from "react";
import { Skeleton } from "../tailgrids/core/skeleton";

const BoardCardSkeleton = () => {
  return (
    <div className="w-90 min-h-40 space-y-3 rounded-lg  border border-gray-300 p-4">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
};

export default BoardCardSkeleton;
