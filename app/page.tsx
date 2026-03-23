import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-black font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      {/* Background Mesh Gradients */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] animate-pulse pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px] animate-pulse pointer-events-none" />

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center space-y-12 max-w-5xl mx-auto px-6 py-32">
        <div className="space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-bold tracking-wide uppercase animate-in slide-in-from-top duration-700">
            Next-Gen Grooming Ecosystem
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tight text-white animate-in slide-in-from-bottom duration-700">
            Style<span className="text-indigo-500">.</span> Sync<span className="text-purple-500">.</span> Slone<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto animate-in slide-in-from-bottom delay-100 duration-700">
            Slone connects elite hair artisans with style-focused individuals through a decentralized management and discovery network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl animate-in fade-in zoom-in delay-200 duration-700">
          <Link
            href="/register-user"
            className="group relative flex flex-col items-center justify-center p-10 bg-white/5 border border-white/10 rounded-[3rem] transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
          >
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:bg-indigo-500/20 shadow-inner">
              <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Member Unit</h2>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest opacity-80">Discover clinics & book syncs.</p>
          </Link>

          <Link
            href="/register-slone"
            className="group relative flex flex-col items-center justify-center p-10 bg-zinc-900 border border-zinc-500/20 rounded-[3rem] transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-400/30 hover:shadow-indigo-600/10 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 transition-transform group-hover:rotate-12">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Salon Entity</h2>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest opacity-80">Orchestrate your enterprise.</p>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left border-t border-white/5 pt-20 animate-in fade-in duration-1000 delay-300">
          {[
            { title: 'Global Discovery', desc: 'Browse elite hair clinics within the localized Slone mesh network.' },
            { title: 'Real-time Sync', desc: 'Instant scheduling and enterprise synchronization with zero friction.' },
            { title: 'Style Security', desc: 'Your data and appointments are protected by official Slone protocols.' }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 bg-zinc-900/40 rounded-[2rem] border border-white/5 space-y-4 hover:border-white/10 transition-all">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <h3 className="text-lg font-black text-white uppercase tracking-wider">{feature.title}</h3>
              <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest leading-relaxed opacity-70 italic">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center border-t border-white/5">
        <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest">Built for the future by Vishal</p>
      </footer>
    </div>
  );
}
