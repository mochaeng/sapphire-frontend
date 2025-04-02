import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ImgSlider } from "./img-slider";
import React, { useCallback, useMemo, useState } from "react";
import { getAvatarSrc } from "@/lib/utils";
import { getCroppedImg } from "@/lib/canvas";
import { CroppedArea } from "@/store/edit-profile-avatar-store";
import Cropper, { Point } from "react-easy-crop";

export type CropShape = "rect" | "round" | undefined;

type ImageEditorProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  imageSrc?: string;
  onSaveCropFile: (file: File) => void;
  temporaryProfileImage?: string;
  onDialogClose: (shouldSave: boolean) => void;
  aspect?: number;
  cropShape?: CropShape;
};

export const ImageEditorDialog = React.memo(function AvatarDialog({
  isOpen,
  setIsOpen,
  imageSrc,
  temporaryProfileImage,
  onSaveCropFile,
  onDialogClose,
  aspect = 1,
  cropShape,
}: ImageEditorProps) {
  const [zoomValue, setZoom] = useState(1);

  const temporaryAvatarSrc = useMemo(
    () => getAvatarSrc(temporaryProfileImage),
    [temporaryProfileImage],
  );

  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  } as CroppedArea);

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
        <ImageCrop
          imageSrc={temporaryAvatarSrc}
          zoomValue={zoomValue}
          setZoom={setZoom}
          setCroppedAreaPixels={setCroppedAreaPixels}
          aspect={aspect}
          cropShape={cropShape}
        />
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
  zoomValue,
  setZoom,
  setCroppedAreaPixels,
  aspect = 1,
  cropShape,
}: {
  imageSrc?: string;
  zoomValue: number;
  setZoom: (value: number) => void;
  setCroppedAreaPixels: (croppedAre: CroppedArea) => void;
  aspect?: number;
  cropShape: CropShape;
}) {
  const [cropValue, setCrop] = useState({ x: 0, y: 0 } as Point);

  const onCropComplete = useCallback(
    (_: CroppedArea, croppedAreaPixels: CroppedArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
  );

  return (
    <div className="relative mt-8 flex-1">
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
        aspect={aspect}
        cropShape={cropShape}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
});
