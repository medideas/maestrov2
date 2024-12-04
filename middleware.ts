import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasCookie, deleteCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
 
// export async function middleware(request: NextRequest){
//     const exists = await hasCookie('jwt', { cookies });
//     if (!exists) {
//         console.log("not authorized");
//         return NextResponse.redirect(new URL('/login', request.url))
//     }
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: ["/", "/articles/", "/articles/:path*", "/users/", "/users/:path*", "/assessments/:path*", "/help", "/chats/:path*", "/my/:path*", "/mylibrary/:path*"],
// }

// 1. Specify protected and public routes
const protectedRoutes = [ "/", "/articles", "/chats", "/my", "/library", "help"]
const publicRoutes = ["/login", "/login/log-me-in", "/logout"]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const roles = ["Learner", "Editor", "Users Manager"];
    const accessRoles = [
        {role: "Learner", blockedRoutes: ["/articles/new", "/articles/edit", "/users", "/users/new", "/users/edit"]}, 
        {role: "Editor", blockedRoutes: ["/users", "/users/new", "/users/edit"]},
        {role: "Users Manager", blockedRoutes: ["/articles/new", "/articles/edit"]}
     ]
    const sessionCookie = await hasCookie('jwt', { cookies });
    console.log("Session cookie = " + sessionCookie);

    // check if the route is protected
    if (isProtectedRoute && !sessionCookie ) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // End the session by logging out
    if (sessionCookie && req.nextUrl.pathname.includes("/logout")) {
        deleteCookie("jwt", {cookies});
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}