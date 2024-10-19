import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps {
  children: ReactNode;
  className?: string;
}

export function Text({ children, className }: TextProps) {
  const classNames = twMerge('text-base', className)
  return <p className={classNames}>{children}</p>
}
