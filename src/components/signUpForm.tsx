"use client"


import AnimatedInput from '@/components/animatedInput';
import AnimatedButton from '@/components/animatedButton';
import style from '@/styles/signup_page.module.css'
import Link from "next/link";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleInputChange(ev: React.ChangeEvent<HTMLInputElement>) {
        ev.preventDefault()
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value
        })
        console.log(formData);

    }

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault()

        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data, 888888);

            if (res.ok) {
                // setResponseMessage(data.message); // Success message
                setFormData({  username: '',
                    email: '',
                    password: '' }); // Reset form
                    router.push('/signin')
            } else {
                // setResponseMessage(data.message || 'Something went wrong!');
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
                placeholder_style={style._placeholder} />
            <AnimatedInput
                onChange={handleInputChange}
                type='email'
                name='email'
                placeholder='Email'
                input_style={style.input}
                value={formData.email}
                placeholder_style={style._placeholder} />
            <AnimatedInput
                onChange={handleInputChange}
                type='password'
                name='password'
                value={formData.password}
                placeholder='Password'
                input_style={style.input}
                placeholder_style={style._placeholder} />
            {/* <input type="button" value="Submit" className={`${style.input} ${style.submit}`} /> */}
            <AnimatedButton text='SIGNUP' type='submit' style={`${style.input} ${style.submit}`} />
            <Link href=""></Link>
        </form>
    )
}