"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  onDateSelect,
  fromDate,
  toDate,
}: {
  onDateSelect: (date: Date) => void;
  fromDate?: Date;
  toDate?: Date;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-12 w-[280px] justify-start text-left font-normal text-gray-400",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-border/50 bg-background p-0">
        <Calendar
          fromDate={fromDate}
          toDate={toDate}
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            onDateSelect(e ?? new Date());
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
