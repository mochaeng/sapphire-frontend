import { getAvatarSrc, GetNameAcronym } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React, { useCallback, useMemo, useState } from "react";
import { CroppedArea } from "@/store/edit-profile-avatar-store";
import { MediaButtons } from "./media-buttons";
import { ImageEditorDialog } from "./image-editor-dialog";
import { Point } from "react-easy-crop";

type AvatarProfileEditProps = {
  profileImage: string | File | null;
  onImageChange: () => void;
  onRemoveImage: () => void;
  isAvatarDialogOpen: boolean;
  setIsAvatarDialogOpen: (isOpen: boolean) => void;
  firstName: string;
  lastName: string | undefined;
  onSaveCropValue: (file: File) => void;
  temporaryProfileImage?: string | null;
  onProfileDialogClose: (shouldSave: boolean) => void;
};

export const EditAvatarProfile = React.memo(function EditAvatarProfile({
  profileImage,
  onImageChange,
  onRemoveImage,
  isAvatarDialogOpen,
  setIsAvatarDialogOpen,
  firstName,
  lastName,
  onSaveCropValue,
  temporaryProfileImage,
  onProfileDialogClose,
}: AvatarProfileEditProps) {
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

  const temporaryAvatarSrc = useMemo(
    () => getAvatarSrc(temporaryProfileImage),
    [temporaryProfileImage],
  );

  const avatarSrc = useMemo(() => getAvatarSrc(profileImage), [profileImage]);

  return (
    <>
      <div className="relative flex size-28 items-center justify-center rounded-full border border-black">
        <AvatarProfile
          firstName={firstName}
          lastName={lastName}
          avatarSrc={avatarSrc}
        />
        <MediaButtons
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
        />
      </div>

      <ImageEditorDialog
        isOpen={isAvatarDialogOpen}
        setIsOpen={setIsAvatarDialogOpen}
        imageSrc={temporaryAvatarSrc}
        temporaryProfileImage={temporaryAvatarSrc}
        croppedAreaPixels={croppedAreaPixels}
        zoomValue={zoomValue}
        setZoom={setZoom}
        cropValue={cropValue}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        onSaveCropFile={onSaveCropValue}
        onDialogClose={onProfileDialogClose}
      />
    </>
  );
});

const AvatarProfile = React.memo(function AvatarProfile({
  avatarSrc,
  firstName,
  lastName,
}: {
  avatarSrc?: string;
  firstName: string;
  lastName?: string;
}) {
  return (
    <Avatar className="size-28">
      <AvatarImage className="object-cover" src={avatarSrc} />
      <AvatarFallback className="bg-secondaryOnlyPlaceholder text-4xl font-bold text-primary">
        {GetNameAcronym(firstName, lastName)}
      </AvatarFallback>
    </Avatar>
  );
});
