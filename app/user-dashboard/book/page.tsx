"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { collection, addDoc, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const BookAppointmentPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [slones, setSlones] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        type: 'Consultation',
        notes: '',
        sloneId: ''
    });

    useEffect(() => {
        const fetchSlones = async () => {
            const q = query(collection(db, "slones"));
            const querySnapshot = await getDocs(q);
            setSlones(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchSlones();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !formData.sloneId) return;
        setIsLoading(true);

        try {
            // Fetch User Name for the Slone Dashboard to show
            const userSnap = await getDoc(doc(db, "users", user.uid));
            const userName = userSnap.exists() ? userSnap.data().name : 'Unknown User';
            
            // Get selected slone name
            const selectedSlone = slones.find(s => s.id === formData.sloneId);

            const appointmentData = {
                userId: user.uid,
                userName: userName,
                sloneId: formData.sloneId,
                sloneName: selectedSlone?.orgName || 'Unknown Partner',
                date: formData.date,
                time: formData.time,
                type: formData.type,
                notes: formData.notes,
                status: 'Confirmed', // Default to confirmed for this demo
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, "appointments"), appointmentData);
            router.push('/user-dashboard');
        } catch (err) {
            console.error("Booking error:", err);
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom duration-700 max-w-2xl mx-auto">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-black tracking-tighter uppercase font-sans mb-2">Book Synchronization ◈</h1>
                <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase italic opacity-70">
                    Sheduling an enterprise consultation with Slone intelligence
                </p>
            </header>

            <form onSubmit={handleSubmit} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Target Date</label>
                        <input 
                            type="date" 
                            required 
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Time Slot</label>
                        <input 
                            type="time" 
                            required 
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Enterprise Slone</label>
                        <select 
                            required
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold appearance-none cursor-pointer"
                            value={formData.sloneId}
                            onChange={(e) => setFormData({...formData, sloneId: e.target.value})}
                        >
                            <option value="" disabled>Select Organization</option>
                            {slones.map((s) => (
                                <option key={s.id} value={s.id}>{s.orgName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Sync Type</label>
                        <select 
                            required
                            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold appearance-none cursor-pointer"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="Consultation">Enterprise Consultation</option>
                            <option value="Technical Audit">Technical Audit</option>
                            <option value="Strategic Review">Strategic Review</option>
                            <option value="AI Implementation">AI Implementation</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] pl-1">Operational Notes</label>
                    <textarea 
                        rows={4}
                        placeholder="Briefly describe the synchronization objective..."
                        className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-bold resize-none"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                </div>

                <button 
                    disabled={isLoading}
                    className={`w-full py-5 bg-indigo-600 text-white font-black rounded-2xl transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/20 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Finalize Appointment
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default BookAppointmentPage;
