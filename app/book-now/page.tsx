"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin, Sparkles } from "lucide-react";

export default function BookNow() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Signature Cut",
    location: "Bandra West, Mumbai",
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
    "Bandra West, Mumbai",
    "Defence Colony, Delhi",
    "Koramangala Studio",
    "The Lab (Jubilee Hills)"
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
      setFormData({ name: "", email: "", service: "Signature Cut", location: "Bandra West, Mumbai", date: "", time: "", message: "" });
    } catch (error) {
      console.error("Error booking appointment:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500 selection:text-white">
      <Navbar />
      
      <main className="pt-40 lg:pt-56">
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32 md:mb-56">
            <div className="lg:sticky lg:top-40">
              <span className="text-accent font-medium text-[10px] tracking-normal tracking-normal mb-8 block ">Reservation / Registry</span>
              <h1 className="text-5xl md:text-[5rem] xl:text-[7rem] font-medium tracking-normal tracking-tight leading-[0.85] mb-12">
                Book Your <br />
                <span className="text-accent  decoration-foreground/10 underline underline-offset-[1.5rem]">Session.</span>
              </h1>
              <p className="text-muted-foreground font-bold leading-relaxed tracking-normal text-[11px] tracking-normal max-w-sm mb-12 md:mb-20 opacity-80">
                Sessions at STYLORIA are by appointment only. We recommend booking at least two weeks in advance.
              </p>

              <div className="space-y-12">
                 {[
                    { icon: Clock, label: "Studio Hours", text: "Tue — Sat / 10:00 — 19:00" },
                    { icon: MapPin, label: "Location", text: "Bandra West, Mumbai, Unit 04" },
                    { icon: Sparkles, label: "Artisans", text: "Senior Technical Directors" }
                 ].map((item, idx) => (
                   <div key={idx} className="flex gap-6 items-start">
                      <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center shrink-0">
                         <item.icon className="size-5 text-accent" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground mb-1 ">{item.label}</span>
                        <p className="text-[13px] font-medium tracking-normal tracking-normal">{item.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <Card className="bg-muted/30 border-none rounded-[4rem] p-10 md:p-20 shadow-none">
              {status === "success" ? (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-accent text-white flex items-center justify-center mx-auto mb-10 rounded-full shadow-2xl">
                     <CheckCircle2 className="size-12" />
                  </div>
                  <h2 className="text-4xl font-medium tracking-normal tracking-tight mb-4 ">Request Logged.</h2>
                  <p className="text-[10px] font-bold tracking-normal tracking-normal text-muted-foreground mb-16">The technical network will contact you shortly.</p>
                  <Button 
                    onClick={() => setStatus("idle")}
                    variant="premium"
                    size="lg"
                    className="rounded-full px-12 h-16 text-[11px] font-medium tracking-normal tracking-normal"
                  >
                    New Reservation
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-4">
                      <Label className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground  ml-2">Full Identity</Label>
                      <Input 
                        required
                        placeholder="NAME"
                        className="bg-background border-none h-14 rounded-2xl px-6 text-[11px] font-medium tracking-normal tracking-normal focus-visible:ring-2 focus-visible:ring-accent"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground  ml-2">Communication</Label>
                      <Input 
                        required
                        type="email" 
                        placeholder="EMAIL"
                        className="bg-background border-none h-14 rounded-2xl px-6 text-[11px] font-medium tracking-normal tracking-normal focus-visible:ring-2 focus-visible:ring-accent"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-4">
                      <Label className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground  ml-2">Discipline</Label>
                      <Select defaultValue={formData.service} onValueChange={(v) => { if (v != null) setFormData(prev => ({...prev, service: v})); }}>
                         <SelectTrigger className="bg-background border-none h-14 rounded-2xl px-6 text-[11px] font-medium tracking-normal tracking-normal focus:ring-2 focus:ring-accent">
                            <SelectValue placeholder="SERVICE" />
                         </SelectTrigger>
                         <SelectContent className="bg-background border-border">
                            {services.map(s => <SelectItem key={s} value={s} className="text-[11px] font-medium tracking-normal tracking-normal">{s}</SelectItem>)}
                         </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground  ml-2">Sector</Label>
                      <Select defaultValue={formData.location} onValueChange={(v) => { if (v != null) setFormData(prev => ({...prev, location: v})); }}>
                         <SelectTrigger className="bg-background border-none h-14 rounded-2xl px-6 text-[11px] font-medium tracking-normal tracking-normal focus:ring-2 focus:ring-accent">
                            <SelectValue placeholder="LOCATION" />
                         </SelectTrigger>
                         <SelectContent className="bg-background border-border">
                            {locations.map(l => <SelectItem key={l} value={l} className="text-[11px] font-medium tracking-normal tracking-normal">{l}</SelectItem>)}
                         </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-4">
                      <Label className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground  ml-2">Chronology / Date</Label>
                      <Input 
                        required
                        type="date" 
                        className="bg-background border-none h-14 rounded-2xl px-6 text-[11px] font-medium tracking-normal tracking-normal focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground  ml-2">Temporal / Time</Label>
                      <Input 
                        required
                        type="time" 
                        className="bg-background border-none h-14 rounded-2xl px-6 text-[11px] font-medium tracking-normal tracking-normal focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground  ml-2">Technical Requests</Label>
                    <Textarea 
                      placeholder="SPECIFIC REQUIREMENTS..."
                      className="bg-background border-none rounded-3xl p-6 text-[11px] font-medium tracking-normal tracking-normal focus-visible:ring-2 focus-visible:ring-accent resize-none h-32"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <Button 
                    disabled={status === "loading"}
                    type="submit"
                    variant="premium"
                    className="w-full h-16 text-[11px] font-medium tracking-normal tracking-normal rounded-[1.5rem]"
                  >
                    {status === "loading" ? "Processing..." : "Confirm Registration"}
                  </Button>
                  
                  {status === "error" && (
                    <p className="text-[11px] font-medium text-destructive tracking-normal text-center mt-6 tracking-normal ">Synchronization error. Please retry.</p>
                  )}
                </form>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
