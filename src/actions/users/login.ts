'use server'
import z from 'zod'
import { loginSchema } from '../../../schema/formSchemas'
import { signIn } from '../../../auth'
import { AuthError } from 'next-auth'

export const login = async (values: z.infer<typeof loginSchema>): Promise<{ message: string; email?: string; success?: boolean } | { error: string; success?: boolean }> => {
    // Validate incoming values
    const validation = loginSchema.safeParse(values);
    if (!validation.success) {
        return { success: false, error: "Invalid credentials data" };
    }

    const { email, password } = validation.data;

    try {
        // Attempt sign-in without automatic redirection
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,  // Prevent automatic redirection
            // redirectTo: '/dashboard',
        });

        // Cannot redirect getting an error important note
        // The error you're seeing occurs because the signIn function, when using redirect: true, is not returning any values (like an error or result) to your code since it handles the redirection automatically. In signIn, redirect: true is meant for scenarios where NextAuth takes care of the redirect without you needing to process any further logic on the response. This is why error is not available in the result — the redirecting function does not provide a response to check against.

        // Check for errors in the sign-in result. 
        if (!result || result.error) {
            return { error: result?.error || 'User not found', success: false };
        }

        // Successful login
        return { message: 'Login successful', email, success: true };

    } catch (error) {
        console.log('Error from login action:', error);

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Incorrect user data', success: false };
                default:
                    return { error: error.message || 'Unknown authentication error', success: false };
            }
        }

        // General error case
        throw new Error("An unknown error occurred during login");
    }
};
