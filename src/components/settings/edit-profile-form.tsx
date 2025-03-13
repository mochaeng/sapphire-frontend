import { editProfileFormSchema } from "@/lib/posts-validation";
import { Form, UseFormReturn } from "react-hook-form";
import { z } from "zod";

function EditProfileForm({
  form,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof editProfileFormSchema>>;
  isPending: boolean;
}) {
  // // Initialize form with react-hook-form
  // const form = useForm<EditProfileFormValues>({
  //   resolver: zodResolver(editProfileFormSchema),
  //   defaultValues: {
  //     username: defaultValues?.username || "",
  //     bio: defaultValues?.bio || "",
  //     placeOfBirth: defaultValues?.placeOfBirth || "",
  //   },
  // });
  console.log(form, isPending);
  return (
    <Form>
      <form></form>
    </Form>
  );
}

export default EditProfileForm;
