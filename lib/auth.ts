import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "~@/lib/prisma"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [GitHub, Google, Credentials({
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "email"},
            password: {label: "Password", type: "password"}
        }
    })],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn : "/signin"
    }
    //add a call back to add overlapping email
})