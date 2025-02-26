import { zodResolver } from "@hookform/resolvers/zod";
import { SignupPayload } from "@/lib/api/payloads";
import { fetchSignup } from "@/lib/api/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupFormSchema } from "@/lib/auth-validation";
import AuthFormButton from "./auth-form-button";
import { useMutation } from "@tanstack/react-query";

function SignupForm({
  onOpenLogin,
  setAlertOpen,
}: {
  onOpenLogin: () => void;
  setAlertOpen: (open: boolean) => void;
}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: fetchSignup,
    onSuccess: () => {
      console.log("success");
      setAlertOpen(true);
      onOpenLogin();
    },
    onError: (error) => {
      if (error.message === "e-mail already taken") {
        form.setError("email", { message: error.message });
      }
      if (error.message === "username already taken") {
        form.setError("username", { message: error.message });
      }
    },
  });

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    const payload: SignupPayload = {
      email: values.email,
      first_name: values.name,
      username: values.username,
      password: values.password,
    };
    mutate(payload);
  };

  const isButtonDisable =
    (form.watch("name") || "").trim().length === 0 ||
    (form.watch("username") || "").trim().length === 0 ||
    (form.watch("email") || "").trim().length === 0 ||
    (form.watch("password") || "").trim().length === 0;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-authForm flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormDescription>This is your public name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending && (
            <p className="text-center text-sm text-primary">Loading...</p>
          )}
          {!isPending && error && (
            <p className="text-center text-sm text-rose-500">{}</p>
          )}
          <AuthFormButton disabled={isButtonDisable || isPending}>
            SIGN UP
          </AuthFormButton>
        </form>
      </Form>
    </>
  );
}

export default SignupForm;
