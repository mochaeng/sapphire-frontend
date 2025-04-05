import {
  EditProfileFormMaxLengths,
  editProfileFormSchema,
} from "@/lib/posts-validation";
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

        <TextFields form={form} profile={profile} isPending={isPending} />

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
  profile,
  form,
  isPending,
}: {
  profile: UserProfileInfo;
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
  isPending: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 text-secondaryOnly">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="relative mt-4">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  className="pl-6"
                  placeholder="Username"
                  {...field}
                  disabled={isPending}
                />
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500">
                  @
                </span>
              </div>
            </FormControl>
            <FormDescription>
              https://sapphire.mochaeng.xyz/{field.value}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <TextFormField
        type="area"
        fieldName="bio"
        form={form}
        hasCharCount={true}
        isPending={isPending}
        title="Bio"
      />

      <TextFormField
        fieldName="location"
        form={form}
        hasCharCount={true}
        isPending={isPending}
        title="Location"
      />

      <TextFormField
        fieldName="website"
        form={form}
        hasCharCount={true}
        isPending={isPending}
        title="Your Website URL"
      />
    </div>
  );
});

const TextFormField = React.memo(function TextFormField({
  type = "normal",
  form,
  isPending,
  fieldName,
  title,
  hasCharCount,
  description,
}: {
  type?: "area" | "normal";
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
  isPending: boolean;
  fieldName: "bio" | "location" | "website";
  title: string;
  hasCharCount: boolean;
  description?: string;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const currentLength = form.watch(fieldName)?.length || 0;
        return (
          <FormItem>
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <div className="flex flex-col">
                {type === "area" ? (
                  <AutoResizeTextarea
                    {...field}
                    ref={textAreaRef}
                    className="scrollbar overflow-y-auto border-custom/25 p-4 !text-mid text-primaryOnly shadow-none transition duration-200 placeholder:transition-all focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus:placeholder:opacity-40"
                    placeholder="Write about you"
                    maxHeight={250}
                  />
                ) : (
                  <>
                    <Input
                      {...field}
                      className="truncate border-custom/25"
                      disabled={isPending}
                      maxLength={EditProfileFormMaxLengths[fieldName]}
                    />
                  </>
                )}
                {hasCharCount ? (
                  <span className="mt-1 self-end text-sm text-gray-500">
                    {currentLength}/{EditProfileFormMaxLengths[fieldName]}
                  </span>
                ) : null}
              </div>
            </FormControl>
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
});

export default EditProfileForm;
