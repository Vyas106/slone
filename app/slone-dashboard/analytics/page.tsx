"use client";

import React from 'react';

const AnalyticsPage = () => {
    return (
        <div className="animate-in fade-in duration-700">
             <header className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter uppercase font-sans">Enterprise Analytics ◈</h1>
                    <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                        Real-time system telemetry and platform metrics
                    </p>
                </div>
            </header>
            <div className="bg-zinc-800/20 backdrop-blur-md rounded-[3.5rem] border border-white/5 p-12 shadow-xl flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-500/10 border border-indigo-500/20 mx-auto flex items-center justify-center animate-pulse">
                         <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white">Generating Telemetry Stream</h3>
                    <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase opacity-70">Aggregating global datasets for comprehensive insights.</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
