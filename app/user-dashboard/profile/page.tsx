"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const UserProfilePage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setProfile(docSnap.data());
            };
            fetchProfile();
        }
    }, [user]);

    const handleSave = async () => {
        if (!user || !profile) return;
        setIsSaving(true);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                name: profile.name
            });
            alert("Profile synchronized successfully.");
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (!profile) return null;

    return (
        <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
             <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter uppercase font-sans mb-2">Member Identity ◈</h1>
                <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                    Managing localized authentication parameters and personal datasets
                </p>
            </header>

            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3.5rem] p-12 space-y-12 shadow-2xl">
                <div className="flex items-center gap-10">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20 p-1">
                        <div className="w-full h-full rounded-[2.3rem] bg-zinc-950 flex items-center justify-center font-black text-4xl uppercase">
                            {profile.name[0]}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{profile.name}</h2>
                        <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase opacity-80">{profile.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Role Architecture</label>
                        <input 
                            type="text" 
                            disabled
                            className="w-full bg-black/10 border border-zinc-900 rounded-2xl px-6 py-4 text-zinc-500 font-bold opacity-50 cursor-not-allowed"
                            value={profile.role?.toUpperCase() || 'USER'}
                        />
                    </div>
                </div>

                <div className="pt-8">
                     <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-10 py-5 bg-white text-black font-black rounded-2xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-xl shadow-white/5 uppercase text-xs tracking-[0.2em] flex items-center gap-3 ${isSaving ? 'opacity-50' : ''}`}
                    >
                        {isSaving ? 'Initializing...' : 'Save Configuration'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
