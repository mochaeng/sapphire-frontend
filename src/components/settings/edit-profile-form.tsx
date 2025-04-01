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
import React from "react";
import { UserProfileInfo } from "@/lib/api/responses";
import { ImgEditor } from "./img-editor";
import { useProfileImage } from "@/hooks/use-profile-image";

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
  const avatar = useProfileImage({
    form,
    fieldName: "profileImage",
    initialImage: profile.avatar_url || null,
  });

  const banner = useProfileImage({
    form,
    fieldName: "bannerImage",
    initialImage: profile.banner_url || null,
  });

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
                <ImgEditor
                  imgType="banner"
                  className="h-[180px]"
                  image={banner.image}
                  onImageChange={banner.handleImageChange}
                  onRemoveImage={banner.removeImage}
                  isDialogOpen={banner.isDialogOpen}
                  setIsDialogOpen={banner.setIsDialogOpen}
                  onSaveCropFile={banner.handleSaveCropFile}
                  onDialogClose={banner.handleDialogClose}
                  temporaryProfileImage={banner.temporaryImage}
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
                <ImgEditor
                  imgType="avatar"
                  className="size-28"
                  firstName={profile.first_name}
                  lastName={profile.last_name}
                  image={avatar.image}
                  onImageChange={avatar.handleImageChange}
                  onRemoveImage={avatar.removeImage}
                  isDialogOpen={avatar.isDialogOpen}
                  setIsDialogOpen={avatar.setIsDialogOpen}
                  onSaveCropFile={avatar.handleSaveCropFile}
                  onDialogClose={avatar.handleDialogClose}
                  temporaryProfileImage={avatar.temporaryImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input
          type="file"
          ref={avatar.fileInputRef}
          className="hidden"
          onChange={avatar.handleFileInputChange}
          accept="image/*"
        />
        <input
          type="file"
          ref={banner.fileInputRef}
          className="hidden"
          onChange={banner.handleFileInputChange}
          accept="image/*"
        />
      </form>
    </Form>
  );
});

export default EditProfileForm;
