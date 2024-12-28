import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { mightBeLoggedIn, PUBLIC_ROUTES } from './app/utils/auth';

// 1. Specify protected and public routes

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicRoute = PUBLIC_ROUTES.includes(path);
    const userLoggedIn = await mightBeLoggedIn();

    // check if the route is protected
    if (!userLoggedIn && !isPublicRoute){
        return NextResponse.redirect(new URL('/login?unauthorized=true', req.nextUrl))
    }

    // Ensure server components can access the current pathname
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', path);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}
