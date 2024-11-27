import AuthFormButton from "./AuthFormButton";
import { useNavigate } from "react-router-dom";
import { SigninPayload } from "@/lib/api/payloads";
import { signin } from "@/lib/api/auth";
import { useState } from "react";
import { DefaultError, WrongEmailOrPasswordError } from "@/lib/api/errors";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signinFormSchema } from "@/lib/authValidation";
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

function SigninForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isButtonDisable =
    (form.watch("email") || "").trim().length === 0 ||
    (form.watch("password") || "").trim().length === 0;

  const onSubmit = (values: z.infer<typeof signinFormSchema>) => {
    setError("");
    setIsAuthenticated(false);

    async function fetchSignin() {
      setIsSubmitting(true);

      const payload: SigninPayload = {
        email: values.email,
        password: values.password,
      };

      try {
        await signin(payload);
        setIsAuthenticated(true);
        navigate("/");
      } catch (err) {
        if (err instanceof DefaultError) {
          setError(err.message);
        }
        if (err instanceof WrongEmailOrPasswordError) {
          form.setError("email", { message: "" });
          form.setError("password", { message: err.message });
        }
        setIsAuthenticated(false);
      } finally {
        setIsSubmitting(false);
      }
    }

    fetchSignin();
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
          LOG IN
        </AuthFormButton>
      </form>
    </Form>
  );
}

export default SigninForm;
