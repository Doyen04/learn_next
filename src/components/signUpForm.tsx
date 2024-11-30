"use client"


import AnimatedInput from '@/components/animatedInput';
import { ErrorObject, UserSchema } from '@/lib/zodSchema';
// import AnimatedButton from '@/components/animatedButton';
import style from '@/styles/signup_page.module.css'

import Link from "next/link";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';



export function SignUpForm() {

    const Errordata: ErrorObject = {
        username: [],
        email: [],
        password: []
    }

    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
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
            username: ev.target.name === 'username' ? ev.target.value : formData.username,
            email: ev.target.name === 'email' ? ev.target.value : formData.email,
            password: ev.target.name === 'password' ? ev.target.value : formData.password,
        }

        const validationError = UserSchema.safeParse(tempData).error?.format()
        setErrorMessage({
            username: validationError?.username?._errors,
            email: validationError?.email?._errors,
            password: validationError?.password?._errors
        })

    }

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault()

        const validatedData = UserSchema.safeParse(formData)
        if (!validatedData.success) {
            // console.log(validatedData.error);
            return;
        }
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validatedData.data),
            });

            const data = res.json();
            
            toast.promise(data, {
                pending: "Uploading Data",
                error: "error",
            },{position: "top-right"})

            const resData = await data

            console.log(resData, 888888);

            if (res.ok) {

                toast.success(resData.message, {
                    position: 'top-right',
                })

                setFormData({
                    username: '',
                    email: '',
                    password: ''
                }); // Reset form
                
                router.push('/signin')

            } else {
                toast.error(resData.message, {
                    position: 'top-right',
                })

            }
        } catch (e) {
            console.log(e);

            // setResponseMessage('Error submitting the form.');
        }
    }

    return (
        <form action={'/api/user'} method="post" className={style.form} onSubmit={handleSubmit}>


            <AnimatedInput
                onChange={handleInputChange}
                type='text'
                name='username'
                placeholder='Username'
                input_style={style.input}
                value={formData.username}
                error={(errorMsg.username && formData.username) ? errorMsg.username : []}
                error_style={style.error_message}
                placeholder_style={style._placeholder} />

            <AnimatedInput
                onChange={handleInputChange}
                type='email'
                name='email'
                placeholder='Email'
                input_style={style.input}
                value={formData.email}
                error={(errorMsg.email && formData.email) ? errorMsg.email : []}
                error_style={style.error_message}
                placeholder_style={style._placeholder} />

            <AnimatedInput
                onChange={handleInputChange}
                type='password'
                name='password'
                value={formData.password}
                placeholder='Password'
                input_style={style.input}
                error={(errorMsg.password && formData.password) ? errorMsg.password : []}
                error_style={style.error_message}
                placeholder_style={style._placeholder} />
            <input
                type="submit"
                value="Submit"
                className={`${style.input} ${style.submit}`}
                disabled={(errorMsg.email || errorMsg.username || errorMsg.password) ? true : false} />
            {/* <AnimatedButton text='SIGNUP' type='submit' style={`${style.input} ${style.submit}`} /> */}
            <Link href=""></Link>
        </form>
    )
}