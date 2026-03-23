import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border mt-auto">
      <div className="container-standard py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
               <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-transform duration-500 rounded-sm">
                  <span className="font-medium text-lg  tracking-tight">S</span>
               </div>
              <span className="text-xl font-medium tracking-tight tracking-normal whitespace-nowrap">ONE HAIR SLONE.</span>
            </Link>
            <p className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground leading-relaxed max-w-[200px]">
              Redefining precision styling through elite engineering and artisan craftsmanship.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-medium tracking-normal tracking-normal text-accent ">Exploration</span>
            <div className="flex flex-col gap-4">
              {["Styling Products", "Hair Tools", "Kits", "Stores", "Hair Stories"].map(item => (
                <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground hover:text-accent transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-medium tracking-normal tracking-normal text-accent ">Support</span>
            <div className="flex flex-col gap-4">
              {["Shipping", "Returns", "Terms", "Privacy", "Contact"].map(item => (
                <Link key={item} href="#" className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground hover:text-accent transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <span className="text-[10px] font-medium tracking-normal tracking-normal text-accent ">Journal</span>
            <div className="space-y-4">
              <p className="text-[10px] font-medium tracking-normal tracking-normal text-muted-foreground opacity-60">Join the technical network.</p>
              <div className="flex gap-2">
                <Input placeholder="EMAIL" className="bg-muted border-none rounded-sm h-10 text-[10px] font-medium tracking-normal px-4 focus-visible:ring-1 focus-visible:ring-accent" />
                <Button size="icon" className="h-10 w-10 bg-foreground text-background rounded-sm hover:bg-accent hover:text-white transition-all">→</Button>
              </div>
            </div>
            <div className="flex gap-6 mt-4 opacity-30">
              {["IG", "TW", "FB", "YT"].map(social => (
                <span key={social} className="text-[10px] font-medium tracking-normal cursor-pointer hover:text-accent transition-colors">{social}</span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-border opacity-50 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          <p className="text-[9px] font-medium tracking-normal tracking-normal text-muted-foreground">
            &copy; {new Date().getFullYear()} ONE HAIR SLONE. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <span className="text-[9px] font-medium tracking-normal tracking-normal  text-accent">Series.01 / Revision.04</span>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[9px] font-medium tracking-normal tracking-normal text-muted-foreground whitespace-nowrap">Operational status: GLOBAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
