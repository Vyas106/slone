import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-24 lg:py-40 bg-white border-t border-black/5">
      <div className="container-standard">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-20 mb-32">
          <div className="lg:col-span-2">
            <Link href="/" className="text-4xl font-black italic tracking-tighter mb-10 block">SLONE</Link>
            <p className="text-[10px] font-bold text-black/30 leading-relaxed max-w-xs uppercase tracking-[0.2em] mb-12">REDEFINING THE RELATIONSHIP BETWEEN TECHNOLOGY AND BEAUTY.</p>
            <div className="flex gap-4">
              {["ig", "fb", "yt", "tw", "li"].map((s) => (
                <button key={s} className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-[11px] font-black uppercase tracking-tighter hover:bg-black hover:text-white hover:border-black transition-all shadow-sm">{s}</button>
              ))}
            </div>
          </div>
          {[
            { t: "SHOP", links: ["ALL PRODUCTS", "STYLING TOOLS", "ACCESSORIES", "GIFT CARDS"] },
            { t: "SUPPORT", links: ["HELP CENTER", "SHIPPING", "RETURNS", "CONTACT"] },
            { t: "EDUCATION", links: ["TUTORIALS", "PRO PROGRAM", "STUDIOS", "CAREERS"] },
            { t: "LEGAL", links: ["PRIVACY", "TERMS", "COOKIES", "ACCESSIBILITY"] }
          ].map((col) => (
            <div key={col.t}>
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10 text-accent">{col.t}</h4>
              <ul className="flex flex-col gap-5 text-[10px] font-black uppercase tracking-widest text-black/40">
                {col.links.map(l => <li key={l} className="hover:text-black cursor-pointer transition-colors px-1">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center py-16 border-t border-black/5 gap-10">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">© 2024 SLONE INTERNATIONAL GROUP. ENGINEERED WITH PRECISION.</p>
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
            <Link href="#" className="hover:opacity-100 transition-opacity">Global Presence</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Sustainability Report</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
