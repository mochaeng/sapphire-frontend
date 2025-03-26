import { AddMediaButton, ImageMediaButton } from "../create/add-media-button";
import { Camera, X } from "lucide-react";

type EditBannerProfileProps = {
  bannerImage: string | File | null;
  onImageChange: () => void;
  onRemoveImage: () => void;
};

export function EditBannerProfile({
  bannerImage,
  onImageChange,
  onRemoveImage,
}: EditBannerProfileProps) {
  console.log("banner ", bannerImage);

  return (
    <div className="relative flex h-[180px] w-full items-center justify-center">
      {bannerImage ? (
        <img
          src={
            typeof bannerImage === "string"
              ? bannerImage
              : bannerImage instanceof File
                ? URL.createObjectURL(bannerImage)
                : undefined
          }
          alt="Banner"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-rose-400 text-gray-500">
          No banner image
        </div>
      )}

      <div className="absolute flex text-white">
        <AddMediaButton
          className="bg-black"
          disabled={false}
          onClick={onImageChange}
        >
          <ImageMediaButton Icon={Camera} disableMediaButtons={false} />
        </AddMediaButton>
        <AddMediaButton onClick={onRemoveImage}>
          <ImageMediaButton Icon={X} disableMediaButtons={false} />
        </AddMediaButton>
      </div>
    </div>
  );
}
