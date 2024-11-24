import { signIn } from '@/lib/auth';

export const submitHandler = async  (email: string, password: string)=> {
    const data = await signIn("credentials", {
        email :email, 
        password: password
    })
    console.log(data);
    
    if (data) {

    }
}