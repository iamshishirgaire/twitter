"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function PollComponent() {
  const [options, setOptions] = useState([{ id: "option1", value: "Red" }]);
  const addOption = () => {
    setOptions([...options, { id: `option${options.length + 1}`, value: "" }]);
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {options.map((option, index) => (
          <div className="flex items-center gap-3">
            <Input
              onClick={() => {
                if (index === options.length - 1) {
                  options.length < 4 ? addOption() : null;
                }
              }}
              key={option.id}
              id={option.id}
              className="h-16 focus-visible:ring-border"
              placeholder={`Option ${index + 1}`}
            />
            <Button
              variant="outline"
              className="group h-12"
              disabled={options.length === 1}
              onClick={() => {
                if (options.length > 1)
                  setOptions(options.filter((_, i) => i !== index));
              }}
            >
              <TrashIcon className="size-5 text-gray-500 group-hover:text-gray-100" />
            </Button>
          </div>
        ))}
      </div>
      <Select>
        <SelectTrigger className="mt-4 w-fit focus-visible:ring-0">
          <SelectValue
            className="text-gray-500"
            placeholder="Select time limit"
          />
        </SelectTrigger>
        <SelectContent className="mt-1 border border-border">
          <SelectItem value="1">1 day</SelectItem>
          <SelectItem value="1">2 day</SelectItem>
          <SelectItem value="3">3 days</SelectItem>
          <SelectItem value="7">1 week</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
