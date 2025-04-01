import { editProfileFormSchema } from "@/lib/posts-validation";
import { readFile } from "@/lib/utils";
import {
  CroppedArea,
  croppedAreaDefault,
} from "@/store/edit-profile-avatar-store";
import { useCallback, useRef, useState } from "react";
import { Point } from "react-easy-crop";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type ProfileImageOptions = {
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
  fieldName: "profileImage" | "bannerImage";
  initialImage: string | null;
  onCropStart?: () => void;
};

export function useProfileImage({
  form,
  fieldName,
  initialImage,
  onCropStart,
}: ProfileImageOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | string | null>(
    initialImage || null,
  );
  const [temporaryImage, setTemporaryImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea>(croppedAreaDefault);

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setCroppedAreaPixels(croppedAreaDefault);

          const imageDataUrl = await readFile(file);
          setTemporaryImage(imageDataUrl);

          setIsDialogOpen(true);
          e.target.value = "";
          if (onCropStart) onCropStart();
        } catch (e) {
          console.error(e);
        }
      }
    },
    [onCropStart],
  );

  const handleImageChange = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const removeImage = useCallback(() => {
    setImage(null);
    form.setValue(fieldName, null);
  }, [form, fieldName]);

  const handleSaveCropFile = useCallback(
    (file: File) => {
      setImage(file);
      form.setValue(fieldName, file);
    },
    [form, fieldName],
  );

  const handleDialogClose = useCallback(
    (shouldSave: boolean) => {
      setTemporaryImage(null);
      if (!shouldSave) {
        setImage(initialImage || null);
        form.setValue(fieldName, null);
        setIsDialogOpen(false);
      }
    },
    [form, fieldName, initialImage],
  );

  return {
    image,
    temporaryImage,
    isDialogOpen,
    crop,
    zoom,
    croppedAreaPixels,
    fileInputRef,

    setImage,
    setTemporaryImage,
    setIsDialogOpen,
    setCrop,
    setZoom,
    setCroppedAreaPixels,

    handleFileInputChange,
    handleImageChange,
    removeImage,
    handleSaveCropFile,
    handleDialogClose,
  };
}
