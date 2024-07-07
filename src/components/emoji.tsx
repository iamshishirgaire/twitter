import React, { useEffect, useRef, useState } from "react";
import { SmileIcon } from "lucide-react";
import Picker from "@emoji-mart/react";
import { useQuery } from "react-query";
import { Button } from "./ui/button";

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery("emoji", async () => {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/@emoji-mart/data",
    );

    return response.json();
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (pickerRef.current && !pickerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={pickerRef}>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleToggle}
        className="text-blue-500 hover:bg-blue-500/35 hover:text-blue-500"
      >
        <SmileIcon className="size-5" />
      </Button>
      {isOpen && (
        <div className="absolute z-10 mt-2">
          <Picker data={data} onEmojiSelect={onChange} />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;