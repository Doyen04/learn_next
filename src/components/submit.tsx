

import style from '@/styles/signup_page.module.css'

import AnimatedButton from '@/components/animatedButton';
import AnimatedInput from '@/components/animatedInput';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from '@/lib/auth';




export default function Form() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleInputChange(ev:React.ChangeEvent<HTMLInputElement>) {
        ev.preventDefault()
        setEmail(ev.target.value)
        setPassword(ev.target.value)
    }

    

    return (
        <form className={style.form} method="POST" onSubmit={submitHandler}>

            <AnimatedInput
                type='email'
                name='email'
                placeholder='Email'
                input_style={style.input}
                placeholder_style={style._placeholder}
                onChange={handleInputChange} />

            <AnimatedInput
                type='password'
                name='password'
                placeholder='Password'
                input_style={style.input}
                placeholder_style={style._placeholder}
                onChange={handleInputChange} />

            <span className={style.forgotten_password}>
                Forgotten password? <Link href={'/recover'}>here</Link>
            </span>

            <AnimatedButton text='SIGNIN' type='submit' style={`${style.input} ${style.submit}`} />

        </form>
    )
}
