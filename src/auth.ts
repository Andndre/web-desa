"use server";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/server/db";
import { compare } from "bcryptjs";

NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email == null || credentials?.password == null) {
          throw new Error("No email or password");
        }
        try {
          const input = credentials as {
            email: string;
            password: string;
          };
          const user = await prisma.user.findUnique({
            where: {
              email: input.email,
            },
          });
          if (!user) {
            throw new Error("User not found");
          }
          if (!(await compare(input.password, user.password))) {
            throw new Error("Invalid password");
          }
          return {
            id: user.id + "",
            email: user.email,
          };
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // google
        if (!profile?.email) {
          return false;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });

        if (!user) {
          // TODO: pertimbangkan membuatkan akun ketika belum ada di database
          return false;
        }

        // update photo profil dan nama
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: profile?.name,
            image: profile?.image,
          },
        });
      }
      return true;
    },
  },
});
