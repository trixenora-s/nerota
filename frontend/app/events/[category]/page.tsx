import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ui/product-card';
import { getCategoryBySlug, getProductsForCategory } from '@/lib/content';

interface EventPageProps {
  params: {
    category: string;
  };
}

export default function EventCategoryPage({ params }: EventPageProps) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const products = getProductsForCategory(params.category);

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-purple-600">{category.title}</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">{category.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{category.description}</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
