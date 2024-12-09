import AuthFormButton from "./auth-form-button";
import { useNavigate } from "react-router-dom";
import { SigninPayload } from "@/lib/api/payloads";
import { authMe, signin } from "@/lib/api/auth";
import { useState } from "react";
import { DefaultError, WrongEmailOrPasswordError } from "@/lib/api/errors";
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
import { AuthMeResponseSchema } from "@/lib/api/responses";
import { AuthUser } from "@/provider/auth/user-context";

function SigninForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  // const { setIsAuthenticated } = useAuth();
  const { user, setUser } = useAuthUser();
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
    setUser({ ...user, isAuthenticated: false });

    async function fetchSignin() {
      setIsSubmitting(true);

      const payload: SigninPayload = {
        email: values.email,
        password: values.password,
      };

      try {
        await signin(payload);
        const me = await authMe();
        const parsed = AuthMeResponseSchema.safeParse(me.data);
        if (!parsed.success) {
          throw new DefaultError("fail parsing");
        }
        const user: AuthUser = {
          email: parsed.data.email,
          firstName: parsed.data.first_name,
          lastName: parsed.data.last_name || "",
          username: parsed.data.username,
          roleName: parsed.data.role_name,
          isAuthenticated: true,
        };
        setUser(user);
        navigate("/");
      } catch (err) {
        if (err instanceof DefaultError) {
          setError(err.message);
        }
        if (err instanceof WrongEmailOrPasswordError) {
          form.setError("email", { message: "" });
          form.setError("password", { message: err.message });
        }
        setUser({ ...user, isAuthenticated: false });
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
          <p className="text-center text-sm text-primary">Loading...</p>
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
