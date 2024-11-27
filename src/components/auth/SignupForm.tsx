import AuthFormButton from "./AuthFormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignupPayload } from "@/lib/api/payloads";
import { signupFormSchema } from "@/lib/authValidation";
import { ConflictError, DefaultError } from "@/lib/api/errors";
import { signup } from "@/lib/api/auth";
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

function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const isButtonDisable =
    (form.watch("name") || "").trim().length === 0 ||
    (form.watch("username") || "").trim().length === 0 ||
    (form.watch("email") || "").trim().length === 0 ||
    (form.watch("password") || "").trim().length === 0;

  const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
    setError("");

    async function fetchSignup() {
      setIsSubmitting(true);

      const payload: SignupPayload = {
        email: values.email,
        first_name: values.name,
        username: values.username,
        password: values.password,
      };

      try {
        const data = await signup(payload);
        console.log(data);
      } catch (err) {
        if (err instanceof ConflictError) {
          if (err.message === "e-mail already taken") {
            form.setError("email", { message: err.message });
          }
          if (err.message === "username already taken") {
            form.setError("username", { message: err.message });
          }
        }
        if (err instanceof DefaultError) {
          setError(err.message);
        }
      }

      setIsSubmitting(false);
    }

    fetchSignup();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-authForm flex-col gap-4"
      >
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your public name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSubmitting && (
          <p className="text-center text-primary text-sm">Loading...</p>
        )}
        {!isSubmitting && error && (
          <p className="text-center text-sm text-rose-500">{error}</p>
        )}
        <AuthFormButton disabled={isButtonDisable || isSubmitting}>
          SIGN UP
        </AuthFormButton>
      </form>
    </Form>
  );
}

export default SignupForm;
