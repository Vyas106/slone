"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const RegisterSlonePage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        orgName: '',
        industry: '',
        teamSize: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const profileData = {
                uid: user.uid,
                orgName: formData.orgName,
                industry: formData.industry,
                teamSize: formData.teamSize,
                email: formData.email,
                role: 'slone',
                createdAt: new Date().toISOString(),
            };

            // Save to Firestore
            await setDoc(doc(db, "slones", user.uid), profileData);
            
            // Still save to localStorage for the intermediate profile page or fetch it there
            localStorage.setItem('slone_profile', JSON.stringify(profileData));
            
            router.push('/slone-profile');
        } catch (err: any) {
            setError(err.message || "Registration failed.");
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Background Mesh Gradients */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
            
            <div className="relative z-10 w-full max-w-lg px-6 py-12">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-6">
                         <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Become a Slone Partner</h1>
                    <p className="text-zinc-400 font-medium tracking-wide">Enter your organization details to initialize your management profile.</p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 shadow-3xl animate-in fade-in zoom-in duration-500">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1" htmlFor="orgName">Organization Name</label>
                                <input id="orgName" type="text" className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" placeholder="Slone Labs" value={formData.orgName} onChange={(e) => setFormData({...formData, orgName: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1" htmlFor="industry">Industry</label>
                                    <select id="industry" className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 appearance-none font-medium" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} required>
                                        <option value="" disabled>Select Segment</option>
                                        <option value="Hair Salon">Hair Salon</option>
                                        <option value="Barber Shop">Barber Shop</option>
                                        <option value="Beauty & Wellness">Beauty & Wellness</option>
                                        <option value="Enterprise Cluster">Enterprise Cluster</option>
                                    </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1" htmlFor="email">Business Email</label>
                                <input id="email" type="email" className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium" placeholder="ceo@slone.io" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1" htmlFor="password">Security Password</label>
                                <input id="password" type="password" className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1" htmlFor="teamSize">Team Size</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['1-10', '11-50', '100+'].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setFormData({...formData, teamSize: size})}
                                        className={`py-3 rounded-xl border text-sm font-bold transition-all duration-300 ${formData.teamSize === size ? 'bg-white text-black border-white' : 'bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-600/20 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? "Generating Your Space..." : "Initalize Organization Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterSlonePage;
