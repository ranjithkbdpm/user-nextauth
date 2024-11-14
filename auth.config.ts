import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
// use bcryptjs instead of bcrypt
import bcrypt from 'bcryptjs'

import { loginSchema } from "./schema/formSchemas"
import { getUserByEmail } from "@/actions/users/getUserBy"
// Database strategy 

export default {
    providers:
        [
            Credentials({
                async authorize(credentials) {
                    const validation = loginSchema.safeParse(credentials);

                    if (validation.success) {
                        const { email, password } = validation.data;
                        const user = await getUserByEmail(email);
                        // Though this server action function use prisma. this config doesn't use it directly

                        if (!user || !user.password) return null

                        const passwordMatch = await bcrypt.compare(password, user.password);

                        if (passwordMatch) return user
                    }
                    return null;
                },

            }),
            GitHub({
                clientId: process.env.AUTH_GITHUB_ID,
                clientSecret: process.env.AUTH_GITHUB_SECRET
            }),
            Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET
            })
        ]
} satisfies NextAuthConfig

// this file is where you exort all the common config object. NextAuth() is not called here. it is specified that it only need to satisfy the NextAuthConfig.

// THis file exports authentication providers that server side and middle ware setup required.
