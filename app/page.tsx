"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Play, Check, Zap, Shield, Sparkles } from "lucide-react";

const products = [
  { id: 1, name: "AirSense Multi-Styler", category: "Technical Tool", price: "₹49,999", image: "/ui-assets/slone_multistyler_product_1774251709398.png", badge: "Flagship" },
  { id: 2, name: "TurboDry Precision", category: "Engineered Dry", price: "₹35,999", image: "/ui-assets/slone_hairdryer_product_1774251734895.png", badge: "Best Seller" },
  { id: 3, name: "Tech-Satin Travel Case", category: "Engineering", price: "₹12,499", image: "/ui-assets/slone_products_grid_1774251180772.png", badge: "New" },
];

const categories = [
  { title: "Technical Smooth", label: "For silk-engineered finishes", img: "/ui-assets/slone_smooth_hair_box_1774251774708.png" },
  { title: "Sculpted Waves", label: "Architecture for texture", img: "/ui-assets/slone_about_portrait_1774251162203.png" },
  { title: "Curvature Formula", label: "Bio-defined curl patterns", img: "/ui-assets/slone_stylist_expert_1774251216631.png" },
  { title: "Master Gear", label: "Artisan-grade hardware", img: "/ui-assets/slone_hero_tool_1774251140173.png" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-500 selection:text-white">
      <Navbar hero />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center bg-muted/30 overflow-hidden pt-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="container-standard w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="z-10 order-2 lg:order-1">
             <Badge variant="outline" className="mb-6 px-4 py-1.5 border-accent text-accent font-medium tracking-normal tracking-normal  rounded-full">
                Series.01 / Evolution
             </Badge>
            <h1 className="text-5xl md:text-[5.5rem] xl:text-[8rem] font-medium tracking-normal tracking-tight mb-8 leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
              Air Sense <br /> <span className="text-accent ">Engineering.</span>
            </h1>
            <p className="text-muted-foreground text-[11px] md:text-sm font-bold max-w-sm mb-12 tracking-normal leading-relaxed tracking-normal opacity-80">
              Redefining precision styling with zero-heat-damage architecture. Built for the modern artisan.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
               <Button size="lg" className="w-full sm:w-auto rounded-full px-12 py-8 text-[11px] font-medium tracking-normal tracking-normal shadow-2xl" render={<Link href="/hair-tools" />} nativeButton={false}>
                  Explore Technology
               </Button>
               <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-12 py-8 text-[11px] font-medium tracking-normal tracking-normal border-2 group">
                  <Play className="fill-current mr-3 size-4 -translate-y-0.5" />
                  Technical Film
               </Button>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <AspectRatio ratio={1} className="flex items-center justify-center p-12">
               <Image
                 src="/ui-assets/slone_hero_tool_1774251140173.png"
                 alt="Slone Hair Tool"
                 fill
                 className="object-contain scale-125 hover:rotate-6 transition-all duration-[2s] ease-out drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)] drop-shadow-[0_10px_10px_var(--accent)]"
                 priority
               />
            </AspectRatio>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 text-[12vw] font-medium opacity-[0.03] select-none pointer-events-none  tracking-normal leading-none">SLONE.</div>
      </section>

      {/* About Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-standard grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-40 items-center">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="p-0 mb-12">
               <span className="text-accent font-medium text-[10px] tracking-normal tracking-normal  mb-6 block">Artisan Mastery</span>
               <h2 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-medium tracking-normal tracking-tight leading-none mb-8">Great Hair <br /> Engineered.</h2>
               <CardDescription className="text-base font-bold leading-relaxed text-muted-foreground max-w-md tracking-normal tracking-wide">
                  At ONE HAIR SLONE, we believe beauty is a technical discipline. Our tools are the bridge between engineering precision and individual expression.
               </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex gap-8">
               <Button variant="link" className="p-0 text-[11px] font-medium tracking-normal tracking-normal text-foreground hover:text-accent decoration-2" render={<Link href="/hair-stories" />} nativeButton={false}>
                  Our Thesis
               </Button>
               <Button variant="link" className="p-0 text-[11px] font-medium tracking-normal tracking-normal text-foreground hover:text-accent decoration-2" render={<Link href="/stores" />} nativeButton={false}>
                  The Studios
               </Button>
            </CardContent>
          </Card>
          
          <div className="relative">
            <AspectRatio ratio={4/5} className="overflow-hidden rounded-[4rem] group shadow-2xl">
               <Image src="/ui-assets/slone_about_portrait_1774251162203.png" alt="Styling" fill className="object-cover group-hover:scale-110 transition-transform duration-[3s]" />
               <div className="absolute inset-x-8 bottom-8 p-10 bg-background/20 backdrop-blur-3xl border border-white/20 rounded-3xl">
                  <span className="text-white text-[10px] font-medium tracking-normal tracking-normal mb-2 block opacity-60">Session.001</span>
                  <p className="text-white text-2xl font-medium tracking-normal tracking-tight">Technical Mastery of Texture.</p>
               </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Grid Collections */}
      <section className="section-padding bg-muted/40">
        <div className="container-standard">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium tracking-normal tracking-tight ">Collections.</h2>
              <Button variant="premium" size="sm" className="w-full md:w-auto rounded-full px-8 text-[9px] font-medium tracking-normal tracking-normal" render={<Link href="/hair-tools" />} nativeButton={false}>View All</Button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
             {categories.map((cat, i) => (
               <Card key={i} className="group relative aspect-[14/15] overflow-hidden border-none rounded-[3rem] shadow-xl hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
                 <Image src={cat.img} alt={cat.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                 <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <Badge className="w-max bg-accent text-[9px] font-bold tracking-normal tracking-normal mb-4 py-1.5 px-4">0{i + 1}</Badge>
                   <h3 className="text-white text-3xl font-medium tracking-normal tracking-tight mb-8">{cat.title}</h3>
                   <Button variant="premium" className="w-full h-14 rounded-2xl text-[9px] font-medium tracking-normal tracking-normal translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Shop Archive</Button>
                 </div>
               </Card>
             ))}
           </div>
        </div>
      </section>

      {/* Spotlight Carousel */}
      <section className="section-padding bg-background">
        <div className="container-standard">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-24">
            <div>
              <span className="text-accent text-[11px] font-medium tracking-normal tracking-normal mb-6 block ">Hardware spotlight</span>
              <h2 className="text-4xl md:text-5xl lg:text-[7rem] font-medium tracking-normal tracking-tight  leading-none">Engineering.</h2>
            </div>
            <div className="flex gap-4">
               {/* Controls integrated into UI if needed, or use carousel buttons */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-square bg-muted/30 rounded-[4rem] border border-border group-hover:bg-muted/50 transition-colors duration-700 overflow-hidden mb-12 flex items-center justify-center p-12">
                   <Badge className="absolute top-10 left-10 py-1.5 px-6 rounded-full bg-foreground text-background text-[10px] font-medium tracking-normal tracking-normal opacity-0 group-hover:opacity-100 transition-all transform -translate-y-2 group-hover:translate-y-0 ">{product.badge}</Badge>
                   <Image
                     src={product.image}
                     alt={product.name}
                     fill
                     className="object-contain p-16 group-hover:scale-115 group-hover:rotate-3 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-2xl"
                   />
                   <Button variant="premium" size="icon" className="absolute bottom-10 right-10 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
                      <Zap className="size-6 fill-current" />
                   </Button>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-2">
                    <span className="text-[11px] font-medium tracking-normal tracking-normal text-accent/50 ">{product.category}</span>
                    <h3 className="text-3xl font-medium tracking-normal tracking-tight group-hover:text-accent transition-colors leading-none">{product.name}</h3>
                  </div>
                  <span className="text-2xl font-medium tracking-tight">{product.price}</span>
                </div>
                <Button className="mt-12 w-full py-8 text-[11px] font-medium tracking-normal tracking-normal rounded-[2rem] shadow-xl hover:scale-[1.02] transition-transform" render={<Link href="/hair-tools" />} nativeButton={false}>Inventory Drop</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Kits */}
      <section className="section-padding bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-accent/20 blur-[150px] -translate-y-1/2 opacity-20" />
        <div className="container-standard grid grid-cols-1 lg:grid-cols-5 items-center gap-16 md:gap-24 lg:gap-40">
          <div className="lg:col-span-2 relative z-10">
            <span className="text-accent text-xs font-medium tracking-normal mb-8 block tracking-normal ">System Bundles</span>
            <h2 className="text-5xl md:text-6xl lg:text-[6.5rem] font-medium tracking-normal tracking-tight mb-10 leading-[0.85]">Technical <br /> Solutions.</h2>
            <p className="text-lg text-background/40 font-bold mb-14 max-w-sm tracking-normal leading-relaxed tracking-wider -none">
               Curated technical sequences designed for specific architectural outcomes. Engineering for beauty.
            </p>
            <div className="space-y-6 mb-16">
               {[
                  { icon: Zap, text: "AirSense Digital Control" },
                  { icon: Shield, text: "Ultra-Zero Heat Protection" },
                  { icon: Sparkles, text: " Artisan Signature Finish" }
               ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <item.icon className="size-5 text-white" />
                     </div>
                     <span className="text-[10px] font-medium tracking-normal tracking-normal">{item.text}</span>
                  </div>
               ))}
            </div>
            <Button variant="premium" size="lg" className="rounded-full px-16 h-16 text-[11px] font-medium tracking-normal tracking-normal border-background border-2 hover:bg-background hover:text-foreground" render={<Link href="/kits" />} nativeButton={false}>
               Archive All Kits
            </Button>
          </div>
          <div className="lg:col-span-3 relative">
            <AspectRatio ratio={4/3} className="bg-muted-foreground/10 rounded-[5rem] overflow-hidden p-20 flex items-center justify-center border border-white/5 backdrop-blur-3xl group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
               <Image src="/ui-assets/slone_hairset_kit_1774251754031.png" alt="Kits" fill className="object-contain p-20 scale-125 group-hover:scale-150 transition-all duration-[3s] ease-out drop-shadow-[0_50px_50px_rgba(0,0,0,0.4)]" />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Community / Stories */}
      <section className="section-padding bg-background">
        <div className="container-standard">
          <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
             <span className="text-accent text-[11px] font-medium tracking-normal tracking-normal mb-8 block ">社區 network</span>
             <h2 className="text-4xl md:text-5xl lg:text-[8rem] font-medium tracking-normal tracking-tight  leading-none mb-12">One Hair Community.</h2>
             <p className="text-muted-foreground text-[11px] font-medium tracking-normal tracking-normal opacity-40">Witness the evolution of community-led technical transformations.</p>
          </div>
          
          <Carousel className="w-full max-w-7xl mx-auto mb-20 px-12">
             <CarouselContent>
               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                 <CarouselItem key={i} className="basis-1/3 md:basis-1/4 lg:basis-1/6 flex flex-col items-center gap-8">
                   <Avatar className="w-32 h-32 border-4 border-muted hover:border-accent transition-all cursor-pointer shadow-xl">
                     <AvatarImage src={`/ui-assets/slone_stylist_expert_1774251216631.png`} />
                     <AvatarFallback>U{i}</AvatarFallback>
                   </Avatar>
                   <span className="text-[10px] font-medium tracking-normal tracking-normal opacity-30 ">Network.ID_{i}</span>
                 </CarouselItem>
               ))}
             </CarouselContent>
             <CarouselPrevious className="hidden md:flex -left-12 bg-foreground text-background" />
             <CarouselNext className="hidden md:flex -right-12 bg-foreground text-background" />
          </Carousel>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
               <Card key={i} className="group relative aspect-[3/4] overflow-hidden rounded-[3rem] border-none shadow-2xl hover:scale-[1.02] transition-all duration-500">
                 <Image src={`/ui-assets/slone_about_portrait_1774251162203.png`} alt="Style" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
                 <div className="absolute inset-x-6 bottom-6 p-6 bg-background/20 backdrop-blur-2xl border border-white/10 rounded-3xl opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-700">
                    <p className="text-white text-[10px] font-medium tracking-normal tracking-normal mb-4">Geometric Smooth</p>
                    <Button variant="premium" className="w-full h-10 rounded-xl text-[9px] font-medium tracking-normal tracking-normal">View Routine</Button>
                 </div>
               </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className="section-padding bg-foreground text-background overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[80%] h-full bg-accent/5 blur-[120px]" />
        <div className="container-standard grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-40 items-center">
          <div className="lg:col-span-3">
             <AspectRatio ratio={16/10} className="relative overflow-hidden rounded-[4rem] group border border-white/5 shadow-2xl">
                <Image src="/ui-assets/slone_salon_interior_1774251198985.png" alt="Salon" fill className="object-cover group-hover:scale-110 transition-transform duration-[4s]" />
                <div className="absolute top-12 left-12 p-12 bg-background/10 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl">
                  <span className="block text-accent text-[11px] font-medium tracking-normal tracking-normal mb-4 ">Sanctuary</span>
                  <p className="text-4xl md:text-5xl font-medium tracking-normal tracking-tight">One Hair Flagship.</p>
                </div>
             </AspectRatio>
          </div>
          <div className="lg:col-span-2 relative z-10">
            <h2 className="text-5xl md:text-6xl lg:text-[8rem] xl:text-[9rem] font-medium tracking-normal tracking-tight mb-12 leading-[0.8] -none">Spaces.</h2>
            <p className="text-lg font-bold leading-relaxed text-background/40 mb-16 max-w-sm tracking-normal tracking-normal ">
               Physical laboratories designed for precision. Experience technical mastery, firsthand.
            </p>
            <div className="flex flex-col gap-6">
              {["BANDRA, MUMBAI", "DEFENCE COLONY, DELHI", "KORAMANGALA, BLR"].map((loc) => (
                <Link key={loc} href="/book-now" className="flex items-center justify-between h-24 px-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-all duration-500 group cursor-pointer">
                   <span className="text-lg font-medium tracking-wide text-white/90 group-hover:text-white transition-colors">{loc}</span>
                   <ArrowRight className="size-6 text-white/40 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-white transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-background text-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[150px]" />
        <div className="container-standard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-[8rem] font-medium tracking-normal tracking-tight mb-12  leading-[0.8]">Network.</h2>
                <p className="text-sm font-bold tracking-normal tracking-normal text-muted-foreground mb-12 md:mb-20 max-w-sm  opacity-60">Join the technical distribution network for exclusive artisan drops.</p>
                <form className="max-w-xl flex flex-col sm:flex-row gap-y-4 gap-x-2 p-2 bg-muted/50 border border-border rounded-2xl md:rounded-full focus-within:border-accent group transition-all items-center shadow-inner">
                  <Input
                    type="email"
                    placeholder="YOUR@IDENTITY.COM"
                    className="flex-1 w-full bg-transparent border-none px-4 sm:px-8 h-12 md:h-14 text-[11px] font-medium tracking-normal tracking-normal outline-none shadow-none focus-visible:ring-0"
                  />
                  <Button className="w-full sm:w-auto rounded-xl md:rounded-full h-12 md:h-14 px-8 md:px-12 text-[10px] font-medium tracking-normal tracking-normal">Register</Button>
                </form>
              </div>

              <div className="pt-16 md:pt-24 mt-16 md:mt-24 border-t border-border flex gap-12 md:gap-24">
                <div className="flex flex-col gap-4">
                  <span className="text-6xl font-medium  tracking-tight leading-none">14k+</span>
                  <span className="text-[11px] font-medium tracking-normal tracking-normal text-muted-foreground opacity-40 ">Global Artisans</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-6xl font-medium  tracking-tight leading-none">50+</span>
                  <span className="text-[11px] font-medium tracking-normal tracking-normal text-muted-foreground opacity-40 ">Flagship Studios</span>
                </div>
              </div>
            </div>

            <div className="space-y-12 md:space-y-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                {[
                  { label: "FREE SHIPPING", icon: Zap },
                  { label: "30-DAY TRIALS", icon: Shield },
                  { label: "SALON SUPPORT", icon: Sparkles },
                  { label: "PRO PROGRAM", icon: Zap }
                ].map((item, i) => (
                  <Card key={i} className="p-12 bg-muted/40 border-border rounded-[3rem] group hover:bg-accent hover:border-accent transition-all cursor-pointer shadow-lg overflow-hidden relative">
                    <span className="text-accent group-hover:text-white text-xs font-medium  block mb-8 opacity-40">Drop.0{i + 1} /</span>
                    <item.icon className="size-12 mb-6 group-hover:scale-125 group-hover:text-white transition-transform block origin-left text-accent" />
                    <h4 className="text-[11px] font-medium tracking-normal tracking-normal  group-hover:text-white transition-colors">{item.label}</h4>
                    <div className="absolute -bottom-8 -right-8 size-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                  </Card>
                ))}
              </div>

              <Card className="p-8 md:p-12 border-2 border-accent/20 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 bg-accent/5 backdrop-blur-3xl shadow-[0_0_50px_rgba(var(--accent),0.1)] text-center md:text-left">
                <div className="space-y-3">
                   <Badge className="bg-accent text-[9px] font-medium tracking-normal tracking-normal py-1 px-4 ">Countdown</Badge>
                   <span className="text-[11px] font-medium tracking-normal tracking-normal text-accent  block">Mechanical drop in</span>
                </div>
                <div className="flex gap-6 sm:gap-10 text-4xl sm:text-5xl lg:text-6xl font-medium  tracking-tight">
                  <div className="flex flex-col items-center"><span>12</span><span className="text-[10px] -none opacity-30 tracking-normal tracking-normal mt-3">Hrs</span></div>
                  <span className="opacity-20 translate-y-2">:</span>
                  <div className="flex flex-col items-center"><span>45</span><span className="text-[10px] -none opacity-30 tracking-normal tracking-normal mt-3">Min</span></div>
                  <span className="opacity-20 translate-y-2">:</span>
                  <div className="flex flex-col items-center"><span>30</span><span className="text-[10px] -none opacity-30 tracking-normal tracking-normal mt-3">Sec</span></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
