'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../../../schema/formSchemas'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import FormError from '@/components/client_component/FormError'
import FormSuccess from '@/components/client_component/FormSuccess'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {register} from '@/actions/users/register'
import { useState, useTransition } from 'react'
// import axios from 'axios'

const RegisterForm = () => {

    const [isPending, startTransition] = useTransition()
    const [errorMsg, setErrorMsg] = useState<string | undefined>('')
    const [successMsg, setSuccessMsg] = useState<string | undefined>('')
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname:"",
            lastname:"",
            phonenumber:"",
            email: "",
            password: "",
            confirmpassword:""

        },
    })


    // function onSubmit(values: z.infer<typeof registerSchema>) {
    //     // console.log(values)
    //     if (values.confirmpassword === values.password) {
    //         console.log(values)
    //     } else{
    //         triggerCustomError('confirmpassword')
    //     }
    // }  


    function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values);
        if (values.confirmpassword === values.password) {
          try {
            startTransition(async () => {
              await new Promise((resolve) => setTimeout(resolve, 3000));
              const response = await register(values)
              console.log(response)
              if('message' in response){
                setErrorMsg('');                
                setSuccessMsg(response?.message)
              }  else{
                setSuccessMsg('')
                setErrorMsg(response.error);
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
    
    
    // function onSubmit(values: z.infer<typeof registerSchema>) {
    //     console.log(values);
    //     if (values.confirmpassword === values.password) {
    //       try {
    //         startTransition(async () => {
    //           await new Promise((resolve) => setTimeout(resolve, 3000));
    //           const response = await axios.post('http://localhost:3000/api/register',values)
    //           const data = response.data
    //           console.log(data)
    //           setSuccessMsg(response?.data?.message)
    //         })
    //       } catch (error: Error | unknown) {
    //         if (error instanceof Error) {
    //           console.log(error?.message)
    //           setErrorMsg(error?.message)
    //         } else {
    //           console.log('Unknow error in login')
    //         }
    //       }
    //     }else{
    //         triggerCustomError('confirmpassword')
    //     }
    //   }

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className='flex gap-3'>
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem className='text-left'>
                                <FormLabel>FirstName</FormLabel>
                                <FormControl>
                                    <Input placeholder="firstname" disabled={isPending} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem className='text-left'>
                                <FormLabel>Lastname</FormLabel>
                                <FormControl>
                                    <Input placeholder="lastname" disabled={isPending} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                        <FormItem className='text-left'>
                            <FormLabel>Phonenumber</FormLabel>
                            <FormControl>
                                <Input placeholder="phonenumber" type="tel" disabled={isPending} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                                <Input placeholder="password" type='password' disabled={isPending} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={errorMsg} />
                <FormSuccess message={successMsg}/>
                <Button type="submit" className='w-full' disabled={isPending}>Submit</Button>
            </form>
        </Form>
    )
}

export default RegisterForm