"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { useCart } from "@/context/cartcontext";
import { ArrowLeft, Star, ShoppingCart, Plus, Minus } from "lucide-react";
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

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );
        if (!response.ok) throw new Error("Product not found");
        const result: Product = await response.json();
        setProduct(result);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen mt-20 max-w-7xl mx-auto px-6 py-6">
        <div className="animate-pulse flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-gray-200 rounded-lg h-96" />
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gray-200 h-8 rounded w-3/4" />
            <div className="bg-gray-200 h-6 rounded w-1/4" />
            <div className="bg-gray-200 h-4 rounded w-full" />
            <div className="bg-gray-200 h-4 rounded w-full" />
            <div className="bg-gray-200 h-12 rounded w-full mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 mt-16">
        <p className="text-label-md text-red-500">{error ?? "Product not found"}</p>
        <Link href="/" className="px-6 py-3 bg-primary text-content rounded-md text-label-sm">
          Go Back Home
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      });
    }
  }

  return (
    <div className="min-h-screen mt-20 max-w-7xl mx-auto px-6 py-6">

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        <span className="text-label-sm">Back to Products</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <div className="w-full h-80 bg-content rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
            <Image
              src={product.images[selectedImage] ?? product.thumbnail}
              alt={product.title}
              width={500}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </button>
              ))}
            </div>
          )}
        </div>


        <div className="flex-1 flex flex-col gap-4">


          <span className="text-label-sm text-primary bg-sidebar px-3 py-1 rounded-full w-fit capitalize">
            {product.category}
          </span>


          <h1 className="text-headline-md">{product.title}</h1>


          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 fill-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-label-sm text-text-secondary">
              {product.rating} / 5
            </span>
          </div>

          <p className="text-2xl font-bold text-text-primary">${product.price}</p>

  
          <p className="text-body-md text-text-secondary leading-relaxed">
            {product.description}
          </p>

          <p className="text-label-sm text-text-secondary">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ In stock ({product.stock} left)</span>
            ) : (
              <span className="text-red-500">Out of stock</span>
            )}
          </p>

  
          <div className="flex items-center gap-3">
            <span className="text-label-md">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="text-label-md w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

 
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full lg:w-fit px-8 py-3 bg-primary text-content rounded-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}