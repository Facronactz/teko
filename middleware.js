import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    (req) => {
        // console.log(req.nextauth);
        if (req.nextauth.token.role === 'ADMIN') {
            return NextResponse.redirect(new URL(req.nextUrl.pathname, req.nextUrl.origin));
        }
        if (req.nextauth.token.role === 'TEMAN') {
            if (req.nextUrl.pathname.startsWith('/teman')) {
                return NextResponse.redirect(new URL(req.nextUrl.pathname, req.nextUrl.origin));
            }
            if (req.nextUrl.pathname.startsWith('/dashboard/teman')) {
                return NextResponse.redirect(new URL(req.nextUrl.pathname, req.nextUrl.origin));
            }
        }
        return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    },
    {
        callbacks: {
            authorized: ({ token }) => (!!token),
        },
    },
);

export const config = { matcher: ['/dashboard/:path*'] };
