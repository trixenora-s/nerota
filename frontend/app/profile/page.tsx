'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200 text-center">
            <h1 className="text-4xl font-semibold text-slate-900">Sign in to view your profile</h1>
            <p className="mt-4 text-slate-600">Your personal information, saved addresses, and account history are available after login.</p>
            <Link href="/login" className="mt-8 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Your Profile</h1>
          <p className="mt-4 text-slate-600">All account details below are synced from your authenticated session.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
              <p className="mt-4 text-slate-700">Name: {session.user?.name ?? 'N/A'}</p>
              <p className="mt-2 text-slate-700">Email: {session.user?.email ?? 'N/A'}</p>
              {session.user?.image && (
                <img alt="Profile" src={session.user.image} className="mt-4 h-24 w-24 rounded-3xl object-cover" />
              )}
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Account Sync</h2>
              <p className="mt-4 text-slate-700">Your orders, wishlist, notifications, and saved addresses will appear as soon as they are available from your linked account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
