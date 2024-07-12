"use client";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@heroicons/react/24/outline";

export type PollOption = {
  id: string;
  value: string;
};
interface PollComponentProps {
  onPollRemove: (e: boolean) => void;
  options: PollOption[];

  onOptionsChange: (e: PollOption[]) => void;
  onDurationChange: (e: Date) => void;
}
export default function PollComponent(props: PollComponentProps) {
  const addOption = () => {
    const newOption = {
      id: `option${props.options.length + 1}`,
      value: "",
    };
    props.onOptionsChange([...props.options, newOption]);
  };
  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);
  return (
    <>
      <div className="my-2 flex flex-col gap-4">
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
      <DatePicker
        fromDate={today}
        toDate={sevenDaysFromNow}
        onDateSelect={(d) => {
          props.onDurationChange(d);
        }}
      />

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
