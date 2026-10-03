"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-[color:var(--overlay)] backdrop-blur-sm data-[state=closed]:animate-[fade-out_.2s_ease] data-[state=open]:animate-[fade-in_.2s_ease]" />
      <Dialog.Content className={cn("fixed inset-x-3 top-3 z-50 flex max-h-[calc(100dvh-1.5rem)] flex-col rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] p-6 shadow-2xl outline-none data-[state=closed]:animate-[sheet-out_.24s_ease] data-[state=open]:animate-[sheet-in_.32s_var(--ease-out)]", className)} {...props}>
        {children}
        <Dialog.Close className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
          <X className="size-5" aria-hidden="true" /><span className="sr-only">Close navigation</span>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export const SheetTitle = Dialog.Title;
export const SheetDescription = Dialog.Description;
