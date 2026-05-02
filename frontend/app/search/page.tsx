'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchCategories } from '@/lib/content';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchCategories(query) : [];

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Search results</h1>
          <p className="mt-4 text-slate-600">Search results for <span className="font-semibold text-slate-900">{query}</span>.</p>

          {!query ? (
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-medium text-slate-900">No search query submitted.</p>
              <p className="mt-3 text-slate-600">Enter text in the header search field to find matching event categories.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-900">No matches found.</p>
              <p className="mt-3 text-slate-600">Try searching for another event type or keyword.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((category) => (
                <Link
                  key={category.slug}
                  href={`/events/${category.slug}`}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-purple-200"
                >
                  <h2 className="text-xl font-semibold text-slate-900">{category.title}</h2>
                  <p className="mt-3 text-slate-600">{category.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
