import { editProfileFormSchema } from "@/lib/posts-validation";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import React, { useRef } from "react";
import { UserProfileInfo } from "@/lib/api/responses";
import { ImgEditor } from "./img-editor";
import {
  useProfileImage,
  UseProfileImageReturn,
} from "@/hooks/use-profile-image";
import { Input } from "../ui/input";
import { AutoResizeTextarea } from "../autoresize-textarea";

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
        className=""
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
                  aspect={4 / 1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AvatarField
          form={form}
          avatar={avatar}
          firstName={profile.first_name}
          lastName={profile.last_name}
        />

        <TextFields form={form} isPending={isPending} />

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

const AvatarField = React.memo(function AvatarField({
  form,
  avatar,
  firstName,
  lastName,
}: {
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
  avatar: UseProfileImageReturn;
  firstName?: string;
  lastName?: string;
}) {
  return (
    <FormField
      control={form?.control}
      name="profileImage"
      render={() => (
        <FormItem className="-mt-12 px-4">
          <FormControl>
            <ImgEditor
              imgType="avatar"
              className="size-28"
              firstName={firstName}
              lastName={lastName}
              image={avatar.image}
              onImageChange={avatar.handleImageChange}
              onRemoveImage={avatar.removeImage}
              isDialogOpen={avatar.isDialogOpen}
              setIsDialogOpen={avatar.setIsDialogOpen}
              onSaveCropFile={avatar.handleSaveCropFile}
              onDialogClose={avatar.handleDialogClose}
              temporaryProfileImage={avatar.temporaryImage}
              aspect={1}
              cropShape="round"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

const TextFields = React.memo(function TextFields({
  form,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
  isPending: boolean;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-4 px-4">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input {...field} disabled={isPending} />
            </FormControl>
            <FormDescription>This is your public name</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form?.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <AutoResizeTextarea
                {...field}
                ref={textAreaRef}
                className="scrollbar overflow-y-auto p-4 !text-mid shadow-none transition duration-200 placeholder:transition-all focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus:placeholder:opacity-40"
                placeholder="Compose new post..."
                maxHeight={150}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...field} disabled={isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Website URL</FormLabel>
            <FormControl>
              <Input {...field} disabled={isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
});

export default EditProfileForm;
