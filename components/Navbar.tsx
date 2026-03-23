"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react"; // I'll assume standard lucide icons are used if shadcn was added

const Navbar = ({ hero = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Styling Products", href: "/styling-products", desc: "Discover our premium formulas" },
    { name: "Hair Tools", href: "/hair-tools", desc: "Engineered for elite performance" },
    { name: "Hair Accessories", href: "/hair-accessories", desc: "The perfect finishing touch" },
    { name: "Kits", href: "/kits", desc: "Bundle and save" },
    { name: "Stores", href: "/stores", desc: "Visit our flagship studios" },
    { name: "Hair Stories", href: "/hair-stories", desc: "Community transformations" },
  ];

  const isTransparent = hero && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${isTransparent
        ? "bg-transparent border-transparent py-8"
        : "bg-background/80 backdrop-blur-xl border-border py-4"
        }`}
    >
      <div className="container-standard flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-transform duration-500 rounded-sm">
            <span className="font-medium text-lg  select-none">S</span>
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-foreground select-none">STYLORIA.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[10px] font-medium tracking-normal tracking-normal">Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink
                          render={<Link href={link.href} />}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-[10px] font-medium tracking-normal tracking-normal">{link.name}</div>
                          <p className="line-clamp-2 text-[10px] leading-snug text-muted-foreground tracking-normal opacity-60">
                            {link.desc}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/book-now" />}
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-[10px] font-medium tracking-normal tracking-normal`}
                >
                  Studio
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="premium" className="hidden sm:flex rounded-full px-10 h-12 text-[10px] font-medium tracking-normal tracking-normal overflow-hidden group shadow-2xl relative" render={<Link href="/book-now" />} nativeButton={false}>
            <span className="relative z-10">Make Appointment</span>
            <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-accent transition-all duration-300 -z-1" />
          </Button>

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="xl:hidden" />} nativeButton={true}>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-l border-border">
              <SheetHeader>
                <SheetTitle className="text-2xl font-medium tracking-tight  tracking-normal text-left">Navigation</SheetTitle>
                <SheetDescription className="text-left text-[10px] font-medium tracking-normal tracking-normal opacity-40">Series.01 / Explore</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-medium tracking-normal tracking-tight hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-8 border-t border-border mt-8">
                  <Button className="w-full rounded-full py-8 text-[11px] font-medium tracking-normal tracking-normal" render={<Link href="/book-now" />} nativeButton={false}>
                    Book Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
