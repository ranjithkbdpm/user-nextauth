'use server'
import db from '@/lib/db'
import { VerificationToken } from '@/type/type'
import { getUserByEmail } from '../users/getUserBy';

export const emailVerification = async(verificationToken: VerificationToken): Promise<{ message: string; email?: string; success?: boolean } | { error: string; success?: boolean }>  =>{
    console.log('expires',verificationToken.expires)
    const {expires, token} =  verificationToken;

    const isExpried = new Date(expires) < new Date();

    if(isExpried) return  { error: 'Token expired login again or resend token', success: false };

    // const existingUser = await getUserByEmail(verificationToken.email);
    const existingUser = await getUserByEmail(verificationToken.email);

    if(!existingUser){
        return  { error: 'Email does not match the verification Token', success: false };
    }
    
    const emailVerified = await db.user.update({
        where:{email: verificationToken.email},
        // data: {emailVerified:verificationToken.token}
        data: {
            emailVerified: new Date(),
            email: existingUser.email
        }  
    });

    const deleteVerificationToken = await db.verificationToken.delete({
        where:{token}
    })
    
    if(!emailVerified){
        return  { message: 'Error verifying user email', success: true };
    }
    
    return  { message: 'User successfully verified', success: true };
    console.log(deleteVerificationToken)

}