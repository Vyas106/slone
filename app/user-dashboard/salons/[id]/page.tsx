"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';

const SalonDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    const [salon, setSalon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        type: 'Consultation',
        notes: ''
    });

    useEffect(() => {
        const fetchSalon = async () => {
            const docRef = doc(db, "slones", id as string);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSalon(docSnap.data());
            }
            setLoading(false);
        };
        fetchSalon();
    }, [id]);

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !salon) return;
        setIsBooking(true);

        try {
            // Fetch User info for the Slone Dashboard
            const userSnap = await getDoc(doc(db, "users", user.uid));
            const userName = userSnap.exists() ? userSnap.data().name : 'Unknown User';

            const appointmentData = {
                userId: user.uid,
                userName: userName,
                sloneId: id,
                sloneName: salon.orgName,
                date: formData.date,
                time: formData.time,
                type: formData.type,
                notes: formData.notes,
                status: 'Confirmed',
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, "appointments"), appointmentData);
            alert(`Synchronization established with ${salon.orgName}!`);
            router.push('/user-dashboard/tasks');
        } catch (err) {
            console.error("Booking error:", err);
            setIsBooking(false);
        }
    };

    if (loading || !salon) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="animate-in fade-in duration-700 max-w-6xl mx-auto pb-20">
             <header className="mb-12 flex items-center justify-between">
                <div>
                     <h1 className="text-4xl font-black tracking-tighter uppercase font-sans mb-2">{salon.orgName} ◈</h1>
                     <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                         {salon.industry} • Verified Partner • Official Slone Network
                     </p>
                </div>
                <button 
                  onClick={() => router.back()}
                  className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all shadow-xl"
                >
                  Return to Discovery
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Salon Info Section */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="h-[450px] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-3xl">
                        {/* Placeholder image for individual salon */}
                        <img 
                            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" 
                            alt={salon.orgName}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>

                    <section className="bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-12 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Operational Ethos</h2>
                            <p className="text-zinc-400 font-bold leading-relaxed text-sm opacity-80">
                                {salon.about || 'A visionary establishment committed to redefining the boundaries of grooming through precision engineering and artistic flair. Our salon offers a sanctuary for the discerning, where style meets technological strategy.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                             <div>
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Location Profile</h4>
                                <p className="text-sm font-bold text-white uppercase italic">{salon.address || 'Global - Slone Network'}</p>
                             </div>
                             <div>
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Contact Protocol</h4>
                                <p className="text-sm font-bold text-white lowercase italic">{salon.email}</p>
                             </div>
                        </div>

                        <div className="space-y-4 pt-4">
                             <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Available Services</h4>
                             <div className="flex flex-wrap gap-3">
                                 {['Precision Cutting', 'Technical Coloring', 'Scalp Reconstruction', 'Style Consultation', 'Elite Grooming'].map((service, i) => (
                                     <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400">{service}</span>
                                 ))}
                             </div>
                        </div>
                    </section>
                </div>

                {/* Booking Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-12 bg-indigo-600 border border-indigo-500/30 rounded-[3.5rem] p-10 shadow-3xl space-y-8 animate-in delay-200 slide-in-from-right duration-1000">
                        <div className="text-center space-y-2">
                             <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Initialize Sync</h3>
                             <p className="text-[10px] font-black text-indigo-200/60 uppercase tracking-widest">Sheduling with {salon.orgName}</p>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-100 uppercase tracking-widest pl-1">Target Date</label>
                                <input 
                                    type="date" 
                                    required
                                    className="w-full bg-black/20 border border-indigo-400/30 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all font-bold text-sm"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-100 uppercase tracking-widest pl-1">Time Alignment</label>
                                <input 
                                    type="time" 
                                    required
                                    className="w-full bg-black/20 border border-indigo-400/30 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all font-bold text-sm"
                                    value={formData.time}
                                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-indigo-100 uppercase tracking-widest pl-1">Objective</label>
                                <select 
                                    className="w-full bg-black/20 border border-indigo-400/30 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white transition-all font-bold text-sm appearance-none cursor-pointer"
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                >
                                    <option value="Consultation">Consultation</option>
                                    <option value="Precision Cut">Precision Cut</option>
                                    <option value="Strategic Styling">Strategic Styling</option>
                                </select>
                            </div>
                            <button 
                                disabled={isBooking}
                                className="w-full py-5 bg-white text-indigo-600 font-black rounded-2xl transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-xl uppercase text-xs tracking-widest flex items-center justify-center gap-3"
                            >
                                {isBooking ? (
                                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                ) : 'Finalize Request'}
                            </button>
                        </form>

                        <div className="pt-4 border-t border-white/10 text-center">
                            <p className="text-[9px] font-black text-indigo-200/40 uppercase tracking-widest">Official Slone Authentication Required</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SalonDetailPage;
