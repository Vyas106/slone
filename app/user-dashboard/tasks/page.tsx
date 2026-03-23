"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const MyTasksPage = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchApts = async () => {
                try {
                    const q = query(collection(db, "appointments"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    setAppointments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchApts();
        }
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this synchronization?")) return;
        try {
            await deleteDoc(doc(db, "appointments", id));
            setAppointments(appointments.filter(a => a.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return null;

    return (
        <div className="animate-in fade-in duration-700">
             <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter uppercase font-sans mb-2">Sync Inventory ◈</h1>
                <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                    A comprehensive stream of enterprise synchronization events and tasks
                </p>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {appointments.length > 0 ? (
                    appointments.map((apt) => (
                        <div key={apt.id} className="p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] group hover:border-white/10 transition-all duration-300 shadow-2xl flex items-center justify-between">
                            <div className="flex gap-8 items-center">
                                <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-500 text-xl group-hover:scale-110 transition-transform">
                                     {apt.type?.[0] || 'A'}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80">{apt.date} • {apt.time}</p>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                                        {apt.type || 'Consultation'} <span className="text-zinc-500 mx-2 text-sm opacity-50">/</span> <span className="text-indigo-500/80">{apt.sloneName}</span>
                                    </h3>
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic">{apt.notes || 'No operational notes provided.'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className={`px-4 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-widest ${apt.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-zinc-500/10 text-zinc-400 border-white/5'}`}>
                                    {apt.status}
                                </span>
                                <button 
                                    onClick={() => handleDelete(apt.id)}
                                    className="w-12 h-12 rounded-2xl bg-red-500/5 text-red-500 border border-red-500/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-24 text-center space-y-4">
                        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                             <svg className="w-8 h-8 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                             </svg>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-white">No active syncs detected</h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic opacity-70 font-sans">Initialize a synchronization to populate your inventory.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTasksPage;
