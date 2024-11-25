

import AnimatedInput from '@/components/animatedInput';
import AnimatedButton from '@/components/animatedButton';
import style from '@/styles/signup_page.module.css'
import Link from "next/link";

export function SignUpForm() {

    return (
        <form action={''} method="post" className={style.form} >
            <AnimatedInput type='text' name='username' placeholder='Username' input_style={style.input} placeholder_style={style._placeholder} />
            <AnimatedInput type='email' name='email' placeholder='Email' input_style={style.input} placeholder_style={style._placeholder} />
            <AnimatedInput type='password' name='password' placeholder='Password' input_style={style.input} placeholder_style={style._placeholder} />
            {/* <input type="button" value="Submit" className={`${style.input} ${style.submit}`} /> */}
            <AnimatedButton text='SIGNUP' type='button' style={`${style.input} ${style.submit}`} />
            <Link href=""></Link>
        </form>
    )
}