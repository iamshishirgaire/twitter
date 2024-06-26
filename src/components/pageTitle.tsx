import { cn } from "@/lib/utils";
import type React from "react";

const PageTitle = ({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-row justify-between", className)}>
      <div className="text-xl font-bold">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default PageTitle;
