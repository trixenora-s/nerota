'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200 text-center">
            <h1 className="text-4xl font-semibold text-slate-900">You are already logged in</h1>
            <p className="mt-4 text-slate-600">Your account is already connected. Visit your profile or continue browsing services.</p>
            <Link href="/profile" className="mt-8 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Login</h1>
          <p className="mt-4 text-slate-600">Sign in with Google or with your phone number to sync your account and orders.</p>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => signIn('google')}
              className="w-full rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow border border-slate-200 hover:bg-slate-50 transition"
            >
              Continue with Google
            </button>
            <button
              onClick={() => signIn('email')}
              className="w-full rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
            >
              Continue with Phone / Email
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            New here? <Link href="/signup" className="font-semibold text-purple-600 hover:text-purple-800">Create an account</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
