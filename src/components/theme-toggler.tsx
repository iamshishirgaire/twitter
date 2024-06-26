"use client";

import * as React from "react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:border-border/50">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon className="me-2 size-5"></SunIcon>
          Light
        </DropdownMenuItem>
        <hr className="dark:border-gray-700" />
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon className="me-2 size-5"></MoonIcon>
          Dark
        </DropdownMenuItem>
        <hr className="dark:border-gray-700" />

        <DropdownMenuItem onClick={() => setTheme("system")}>
          <ComputerDesktopIcon className="me-2 size-5"></ComputerDesktopIcon>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
