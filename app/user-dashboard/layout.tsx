"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Link from 'next/link';

export default function UserDashboardLayout({
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
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                } else {
                    router.push('/slone-dashboard');
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

    const menuItems = [
        { name: 'Overview', path: '/user-dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Explore Salons', path: '/user-dashboard/salons', icon: 'M21 21l-6-6M17 10a7 7 0 11-14 0 7 7 0 0114 0z' },
        { name: 'Book Appointment', path: '/user-dashboard/book', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { name: 'My Profile', path: '/user-dashboard/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { name: 'Tasks', path: '/user-dashboard/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { name: 'Security', path: '/user-dashboard/security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans flex overflow-hidden selection:bg-indigo-500/30">
            {/* Background Decorative Gradients */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

            {/* Main Sidebar */}
            <aside className="w-72 bg-zinc-900/40 backdrop-blur-xl border-r border-white/5 p-8 flex flex-col h-screen z-50">
                <div className="flex items-center gap-3 mb-14 px-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-black uppercase tracking-widest text-white">Slone User</span>
                </div>

                <nav className="flex-grow space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold group ${isActive ? 'bg-white text-black shadow-2xl shadow-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                            >
                                <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-black' : 'text-zinc-600 group-hover:text-indigo-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                <span className="text-xs uppercase tracking-[0.15em]">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-10">
                    <button 
                        onClick={handleSignOut}
                        className="w-full px-6 py-4 bg-red-500/5 text-red-500 border border-red-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-left hover:bg-red-500/10 hover:border-red-500/20 transition-all flex items-center gap-3"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-6 0v-1m6-4H9" />
                        </svg>
                        Exit Dashboard
                    </button>
                </div>
            </aside>

            {/* Main Content Dashboard */}
            <main className="flex-grow h-screen overflow-y-auto p-4 relative">
                <div className="w-full h-full bg-zinc-950/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-y-auto p-12 custom-scrollbar relative">
                     {/* Decorative Elements */}
                     <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none" />
                     {children}
                </div>
            </main>
        </div>
    );
}
