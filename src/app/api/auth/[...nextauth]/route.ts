import { prisma } from "@/services/db";
import { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers/index";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const providers: Provider[] = [
  CredentialsProvider({
    id: "credentials",
    name: "Credentials",
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

      console.log(user);

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
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    jwt: async ({ token, user }) => {
      return token;
    },
    session: ({ token, session }) => {
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
