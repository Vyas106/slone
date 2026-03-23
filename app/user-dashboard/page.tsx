"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const UserDashboardOverview = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loadingApts, setLoadingApts] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setProfile(docSnap.data());
            };
            
            const fetchApts = async () => {
                try {
                    const q = query(collection(db, "appointments"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    setAppointments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoadingApts(false);
                }
            };

            fetchProfile();
            fetchApts();
        }
    }, [user]);

    if (!profile) return null;

    return (
        <div className="animate-in fade-in duration-700">
            {/* Top Header */}
            <header className="flex items-center justify-between mb-16">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter uppercase font-sans">Hey, {(profile.name || 'User').split(' ')[0]} ◈</h1>
                    <p className="text-zinc-500 font-bold tracking-widest text-[10px] uppercase opacity-80">Workspace ID: #{user?.uid.slice(0, 8)} • System Stable</p>
                </div>
                <Link href="/user-dashboard/book" className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/20 uppercase text-xs tracking-widest">
                    Book Appointment
                </Link>
            </header>

            {/* Dashboard Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-bottom duration-700">
                {[
                    { label: 'Activity Score', value: '4,280', growth: '+14%', color: 'indigo' },
                    { label: 'System Pings', value: '18ms', growth: 'Stable', color: 'blue' },
                    { label: 'Cloud Credits', value: '942', growth: '+2.4k', color: 'purple' },
                    { label: 'Appointments', value: appointments.length.toString(), growth: 'Active', color: 'green' }
                ].map((stat, idx) => (
                    <div key={idx} className="p-8 bg-zinc-900/60 rounded-[2.5rem] border border-white/5 space-y-4 hover:bg-zinc-900/80 hover:border-white/10 transition-all duration-300 shadow-2xl group cursor-default">
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                            <div className={`w-2 h-2 rounded-full bg-${stat.color}-500 shadow-[0_0_10px_rgba(var(--color-${stat.color}-500),0.5)]`} />
                        </div>
                        <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
                        <p className={`text-[10px] font-black text-${stat.color}-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform`}>{stat.growth} this cycle</p>
                    </div>
                ))}
            </div>

            {/* Operational Center & Secondary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Appointment Stream (Dynamic) */}
                <section className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10 space-y-8 animate-in delay-200 fade-in duration-1000">
                    <div className="flex items-center justify-between pr-2">
                        <h2 className="text-2xl font-black tracking-tighter uppercase">Upcoming Synchronizations</h2>
                        <Link href="/user-dashboard/tasks" className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-white transition-colors">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {loadingApts ? (
                            <div className="py-10 text-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
                        ) : appointments.length > 0 ? (
                            appointments.map((apt) => (
                                <div key={apt.id} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-[2rem] transition-all duration-300 hover:bg-white/[0.04] group cursor-pointer hover:border-white/10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center font-black text-indigo-400 text-xs uppercase shadow-inner group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                            {apt.type?.[0] || 'A'}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-white uppercase text-sm tracking-widest leading-none mb-1">{apt.type || 'Consultation'}</h4>
                                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest opacity-80">{apt.date} • {apt.time}</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase text-zinc-500">
                                        {apt.status}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs italic">
                                No upcoming events detected.
                            </div>
                        )}
                    </div>
                </section>

                {/* Node Connectivity */}
                <section className="lg:col-span-1 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-white/10 rounded-[3.5rem] p-10 flex flex-col items-center justify-center text-center animate-in delay-300 fade-in duration-1000 shadow-3xl">
                     <div className="w-24 h-24 rounded-[2.5rem] bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 relative">
                        <div className="absolute inset-0 rounded-[2.5rem] bg-indigo-500/20 blur-xl animate-pulse" />
                        <svg className="w-10 h-10 text-indigo-500 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                     </div>
                     <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Connect New Node</h3>
                     <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8 leading-relaxed opacity-80">Expand your workspace by linking external Slone clusters into your grid.</p>
                     <button className="w-full py-5 bg-white text-black font-black rounded-2xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-xl shadow-white/5 uppercase text-xs tracking-[0.2em]">Initialize Link</button>
                </section>
            </div>
        </div>
    );
};

export default UserDashboardOverview;
