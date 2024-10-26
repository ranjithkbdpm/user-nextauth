import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes/routes";
 
const {auth} = NextAuth(authConfig)

export default auth((req) => {
    // use this middleware to ignore some public routes 
    const {nextUrl}=req; 
    const {pathname}=nextUrl;    
    const isLogged = !!req.auth; //convert to boolean based on truthiness or falsiness 
    console.log('url pathname from middleware',nextUrl.pathname);
  
    const isPathApiPrefixed = pathname.startsWith(apiAuthPrefix);
    const isPathPublic = publicRoutes.includes(pathname);
    const isPathAuthRoute = authRoutes.includes(pathname);

    // if pathname is prefixed with api/auth
    if(isPathApiPrefixed) return;
  
    // if you are in login or register see if it is logged and return dashboard or null based on it
    if(isPathAuthRoute) {
      if(isLogged) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
      }
      return; 
    }    
    // if user not logged and not a public route then redirects to login
    if(!isLogged && !isPathPublic) {      
      return Response.redirect(new URL('/login', req.nextUrl));    
    }

    return;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico).*)", 
    // "/((?!.+\\.[\\w]+$|_next).*",
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    "/",
    "/(api|trpc)(.*)",
    ]
}