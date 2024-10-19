import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface VStackProps {
  children: ReactNode;
  className?: string;
}

export function VStack({ children, className }: VStackProps) {
  const classNames = twMerge('flex flex-col gap-1', className)
  return <div className={classNames}>{children}</div>
}
