import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define which paths are considered public (no authentication required)
    const isPublicPath = path === '/auth/signin' || path === '/auth/signup';

    // Get the session token
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect logic
    if (isPublicPath && token) {
        // If user is authenticated and tries to access login/signup, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
        // If user is not authenticated and tries to access a protected route, redirect to login
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/practice/:path*',
        '/dashboard/:path*',
        '/profile/:path*',
        '/auth/signin',
        '/auth/signup'
    ],
}; 