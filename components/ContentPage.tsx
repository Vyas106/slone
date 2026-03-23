import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveDown } from "lucide-react";

export default function ContentPage({ title, description, items }: { title: string, description: string, items: any[] }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <Navbar />
      
      <main className="pt-40 lg:pt-56">
        <div className="container-standard">
          <header className="mb-40">
             <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32">
                <div className="flex-1">
                   <div className="flex items-center gap-6 mb-10">
                      <div className="w-16 h-[2px] bg-accent" />
                      <Badge variant="outline" className="border-accent text-accent font-medium text-[10px] tracking-normal tracking-normal  px-4 py-1.5 rounded-full">Series.01 / Collection</Badge>
                   </div>
                   <h1 className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-normal tracking-tight leading-[0.8] max-w-5xl">
                      {title} <br />
                      <span className="text-accent  decoration-foreground/10 underline underline-offset-[1.5rem]">Archive.</span>
                   </h1>
                </div>
                <div className="lg:max-w-md lg:pt-20">
                   <p className="text-muted-foreground font-bold leading-relaxed tracking-normal text-[11px] md:text-[13px] tracking-normal opacity-80 mb-16">
                      {description}
                   </p>
                   <Button variant="outline" className="group rounded-full h-16 px-10 text-[11px] font-medium tracking-normal tracking-normal border-2">
                       <MoveDown className="mr-4 size-5 group-hover:translate-y-2 transition-transform" />
                       Browse Index
                   </Button>
                </div>
             </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32 mb-56">
              {items.map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                      <div className="relative mb-10">
                        <AspectRatio ratio={3/4} className="bg-muted overflow-hidden rounded-[3rem] border border-border shadow-2xl group-hover:shadow-accent/20 transition-all duration-700">
                            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] z-10" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-200 z-20">
                                <span className="text-white text-[11px] font-medium tracking-normal tracking-normal border-b-2 border-white/40 pb-2">View Asset</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center group-hover:scale-125 transition-transform duration-[2s]">
                               {item.image && (
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                               )}
                            </div>
                        </AspectRatio>
                        <Badge className="absolute top-6 left-6 z-30 bg-background text-foreground text-[8px] font-medium tracking-normal tracking-normal opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">0{idx + 1}</Badge>
                      </div>
                      <div className="px-6 border-l-4 border-border group-hover:border-accent transition-colors py-2">
                        <span className="text-[10px] font-medium tracking-normal tracking-normal text-accent/60 block mb-4 ">{item.category}</span>
                        <h3 className="text-3xl font-medium tracking-normal tracking-tight text-foreground leading-none mb-6 group-hover:text-accent transition-colors">{item.name}</h3>
                        <p className="text-base font-medium text-muted-foreground tracking-normal">{item.price}</p>
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
