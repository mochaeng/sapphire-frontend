import { editProfileFormSchema } from "@/lib/posts-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditProfileHeader from "./edit-profile-header";
import EditProfileForm from "./edit-profile-form";
import { UserProfileInfo } from "@/lib/api/responses";

function ProfileSettingsPanel({ profile }: { profile: UserProfileInfo }) {
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      profileImage: null,
      bannerImage: null,
      username: "",
      bio: "",
      location: "",
      website: "",
    },
  });

  return (
    <div className="max-w-settingsPage">
      <EditProfileHeader />
      <EditProfileForm profile={profile} form={form} isPending={false} />
    </div>
  );
}

export default ProfileSettingsPanel;
