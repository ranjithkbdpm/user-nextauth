import * as z from 'zod'

export const loginSchema = z.object({
    email: z
        .string({
            invalid_type_error: 'Email must be a string'
        })
        .email({
            message: 'Email is required'
        }),
    password: z.string()
})

// export const registerSchema = z.object({
//     firstname: z
//         .string()
//         .min(1, {
//             message: 'Firstname cannot be empty'
//         }),
//     lastname: z
//         .string()
//         .min(1, {
//             message: 'Lastname cannot be empty'
//         }),
//     email: z.string().email(),
//     phonenumber: z.string(),
//     password: z
//         .string()
//         .min(8, { message: 'Password must be at least 8 characters long' })
//         .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
//             message:
//                 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
//         }),
//     confirmpassword: z.string()
// })

export const registerSchema = z.object({
    firstname: z
        .string()
        .min(1, {
            message: 'Firstname cannot be empty'
        }),
    lastname: z
        .string()
        .min(1, {
            message: 'Lastname cannot be empty'
        }),
    email: z.string().email(),
    phonenumber: z.string(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
            message:
                'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        }),
    confirmpassword: z.string()
}).refine((data) => data.password === data.confirmpassword, {
    path: ['confirmpassword'], 
    message: "Passwords don't match",
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
})

export const newPasswordSchema = z.object({
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
    confirmpassword: z.string()
}).refine((data) => data.password === data.confirmpassword, {
    path: ['confirmpassword'], 
    message: "Passwords don't match",
});