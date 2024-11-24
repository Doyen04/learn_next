import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        username?: string; // Optional custom field
    }

    interface Session {
        user: User;
    }
}