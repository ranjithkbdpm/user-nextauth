"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../../schema/formSchemas";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import FormError from "@/components/client_component/FormError";
import FormSuccess from "@/components/client_component/FormSuccess";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/users/login";

const LoginForm = () => {
  //setting disabled attribute while submitting data
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const [successMsg, setSuccessMsg] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    // zod provide validation schema for both front and backend in next js
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  // function onSubmit(values: z.infer<typeof loginSchema>) {
  //  setErrorMsg('')
  //  setSuccessMsg('')
  //   console.log(values);
  //   if (values) {
  //     try {
  //       startTransition(async () => {
  //         await new Promise((resolve) => setTimeout(resolve, 3000));
  //         const response = await login(values)
  //         console.log(response)
  //         if('message' in response){
  //           setSuccessMsg(response?.message)
  //         }  else{
  //           setErrorMsg(response.error);
  //         }
  //       })
  //     } catch (error: Error | unknown) {
  //       if (error instanceof Error) {
  //         console.log(error?.message)
  //         setErrorMsg(error?.message)
  //       } else {
  //         console.log('Unknow error in login')
  //       }
  //     }
  //   }
  // }

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setErrorMsg("");
    setSuccessMsg("");
    console.log(values);
    if (values) {
      startTransition(async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        login(values).then((data) => {
          console.log("data", data);
          // data is successfull and there is twofactor auth
          if ("message" in data && "twoFactor" in data) {
            setSuccessMsg(data?.message);
            // new Promise((resolve) => setTimeout(resolve, 2000));
            setShowTwoFactor(true);
          } //if data is succefull and there is no twofactor auth
          else if ("message" in data) {
            // form.reset();
            setSuccessMsg(data?.message);
            router.push("/dashboard");
          } else {
            // form.reset();
            setErrorMsg(data?.error);
          }
          // setErrorMsg(data?.error)
          // setSuccessMsg(data?.message)
        });
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!showTwoFactor && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@email.com"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={errorMsg} />
            <FormSuccess message={successMsg} />
            <Button
              variant="link"
              style={{ marginTop: "0" }}
              onClick={() => {
                router.push("/reset-password");
              }}
            >
              forget password?
            </Button>
          </div>
        )}
        {showTwoFactor && (
          <FormField
            control={form.control}
            name="tcode"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Two Factor Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="012345"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full mb-0" disabled={isPending}>
          {showTwoFactor ? "Confirm" : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
