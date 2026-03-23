"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const SloneProfilePage = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) router.push('/register-slone');
        if (user) {
            const fetchProfile = async () => {
                // Try Firestore first
                const docSnap = await getDoc(doc(db, "slones", user.uid));
                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                } else {
                    // Fallback to local
                    const data = localStorage.getItem('slone_profile');
                    if (data) setProfile(JSON.parse(data));
                    else router.push('/register-slone');
                }
                setLoading(false);
            };
            fetchProfile();
        }
    }, [user, authLoading, router]);

    if (authLoading || loading || !profile) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
             <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black font-sans text-white p-6 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[150px] animate-pulse" />
            
            <main className="relative z-10 w-full max-w-2xl bg-zinc-900/50 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 text-center animate-in zoom-in duration-700">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-600/30">
                    <span className="text-4xl font-black text-white">{profile.orgName[0]}</span>
                </div>
                
                <h1 className="text-5xl font-black mb-2 tracking-tighter uppercase">{profile.orgName}</h1>
                <p className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-12">Organization Profile Initialized</p>

                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-left">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Industry</label>
                        <p className="text-xl font-bold uppercase">{profile.industry || 'General'}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-left">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Team Capacity</label>
                        <p className="text-xl font-bold uppercase">{profile.teamSize || '1-10'}</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-left col-span-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Enterprise Contact</label>
                        <p className="text-xl font-bold">{profile.email}</p>
                    </div>
                </div>

                <button
                    onClick={() => router.push('/slone-dashboard')}
                    className="w-full py-5 bg-white text-black font-black rounded-2xl transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] shadow-xl shadow-white/5"
                >
                    Proceed to Dashboard
                </button>
            </main>

            <div className="mt-8 text-zinc-600 text-xs font-bold uppercase tracking-widest">Slone Management System • Internal Instance v1.0</div>
        </div>
    );
};

export default SloneProfilePage;
