"use client";

import React from 'react';

const UserSecurityPage = () => {
    return (
        <div className="animate-in fade-in duration-700">
             <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter uppercase font-sans mb-2">Protocol & Auth ◈</h1>
                <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                    Managing global security protocols and localized authentication parameters
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                    { label: 'Cloud Key Rotation', type: 'Active Protocol', color: 'indigo' },
                    { label: 'MFA Layer Synchronization', type: 'Active Protocol', color: 'green' },
                    { label: 'Hardware Key Mapping', type: 'Inactive Cluster', color: 'zinc' },
                    { label: 'Security Log Archive', type: 'Active Stream', color: 'blue' }
                ].map((stat, idx) => (
                    <div key={idx} className="p-10 bg-zinc-900/40 rounded-[3rem] border border-white/5 space-y-6 shadow-2xl hover:border-white/10 transition-all cursor-pointer group">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-white">{stat.label}</h3>
                            <div className={`w-3 h-3 rounded-full bg-${stat.color}-500 shadow-[0_0_10px_rgba(var(--color-${stat.color}-500),0.3)] animate-pulse`} />
                        </div>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">{stat.type} • System Optimal</p>
                        <div className="pt-4 flex gap-2">
                             <div className="px-4 py-2 border border-white/5 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Configure</div>
                             <div className="px-4 py-2 border border-white/5 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Audit</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSecurityPage;
