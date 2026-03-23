"use client";

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if user exists in 'users' collection
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                router.push('/user-dashboard');
                return;
            }

            // Check if user exists in 'slones' collection
            const sloneRef = doc(db, "slones", user.uid);
            const sloneSnap = await getDoc(sloneRef);

            if (sloneSnap.exists()) {
                router.push('/slone-dashboard');
                return;
            }

            setError("Identity cloud mismatch. Access denied.");
        } catch (err: any) {
            setError(err.message || 'Authentication sequence failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Background Mesh Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse shadow-2xl" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md px-6 py-12 md:px-8">
                {/* Logo & Header */}
                <div className="text-center mb-10 space-y-2">
                    <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20 mb-6 group transition-transform duration-500 hover:scale-105">
                        <svg className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase sm:text-5xl">
                        Identify Back
                    </h1>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] opacity-80 italic">
                        Initializing secure authentication sequence
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-3xl animate-in fade-in zoom-in duration-500">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="px-5 py-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 pl-1" htmlFor="email">
                                    Auth Identity (Email)
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white transition-all duration-300 focus:outline-none focus:border-indigo-500/50 font-bold"
                                    placeholder="name@nexus.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2 pl-1">
                                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest" htmlFor="password">
                                        Password Protocol
                                    </label>
                                    <a href="#" className="text-[10px] font-black text-indigo-400 hover:text-white transition-colors uppercase tracking-widest">
                                        Lost Access?
                                    </a>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white transition-all duration-300 focus:outline-none focus:border-indigo-500/50 font-bold"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex items-center justify-center py-5 bg-white text-black font-black rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl uppercase text-xs tracking-widest gap-3"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Execute Login</span>
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-10 text-center space-y-4">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-70">
                            New to the grid?
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link href="/register-user" className="text-xs font-black text-white hover:text-indigo-400 transition-colors uppercase tracking-widest underline decoration-indigo-500/30 underline-offset-8">
                                Register as User
                            </Link>
                            <Link href="/register-slone" className="text-xs font-black text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">
                                Partner as Slone
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-12 flex justify-center space-x-8 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                    <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-zinc-400 transition-colors">Protocols</a>
                    <a href="#" className="hover:text-zinc-400 transition-colors">Support</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
