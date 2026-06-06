
"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search } from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-primary transition-all duration-200 ${scrolled ? "shadow-sm" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <span className="text-headline-md font-bold text-content">Logo</span>

     
        <div className="hidden lg:flex items-center bg-white/10 rounded-md px-4 py-2 w-72 border border-white/30 focus-within:ring-1 focus-within:ring-white/50 transition-all">
          <Search size={16} className="text-content/60 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}  
            placeholder="Search for products..."
            className="bg-transparent border-none outline-none text-body-md text-content w-full placeholder:text-content/60"
          />
        </div>

        <div className="flex items-center gap-3">
  
          <button
            className="lg:hidden text-content p-2"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </button>

  
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/30 text-content hover:bg-white/10 transition-all duration-200 active:scale-95 cursor-pointer">
            <ShoppingCart size={20} className="text-content" />
            <span className="text-content font-bold text-label-md">Cart</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="lg:hidden px-6 pb-3">
          <div className="flex items-center bg-white/10 rounded-md px-4 py-2 border border-white/20">
            <Search size={16} className="text-content/60 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)} 
              placeholder="Search for products..."
              className="bg-transparent border-none outline-none text-body-md text-content w-full placeholder:text-content/60"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
}