"use client";

import { signUpSchema, SignUpValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { signup } from "./actions";
import { InputPassword } from "@/components/input-password";
import ButtonLoading from "@/components/btn-loading";

export default function FormSignUp() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: SignUpValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signup(values);
      if (error) setError(error);
    });
  };

  const submitHandler = handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={submitHandler} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonLoading loading={isPending} type="submit" className="w-full">
          Create account
        </ButtonLoading>
      </form>
    </Form>
  );
}
