"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-black text-white tracking-wider uppercase">Slone</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {!loading && user ? (
            <>
              <Link
                href="/user-dashboard"
                className="px-6 py-2.5 bg-white/10 border border-white/20 text-white font-bold rounded-xl transition-all duration-300 hover:bg-white/20"
              >
                Dashboard
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-indigo-500/10 transition-transform hover:scale-105 cursor-pointer">
                 <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[11px] font-black uppercase">{user.email?.[0]}</div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-2.5 text-zinc-400 font-bold hover:text-white transition-colors uppercase text-xs tracking-widest"
              >
                Login
              </Link>
              <Link
                href="/register-user"
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                Join as User
              </Link>
              <Link
                href="/register-slone"
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] shadow-lg shadow-indigo-600/20"
              >
                Join as Slone
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle (Simplified) */}
        <button className="md:hidden p-2 text-zinc-400">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
