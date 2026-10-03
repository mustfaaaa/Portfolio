import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold tracking-[-0.01em] transition-[transform,background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-45",
  { variants: { variant: {
    primary: "bg-[var(--foreground)] text-[var(--background)] shadow-[0_10px_35px_-16px_var(--accent)] hover:bg-[var(--accent)] hover:text-white",
    secondary: "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-[var(--surface-strong)]",
    ghost: "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]",
    icon: "size-11 p-0 border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  }, size: { default: "min-h-11", lg: "min-h-12 px-6 text-base", icon: "size-11 p-0" } }, defaultVariants: { variant: "primary", size: "default" } },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
