import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HStackProps {
  children: ReactNode;
  className?: string;
}

export function HStack({ children, className }: HStackProps) {
  const classNames = twMerge('flex flex-row gap-1', className)
  return <div className={classNames}>{children}</div>
}
