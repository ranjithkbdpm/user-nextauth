// 'use server'
// import db from '@/lib/db'
// import { VerificationToken } from '@/type/type'
// import { getUserByEmail } from '../users/getUserBy';

// export const emailVerification = async(verificationToken: VerificationToken): Promise<{ message: string; email?: string; success?: boolean } | { error: string; success?: boolean }>  =>{
    
//     const {expires, id} =  verificationToken;
//     console.log('id, expires', id, expires)
//     console.log('expires',verificationToken.expires)
//     console.log('token',verificationToken)

//     const isExpried = new Date(expires) < new Date();

//     if(isExpried) return  { error: 'Token expired login again or resend token', success: false };

//     // const existingUser = await getUserByEmail(verificationToken.email);
//     const existingUser = await getUserByEmail(verificationToken.email);

//     if(!existingUser){
//         return  { error: 'No user email for matching verification token email', success: false };
//     }
    
//     const emailVerified = await db.user.update({
//         where:{email: verificationToken.email},
//         // data: {emailVerified:verificationToken.token}
//         data: {
//             emailVerified: new Date(),
//             email: existingUser.email
//         }  
//     });

//     //delete verification token after verifying the email 
//     const deleteVerificationToken = await db.verificationToken.delete({
//         where:{id: verificationToken.id}
//     });
    
//     if(!emailVerified){
//         return  { message: 'Error verifying user email - backend', success: true };
//     }
//     //this is a method to use multiple db operations
//     // const transactionResult = await db.$transaction(async (prisma) => {
//     //     const emailVerified = await prisma.user.update({
//     //         where: { email: verificationToken.email },
//     //         data: {
//     //             emailVerified: new Date(),
//     //         },
//     //     });
    
//     //     const deletedToken = await prisma.verificationToken.delete({
//     //         where: { id: verificationToken.id },
//     //     });
    
//     //     return { emailVerified, deletedToken };
//     // });
    
//     // if (!transactionResult) {
//     //     return { error: 'Transaction failed', success: false };
//     // }
    
    
//     return  { message: 'User successfully verified', success: true };
//     console.log(deleteVerificationToken)

// }


'use server';
import db from '@/lib/db';
import { VerificationToken } from '@/type/type';
import { getUserByEmail } from '../users/getUserBy';

export const emailVerification = async (
    verificationToken: VerificationToken
): Promise<{ message: string; email?: string; success?: boolean } | { error: string; success?: boolean }> => {
    const { expires, id, email } = verificationToken;
    console.log('VerificationToken:', id, expires, email);

    const isExpired = new Date(expires) < new Date();
    if (isExpired) return { error: 'Token expired. Login again or resend token.', success: false };

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: 'No user found matching verification token email.', success: false };
    }

    const emailVerified = await db.user.update({
        where: { email },
        data: { emailVerified: new Date() },
    });

    const tokenExists = await db.verificationToken.findUnique({
        where: { id },
    });
    if (!tokenExists) {
        console.log('Verification token already deleted or not found.');
    } else {
        await db.verificationToken.delete({
            where: { id },
        });
        console.log('Verification token deleted successfully.');
    }

    // try {
    //     const tokenExists = await db.verificationToken.findUnique({
    //         where: { id },
    //     });

    //     if (!tokenExists) {
    //         console.log('Verification token already deleted or not found.');
    //     } else {
    //         await db.verificationToken.delete({
    //             where: { id },
    //         });
    //         console.log('Verification token deleted successfully.');
    //     }
    // } catch (error:any) {
    //     if (error.code  === 'P2025') {
    //         console.log('Token already deleted or does not exist.');
    //     } else {
    //         console.error('Error deleting token:', error.message);
    //         throw error; // Re-throw unexpected errors
    //     }
    // }

    if (!emailVerified) {
        return { message: 'Error verifying user email - backend.', success: false };
    }

    return { message: 'User successfully verified.', success: true };
};
