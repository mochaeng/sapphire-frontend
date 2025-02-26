import AuthFormButton from "./auth-form-button";
import { SigninPayload } from "@/lib/api/payloads";
import { fetchAuthMe, fetchSignin } from "@/lib/api/auth";
import { WrongEmailOrPasswordError } from "@/lib/api/errors";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signinFormSchema } from "@/lib/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useMutation } from "@tanstack/react-query";

function SigninForm() {
  const { user, setUser } = useAuthUser();

  const signinMutation = useMutation({
    mutationFn: fetchSignin,
    onSuccess: () => {
      authMeMutation.mutate();
    },
    onError: (error) => {
      if (error instanceof WrongEmailOrPasswordError) {
        form.setError("email", { message: "" });
        form.setError("password", { message: error.message });
      }
    },
  });

  const authMeMutation = useMutation({
    mutationFn: fetchAuthMe,
    onSuccess: (user) => {
      setUser({ ...user, isAuthenticated: true });
    },
    onError: (error) => {
      console.log("error here?", error);
      setUser({ ...user, isAuthenticated: false });
    },
  });

  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isButtonDisable =
    (form.watch("email") || "").trim().length === 0 ||
    (form.watch("password") || "").trim().length === 0;

  const onSubmit = (values: z.infer<typeof signinFormSchema>) => {
    const payload: SigninPayload = {
      email: values.email,
      password: values.password,
    };
    signinMutation.mutate(payload);
  };

  const isDisableInputs = signinMutation.isPending && authMeMutation.isPending;
  const errors = signinMutation.error || authMeMutation.error;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-authForm flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isDisableInputs} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    disabled={isDisableInputs}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {isDisableInputs && (
          <p className="text-center text-sm text-primary">Loading...</p>
        )}
        {!isDisableInputs && errors && (
          <p className="text-center text-sm text-rose-500">{errors.message}</p>
        )}
        <AuthFormButton disabled={isButtonDisable || isDisableInputs}>
          LOG IN
        </AuthFormButton>
      </form>
    </Form>
  );
}

export default SigninForm;
