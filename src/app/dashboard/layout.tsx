import style from "@/styles/admin.module.css"
import Link from 'next/link';

import React from 'react';

import { SettingsIcon, LucideLayoutDashboard, User2 ,Quote, SparkleIcon, MessageSquareCode} from "lucide-react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className={style.admin}>
            <header className={style.sidenav}>
                <Link href="/dashboard">
                    <LucideLayoutDashboard size={25} />
                    <p>Dashboard</p>
                </Link>
                <Link href="/quizzes">
                    <Quote size={25}/>
                    <p>Quizzes</p>
                </Link>
                <Link href="/results">
                    <SparkleIcon size={25}/>
                    <p>Results</p>
                </Link>
                <Link href="/profile">
                    <User2 size={25} />
                    <p>Profile</p>
                </Link>
                <Link href="/notifications">
                    <MessageSquareCode size={25} />
                    Notifications</Link>
                <Link href="/settings">
                    <SettingsIcon size={25} />
                    <p>Settings</p>
                </Link>
                <div className={style.user_profile}>
                    <User2 size={25} />
                    <p>Doyen04</p>
                </div>
            </header>

            {children}

        </div >
    );
};

export default AdminLayout;