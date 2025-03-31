import React from "react";
import { AddMediaButton, ImageMediaButton } from "../create/add-media-button";
import { Camera, X } from "lucide-react";

export const MediaButtons = React.memo(function MediaButtons({
  onImageChange,
  onRemoveImage,
}: {
  onImageChange: () => void;
  onRemoveImage: () => void;
}) {
  return (
    <div className="absolute flex text-white">
      <AddMediaButton disabled={false} onClick={onImageChange}>
        <ImageMediaButton Icon={Camera} disableMediaButtons={false} />
      </AddMediaButton>
      <AddMediaButton onClick={onRemoveImage}>
        <ImageMediaButton Icon={X} disableMediaButtons={false} />
      </AddMediaButton>
    </div>
  );
});
