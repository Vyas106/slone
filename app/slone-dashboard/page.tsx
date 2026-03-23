"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const SloneDashboardOverview = () => {
    const { user, loading } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [userCount, setUserCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [recentOps, setRecentOps] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, "slones", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setProfile(docSnap.data());
            };
            const fetchUserCount = async () => {
                const q = query(collection(db, "users"), where("role", "==", "user"));
                const querySnapshot = await getDocs(q);
                setUserCount(querySnapshot.size);
            };
            const fetchAppointmentStats = async () => {
                const q = query(collection(db, "appointments"), where("sloneId", "==", user.uid));
                const snap = await getDocs(q);
                setAppointmentCount(snap.size);
                
                const docs = snap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
                docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setRecentOps(docs.slice(0, 3));
            };
            fetchProfile();
            fetchUserCount();
            fetchAppointmentStats();
        }
    }, [user]);

    if (!profile) return null;

    return (
        <div className="animate-in fade-in duration-700">
            <header className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter uppercase font-sans">{profile.orgName} ◈</h1>
                    <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                        Enterprise Instance • {profile.industry} • Running v1.2.4
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center relative hover:scale-[1.05] transition-transform cursor-pointer group">
                        <svg className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 rounded-full border-2 border-black" />
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/5 p-[2px] transition-transform hover:rotate-12 cursor-pointer">
                        <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center text-sm font-black uppercase text-white tracking-widest leading-none">
                            {profile.orgName?.[0]}
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-in slide-in-from-bottom duration-700">
                {[
                    { label: 'Platform Users', value: userCount.toString(), growth: '+12%', color: 'indigo' },
                    { label: 'Total Syncs', value: appointmentCount.toString(), growth: '+28%', color: 'blue' },
                    { label: 'System Load', value: '14.2%', growth: '-4%', color: 'purple' },
                ].map((stat, idx) => (
                    <div key={idx} className="p-10 bg-zinc-800/40 rounded-[3rem] border border-white/5 space-y-6 shadow-2xl hover:border-white/10 transition-all duration-300 group hover:-translate-y-2">
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</p>
                            <div className={`p-2 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                                <div className={`w-2 h-2 rounded-full bg-${stat.color}-500`} />
                            </div>
                        </div>
                        <h3 className="text-5xl font-black tracking-tighter leading-none">{stat.value}</h3>
                        <div className={`flex items-center gap-2 text-${stat.color}-400 font-black text-[10px] uppercase tracking-widest`}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span>{stat.growth} compared to last epoch</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Activities Table Container */}
            <section className="bg-zinc-800/20 backdrop-blur-md rounded-[3.5rem] border border-white/5 p-12 animate-in fade-in zoom-in duration-1000 delay-200 shadow-xl">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-black tracking-[0.05em] uppercase leading-none">Operational Stream</h2>
                    <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-all">Export Report</button>
                </div>
                <div className="space-y-4">
                    {recentOps.length > 0 ? (
                        recentOps.map((op, idx) => (
                            <div key={idx} className="flex items-center justify-between p-6 bg-black/30 border border-white/5 rounded-3xl transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 group cursor-pointer hover:translate-x-1">
                                <div className="flex items-center gap-6 text-left">
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center font-black text-indigo-400 tracking-tighter text-xs uppercase shadow-inner group-hover:border-indigo-500/30 transition-colors">
                                        SYNC-{idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white uppercase text-sm tracking-widest leading-none mb-1.5">{op.userName}</h4>
                                        <p className="text-[10px] font-bold text-zinc-600 tracking-[0.1em] uppercase opacity-80">Sync Type: {op.type} • Status: Stable • {op.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1.5 ${op.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'} text-[10px] font-black uppercase tracking-widest rounded-full border`}>{op.status}</span>
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:border-indigo-500 group-hover:rotate-12 transition-all duration-300 text-zinc-600 group-hover:text-white">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs italic">
                            No active operational sync streams detected.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SloneDashboardOverview;
