"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ManageUsersPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const q = query(collection(db, "users"), where("role", "==", "user"));
                const querySnapshot = await getDocs(q);
                const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
            <header className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter uppercase font-sans">User Directory ◈</h1>
                    <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                        Managing {users.length} active platform members
                    </p>
                </div>
                <button className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/20 uppercase text-xs tracking-widest">
                    Manual Provision
                </button>
            </header>

            <section className="bg-zinc-800/20 backdrop-blur-md rounded-[3.5rem] border border-white/5 p-12 shadow-xl">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="pb-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-4">Member Instance</th>
                                    <th className="pb-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Email Signature</th>
                                    <th className="pb-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Registration Date</th>
                                    <th className="pb-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-right pr-4">Commands</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-6 pl-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-black text-white uppercase text-sm group-hover:scale-110 transition-transform">
                                                    {user.name?.[0] || 'U'}
                                                </div>
                                                <span className="font-bold text-white uppercase tracking-wider text-sm">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <span className="text-zinc-400 font-medium text-sm">{user.email}</span>
                                        </td>
                                        <td className="py-6">
                                            <span className="text-zinc-600 font-bold text-xs uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="py-6 pr-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 text-red-500 transition-all">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={4} className="py-20 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs italic">
                                            No platform members detected. Data stream empty.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ManageUsersPage;
