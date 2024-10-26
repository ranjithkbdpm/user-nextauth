import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
// use bcryptjs instead of bcrypt
import bcrypt from 'bcryptjs'

import { loginSchema } from "./schema/formSchemas"
import { getUserByEmail } from "@/actions/users/getUserBy"


export default {
    providers:
        [
            Credentials({
                async authorize(credentials) {
                    const validation = loginSchema.safeParse(credentials);

                    if (validation.success) {
                        const { email, password } = validation.data;
                        const user = await getUserByEmail(email);

                        if (!user || !user.password) return null

                        const passwordMatch = await bcrypt.compare(password, user.password);

                        if (passwordMatch) return user
                    }
                    return null;
                },

            }),
            GitHub,
            Google
        ]
} satisfies NextAuthConfig
