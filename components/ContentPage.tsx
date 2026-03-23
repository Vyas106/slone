import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContentPage({ title, description, items }: { title: string, description: string, items: any[] }) {
  return (
    <div className="min-h-screen bg-white text-black translate-z-0">
      <Navbar />
      
      <main className="pt-40 lg:pt-56">
        <div className="container-standard">
          <header className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
                <div className="flex-1">
                   <div className="flex items-center gap-4 mb-8">
                      <span className="w-12 h-[1px] bg-accent" />
                      <span className="text-accent font-black text-[10px] tracking-[0.5em] uppercase italic">Series.01 / Archive</span>
                   </div>
                   <h1 className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.85] max-w-4xl">
                      {title} <br />
                      <span className="text-black/5 decoration-accent underline underline-offset-8">Archive.</span>
                   </h1>
                </div>
                <div className="lg:max-w-sm lg:pt-16">
                   <p className="text-black/40 font-bold leading-relaxed uppercase text-[10px] md:text-[12px] tracking-[0.2em]">
                      {description}
                   </p>
                   <div className="mt-12 flex gap-6 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                         <span className="text-xs font-black group-hover:translate-y-1 transition-transform">↓</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] self-center">Explore Collection</span>
                   </div>
                </div>
             </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32 mb-40">
              {items.map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                      <div className="aspect-[3/4] bg-[#f8f8f8] border border-black/5 overflow-hidden relative mb-10 rounded-[2rem]">
                          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)]" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                              <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] border-b-2 border-white/20 pb-2">View Asset</span>
                          </div>
                      </div>
                      <div className="px-4 border-l-2 border-black/5 group-hover:border-accent transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/50 block mb-3 italic">{item.category}</span>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-black leading-tight mb-4 group-hover:text-accent transition-colors">{item.name}</h3>
                        <p className="text-sm font-black text-black/20 tracking-widest">{item.price}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
