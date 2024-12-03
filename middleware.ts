import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
 
export async function middleware(request: NextRequest){
    const exists = await hasCookie('jwt', { cookies });
    if (!exists) {
        console.log("not authorized");
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/articles/", "/articles/:path*", "/users/", "/users/:path*", "/assessments/:path*", "/help", "/chats/:path*", "/my/:path*", "/mylibrary/:path*"],
}