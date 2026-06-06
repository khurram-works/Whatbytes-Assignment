"use client";

import { useCart } from "@/context/cartcontext";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBasket, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-secondary mt-16">
        <ShoppingBasket size={64} className="opacity-30" />
        <p className="text-headline-md text-text-primary">Your cart is empty</p>
        <p className="text-label-sm">Add some products to get started</p>
        <Link
          href="/"
          className="mt-4 px-6 py-3 bg-primary text-content rounded-md text-label-sm hover:bg-primary/90 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/"
          className="text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-headline-md">Your Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 flex flex-col gap-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-content rounded-lg p-4 flex items-center gap-4 shadow-sm"
            >
              <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-product-title truncate">{item.title}</p>
                <p className="text-price mt-1">${item.price}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-label-md w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <p className="text-price w-16 text-right flex-shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-text-secondary hover:text-red-500 transition-colors flex-shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 flex-shrink-0 bg-content rounded-lg p-5 shadow-sm sticky top-24 self-start">
          <h2 className="text-section-title mb-4">Order Summary</h2>

          <div className="flex flex-col gap-3 border-b border-border pb-4 mb-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-label-sm text-text-secondary"
              >
                <span className="truncate flex-1 mr-2">
                  {item.title} × {item.quantity}
                </span>
                <span className="flex-shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-label-md font-bold mb-6">
            <span>Total</span>
            <span className="text-price">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full py-3 bg-primary text-content rounded-md text-label-sm font-bold hover:bg-primary/90 active:scale-95 transition-all">
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full mt-3 py-2 border border-border rounded-md text-label-sm text-text-secondary hover:bg-gray-50 transition-all"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
