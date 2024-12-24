import { prisma } from "@repo/db";
import NextAuth, { NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema, SignInType } from "./zod";
// import bcrypt from "bcrypt";

export const result = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: {},
        password: {},
      },

      authorize: async (credentials: SignInType) => {
        try {
          //   ZOD VALIDATION
          const validInputs = await signInSchema.safeParseAsync(credentials);

          if (!validInputs) throw new Error("Invalid Inputs");

          const { phone, password } = credentials;
          //   console.log("\n\tCREDENTIALS: ", credentials, "\n");

          //   HASH THE PASSWORD
          // const hashedPassword = await bcrypt.hash(credentials.password, 10);

          // FIND THE USER
          const existingUser = await prisma.user.findFirst({
            where: {
              phone,
            },
          });

          if (existingUser) {
            // const validPassword = await bcrypt.compare(
            //   password,
            //   existingUser.password
            // );

            const validPassword = password === existingUser.password
            if (validPassword) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                phone: existingUser.phone,
              };
            } else {
              throw new Error("Invalid password.");
            }
          } else {
            try {
              const newUser = await prisma.user.create({
                data: {
                  phone,
                  password: password,
                },
              });

              return {
                id: newUser.id.toString(),
                name: newUser.name,
                phone: newUser.phone,
              };
            } catch (e) {
              if (e instanceof Error)
                throw new Error(e.message || "Error while creating new user");
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      //@ts-ignore
      session.user.id = token.id;
      return session;
    },
  },
});



export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;