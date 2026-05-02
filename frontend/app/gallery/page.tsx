import Link from 'next/link';

const galleryItems = [
  'Extravagant wedding mandap décor',
  'Intimate anniversary lounge setup',
  'Bright Diwali lighting and rangoli',
  'Elegant mehendi ceremony styling',
  'Office inauguration branding',
  'Luxury proposal reveal design',
];

export default function GalleryPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Gallery</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            View a premium selection of real event décor installations and curated setups for every celebration.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div key={item} className="group overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="h-52 bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6 text-white">
                <div className="rounded-[1.75rem] bg-white/10 p-4 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                  Showcase
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">{item}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Explore examples of premium décor execution for your next event.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-sm font-semibold text-purple-600 transition hover:text-purple-800"
                >
                  Book a consultation →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
