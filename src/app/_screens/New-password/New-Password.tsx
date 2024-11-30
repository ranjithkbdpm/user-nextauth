'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newPasswordSchema } from '../../../../schema/formSchemas'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import FormError from '@/components/client_component/FormError'
import FormSuccess from '@/components/client_component/FormSuccess'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { newPassword } from '@/actions/resetPassword/newPassword'

const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

  //setting disabled attribute while submitting data
  const [isPending, startTransition] = useTransition()
  const [errorMsg, setErrorMsg] = useState<string | undefined>('')
  const [successMsg, setSuccessMsg] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    // zod provide validation schema for both front and backend in next js
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  })


  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    console.log(values);
    if (values.confirmpassword === values.password) {
      try {
        startTransition(async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          if(!token){
            setErrorMsg('Token missing from the mail')
          }else {
            const response = await newPassword(token, values);
            console.log(response)
            if('message' in response){
              setErrorMsg('');                
              setSuccessMsg(response?.message)
            }  else{
              setSuccessMsg('')
              setErrorMsg(response.error);
            }
          }    
        })
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          console.log(error?.message)
          setErrorMsg(error?.message)
        } else{
            triggerCustomError('confirmpassword')
        }
      }
    }
  }

  const triggerCustomError = async (type: string | undefined | null) => {
    // Manually set an error with a custom message
    if (type === 'confirmpassword') {
        form.setError("confirmpassword", {
            type: "manual",
            message: "Password doesn't match"
        });
        // Optionally trigger validation for the field
        // await trigger('confirmpassword');
    }
}



  return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type='password' disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="confirm password" type='password' disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={errorMsg} />
        <FormSuccess message={successMsg} />
        <Button type="submit" className='w-full mb-0' disabled={isPending}>Submit</Button>
      </form>
    </Form> 
  )
}

export default NewPasswordForm