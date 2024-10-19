import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export function Box({ children, className }: BoxProps) {
  const classNames = twMerge('border border-solid border-black', className)
  return <div className={classNames}>{children}</div>;
}
