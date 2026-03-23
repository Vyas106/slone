"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';

const AppointmentsPage = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchAppointments = async () => {
            try {
                // Temporarily removed orderBy to avoid index requirement issues
                const q = query(
                    collection(db, "appointments"), 
                    where("sloneId", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);
                const aptsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
                
                // Sort manually if needed
                aptsList.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                
                setAppointments(aptsList);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [user]);

    const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
    const pendingCount = appointments.filter(a => a.status === 'Pending').length;

    return (
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
            <header className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter uppercase font-sans">Slone Scheduling ◈</h1>
                    <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                        Managing {appointments.length} enterprise synchronization events
                    </p>
                </div>
                <button className="px-8 py-4 bg-purple-600 text-white font-black rounded-2xl transition-all duration-300 hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-600/20 uppercase text-xs tracking-widest">
                    Create Event
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Statistics Summary */}
                <div className="lg:col-span-1 space-y-6">
                    {[
                        { label: 'Upcoming', count: appointments.length, perc: '70%', color: 'indigo' },
                        { label: 'Confirmed', count: confirmedCount, perc: '40%', color: 'green' },
                        { label: 'Pending', count: pendingCount, perc: '20%', color: 'amber' }
                    ].map((stat, idx) => (
                        <div key={idx} className="p-8 bg-zinc-800/40 rounded-[2.5rem] border border-white/5 space-y-2 shadow-xl hover:border-white/10 transition-all cursor-pointer group">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none group-hover:text-white transition-colors">{stat.label}</p>
                            <h3 className="text-4xl font-black tracking-tight">{stat.count}</h3>
                            <div className="w-full h-1 bg-zinc-900 rounded-full mt-4 overflow-hidden">
                                <div className={`h-full bg-${stat.color}-500 transition-all duration-1000`} style={{ width: stat.perc }} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Calendar/List View */}
                <div className="lg:col-span-3">
                    <section className="bg-zinc-800/20 backdrop-blur-md rounded-[3.5rem] border border-white/5 p-12 shadow-xl">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex bg-black/40 p-1.5 border border-white/5 rounded-2xl transition-all hover:border-white/10">
                                <button className="px-6 py-2.5 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg transition-all active:scale-95">Upcoming</button>
                                <button className="px-6 py-2.5 text-zinc-500 font-black text-[10px] uppercase tracking-widest rounded-xl hover:text-white transition-colors">History</button>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            {loading ? (
                                <div className="py-20 text-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" /></div>
                            ) : appointments.length > 0 ? (
                                appointments.map((apt: any) => (
                                    <div key={apt.id} className="flex items-center justify-between p-8 bg-black/40 border border-white/5 rounded-[2.5rem] transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 group cursor-pointer hover:translate-x-1 shadow-inner relative overflow-hidden text-left">
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${apt.status === 'Confirmed' ? 'bg-green-500' : apt.status === 'Pending' ? 'bg-amber-500' : apt.status === 'Canceled' ? 'bg-red-500' : 'bg-indigo-500'}`} />
                                        <div className="flex items-center gap-8">
                                            <div>
                                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">{apt.time} • {apt.date}</p>
                                                <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-indigo-400 transition-colors uppercase">{apt.userName || 'Unknown User'}</h4>
                                                <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mt-1.5">{apt.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                           <span className={`px-4 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-widest ${apt.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : apt.status === 'Canceled' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-zinc-500/10 text-zinc-400 border-white/5'}`}>
                                               {apt.status}
                                           </span>
                                           <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all text-zinc-400 hover:text-white">
                                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                               </svg>
                                           </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center space-y-6">
                                    <div className="text-zinc-600 font-bold uppercase tracking-widest text-xs italic">
                                        No platform synchronize sessions detected.
                                    </div>
                                    <div className="p-8 bg-black/40 border border-white/5 rounded-3xl text-left max-w-md mx-auto space-y-4">
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Diagnostic Protocol Initialized</p>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Target Slone ID:</p>
                                            <p className="text-xs font-mono text-zinc-400 break-all bg-black/60 p-3 rounded-xl border border-white/5">{user?.uid}</p>
                                        </div>
                                        <p className="text-[9px] font-medium text-zinc-600 leading-relaxed italic border-t border-white/5 pt-4">
                                            Synchronization requires an exact match between the session UID and the 'sloneId' attribute within the global appointment inventory. If you recently registered, please ensure you have also initialized a new appointment request from a user account for comparison.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsPage;
