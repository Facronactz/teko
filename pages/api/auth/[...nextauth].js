import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import prisma from '@teko/libs/PrismaClient';

async function refreshUser(id) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    delete user.password;
    return user;
}

export const authOptions = {
    debug: true,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Akun Teko',
            credentials: {
                email: { label: 'Username or email', type: 'email', placeholder: 'Username' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (user) {
                    // eslint-disable-next-line max-len
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordValid) {
                        return user;
                    }
                }
                return null;
            },
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.username = user.username;
            }
            const newUser = await refreshUser(token.sub);
            token.username = newUser.username;
            token.role = newUser.role;
            token.email = newUser.email;
            token.name = newUser.name;
            token.picture = newUser.image;
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    logger: {
        error(code, metadata) {
            console.error(code, metadata);
        },
        warn(code) {
            console.warn(code);
        },
        debug(code, metadata) {
            console.debug(code, metadata);
        },
    },
};

export default NextAuth(authOptions);
