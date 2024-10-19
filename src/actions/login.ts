'use server'
import z from 'zod'
import { loginSchema } from '../../schema/formSchemas'

export const login = async(values: z.infer<typeof loginSchema>): Promise<{ message: string; email?: string; } | { error: string }> => {
    // check the validation of the incoming values
    const validation = loginSchema.safeParse(values)
    if(validation.success){
        return {error:"Invalid login data"}
    }else{
        console.log(values)
        return {
            message:'data received',
            email: values.email
        }
    }    
    
}