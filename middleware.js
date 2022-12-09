import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    (req) => {
        // console.log(req.nextauth);
        const { role } = req.nextauth.token;
        const { pathname, origin } = req.nextUrl;
        if (pathname === '/dashboard') {
            return NextResponse.redirect(
                `${origin}${pathname}/${role.toLowerCase()}`,
            );
        }
        if (role === 'ADMIN') { return NextResponse.rewrite(new URL(pathname, origin)); }
        if (role === 'TEMAN') {
            if (pathname.startsWith('/teman')) {
                return NextResponse.rewrite(new URL(pathname, origin));
            }
            if (pathname.startsWith('/dashboard/teman')) {
                return NextResponse.rewrite(new URL(pathname, origin));
            }
        }
        if (role === 'USER') {
            if (pathname.startsWith('/user')) {
                return NextResponse.rewrite(new URL(pathname, origin));
            }
            if (pathname.startsWith('/dashboard/user')) {
                return NextResponse.rewrite(new URL(pathname, origin));
            }
        }
        return NextResponse.rewrite(new URL('/', origin));
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    },
);

export const config = { matcher: ['/dashboard/:path*'] };
