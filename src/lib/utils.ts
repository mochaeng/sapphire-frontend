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

type Camelize<T extends string> = T extends `${infer A}_${infer B}`
  ? `${A}${Camelize<Capitalize<B>>}`
  : T;

type CamelizeKeys<T extends object> = {
  [key in keyof T as key extends string
    ? Camelize<key>
    : key]: T[key] extends object ? CamelizeKeys<T[key]> : T[key];
};

export function toCamel<T extends object>(o: T): CamelizeKeys<T> {
  if (Array.isArray(o)) {
    return o.map((value) =>
      typeof value === "object" && value !== null
        ? toCamel(value as object)
        : value,
    ) as unknown as CamelizeKeys<T>;
  } else {
    // const newO = {} as { [k in Extract<keyof T, string> as Camelize<k>]: T[k] };
    const newO: Record<string, unknown> = {};
    for (const origKey in o) {
      if (Object.prototype.hasOwnProperty.call(o, origKey)) {
        const newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) ||
          origKey) as Camelize<Extract<keyof T, string>>;
        let value = o[origKey as keyof T];
        if (
          value instanceof Array ||
          (typeof value === "object" && value !== null)
        ) {
          value = toCamel(value as Record<string, unknown>) as T[keyof T];
        }
        newO[newKey as keyof typeof newO] = value;
      }
    }
    return newO as CamelizeKeys<T>;
  }
}
