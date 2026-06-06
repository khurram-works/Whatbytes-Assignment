"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PackageSearch, ShoppingCart } from "lucide-react";
import { Star } from "lucide-react";
import { useCart } from "@/context/cartcontext";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
}

interface DummyJSONResponse {
  products: Product[];
}

interface ProductsListProps {
  selectedCategory: string;
  maxPrice: number;
  searchQuery: string;
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse bg-content rounded-lg p-3 flex flex-col gap-3">
      <div className="bg-gray-200 h-36 rounded-md" />
      <div className="bg-gray-200 h-3 rounded w-3/4" />
      <div className="bg-gray-200 h-3 rounded w-1/4" />
      <div className="bg-gray-200 h-9 rounded-lg" />
    </div>
  );
}

const categoryMap: Record<string, string[]> = {
  Electronics: ["smartphones", "laptops", "mobile-accessories", "tablets"],
  Clothing: [
    "mens-shirts",
    "womens-dresses",
    "mens-shoes",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
  ],
  Home: ["furniture", "home-decoration", "kitchen-accessories", "groceries"],
};

export default function ProductsList({
  selectedCategory,
  maxPrice,
  searchQuery,
}: ProductsListProps) {
  const { addToCart } = useCart();
  const [data, setData] = useState<DummyJSONResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=20");
        if (!response.ok) throw new Error("Failed to fetch products");
        const result: DummyJSONResponse = await response.json();
        setData(result);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts =
    data?.products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" ||
        (categoryMap[selectedCategory]?.includes(product.category) ?? false);

      const priceMatch = product.price <= maxPrice;

      const searchMatch =
        searchQuery.trim() === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    }) ?? [];

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-5">
        <div className="bg-gray-200 animate-pulse h-8 w-48 rounded" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-96 gap-3">
        <p className="text-label-md text-red-500">Failed to load products</p>
        <p className="text-label-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 min-h-screen">
      <h1 className="text-headline-md hidden lg:block">Product Listing</h1>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-96 gap-3 text-text-secondary">
          <PackageSearch size={48} className="opacity-40" />
          <p className="text-label-md">No products found</p>
          <p className="text-label-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full rounded-lg bg-content text-text-primary shadow-sm p-3 flex flex-col gap-2 hover:shadow-md transition-shadow duration-200"
            >
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="w-full h-36 flex items-center justify-center rounded-md bg-gray-50 overflow-hidden"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={144}
                  className="h-36 w-full object-contain"
                />
              </Link>

              <h3 className="text-product-title line-clamp-2">
                {product.title}
              </h3>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className={
                      star <= Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 fill-gray-200"
                    }
                  />
                ))}
                <span className="text-caption ml-1">{product.rating}</span>
              </div>

              <p className="text-price">${product.price}</p>

              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                  })
                }
                className="w-full flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-primary/90 cursor-pointer text-content text-label-sm bg-primary active:scale-95 transition-all duration-100"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
