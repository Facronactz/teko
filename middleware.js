import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const Response = {
    ADMIN: (req) => {
        const { origin, pathname } = req.nextUrl;
        return NextResponse.rewrite(new URL(pathname, origin));
    },
    TEMAN: (req) => {
        const { origin, pathname } = req.nextUrl;
        if (pathname.startsWith('/dashboard/teman')) {
            return NextResponse.rewrite(new URL(pathname, origin));
        }
        return NextResponse.rewrite(new URL('/dashboard/teman', origin));
    },
    USER: (req) => {
        const { origin, pathname } = req.nextUrl;
        if (pathname.startsWith('/dashboard/user')) {
            return NextResponse.rewrite(new URL(pathname, origin));
        }
        return NextResponse.rewrite(new URL('/dashboard/user', origin));
    },
};

export default withAuth(
    (req) => {
        // console.log(req.nextauth.token);
        const { role } = req.nextauth.token;
        const { pathname, origin } = req.nextUrl;
        if (pathname === '/dashboard') {
            return NextResponse.redirect(
                `${origin}${pathname}/${role.toLowerCase()}`,
            );
        }
        try {
            return Response[role.toUpperCase()](req);
        } catch (error) {
            return NextResponse.rewrite(new URL('/', origin));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    },
);

export const config = { matcher: ['/dashboard/:path*'] };
