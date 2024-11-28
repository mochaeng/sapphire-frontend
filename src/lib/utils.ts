import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const focusClasses = "focus:bg-primary-foreground focus:text-primary";

export const focusVisibleClasses =
  "focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-primary focus-visible:outline-none";

export const buttonClasses =
  "flex items-center justify-center gap-4 rounded-xl px-0 py-[6px] text-secondaryOnly shadow-none md:h-full md:w-full md:justify-center xl:justify-start";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
