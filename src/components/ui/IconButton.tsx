"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const IconButton = ({
  onClick,
  children,
  tooltipText,
}: {
  onClick: () => void;
  children: React.ReactNode;
  tooltipText?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/20 hover:text-primary"
            onClick={onClick}
          >
            <div className="size-6">{children}</div>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="border-border/25 border rounded-sm mb-2">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
