
'use server';
import z from 'zod';
import { newPasswordSchema } from '../../../schema/formSchemas';
import db from '@/lib/db';
import { getUserByEmail } from '../users/getUserBy';
import { getResetPasswordTokenByToken } from './getResetPasswordToken';
import bcrypt from "bcrypt";

export const newPassword = async (
    resetToken: string, values: z.infer<typeof newPasswordSchema>
): Promise<{ message: string; email?: string; success?: boolean } | { error: string; success?: boolean }> => {

    if (!resetToken) {
        return { success: false, error: "Reset Password token is required." };
    }
    // Validate incoming values
    const validation = newPasswordSchema.safeParse(values);
    if (!validation.success) {
        return { success: false, error: "Invalid credentials data" };
    }

    const {password} = validation.data;    

    const resetPasswordToken = await getResetPasswordTokenByToken(resetToken);

    if(!resetPasswordToken){
        return { error: 'Token missing cannot set new password!', success: false };
    }

    const isExpired = new Date(resetPasswordToken.expires) < new Date();
    if (isExpired) return { error: 'Token expired. Try again!', success: false };

    const existingUser = await getUserByEmail(resetPasswordToken.email);

    if (!existingUser) {
        return { error: 'No user email found, Enter valid email', success: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const changePassword = await db.user.update({
        where: { email: existingUser.email },
        data: { password: hashedPassword },
    });

    if (!changePassword) {
        return { message: 'Failed to update password. Please try again', success: false };
    }

    const tokenExists = await db.ResetPasswordToken.findUnique({
        where: { id: resetPasswordToken.id },
    });

    if (!tokenExists) {
        console.log('Verification token already deleted or not found.');
    } else {
        await db.ResetPasswordToken.delete({
            where: { id: tokenExists.id },
        });
        console.log('Verification token deleted successfully.');
    }    

    return { message: 'Password changed successfuly.', success: true };
};
