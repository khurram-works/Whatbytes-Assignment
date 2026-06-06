"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import FilterSidebar from "./filterSidebar";
import ProductsList from "./productslist";


function MainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  const selectedCategory = searchParams.get("category") ?? "All";
  const maxPrice = Number(searchParams.get("maxPrice") ?? 1000);
  const searchQuery = searchParams.get("search") ?? "";

  
  function handleCategoryChange(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");       
    } else {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`);
  }

  function handlePriceChange(price: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (price === 1000) {
      params.delete("maxPrice");        
    } else {
      params.set("maxPrice", String(price));
    }
    router.push(`?${params.toString()}`);
  }

  function handleSearchChange(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", query);
    }
    router.push(`?${params.toString()}`);
  }

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
          onCategoryChange={handleCategoryChange}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
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


export default function MainSection() {
  return (
    <Suspense fallback={<div className="mt-20 px-6 py-6">Loading...</div>}>
      <MainContent />
    </Suspense>
  );
}