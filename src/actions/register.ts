'use server'
import z from 'zod'
import { registerSchema } from '../../schema/formSchemas'

export const register = async(values: z.infer<typeof registerSchema>): Promise<{ message: string; email?: string; } | { error: string }> => {
    // check the validation of the incoming values
    const validation = registerSchema.safeParse(values)
    if(!validation.success){
        return {error:"Invalid login data"}
    }else{
        console.log(values)
        return {
            message:'data received',
            email: values.email
        }
    }    
    
}