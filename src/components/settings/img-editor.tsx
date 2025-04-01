import { cn, getAvatarSrc, GetNameAcronym } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React, { useCallback, useMemo, useState } from "react";
import { CroppedArea } from "@/store/edit-profile-avatar-store";
import { MediaButtons } from "./media-buttons";
import { ImageEditorDialog } from "./image-editor-dialog";
import { Point } from "react-easy-crop";

type ImgEditorProps = {
  image: string | File | null;
  onImageChange: () => void;
  onRemoveImage: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  firstName?: string;
  lastName?: string;
  onSaveCropFile: (file: File) => void;
  temporaryProfileImage?: string | null;
  onDialogClose: (shouldSave: boolean) => void;
  imgType: "avatar" | "banner";
};

export const ImgEditor = React.memo(function ImgEditor({
  image,
  onImageChange,
  onRemoveImage,
  isDialogOpen: isAvatarDialogOpen,
  setIsDialogOpen: setIsAvatarDialogOpen,
  firstName,
  lastName,
  onSaveCropFile,
  temporaryProfileImage,
  onDialogClose: onProfileDialogClose,
  imgType = "avatar",
  className,
}: ImgEditorProps & React.HTMLAttributes<HTMLDivElement>) {
  const [zoomValue, setZoom] = useState(1);
  const [cropValue, setCrop] = useState({ x: 0, y: 0 } as Point);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  } as CroppedArea);

  const onCropComplete = useCallback(
    (_: CroppedArea, croppedAreaPixels: CroppedArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
  );

  const temporaryImageSrc = useMemo(
    () => getAvatarSrc(temporaryProfileImage),
    [temporaryProfileImage],
  );

  const imgSrc = useMemo(() => getAvatarSrc(image), [image]);

  return (
    <>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full",
          className,
        )}
      >
        {imgType === "avatar" ? (
          <AvatarProfile
            firstName={firstName}
            lastName={lastName}
            imgSrc={imgSrc}
          />
        ) : (
          <BannerProfile imgSrc={imgSrc} />
        )}
        <MediaButtons
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
        />
      </div>

      <ImageEditorDialog
        isOpen={isAvatarDialogOpen}
        setIsOpen={setIsAvatarDialogOpen}
        imageSrc={temporaryImageSrc}
        temporaryProfileImage={temporaryImageSrc}
        croppedAreaPixels={croppedAreaPixels}
        zoomValue={zoomValue}
        setZoom={setZoom}
        cropValue={cropValue}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        onSaveCropFile={onSaveCropFile}
        onDialogClose={onProfileDialogClose}
      />
    </>
  );
});

const AvatarProfile = React.memo(function AvatarProfile({
  imgSrc,
  firstName,
  lastName,
}: {
  imgSrc?: string;
  firstName?: string;
  lastName?: string;
}) {
  return (
    <Avatar className="size-28">
      <AvatarImage className="object-cover" src={imgSrc} />
      <AvatarFallback className="bg-secondaryOnlyPlaceholder text-4xl font-bold text-primary">
        {GetNameAcronym(firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
});

const BannerProfile = React.memo(function BannerProfile({
  imgSrc,
}: {
  imgSrc?: string;
}) {
  return imgSrc ? (
    <img src={imgSrc} alt="Banner" className="h-full w-full object-cover" />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-rose-400 text-gray-500">
      No banner image
    </div>
  );
});
