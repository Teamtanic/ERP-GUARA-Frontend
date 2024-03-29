import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

export interface TextProps {
  size?: "xm" | "sm" | "md";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Text({ size = "md", children, asChild, className }: TextProps) {
  const Component = asChild ? Slot : "span";

  return (
    <>
      <Component
        className={clsx(
          "font-poppins",
          {
            "text-xs max-sm:text-2xs": size === "xm",
            "text-sm max-sm:text-xs": size === "sm",
            "text-md max-sm:text-sm": size === "md",
          },
          className ? className : "text-gray-900 dark:text-gray-100"
        )}
      >
        {children}
      </Component>
    </>
  );
}