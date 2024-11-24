import { signIn } from '@/lib/auth';

const submitHandler = async  ()=> {
    const data = await signIn("credentials", {
        email :email, 
        password: password
    })
    // console.log(data);
    
    // if (data) {

    // }
}