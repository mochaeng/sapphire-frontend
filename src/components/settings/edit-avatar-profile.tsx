import { GetNameAcronym } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddMediaButton, ImageMediaButton } from "../create/add-media-button";
import { Camera, X } from "lucide-react";
import Cropper from "react-easy-crop";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

type AvatarProfileEditProps = {
  profileImage: string | File | null;
  onImageChange: () => void;
  onRemoveImage: () => void;
  firstName: string;
  lastName: string | undefined;
};

export function EditAvatarProfile({
  profileImage,
  onImageChange,
  onRemoveImage,
  firstName,
  lastName,
}: AvatarProfileEditProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const getAvatarSrc = () => {
    if (typeof profileImage === "string") return profileImage;
    if (profileImage instanceof File) return URL.createObjectURL(profileImage);
    return undefined;
  };

  return (
    <>
      <div className="relative flex size-28 items-center justify-center rounded-full border border-black">
        <Avatar className="size-28">
          <AvatarImage className="object-cover" src={getAvatarSrc()} />
          <AvatarFallback className="bg-secondaryOnlyPlaceholder text-4xl font-bold text-primary">
            {GetNameAcronym(firstName, lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="absolute flex text-white">
          <AddMediaButton disabled={false} onClick={onImageChange}>
            <ImageMediaButton Icon={Camera} disableMediaButtons={false} />
          </AddMediaButton>
          <AddMediaButton onClick={onRemoveImage}>
            <ImageMediaButton Icon={X} disableMediaButtons={false} />
          </AddMediaButton>
        </div>
      </div>

      {/* export type Size = {
          width: number;
          height: number;
      }; */}
      <Dialog open={false}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="h-[425px]">
          <Cropper
            image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e"
            cropSize={{ width: 400, height: 400 }}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
