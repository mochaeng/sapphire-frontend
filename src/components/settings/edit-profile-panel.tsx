import { editProfileFormSchema } from "@/lib/posts-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditProfileHeader from "./edit-profile-header";
import EditProfileForm from "./edit-profile-form";
import { UserProfileInfo } from "@/lib/api/responses";
import { cn } from "@/lib/utils";

function ProfileSettingsPanel({
  profile,
  className,
}: { profile: UserProfileInfo } & React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      profileImage: profile.avatar_url,
      bannerImage: profile.banner_url,
      username: profile.username,
      bio: profile.description,
      location: profile.location,
      website: profile.user_link,
    },
  });

  return (
    <div className={cn("max-w-settingsPage", className)}>
      <EditProfileHeader />
      <EditProfileForm profile={profile} form={form} isPending={false} />
    </div>
  );
}

export default ProfileSettingsPanel;
