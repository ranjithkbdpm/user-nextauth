// public routes that need no authentication
export const publicRoutes = [
    "/",
];

// authentication routes
export const authRoutes = [
    "/login",
    "/register",
];

// routes that starts with prefix are need to authenticated 
export const apiAuthPrefix = "api/auth";

// default path after login
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"
