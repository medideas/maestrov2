import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasCookie, deleteCookie, setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
import currentUser from './app/utils/currentUser';
import isUserAllowed from './app/utils/isUserAllowed';

// 1. Specify protected and public routes
const publicRoutes = ["/login", "/login/log-me-in"]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const userLoggedIn = await hasCookie('jwt', { cookies });
    
    // check if the route is protected
    if (!userLoggedIn && !isPublicRoute){ 
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    } 

    // check user roles and redirec if needed
    // const loggedUser = await currentUser();
	// if (await isUserAllowed(path, loggedUser)) {
    //     return NextResponse.redirect(new URL('/login', req.nextUrl))
    // } 

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}
