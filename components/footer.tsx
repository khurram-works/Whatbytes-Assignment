// import { Instagram, Twitter, Facebook } from "lucide-react";
import {X} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-footer w-full px-12 py-8 text-content flex flex-col gap-6">
      <div className="w-full flex flex-col md:flex-row gap-8 md:justify-between">

        <div className="flex flex-col gap-3">
          <h3 className="text-section-title">Filters</h3> 
          <span className="text-label-sm text-content/70">All</span>
          <span className="text-label-sm text-content/70">Electronics</span>
          <span className="text-label-sm text-content/70">Clothing</span>
          <span className="text-label-sm text-content/70">Home</span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-section-title">About Us</h3>
          <span className="text-label-sm text-content/70">About Us</span>
          <span className="text-label-sm text-content/70">Contact</span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-section-title">Follow Us</h3>
          <div className="flex gap-3">
            {/* <Facebook size={20} className="text-content/70 hover:text-content cursor-pointer transition-colors" />
            <Twitter size={20} className="text-content/70 hover:text-content cursor-pointer transition-colors" />
            <Instagram size={20} className="text-content/70 hover:text-content cursor-pointer transition-colors" /> */}
            <X size={20} className="text-content/70 hover:text-content cursor-pointer transition-colors" />
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 pt-4 text-label-sm text-content/50">
        © 2024 American. All rights reserved.
      </div>
    </footer>
  );
}