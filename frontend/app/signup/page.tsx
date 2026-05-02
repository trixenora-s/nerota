'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

export default function SignupPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200 text-center">
            <h1 className="text-4xl font-semibold text-slate-900">Welcome back</h1>
            <p className="mt-4 text-slate-600">You are already logged in. Manage your profile or continue browsing.</p>
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
          <h1 className="text-4xl font-semibold text-slate-900">Create an account</h1>
          <p className="mt-4 text-slate-600">Register with Google or your phone number to save orders, addresses, and notifications.</p>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => signIn('google')}
              className="w-full rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow border border-slate-200 hover:bg-slate-50 transition"
            >
              Sign up with Google
            </button>
            <button
              onClick={() => signIn('email')}
              className="w-full rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
            >
              Sign up with Phone / Email
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account? <Link href="/login" className="font-semibold text-purple-600 hover:text-purple-800">Login here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
