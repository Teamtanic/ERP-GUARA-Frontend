import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Button({
  children,
  asChild,
  className,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <>
      <Component
        className={clsx(
          "font-poppins py-3 px-4 bg-emerald-500 rounded font-semibold text-gray-900 text-sm w-full transition-colors hover:bg-emerald-400 focus:ring-2 ring-white",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    </>
  );
}