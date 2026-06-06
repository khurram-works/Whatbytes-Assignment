"use client";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "./filterSidebar";
import ProductsList from "./productslist";

interface MainSectionProps {
  searchQuery: string;
}

export default function MainSection({ searchQuery }: MainSectionProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <div className="mt-20 w-full max-w-7xl mx-auto px-6 py-6">

      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h1 className="text-headline-md">Product Listing</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-content text-label-sm"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex gap-6 items-start">
        <FilterSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
        />

        <ProductsList
          selectedCategory={selectedCategory}
          maxPrice={maxPrice}
          searchQuery={searchQuery} 
        />
      </div>
    </div>
  );
}