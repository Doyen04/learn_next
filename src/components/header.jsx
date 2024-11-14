import style from '@/styles/header.module.css'
import { LightbulbIcon } from 'lucide-react';
import Link from 'next/link';
import { auth, signOut } from '~@/auth';
import Image from 'next/image';

async function Header() {
    const session = await auth()
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
                {/* search ?. */}
                {session && session?.user ? (
                    <div className={style.signin_container}>
                        <form action={async () => {
                            "use server"

                            await signOut({ redirectTo: "/" })
                        }}>
                            <button type='submit' className={style.signup_button} >
                                Sign Out
                            </button>
                        </form>
                        <Image src={session?.user?.image} alt='avatar' width={40} height={40} />
                    </div>

                ) : (
                    <button className={style.signup_button}>
                        <Link href={'/signup'} className={style.signup_link}>Sign up</Link>
                    </button>
                )}

            </nav>

        </header>
    )
}

export default Header