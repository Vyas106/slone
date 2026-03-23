"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const SloneSettingsPage = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, "slones", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setProfile(docSnap.data());
            };
            fetchProfile();
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !profile) return;
        setIsSaving(true);
        try {
            await updateDoc(doc(db, "slones", user.uid), profile);
            alert("Slone Enterprise Profile updated successfully!");
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (!profile) return null;

    return (
        <div className="animate-in fade-in duration-700 max-w-5xl mx-auto">
             <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter uppercase font-sans mb-2">Enterprise Config ◈</h1>
                <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                    Managing your salon's public identity and operational parameters within the Slone network
                </p>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Visual Identity Section */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-10 flex flex-col items-center text-center shadow-2xl">
                         <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20 p-1 mb-6">
                            <div className="w-full h-full rounded-[2.8rem] bg-zinc-950 flex items-center justify-center font-black text-6xl uppercase text-white">
                                {profile.orgName?.[0]}
                            </div>
                         </div>
                         <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">{profile.orgName}</h3>
                         <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-80">{profile.email}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-4">
                         <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">System Health</h4>
                         <div className="flex items-center justify-between">
                             <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">API Status</span>
                             <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_green]" />
                         </div>
                         <div className="flex items-center justify-between">
                             <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Auth Protocol</span>
                             <span className="text-[10px] font-black text-white uppercase tracking-widest">Stable</span>
                         </div>
                    </div>
                </div>

                {/* Form Data Section */}
                <div className="lg:col-span-2 space-y-8 bg-zinc-800/20 backdrop-blur-md rounded-[3.5rem] border border-white/5 p-12 shadow-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Organization Name</label>
                            <input 
                                type="text" 
                                required
                                className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                                value={profile.orgName}
                                onChange={(e) => setProfile({...profile, orgName: e.target.value})}
                            />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Industry Sector</label>
                            <input 
                                type="text" 
                                required
                                className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                                value={profile.industry}
                                onChange={(e) => setProfile({...profile, industry: e.target.value})}
                            />
                         </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Operational Location (Address)</label>
                        <input 
                            type="text" 
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                            value={profile.address || ''}
                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Enterprise Ethos (About)</label>
                        <textarea 
                            rows={4}
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold resize-none"
                            placeholder="Briefly describe your salon's values and service philosophy..."
                            value={profile.about || ''}
                            onChange={(e) => setProfile({...profile, about: e.target.value})}
                        />
                    </div>

                    <div className="pt-6">
                         <button 
                            disabled={isSaving}
                            className="px-10 py-5 bg-white text-black font-black rounded-2xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-xl uppercase text-xs tracking-widest flex items-center gap-3"
                        >
                            {isSaving ? (
                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : 'Save Configuration'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SloneSettingsPage;
