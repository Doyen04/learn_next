import style from '@/styles/header.module.css'
// import Image from 'next/image'
import { LightbulbIcon } from 'lucide-react';
import Link from 'next/link';


function Header() {
    return (
        <header className={style.header}>
            <div className={style.logo_container}>
                <LightbulbIcon color='#3c6caf' size={'50px'} />
                <p>Learn</p>
            </div>
            <nav className={style.nav}>
                <div>About</div>
                <div>Blog</div>
                <div>Contact</div>
                <div>Services</div>
                <button className={style.signup_button}>
                    <Link href={'/signup'} className={style.signup_link}>Sign up</Link>
                </button>
            </nav>

        </header>
    )
}

export default Header