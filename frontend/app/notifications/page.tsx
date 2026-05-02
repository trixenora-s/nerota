'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function NotificationsPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Notifications</h1>
          <p className="mt-4 text-slate-600">Important updates, event reminders, and service announcements are synced here.</p>

          {!session ? (
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-medium text-slate-900">Sign in to see your notifications.</p>
              <Link href="/login" className="mt-6 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
                Login to continue
              </Link>
            </div>
          ) : (
            <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-900">No new notifications.</p>
              <p className="mt-3 text-slate-600">When there are updates, they will appear here with real account data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
