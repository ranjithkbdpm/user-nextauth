'use server'
import z from 'zod'
import { loginSchema } from '../../../schema/formSchemas'
import {signIn} from '../../../auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes/routes'
import { AuthError } from 'next-auth'

export const login = async(values: z.infer<typeof loginSchema>): Promise<{ message: string; email?: string; } | { error: string; success?: boolean }> => {
    // check the validation of the incoming values
    const validation = loginSchema.safeParse(values)
    if(!validation.success){
        return { success: false, error: "Invalid credentials data" };
    }

    const {email, password} = validation.data

   
        try{
            await signIn("credentials", {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT    //even if it is not specified middleware will redirect the if value of isLogged in true from !!req.auth
            })
            return {message:'success', email}
        } catch(error) {
            // console.log(error);
            if(error instanceof AuthError){
                switch(error.type) {
                    case ("CredentialsSignin"): 
                      return {error:'Incorrect user data', success:false}                
                    default:  
                      return { error: error.message || 'Unknown authentication error', success: false };
                }
            }
            throw Error;
        }    
}