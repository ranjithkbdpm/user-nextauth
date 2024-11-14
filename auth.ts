import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client" // This will create a version conflict since @next-auth/prisma-adapter works with version next-authv4 not with v5.
import db from "@/lib/db";
import { getUserById } from "@/actions/users/getUserBy";
import { Role } from "@prisma/client";

// const prisma = new PrismaClient()


//This is the file where you use adaptor. It exports configurations to entire application except middleware and other edge pages/routes that is edge compatible.

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  callbacks: {
    async signIn({user}) {
      if(user){
        console.log('user from sign in ' ,  user)
      }
      // let existingUser = null;
      // if(user.id){
      //   existingUser = await getUserById(user.id)
      // }      
      // if(!existingUser || !existingUser.emailVerified) return false;
      return true
    },
    async session({ session, user, token }) {

      if(user) console.log('session User',user);
      if(session) console.log('session data',session);
      if(token) console.log('sessionToken',token);
      // if you want to pass the data passed with jwt toke from login function to session. since session token and jwt token is similar to each other. set the session user object with custom data from session token. now session will have the custom data which can be used from useSession()
      if(session.user && token.sub && token.role){
        // session.user.useData = token.userData;
        session.user.id = token.sub;
        session.user.role = token.role as Role;
      }   
      if(session) console.log('session data',session);
      return session
    },
    async jwt({token, user, account, profile, trigger}) {
      console.log('token', token);
      // all this data will be shown only at the first sign In except token. it will not be available at the subsequent request. 
      if(user)console.log('user:', user);      
      if(account) console.log('account:', account);
      if(profile) console.log('profile:', profile);
      if(trigger) console.log('trigger:', user);
      // token.userData = "custom data";
      // this custom data has to be passed at the time of sign in backend fucntion. token is first created and passed to sessions so what ever there in jwt token will be there in session token
      // pass custom data from user database. when you log in you will have id of the user by this take the user data required and passe it as custom data.
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token
    },
  }

});


  //With { strategy: "jwt" }, the session token is generated as a JWT, but Prisma is used to manage the user data, linking the session to database-stored information for additional persistence and security.

 // This configuration is used to set up the authentication and session management logic, which will be checked whenever a route is accessed, including API routes or protected pages.

//  To resolve the error caused by import { PrismaClient } from "@prisma/client"
//  either downgrade or install with conflict. 
// >>>>>npm install next-auth@latest @next-auth/prisma-adapter@latest
// >>>>>npm install @next-auth/prisma-adapter --legacy-peer-deps
// or use @auth/adaptor different from next-auth
// >>>>npm i @auth/prisma-adapter

