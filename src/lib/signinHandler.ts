"use server"

import { signIn } from '@/lib/auth';

export const signInHandler = async  (email: string, password: string)=> {
    const data = await signIn("credentials", {
        email :email, 
        password: password,
        redirect: false,
    })
    
    
    return data
}