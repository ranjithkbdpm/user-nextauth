import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client"
import db from "@/lib/db";

// const prisma = new PrismaClient()
// this file is used to trigger the middleware not the authConfig file

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
});
