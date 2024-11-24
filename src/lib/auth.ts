import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/signin",
    },
    //add a call back to add overlapping email
    providers: [
        GitHub,
        Google,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null
                }

                const userExist = await prisma.user.findUnique({
                    where: { email: credentials?.email as string }
                })

                if (!userExist) {
                    return null
                }

                const isPasswordValid = await compare(credentials?.password as string, userExist?.password);

                if (!isPasswordValid) {
                    return null
                }
                // Check if an account already exists for this user
                const existingAccount = await prisma.account.findFirst({
                    where: { userId: userExist.id, provider: "credentials" },
                });

                if (!existingAccount) {
                    await prisma.account.create({
                        data: {
                            userId: userExist.id,
                            type: "credentials",
                            provider: "credentials",
                            providerAccountId: userExist.id, // Use user ID as providerAccountId for credentials
                        },
                    });
                }

                return {
                    id: `${userExist?.id}`,
                    name: userExist?.username,
                    email: userExist?.email
                }
            }
        })],
})