'use server'
import z from 'zod';
import { getUserByEmail } from '../users/getUserBy';
import { resetPasswordSchema } from '../../../schema/formSchemas';
import { generateResetPasswordToken } from './generateResetPasswordToken';
import {  sendresetPasswordEmail } from '@/lib/email';

export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>): Promise<{ message: string; email?: string; success?: boolean } | { error: string; success?: boolean }>  => {
    const validation = resetPasswordSchema.safeParse(values);
    if (!validation.success) {
        return { success: false, error: "Invalid credentials data" };
    }
    const {email}=validation.data;
    const existingUser = await getUserByEmail(email);
    if(!existingUser){
        return {error:'User email not found!', success:false}
    }
    // generate token
    const resetPasswordToken = await generateResetPasswordToken(existingUser.email);
    // send token to email
    const data = await sendresetPasswordEmail(resetPasswordToken?.email, resetPasswordToken?.token);
    console.log('login verifiction sent as mail',  resetPasswordToken)

    return {message:'Reset Password Link sent to mail', success:true}
    console.log(data)
}