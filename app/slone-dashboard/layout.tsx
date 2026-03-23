"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'firebase/auth';

export default function SloneDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, "slones", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                } else {
                    router.push('/user-dashboard');
                }
            };
            fetchProfile();
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/');
    };

    if (loading || !profile) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const navItems = [
        { name: 'Overview', path: '/slone-dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Manage Users', path: '/slone-dashboard/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { name: 'Appointments', path: '/slone-dashboard/appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { name: 'Analytics', path: '/slone-dashboard/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { name: 'Settings', path: '/slone-dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row overflow-hidden selection:bg-indigo-500/30">
            {/* Sidebar */}
            <aside className="w-full md:w-72 bg-zinc-900 border-r border-white/5 p-8 flex flex-col h-screen overflow-y-auto z-40">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-2 shadow-2xl shadow-indigo-600/30 transition-transform hover:rotate-6">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black uppercase tracking-wider leading-none">{profile.orgName.split(' ')[0]}</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Management Panel</span>
                    </div>
                </div>
                
                <nav className="flex-grow space-y-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold group ${isActive ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                            >
                                <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-black' : 'text-zinc-600 group-hover:text-indigo-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                <span className="uppercase text-xs tracking-widest">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-10">
                    <button 
                        onClick={handleSignOut}
                        className="w-full px-5 py-4 bg-red-500/5 text-red-500 font-black rounded-2xl text-left border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 transition-all uppercase text-[10px] tracking-[0.2em] flex items-center gap-3"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-6 0v-1m6-4H9" />
                        </svg>
                        Sign Out System
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow overflow-y-auto bg-zinc-950 p-2 relative h-screen">
                <div className="h-full w-full bg-zinc-900/40 backdrop-blur-xl rounded-[3.5rem] border border-white/5 shadow-2xl overflow-y-auto p-10 relative">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

                    {children}
                </div>
            </main>
        </div>
    );
}
