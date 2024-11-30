// public routes that need no authentication
export const publicRoutes = [
    "/",
    "/publicdash",
    "/email-verification",
];

// authentication routes
export const authRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/new-password"
];

// routes that starts with prefix are need to authenticated 
export const apiAuthPrefix = "/api/auth";

// default path after login
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

