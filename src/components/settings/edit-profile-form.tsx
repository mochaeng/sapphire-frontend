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
import React, { useCallback, useRef, useState } from "react";
import { UserProfileInfo } from "@/lib/api/responses";
import { EditAvatarProfile } from "./edit-avatar-profile";
import { EditBannerProfile } from "./edit-banner-profile";

const EditProfileForm = React.memo(function EditProfileForm({
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
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<File | string | null>(
    profile.avatar_url || null,
  );
  const [bannerImage, setBannerImage] = useState<File | string | null>(null);

  const handleProfileImageChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      console.log("hallo");
      if (file) {
        setProfileImage(file);
        form.setValue("profileImage", file);
        setIsAvatarDialogOpen(true);
      }
    },
    [form, setIsAvatarDialogOpen],
  );

  const handleBannerImageChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      form.setValue("bannerImage", file);
    }
  };

  const removeProfileImage = useCallback(() => {
    setProfileImage(null);
    form.setValue("profileImage", null);
  }, [form]);

  const handleProfileImageChange = useCallback(() => {
    profileImageInputRef.current?.click();
  }, []);

  const removeBannerImage = useCallback(() => {
    setBannerImage(null);
    form.setValue("bannerImage", null);
  }, [form, setBannerImage]);

  return (
    <Form {...form}>
      <form
        className="bg-yellow-100"
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
        {...props}
      >
        <FormField
          control={form?.control}
          name="bannerImage"
          render={() => (
            <FormItem>
              <FormControl>
                <EditBannerProfile
                  bannerImage={bannerImage}
                  onImageChange={() => bannerImageInputRef.current?.click()}
                  onRemoveImage={removeBannerImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form?.control}
          name="profileImage"
          render={() => (
            <FormItem>
              <FormControl>
                <EditAvatarProfile
                  profileImage={profileImage}
                  onImageChange={handleProfileImageChange}
                  onRemoveImage={removeProfileImage}
                  isAvatarDialogOpen={isAvatarDialogOpen}
                  setIsAvatarDialogOpen={setIsAvatarDialogOpen}
                  firstName={profile.first_name}
                  lastName={profile.last_name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input
          type="file"
          ref={profileImageInputRef}
          className="hidden"
          onChange={handleProfileImageChangeInput}
          accept="image/*"
        />
        <input
          type="file"
          ref={bannerImageInputRef}
          className="hidden"
          onChange={handleBannerImageChangeInput}
          accept="image/*"
        />
      </form>
    </Form>
  );
});

export default EditProfileForm;
