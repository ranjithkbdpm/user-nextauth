'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '../../../../schema/formSchemas'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import FormError from '@/components/client_component/FormError'
import FormSuccess from '@/components/client_component/FormSuccess'
import { useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPassword } from '@/actions/resetPassword/resetPassword'

const ResetPassword = () => {

   //setting disabled attribute while submitting data
   const [isPending, startTransition] = useTransition()
   const [errorMsg, setErrorMsg] = useState<string | undefined>('')
   const [successMsg, setSuccessMsg] = useState<string | undefined>('')
 
   const form = useForm<z.infer<typeof resetPasswordSchema>>({
     // zod provide validation schema for both front and backend in next js
     resolver: zodResolver(resetPasswordSchema),
     defaultValues: {
       email: "",
     },
   })

   function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setErrorMsg('')
    setSuccessMsg('')
    console.log(values);
    if (values) {    
        startTransition(async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          resetPassword(values).then((data)=>{
            console.log('data', data);
            if('message' in data){
                setSuccessMsg(data?.message);
            }  else {
                setErrorMsg(data?.error);
            }
          })                
    })
  }}


  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" disabled={isPending} {...field} />
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
    </>
  )
}

export default ResetPassword