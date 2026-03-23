"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const RegisterUserPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError ] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Create User in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Save Profile in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: formData.name,
                email: formData.email,
                role: 'user',
                createdAt: new Date().toISOString(),
            });

            router.push('/user-dashboard');
        } catch (err: any) {
            setError(err.message || "Failed to register. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Background Mesh Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
            
            <div className="relative z-10 w-full max-w-md px-6 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter uppercase">Join Slone</h1>
                    <p className="text-zinc-500 font-medium tracking-wide">Create your personal secure account.</p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-500">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 ml-1" htmlFor="name">Full Name</label>
                                <input id="name" type="text" className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500/50" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 ml-1" htmlFor="email">Email</label>
                                <input id="email" type="email" className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500/50" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 ml-1" htmlFor="password">Password</label>
                                <input id="password" type="password" className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500/50" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-4.5 bg-white text-black font-black uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} shadow-xl shadow-white/5`}
                        >
                            {isLoading ? "Synchronizing..." : "Initialize Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterUserPage;
