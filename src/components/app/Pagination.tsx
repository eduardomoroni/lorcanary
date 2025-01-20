"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type Props = {
  current: number;
  total: number;
  prev?: {
    name: string;
    path: string;
  };
  next?: {
    name: string;
    path: string;
  };
};

export default function Pagination({ prev, next, total, current }: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      {prev?.name && (
        <Button
          className="bg-main dark:bg-secondaryBlack dark:text-darkText text-text"
          variant="default"
          size="icon"
          aria-label="Previous Page"
          onClick={() => {
            router.push(prev.path);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{prev.name}</span>
        </Button>
      )}
      <span className="text-sm font-medium">
        Page {current} of {total}
      </span>
      {next?.name && (
        <Button
          className="bg-main dark:bg-secondaryBlack dark:text-darkText text-text"
          variant="default"
          size="icon"
          aria-label="Next Page"
          onClick={() => {
            router.push(next.path);
          }}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{next.name}</span>
        </Button>
      )}
    </div>
  );
}
