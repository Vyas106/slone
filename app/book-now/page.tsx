"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function BookNow() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Signature Cut",
    location: "Downtown Arts District",
    date: "",
    time: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const services = [
    "Signature Cut",
    "Color Transformation",
    "Texture Treatment",
    "Sculpting & Styling",
    "Private Consultation"
  ];

  const locations = [
    "Downtown Arts District",
    "SoHo New York",
    "West London Studio",
    "The Lab (East Side)"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await addDoc(collection(db, "appointments"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "pending"
      });
      setStatus("success");
      setFormData({ name: "", email: "", service: "Signature Cut", location: "Downtown Arts District", date: "", time: "", message: "" });
    } catch (error) {
      console.error("Error booking appointment:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      
      <main className="pt-40 lg:pt-56">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-40">
            <div>
              <span className="text-accent font-black text-[10px] tracking-[0.5em] uppercase mb-8 block italic">Reservation / Series.01</span>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
                Book Your <br />
                <span className="text-black/5 italic decoration-accent underline underline-offset-8">Session.</span>
              </h1>
              <p className="text-black/40 font-bold leading-relaxed uppercase text-[11px] tracking-[0.2em] max-w-sm mb-20">
                Sessions at Slone are by appointment only. We recommend booking at least two weeks in advance to secure your preferred artisan.
              </p>

              <div className="space-y-16">
                 <div className="border-l-2 border-black/5 pl-8">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-black/20 mb-3 italic">Studio Hours</span>
                    <p className="text-sm font-black uppercase tracking-widest">Tue — Sat / 10:00 — 19:00</p>
                 </div>
                 <div className="border-l-2 border-black/5 pl-8">
                    <span className="block text-[10px] font-black uppercase tracking-widest text-black/20 mb-3 italic">Location</span>
                    <p className="text-sm font-black uppercase tracking-widest">Downtown Arts District, Unit 04</p>
                 </div>
              </div>
            </div>

            <div className="bg-[#f8f8f8] p-10 md:p-20 rounded-[3rem] border border-black/5 shadow-2xl">
              {status === "success" ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-black text-white flex items-center justify-center mx-auto mb-10 rounded-full shadow-xl">
                     <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Request Sent</h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">We will contact you shortly to confirm your slot.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-16 px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-accent hover:scale-105 transition-all shadow-xl"
                  >
                    Book Another session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group border-b-2 border-black/5 focus-within:border-accent transition-all pb-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 italic">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="IDENTITY"
                        className="w-full bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest placeholder:text-black/5"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="group border-b-2 border-black/5 focus-within:border-accent transition-all pb-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 italic">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="COMMUNICATION"
                        className="w-full bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest placeholder:text-black/5"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group border-b-2 border-black/5 focus-within:border-accent transition-all pb-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 italic">Select Service</label>
                      <select 
                        className="w-full bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest appearance-none cursor-pointer"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="group border-b-2 border-black/5 focus-within:border-accent transition-all pb-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 italic">Select Location</label>
                      <select 
                        className="w-full bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest appearance-none cursor-pointer"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      >
                        {locations.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group border-b-2 border-black/5 focus-within:border-accent transition-all pb-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 italic">Preferred Date</label>
                      <input 
                        required
                        type="date" 
                        className="w-full bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest cursor-pointer"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="group border-b-2 border-black/5 focus-within:border-accent transition-all pb-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 italic">Preferred Time</label>
                      <input 
                        required
                        type="time" 
                        className="w-full bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest cursor-pointer"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="group border-b-2 border-black/5 focus-within:border-accent transition-all pb-6">
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4 italic">Message (Optional)</label>
                    <textarea 
                      rows={1}
                      placeholder="SPECIFIC REQUESTS?"
                      className="w-full bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest placeholder:text-black/5 resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent hover:scale-[1.02] transition-all disabled:opacity-50 rounded-2xl shadow-xl"
                  >
                    {status === "loading" ? "Processing..." : "Confirm Request"}
                  </button>
                  
                  {status === "error" && (
                    <p className="text-[10px] font-black text-accent uppercase text-center mt-6 tracking-widest">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
