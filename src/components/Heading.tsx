import { clsx } from "clsx";
import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

export interface HeadingProps {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Heading({
  size = "md",
  children,
  asChild,
  className,
}: HeadingProps) {
  const Component = asChild ? Slot : "h2";

  return (
    <>
      <Component
        className={clsx(
          "text-gray-900 dark:text-gray-100 font-bold font-poppins",
          {
            "md:text-lg max-md::text-md": size === "sm",
            "md:text-xl max-md::text-lg": size === "md",
            "md:text-2xl max-md:text-xl": size === "lg",
          },
          className
        )}
      >
        {children}
      </Component>
    </>
  );
}