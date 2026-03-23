"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const SalonsDiscoveryPage = () => {
    const [salons, setSalones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock images list to assign to salons if they don't have one
    const mockImages = [
        '/artifacts/445d47d3-aefd-4f64-893d-56acc3bf3cfc/salon_exterior_premium_1774245951610.png',
        '/artifacts/445d47d3-aefd-4f64-893d-56acc3bf3cfc/salon_interior_luxury_1774245970186.png',
        '/artifacts/445d47d3-aefd-4f64-893d-56acc3bf3cfc/barber_shop_classic_1774245991615.png'
    ];

    useEffect(() => {
        const fetchSalones = async () => {
            const q = query(collection(db, "slones"));
            const querySnapshot = await getDocs(q);
            setSalones(querySnapshot.docs.map((doc, idx) => ({ 
                id: doc.id, 
                ...doc.data(),
                image: mockImages[idx % mockImages.length] 
            })));
            setLoading(false);
        };
        fetchSalones();
    }, []);

    if (loading) return null;

    return (
        <div className="animate-in fade-in duration-700">
             <header className="mb-12">
                <h1 className="text-4xl font-black tracking-tighter uppercase font-sans mb-2">Salon Directory ◈</h1>
                <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                    Discover and book elite hair grooming experiences across the Slone network
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {salons.map((salon) => (
                    <Link 
                        key={salon.id} 
                        href={`/user-dashboard/salons/${salon.id}`}
                        className="group bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl hover:-translate-y-2"
                    >
                        <div className="h-56 w-full relative overflow-hidden">
                             <img 
                                src={salon.image} 
                                alt={salon.orgName} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                             />
                             <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                {salon.industry || 'Hair Salon'}
                             </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-indigo-400 transition-colors">{salon.orgName}</h3>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-80 mt-1">{salon.email}</p>
                            </div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic opacity-70 leading-relaxed line-clamp-2">
                                {salon.about || 'A premium Slone-certified establishment specializing in avant-garde grooming and styling.'}
                            </p>
                            <div className="pt-4 flex items-center justify-between border-t border-white/5">
                                <div className="flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full bg-green-500" />
                                     <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Available Now</span>
                                </div>
                                <div className="text-indigo-500 font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">View Details →</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SalonsDiscoveryPage;
