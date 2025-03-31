import React from "react";
import { Slider } from "../ui/slider";

export const ImgSlider = React.memo(function ImgSlider({
  text,
  value,
  setValue,
}: {
  text: string;
  value: number;
  setValue: (value: number) => void;
}) {
  const min = 1;
  const max = 3;
  const step = 0.1;

  return (
    <div className="flex items-center gap-2">
      <span>{text}</span>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([val]) => setValue(val)}
      />
    </div>
  );
});
