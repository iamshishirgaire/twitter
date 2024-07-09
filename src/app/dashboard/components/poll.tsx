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

export type PollOption = {
  id: string;
  value: string;
};
interface PollComponentProps {
  onPollRemove: (e: boolean) => void;
  options: PollOption[];

  duration: string | undefined;
  onOptionsChange: (e: PollOption[]) => void;
  onDurationChange: (e: string) => void;
}
export default function PollComponent(props: PollComponentProps) {
  const addOption = () => {
    const newOption = {
      id: `option${props.options.length + 1}`,
      value: "",
    };
    props.onOptionsChange([...props.options, newOption]);
  };
  return (
    <>
      <div className="mt-2 flex flex-col gap-4">
        {props.options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <Input
              onFocus={() => {
                if (index === props.options.length - 1) {
                  props.options.length < 4 ? addOption() : null;
                }
              }}
              onChange={(e) => {
                props.onOptionsChange(
                  props.options.map((o) => {
                    if (o.id === option.id) {
                      return { ...o, value: e.target.value };
                    }
                    return o;
                  }),
                );
              }}
              key={option.id}
              id={option.id}
              className="h-16 focus-visible:ring-border"
              placeholder={`Option ${index + 1}`}
            />
            <Button
              variant="outline"
              className="group h-12"
              disabled={props.options.length === 1}
              onClick={() => {
                if (props.options.length > 1) {
                  props.onOptionsChange(
                    props.options.filter((e) => e.id !== option.id),
                  );
                }
              }}
            >
              <TrashIcon className="size-5 text-gray-500 group-hover:text-gray-100" />
            </Button>
          </div>
        ))}
      </div>
      <Select
        onValueChange={(e) => {
          props.onDurationChange(e);
        }}
      >
        <SelectTrigger className="mt-4 w-fit text-gray-400 focus-visible:ring-0">
          <SelectValue placeholder="Duration"></SelectValue>
        </SelectTrigger>
        <SelectContent className="m-0 border border-border p-0 focus-visible:ring-0">
          <SelectItem value="1d">1 day</SelectItem>
          <SelectItem value="2d">2 day</SelectItem>
          <SelectItem value="3d">3 days</SelectItem>
          <SelectItem value="7d">1 week</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="mt-4 rounded-xl bg-destructive/20 text-red-400 hover:bg-destructive/30"
        variant={"secondary"}
        onClick={() => {
          props.onPollRemove(false);
        }}
      >
        Cancel
      </Button>
    </>
  );
}
