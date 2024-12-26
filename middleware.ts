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
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}
