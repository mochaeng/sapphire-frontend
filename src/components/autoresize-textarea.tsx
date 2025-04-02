import React, { useCallback, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;
  maxHeight?: number;
}

const AutoResizeTextarea = React.memo(
  React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
    (
      { className, value, onChange, onValueChange, maxHeight, ...props },
      ref,
    ) => {
      const textareaRef = useRef<HTMLTextAreaElement | null>(null);

      if (!maxHeight) {
        maxHeight = 300;
      }

      const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          const newHeight = Math.min(textarea.scrollHeight, maxHeight);
          textarea.style.height = `${newHeight}px`;
        }
      }, [maxHeight]);

      useEffect(() => {
        adjustHeight();
      }, [value, adjustHeight]);

      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        onValueChange?.(e.target.value);
        adjustHeight();
      };

      return (
        <Textarea
          {...props}
          ref={(element) => {
            textareaRef.current = element;
            if (typeof ref === "function") {
              ref(element);
            } else if (ref) {
              ref.current = element;
            }
          }}
          value={value}
          onChange={handleChange}
          className={cn("resize-none overflow-hidden", className)}
        />
      );
    },
  ),
);

AutoResizeTextarea.displayName = "AutoResizeTextarea";

export { AutoResizeTextarea };
