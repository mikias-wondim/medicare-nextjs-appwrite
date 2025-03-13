"use client";

import { Loader2 as Loader } from "lucide-react";

export default function RouteLoading({ isRouting }: { isRouting: boolean }) {
  if (!isRouting) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-10 backdrop-blur-[1px]  z-50">
      <div className="flex flex-col items-center">
        <Loader className="w-12 h-12 animate-spin text-green-500" />
      </div>
    </div>
  );
}
