import { prisma } from "@/services/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Masuk ke Web Desa",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const passwordsAreMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordsAreMatch) {
          return null;
        }

        return {
          id: user.id + "",
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return session;
    },
    jwt: ({ token, user }) => {
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
