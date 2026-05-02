'use client';

import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Your Cart</h1>
          <p className="mt-4 text-slate-600">Review selected services and proceed when you are ready.</p>

          {cart.length === 0 ? (
            <div className="mt-12 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-medium text-slate-900">Your cart is empty.</p>
              <p className="mt-3 text-slate-600">Select a service package from any event category to get started.</p>
              <Link href="/" className="mt-6 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700">
                Continue browsing
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {cart.map((item) => (
                <div key={item.productId} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xl font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                        className="rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        className="rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-lg font-semibold text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Order total</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">₹{total.toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => clearCart()}
                    className="rounded-3xl border border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Clear Cart
                  </button>
                  <Link href="/checkout" className="rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
