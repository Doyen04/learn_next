"use client"

import style from '@/styles/signup_page.module.css'

// import AnimatedButton from '@/components/animatedButton';
import AnimatedInput from '@/components/animatedInput';
import { ErrorObject, UserSchema } from '@/lib/zodSchema';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { signInHandler } from '@/lib/signinHandler';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Form() {
    const Errordata: ErrorObject = {
        email: [],
        password: []
    }
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errorMsg, setErrorMessage] = useState(Errordata)

    function handleInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
        ev.preventDefault()
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value
        })

        const tempData = {
            email: ev.target.name === 'email' ? ev.target.value : formData.email,
            password: ev.target.name === 'password' ? ev.target.value : formData.password,
        }

        const validationError = UserSchema.omit({ username: true }).safeParse(tempData).error?.format()
        setErrorMessage({
            email: validationError?.email?._errors,
            password: validationError?.password?._errors
        })
    }

    async function submit(ev: FormEvent) {
        ev.preventDefault()

        const validatedData = UserSchema.omit({ username: true }).safeParse(formData)
        if (!validatedData.success) {
            console.log(validatedData.error);
            return;
        }
        console.log(formData.email, formData.password);

        try {

            const data = await signInHandler(formData.email, formData.password);
            console.log(data, 7676776);
            
            if (data?.error) {
                console.error("Sign-in failed:", data.error);
                // Handle sign-in error (e.g., show error message)
            } else {
                console.log("Sign-in successful:", data);
                // Handle successful sign-in (e.g., navigate to dashboard)
            }
        } catch (e) {
            toast.error("Invalid Credentials", {
                position: 'top-right',
            })
            console.log(e);
            
        }

    }

    return (
        <form className={style.form} method="POST" onSubmit={submit}>
            <ToastContainer />
            <AnimatedInput
                type='email'
                name='email'
                placeholder='Email'
                input_style={style.input}
                value={formData.email}
                error={(errorMsg.email && formData.email) ? errorMsg.email : []}
                error_style={style.error_message}
                placeholder_style={style._placeholder}
                onChange={handleInputChange} />

            <AnimatedInput
                type='password'
                name='password'
                placeholder='Password'
                input_style={style.input}
                value={formData.password}
                error={(errorMsg.password && formData.password) ? errorMsg.password : []}
                error_style={style.error_message}
                placeholder_style={style._placeholder}
                onChange={handleInputChange} />

            <span className={style.forgotten_password}>
                Forgotten password? <Link href={'/recover'}>here</Link>
            </span>
            <input
                type="submit"
                value="Submit"
                className={`${style.input} ${style.submit}`}
                disabled={(errorMsg.email || errorMsg.password) ? true : false} />

            {/* <AnimatedButton text='SIGNIN' type='submit' style={`${style.input} ${style.submit}`} /> */}

        </form>
    )
}
