import { z } from "zod";



export const UserSchema = z.object(
    {
        username: z.string().min(3, "username must not be less than 3 letters"),
        email: z.string().email(),
        password: z.string().min(8, "password must be atleast 8 characters").max(255),
    }
)

export interface ErrorObject {
    username?: string[] | undefined,
    email: string[] | undefined,
    password: string[] | undefined
}