'use client';

import { useSession } from 'next-auth/react';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function WishlistPage() {
  const { data: session } = useSession();
  const { wishlist } = useStore();

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Wishlist</h1>
          <p className="mt-4 text-slate-600">Saved packages appear here once your account is connected.</p>

          {!session ? (
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-medium text-slate-900">Sign in to see your wishlist.</p>
              <Link href="/login" className="mt-6 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
                Login to continue
              </Link>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-900">Your wishlist is empty.</p>
              <p className="mt-3 text-slate-600">Browse event packages and save the ones you love.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {wishlist.map((id) => (
                <div key={id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-lg font-semibold text-slate-900">Saved Item</p>
                  <p className="mt-2 text-slate-600">ID: {id}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
