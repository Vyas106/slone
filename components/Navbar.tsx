"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = ({ hero = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Styling Products", href: "/styling-products" },
    { name: "Hair Tools", href: "/hair-tools" },
    { name: "Hair Accessories", href: "/hair-accessories" },
    { name: "Kits", href: "/kits" },
    { name: "Stores", href: "/stores" },
    { name: "Hair Stories", href: "/hair-stories" },
  ];

  const isTransparent = hero && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        isTransparent 
          ? "bg-transparent border-transparent py-8" 
          : "bg-white/90 backdrop-blur-xl border-black/5 py-4"
      }`}
    >
      <div className="container-standard flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
           <div className="w-8 h-8 bg-black text-white flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <span className="font-black text-lg italic select-none">S</span>
           </div>
          <span className="text-2xl font-black tracking-tighter text-black select-none">SLONE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:text-accent whitespace-nowrap ${
                pathname === link.href ? "text-accent" : "text-black/60"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <Link
            href="/book-now"
            className="px-10 py-4 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all hover:bg-accent hover:scale-105 shadow-xl shadow-black/10 rounded-full"
          >
            Book Now
          </Link>
          
          <button className="xl:hidden p-2 text-black hover:text-accent transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
