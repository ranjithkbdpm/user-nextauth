'use server'
import z from 'zod';
import { loginSchema } from '../../../schema/formSchemas';
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '../verificationToken/generateVerificationToken';
import { generateTwoFactorToken } from '../twoFactorAuthentication/generateTwoFactorToken';
import { getTwoFactorTokenByEmail } from '../twoFactorAuthentication/getTwoFactorTokenBy';
import { getUserByEmail } from './getUserBy';
import { sendVerificationEmail, sendTwoFactorEmail } from '@/lib/email';
import db from '@/lib/db'
import { getTwoFactorConfirmationByUserId } from '../twoFactorAuthentication/getTwoFactorConfirmationByUserId';

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validation = loginSchema.safeParse(values);
    if (!validation.success) {
        return { success: false, error: "Invalid credentials data" };
    }

    const { email, password, tcode } = validation.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Invalid credentials', success: false };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken?.email, verificationToken?.token);
        return { message: 'Confirmation sent to email', success: true };
    }

    if (existingUser.isTwoFactorEnabled) {
        if (tcode) {
            const twoFactorCode = await getTwoFactorTokenByEmail(existingUser.email);
            if (!twoFactorCode || new Date(twoFactorCode.expires) < new Date()) {
                return { error: 'Invalid or expired two-factor code!', success: false };
            }

            await db.twoFactorToken.delete({ where: { id: twoFactorCode.id } });
            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } });
            }
            await db.twoFactorConfirmation.create({ data: { userId: existingUser.id } });
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
            return { message: 'Two Factor Token sent to email', success: true, twoFactor: true };
        }
    }

    try {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (!result || result.error) {
            return { error: result?.error || 'User not found', success: false };
        }
        return { message: 'Login successful', email, success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Incorrect password or email', success: false };
                default:
                    return { error: error.message || 'Unknown authentication error', success: false };
            }
        }
        throw new Error("An unknown error occurred during login");
    }
};

// export const login = async (values: z.infer<typeof loginSchema>): Promise<{message: string; email?: string; success?: boolean; twoFactor?: boolean} | { error: string; success?: boolean }> => {
//     // Validate incoming values
//     const validation = loginSchema.safeParse(values);
//     if (!validation.success) {
//         return { success: false, error: "Invalid credentials data" };
//     }

//     const { email, password, tcode } = validation.data;

//     const existingUser = await  getUserByEmail(email);

//     if(!existingUser || !existingUser.email || !existingUser.password){
//         return { error: 'Invalid credentials', success: false };
//     }

//     // if the email is not verified send verification link to email
//     if(!existingUser.emailVerified){
//         const verificationToken = await generateVerificationToken(existingUser.email);
//         const data = await sendVerificationEmail(verificationToken?.email, verificationToken?.token);
//         console.log('login verifiction sent as mail',  verificationToken)
//         return { message: 'Confirmation sent to email', success: true };
//         console.log(data);
//     }
   
//     // twofactor authentication
//     if(existingUser && existingUser.isTwoFactorEnabled){
//         if(tcode){
//             // check if there is a matching token for the user email
//             const twoFactorCode = await getTwoFactorTokenByEmail(existingUser.email);
//             if(!twoFactorCode){
//                 return { error: 'Two factor code not found!', success: false };
//             }
//             // check if the tcode user input is matching to the token in the db
//             const isTwoFactorCodeMatching = await getTwoFactorTokenByToken(tcode);
//             if(!isTwoFactorCodeMatching){
//                 return { error: 'Incorrect two factor code!', success: false };
//             }
//             // check if it is expired or not
//             const isTwoFactorCodeExpired = new Date(twoFactorCode.expires) < new Date();

//             if(isTwoFactorCodeExpired){
//                 return { error: 'Two factor code has expired!', success: false };
//             }

//             // remove two factor
//             await db.twoFactorToken.delete({
//                 where:{id: twoFactorCode.id}
//             });

//             // check for exisiting confirmation for the exisitng user. confirm the two factor authentication by the user id
//             const existingConfirmation =  await getTwoFactorConfirmationByUserId(existingUser.id);
//             if(existingConfirmation){
//                 await db.twoFactorConfirmation.delete({
//                     where:{id: existingConfirmation.id}
//                 })
//             }

//             await db.twoFactorConfirmation.create({
//                 data: {userId: existingUser.id}
//             })
//             // proceed to sign In process              
//         } else {
//             const twoFactorToken = await generateTwoFactorToken(existingUser.email);
//             const sendTokenToMail = await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
//             return  { message: 'Two Factor Token sent to email', success: true , twoFactor: true};
//             console.log(sendTokenToMail);
//         }        
//     }
//     // if the email is verified proceed with login
//     try {
//         // Attempt sign-in without automatic redirection
//         const result = await signIn("credentials", {
//             email,
//             password,
//             redirect: false,  // Prevent automatic redirection
//             // redirectTo: '/dashboard',
//         });

//         // Cannot redirect getting an error important note
//         // The error you're seeing occurs because the signIn function, when using redirect: true, is not returning any values (like an error or result) to your code since it handles the redirection automatically. In signIn, redirect: true is meant for scenarios where NextAuth takes care of the redirect without you needing to process any further logic on the response. This is why error is not available in the result — the redirecting function does not provide a response to check against.

//         // Check for errors in the sign-in result. 
//         if (!result || result.error) {
//             return { error: result?.error || 'User not found', success: false };
//         }

//         // Successful login
//         return { message: 'Login successful', email, success: true };
//     } catch (error) {
//         console.log('Error from login action:', error);

//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case "CredentialsSignin":
//                     return { error: 'Incorrect password or email', success: false };
//                 default:
//                     return { error: error.message || 'Unknown authentication error', success: false };
//             }
//         }

//         // General error case
//         throw new Error("An unknown error occurred during login");
//     }
// }
