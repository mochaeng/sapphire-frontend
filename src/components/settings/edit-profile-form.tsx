import { editProfileFormSchema } from "@/lib/posts-validation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { AddMediaButton, ImageMediaButton } from "../create/add-media-button";
import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";
import { UserProfileInfo } from "@/lib/api/responses";
import { UserAvatar } from "../profile/user-info";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GetNameAcronym } from "@/lib/utils";

function EditProfileForm({
  profile,
  form,
  isPending,
  ...props
}: {
  profile: UserProfileInfo;
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
  isPending: boolean;
} & React.HTMLAttributes<HTMLFormElement>) {
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const bannerImageInputRef = useRef<HTMLInputElement>(null);

  // Local state for previewing images
  const [profileImage, setProfileImage] = useState<File | string | null>(
    profile.avatar_url || null,
  );
  const [bannerImage, setBannerImage] = useState<File | string | null>(null);

  console.log("image ", profileImage);

  // Handlers for profile image
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      form.setValue("profileImage", file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    form.setValue("profileImage", null);
  };

  // Handlers for banner image
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      form.setValue("bannerImage", file);
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
    form.setValue("bannerImage", null);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
        {...props}
      >
        <FormField
          control={form?.control}
          name="profileImage"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="relative flex size-28 items-center justify-center rounded-full border border-black">
                  <Avatar className="size-28">
                    <AvatarImage
                      className="object-cover"
                      src={
                        typeof profileImage === "string"
                          ? profileImage
                          : profileImage instanceof File
                            ? URL.createObjectURL(profileImage)
                            : undefined
                      }
                    />
                    <AvatarFallback className="bg-secondaryOnlyPlaceholder text-4xl font-bold text-primary">
                      {GetNameAcronym(profile.first_name, profile.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute flex text-white">
                    <AddMediaButton
                      disabled={false}
                      onClick={() => profileImageInputRef.current?.click()}
                    >
                      <ImageMediaButton
                        Icon={Camera}
                        disableMediaButtons={false}
                      />
                    </AddMediaButton>
                    <AddMediaButton onClick={removeProfileImage}>
                      <ImageMediaButton Icon={X} disableMediaButtons={false} />
                    </AddMediaButton>
                    <input
                      type="file"
                      ref={profileImageInputRef}
                      className="hidden"
                      onChange={handleProfileImageChange}
                      accept="image/*"
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default EditProfileForm;
