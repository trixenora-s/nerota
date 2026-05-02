import Link from 'next/link';
import { motion } from 'framer-motion';
import { eventCategories, getFeaturedCategories } from '@/lib/content';

export default function Home() {
  const featured = getFeaturedCategories();

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 pt-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-28 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.95fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] bg-gradient-to-br from-violet-900 via-purple-700 to-pink-600 p-10 text-white shadow-2xl shadow-purple-500/10"
          >
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
              Premium Event Design
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Decoration & event planning for celebrations that feel alive.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Expert planning, stunning décor, and an experience-driven booking flow that truly reflects the way modern customers shop for events.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/events/wedding"
                className="inline-flex items-center justify-center rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-violet-900 shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5"
              >
                Explore Wedding Packages
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                View the Gallery
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {featured.map((category, index) => (
              <Link
                key={category.slug}
                href={`/events/${category.slug}`}
                className="group overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{category.title}</p>
                    <h2 className="mt-4 text-xl font-semibold text-slate-900">{category.highlight}</h2>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-purple-50 text-purple-700">
                    <span className="text-lg">{index + 1}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-500">{category.description}</p>
              </Link>
            ))}
          </motion.div>
        </div>

        <section className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-purple-600">Event categories</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Browse by celebration type</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Each category opens a dedicated experience with tailored packages, pricing visibility, and product-level shopping.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eventCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/events/${category.slug}`}
                className="rounded-3xl border border-slate-200 p-6 text-left transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
              >
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">{category.title}</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{category.highlight}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
