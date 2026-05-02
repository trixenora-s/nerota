'use client';

import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import type { Product } from '@/lib/content';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const addToWishlist = useStore((state) => state.addToWishlist);

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-purple-600">{product.badge}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{product.title}</h3>
        </div>
        <button
          onClick={() => addToWishlist(product.id)}
          className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-pink-300 hover:text-pink-600"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <p className="text-sm text-slate-500">{product.description}</p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-medium text-slate-900">{product.duration}</span>
          <span>•</span>
          <span>{product.event}</span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-slate-900">₹{product.price.toLocaleString()}</p>
          {product.rating ? (
            <p className="mt-1 text-sm text-slate-500">Rating: {product.rating.toFixed(1)} / 5</p>
          ) : (
            <p className="mt-1 text-sm text-slate-500">No ratings yet</p>
          )}
        </div>
        <button
          onClick={() => addToCart({ productId: product.id, title: product.title, price: product.price, image: '', quantity: 1 })}
          className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/10 hover:opacity-95 transition"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
