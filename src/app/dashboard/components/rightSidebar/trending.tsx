import React from "react";
import { Button } from "@/components/ui/button";
import {
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const Trending = () => {
  return (
    <div className="rounded-lg border border-border px-8 py-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Trending</h3>
        <Button variant="ghost" size="icon">
          <Cog6ToothIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm font-medium">#ReactJS</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              12.3K Tweets
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm font-medium">#TailwindCSS</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              8.7K Tweets
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm font-medium">#NextJS</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              6.2K Tweets
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm font-medium">#JavaScript</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              14.9K Tweets
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Trending;
