import PopupProfileTile from "@/app/dashboard/components/popup-user-tile";
import ProfileTile from "@/app/dashboard/components/profileTile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import React from "react";

interface ParsedText {
  components: React.ReactNode[];
}

export const parseText = (text: string): ParsedText => {
  const mentionRegex = /@\w+/g;
  const hashtagRegex = /#\w+/g;

  const components: React.ReactNode[] = [];
  let lastIndex = 0;

  const addTextComponent = (start: number, end: number) => {
    const part = text.slice(start, end);
    if (part) {
      components.push(part);
    }
  };

  let match: RegExpExecArray | null;
  while ((match = mentionRegex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      addTextComponent(lastIndex, match.index);
    }

    components.push(
      <TooltipProvider key={`mention-${match.index}`}>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`/profile?user_name=${match[0].slice(1)}`}
              className="text-blue-500"
            >
              {match[0]}
            </Link>
          </TooltipTrigger>
          <TooltipContent className="border border-border bg-popover/40 backdrop-blur-lg">
            <PopupProfileTile userName={match[0].slice(1)} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    lastIndex = match.index + match[0].length;
  }

  while ((match = hashtagRegex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      addTextComponent(lastIndex, match.index);
    }
    components.push(
      <Link
        href={"/hashtag/" + match[0].slice(1)}
        className="text-blue-500 underline-offset-2 hover:underline"
        key={`hashtag-${match.index}`}
      >
        {match[0]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    addTextComponent(lastIndex, text.length);
  }

  const finalComponents: React.ReactNode[] = [];
  components.forEach((component, index) => {
    if (typeof component === "string") {
      const lines = component.split("\n");
      lines.forEach((line, lineIndex) => {
        if (line.trim() !== "") {
          finalComponents.push(line);
        }
      });
    } else {
      finalComponents.push(component);
    }
  });

  return { components: finalComponents };
};