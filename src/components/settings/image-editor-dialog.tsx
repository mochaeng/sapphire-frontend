import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ImgSlider } from "./img-slider";
import React, { useCallback, useMemo } from "react";
import { getAvatarSrc } from "@/lib/utils";
import { getCroppedImg } from "@/lib/canvas";
import { CroppedArea } from "@/store/edit-profile-avatar-store";
import Cropper, { Point } from "react-easy-crop";

type ImageEditorProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  imageSrc?: string;
  onSaveCropFile: (file: File) => void;
  temporaryProfileImage?: string;
  croppedAreaPixels: CroppedArea;
  zoomValue: number;
  setZoom: (value: number) => void;
  cropValue: Point;
  setCrop: (value: Point) => void;
  onDialogClose: (shouldSave: boolean) => void;
  onCropComplete: (_: CroppedArea, croppedArea: CroppedArea) => void;
};

export const ImageEditorDialog = React.memo(function AvatarDialog({
  isOpen,
  setIsOpen,
  imageSrc,
  temporaryProfileImage,
  croppedAreaPixels,
  zoomValue,
  setZoom,
  cropValue,
  setCrop,
  onSaveCropFile,
  onDialogClose,
  onCropComplete,
}: ImageEditorProps) {
  const temporaryAvatarSrc = useMemo(
    () => getAvatarSrc(temporaryProfileImage),
    [temporaryProfileImage],
  );

  const handleSave = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);

      if (!croppedImageUrl) {
        throw new Error("failed to generate cropped image URL");
      }

      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();
      const file = new File([blob], "profile-image.png", {
        type: blob.type,
        lastModified: Date.now(),
      });

      onSaveCropFile(file);
      setIsOpen(false);
      onDialogClose(true);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc, onSaveCropFile, setIsOpen, onDialogClose]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onDialogClose(false);
        }
      }}
    >
      <DialogContent className="flex h-full max-h-[800px] w-screen max-w-[600px] flex-col">
        <EditorHeaderDialog />
        <div className="relative mt-8 flex-1">
          <ImageCrop
            imageSrc={temporaryAvatarSrc}
            cropValue={cropValue}
            setCrop={setCrop}
            zoomValue={zoomValue}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex h-fit flex-col gap-2">
          <ImgSlider text="Zoom" value={zoomValue} setValue={setZoom} />
        </div>
        <SaveButton handleSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
});

const EditorHeaderDialog = React.memo(function () {
  return (
    <DialogHeader className="sr-only">
      <DialogTitle>Choose your image to personalize your profile</DialogTitle>
    </DialogHeader>
  );
});

const SaveButton = React.memo(function ({
  handleSave,
}: {
  handleSave: () => void;
}) {
  return <Button onClick={handleSave}>Save</Button>;
});

const ImageCrop = React.memo(function AvatarCrop({
  imageSrc,
  cropValue,
  setCrop,
  zoomValue,
  setZoom,
  onCropComplete,
}: {
  imageSrc?: string;
  cropValue: Point;
  setCrop: (value: Point) => void;
  zoomValue: number;
  setZoom: (value: number) => void;
  onCropComplete: (_: CroppedArea, croppedAreaPixels: CroppedArea) => void;
}) {
  return (
    <Cropper
      style={{
        containerStyle: {
          borderRadius: "8px",
          // backgroundColor: "black",
          overflow: "hidden",
        },
        cropAreaStyle: {
          // backgroundColor: "#fff",
          // boxShadow: "none",
        },
        mediaStyle: {
          objectFit: "cover",
          // background: "#fff",
          // mixBlendMode: "normal",
        },
      }}
      image={imageSrc}
      crop={cropValue}
      zoom={zoomValue}
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
});
