import { GetNameAcronym } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddMediaButton, ImageMediaButton } from "../create/add-media-button";
import { Camera, X } from "lucide-react";
import Cropper from "react-easy-crop";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { useProfileAvatarStore } from "@/store/edit-profile-avatar-store";

type AvatarProfileEditProps = {
  profileImage: string | File | null;
  onImageChange: () => void;
  onRemoveImage: () => void;
  isAvatarDialogOpen: boolean;
  setIsAvatarDialogOpen: (isOpen: boolean) => void;
  firstName: string;
  lastName: string | undefined;
};

export const EditAvatarProfile = React.memo(function EditAvatarProfile({
  profileImage,
  onImageChange,
  onRemoveImage,
  isAvatarDialogOpen,
  setIsAvatarDialogOpen,
  firstName,
  lastName,
}: AvatarProfileEditProps) {
  const getAvatarSrc = useMemo(() => {
    if (typeof profileImage === "string") return profileImage;
    if (profileImage instanceof File) return URL.createObjectURL(profileImage);
    return undefined;
  }, [profileImage]);

  return (
    <>
      <div className="relative flex size-28 items-center justify-center rounded-full border border-black">
        <Avatar className="size-28">
          <AvatarImage className="object-cover" src={getAvatarSrc} />
          <AvatarFallback className="bg-secondaryOnlyPlaceholder text-4xl font-bold text-primary">
            {GetNameAcronym(firstName, lastName)}
          </AvatarFallback>
        </Avatar>
        <MediaButtons
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
        />
      </div>

      <AvatarDialog
        isAvatarDialogOpen={isAvatarDialogOpen}
        setIsAvatarDialogOpen={setIsAvatarDialogOpen}
      />
    </>
  );
});

const MediaButtons = React.memo(function MediaButtons({
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

const AvatarDialog = React.memo(function AvatarDialog({
  isAvatarDialogOpen,
  setIsAvatarDialogOpen,
}: {
  isAvatarDialogOpen: boolean;
  setIsAvatarDialogOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-[800px] w-screen max-w-[600px] flex-col">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="relative mt-8 flex-1">
          <AvatarCrop />
        </div>
        <div className="flex h-fit flex-col gap-2">
          <ImgSlider text="Zoom" />
          <ImgSlider text="Rotation" />
        </div>
        <Button>Save</Button>
      </DialogContent>
    </Dialog>
  );
});

const AvatarCrop = React.memo(function AvatarCrop() {
  const zoom = useProfileAvatarStore((state) => state.zoom);
  const setZoom = useProfileAvatarStore((state) => state.setZoom);
  const crop = useProfileAvatarStore((state) => state.crop);
  const setCrop = useProfileAvatarStore((state) => state.setCrop);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

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
      image="https://upload.wikimedia.org/wikipedia/commons/5/5b/241204_Chaeyoung_at_Rokh_H%26M_%282%29.png"
      // cropSize={{ width: 400, height: 400 }}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
});

const ImgSlider = React.memo(function ImgSlider({ text }: { text: string }) {
  const zoom = useProfileAvatarStore((state) => state.zoom);
  const setZoom = useProfileAvatarStore((state) => state.setZoom);

  const handleZoomChange = useCallback(
    (vals: number[]) => setZoom(vals[0]),
    [setZoom],
  );

  return (
    <div className="flex items-center gap-2">
      <span>{text}</span>
      <Slider
        className="cursor-pointer"
        aria-labelledby="Zoom"
        defaultValue={[zoom]}
        min={1}
        max={3}
        step={0.1}
        onValueChange={handleZoomChange}
      />
    </div>
  );
});
