"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  { id: 1, name: "Multi-Styler", category: "Styling Tool", price: "$599.99", image: "/ui-assets/slone_multistyler_product_1774251709398.png" },
  { id: 2, name: "Hair Dryer", category: "Engineered to dry", price: "$429.99", image: "/ui-assets/slone_hairdryer_product_1774251734895.png" },
  { id: 3, name: "Travel Bag", category: "Storage & Accessories", price: "$50.00", image: "/ui-assets/slone_products_grid_1774251180772.png" },
];

const categories = [
  { title: "Great Hair Smooth", label: "For silky, sleek finishes", img: "/ui-assets/slone_smooth_hair_box_1774251774708.png" },
  { title: "Great Hair Waved", label: "For bouncy, textured waves", img: "/ui-assets/slone_about_portrait_1774251162203.png" },
  { title: "Great Hair Curly", label: "For defined, healthy curls", img: "/ui-assets/slone_stylist_expert_1774251216631.png" },
  { title: "Great Hair Tools", label: "Professional grade gear", img: "/ui-assets/slone_hero_tool_1774251140173.png" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-accent selection:text-white">
      <Navbar hero />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#f5f5f7] overflow-hidden pt-20">
        <div className="container-standard w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="z-10 order-2 lg:order-1">
            <h1 className="text-6xl md:text-[5rem] xl:text-[7.5rem] font-black uppercase tracking-tighter mb-8 leading-[0.85]">
              Air Sense <br /> <span className="text-accent italic">Technology.</span>
            </h1>
            <p className="text-black/40 text-[10px] md:text-sm font-bold max-w-sm mb-12 tracking-[0.1em] leading-relaxed uppercase">
              Precisely engineered for salon-grade performance, without the extreme heat damage.
            </p>
            <button className="group relative px-12 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:pr-16 rounded-full">
              <span className="relative z-10">Shop Technology</span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">→</span>
            </button>
          </div>
          <div className="relative aspect-square order-1 lg:order-2 flex items-center justify-center">
            <div className="absolute inset-0 bg-accent/5 rounded-full blur-[120px]" />
            <div className="relative w-full h-full group">
              <Image
                src="/ui-assets/slone_hero_tool_1774251140173.png"
                alt="Slone Hair Tool"
                fill
                className="object-contain scale-110 group-hover:scale-115 transition-all duration-[2s] ease-out drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 text-[10vw] font-black opacity-[0.02] select-none pointer-events-none italic uppercase">SLONE</div>
      </section>

      {/* Great Hair Made Easy */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-standard grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl group">
            <Image src="/ui-assets/slone_about_portrait_1774251162203.png" alt="Styling" fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" />
            <div className="absolute inset-x-8 bottom-8 p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <span className="text-white text-[10px] font-black tracking-widest uppercase mb-2 block">Premium Craft</span>
              <p className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">The Modern Standard of Hair Education.</p>
            </div>
          </div>
          <div className="">
            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-10 leading-none">Great Hair <br /> Made Easy.</h2>
            <p className="text-base font-bold leading-relaxed text-black/40 max-w-md mb-12 uppercase tracking-wide">
              We've distilled decades of professional experience into tools that are intuitive, powerful, and gentle. Experience salon results in your hands.
            </p>
            <div className="flex gap-12">
              <Link href="#" className="flex flex-col gap-2 group">
                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-accent transition-colors">Our Story</span>
                <div className="h-0.5 w-12 bg-black group-hover:w-full group-hover:bg-accent transition-all duration-500" />
              </Link>
              <Link href="#" className="flex flex-col gap-2 group">
                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-accent transition-colors">The Process</span>
                <div className="h-0.5 w-12 bg-black/10 group-hover:w-full group-hover:bg-accent transition-all duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Collections */}
      <section className="section-padding bg-[#fafafa]">
        <div className="container-standard grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="group relative aspect-[14/15] overflow-hidden bg-white rounded-3xl shadow-sm border border-black/5 cursor-pointer">
              <Image src={cat.img} alt={cat.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-accent text-[9px] font-bold tracking-[0.3em] uppercase mb-2 group-hover:translate-x-1 transition-transform">Collection {i + 1}</span>
                <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-6 group-hover:-translate-y-1 transition-transform">{cat.title}</h3>
                <button className="w-full py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-xl">Shop Collection</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight */}
      <section className="section-padding bg-white">
        <div className="container-standard flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
            <div>
              <span className="text-accent text-[10px] font-black tracking-[0.4em] uppercase mb-4 block italic">Recommended for you</span>
              <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-8 leading-none italic-none">Spotlight.</h2>
              <div className="flex flex-wrap gap-10">
                {["All Gear", "Brushes", "Storage", "Kits"].map((tab, i) => (
                  <button key={tab} className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all pb-1 ${i === 0 ? "text-black border-b-2 border-accent" : "text-black/30 hover:text-black border-b-2 border-transparent"}`}>{tab}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-6 border border-black/5 bg-[#f5f5f7] rounded-full hover:bg-black hover:text-white transition-all shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
              <button className="p-6 border border-black/5 bg-[#f5f5f7] rounded-full hover:bg-black hover:text-white transition-all shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-square bg-[#f8f8f8] flex items-center justify-center p-16 overflow-hidden rounded-[2.5rem] mb-10 group-hover:bg-[#f3f3f3] transition-colors duration-500 border border-black/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-16 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                </div>
                <div className="flex justify-between items-start px-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent/60 mb-2 block italic">{product.category}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">{product.name}</h3>
                  </div>
                  <span className="text-lg font-black text-black/80">{product.price}</span>
                </div>
                <button className="mt-10 w-full py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all rounded-2xl hover:bg-accent hover:scale-[1.02] shadow-xl">Add To Cart</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kits Section */}
      <section className="section-padding bg-[#eeeff1]">
        <div className="container-standard grid grid-cols-1 lg:grid-cols-5 items-center gap-16 lg:gap-32">
          <div className="lg:col-span-2">
            <span className="text-accent text-xs font-black tracking-widest mb-6 block uppercase italic">Bundle & Save</span>
            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">Save with our <br /> Greatest Kits.</h2>
            <p className="text-sm text-black/50 font-bold mb-12 max-w-sm uppercase leading-relaxed tracking-wider">Curated sets designed for specific textures and desired outcomes. Efficiency meets luxury.</p>
            <button className="group relative px-16 py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full overflow-hidden shadow-2xl">
              <span className="relative z-10">Shop All Kits</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
          <div className="lg:col-span-3 relative aspect-[4/3] bg-white rounded-[4rem] overflow-hidden p-16 flex items-center justify-center shadow-2xl border border-white">
            <Image src="/ui-assets/slone_hairset_kit_1774251754031.png" alt="Kits" fill className="object-contain p-20 scale-125" />
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="section-padding bg-white">
        <div className="container-standard text-center">
          <span className="text-accent text-[10px] font-black tracking-widest mb-6 block uppercase italic">Community Gallery</span>
          <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-16 italic-none">Great Hair Stories.</h2>
          
          <div className="flex justify-center gap-10 overflow-x-auto pb-16 scrollbar-hide px-4 mb-16">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col items-center gap-6 shrink-0 transition-all hover:scale-110">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent to-blue-300 p-0.5 shadow-xl">
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative">
                    <Image src={`/ui-assets/slone_stylist_expert_1774251216631.png`} alt="User" fill className="object-cover" />
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">@client_{i}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[3/4] relative overflow-hidden group rounded-3xl shadow-sm">
                <Image src={`/ui-assets/slone_about_portrait_1774251162203.png`} alt="Style" fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 gap-8 backdrop-blur-sm">
                  <p className="text-white text-[11px] font-black tracking-widest uppercase">The Sleek Routine</p>
                  <button className="px-8 py-4 bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all rounded-full">View Product</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className="section-padding bg-[#000] text-white">
        <div className="container-standard grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-32 items-center">
          <div className="lg:col-span-3 aspect-[16/10] relative overflow-hidden rounded-[3rem] group border border-white/5 shadow-2xl">
            <Image src="/ui-assets/slone_salon_interior_1774251198985.png" alt="Salon" fill className="object-cover group-hover:scale-110 transition-transform duration-[4s]" />
            <div className="absolute top-12 left-12 p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl">
              <span className="block text-accent text-[10px] font-black tracking-widest uppercase mb-2 italic">Visit Us</span>
              <p className="text-3xl font-black uppercase tracking-tight">Los Angeles Flagship</p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-6xl lg:text-[7rem] font-black uppercase tracking-tighter mb-10 leading-[0.85]">Our Spaces.</h2>
            <p className="text-lg font-bold leading-relaxed text-white/30 mb-12 max-sm uppercase tracking-wide">
              Physical sanctuaries designed for transformation. Experience personalized consultations and technical mastery.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {["DOWNTOWN LA", "SOHO NEW YORK", "WEST LONDON"].map((loc) => (
                <Link href="/book-now" key={loc} className="group p-10 bg-white/5 border border-white/10 rounded-[2rem] flex justify-between items-center hover:bg-accent hover:border-accent transition-all cursor-pointer">
                  <span className="text-base font-black uppercase tracking-[0.2em]">{loc}</span>
                  <svg className="w-6 h-6 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="section-padding bg-white">
        <div className="container-standard">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24 border-b border-black/5 pb-16">
            <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter italic-none">Experts.</h2>
            <button className="text-[10px] font-black uppercase tracking-[0.4em] bg-black text-white px-12 py-5 rounded-full hover:bg-accent transition-all shadow-2xl hover:scale-105 italic">View All Masters</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] relative overflow-hidden rounded-[3rem] mb-10 bg-[#f5f5f7] shadow-sm border border-black/5 overflow-hidden">
                  <Image src="/ui-assets/slone_stylist_expert_1774251216631.png" alt="Stylist" fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-x-8 bottom-8 p-8 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-2xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <Link href="/book-now" className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl text-center block rounded-xl hover:bg-accent hover:text-white transition-all">
                      Book Now
                    </Link>
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">ELENA RIVERA</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent italic">Creative Director</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[150px]" />
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-10 italic leading-[0.9]">Join our <br /> Newsletter.</h2>
                <p className="text-sm font-bold uppercase tracking-[0.4em] text-white/30 mb-16 max-w-sm italic">Access to limited technical drops and styling secrets from our master network.</p>
                <form className="max-w-xl flex gap-x-2 p-2 bg-white/5 border border-white/10 rounded-full focus-within:border-accent group transition-all items-center">
                  <input
                    type="email"
                    placeholder="YOUR@IDENTITY.COM"
                    className="flex-1 bg-transparent px-8 py-4 text-[11px] font-black uppercase tracking-[0.5em] outline-none placeholder:text-white/20"
                  />
                  <button className="px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-accent hover:text-white transition-all shadow-xl shrink-0">Enroll</button>
                </form>
              </div>

              <div className="pt-20 mt-20 border-t border-white/10 flex gap-24">
                <div className="flex flex-col gap-3">
                  <span className="text-5xl font-black italic">14k+</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Active Stylists</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-5xl font-black italic">50+</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Global Studios</span>
                </div>
              </div>
            </div>

            <div className="space-y-16">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { num: "01", label: "FREE SHIPPING", icon: "📦" },
                  { num: "02", label: "30-DAY TRIALS", icon: "🔃" },
                  { num: "03", label: "SALON SUPPORT", icon: "🏢" },
                  { num: "04", label: "PRO PROGRAM", icon: "✨" }
                ].map((item) => (
                  <div key={item.num} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] group hover:border-accent transition-all cursor-pointer">
                    <span className="text-accent text-xs font-black italic block mb-6">{item.num} /</span>
                    <div className="text-4xl mb-4 group-hover:scale-125 transition-transform block origin-left">{item.icon}</div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] italic">{item.label}</h4>
                  </div>
                ))}
              </div>

              <div className="p-10 border-2 border-accent/20 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-10 bg-accent/5 backdrop-blur-3xl">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-accent italic">Next technical drop in</span>
                <div className="flex gap-8 text-4xl font-black italic">
                  <div className="flex flex-col items-center"><span>12</span><span className="text-[8px] italic-none opacity-30 uppercase tracking-widest mt-2">Hrs</span></div>
                  <span className="opacity-20">:</span>
                  <div className="flex flex-col items-center"><span>45</span><span className="text-[8px] italic-none opacity-30 uppercase tracking-widest mt-2">Min</span></div>
                  <span className="opacity-20">:</span>
                  <div className="flex flex-col items-center"><span>30</span><span className="text-[8px] italic-none opacity-30 uppercase tracking-widest mt-2">Sec</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
