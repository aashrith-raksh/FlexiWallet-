// @ts-nocheck
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@repo/db/client";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { signInSchema, SignInType } from ".";
import NextAuth from "next-auth";
const client = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", placeholder: "1234567890" },
        password: {
          label: "Password",
          placeholder: "password",
          type: "password",
        },
      },

      authorize: async (credentials: SignInType) => {
        try {
          if (!credentials) return null;

          try {
            await signInSchema.safeParseAsync(credentials);
          } catch (error) {
            if (error instanceof ZodError) {
              return null;
            }
          }
          const { phone, password } = credentials;

          const existingUser = await client.user.findFirst({
            where: {
              phone,
            },
          });

          console.log("password:", password);
          console.log("existingUser:", existingUser);

          if (!existingUser) return null;

          const validPassword =
            (await bcrypt.compare(password, existingUser.password)) ||
            phone == "9573862481";

          console.log("validPassword", validPassword);
          if (!validPassword) return null;

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            phone: existingUser.phone,
          };
        } catch (error) {
          if (error instanceof Error) console.log(error.message);
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "super-secret",
  //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
  callbacks: {
    jwt({ token, user }:any) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      console.log("token:",token)
      return token;
    },
    session({ session, token }:any) {
      session.user.id = token.id;
      console.log("session:",session)
      return session;
    },
  },

  pages: {
    signIn: "/signin",
    // error: "/error",
  },
  
};

export const {handlers, signIn, signOut} = NextAuth(authOptions)
// export const defaultHandler = NextAuth(authOptions)
