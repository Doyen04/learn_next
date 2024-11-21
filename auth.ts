import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { Prisma } from "@prisma/client"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(Prisma),
    providers: [GitHub, Google],
})