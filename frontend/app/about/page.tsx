export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">About CelebDecor</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            We design and deliver polished event décor, planning, and ordering experiences for every celebration. Every package is built to feel premium and professional.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Expert Planning</h2>
              <p className="mt-3 text-slate-600">Systems, workflows, and décor packages designed to align with the exact standards of modern event commerce.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Transparent Experience</h2>
              <p className="mt-3 text-slate-600">Users only see real synced account data, actual order history, and true ratings when available.</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Beautiful Execution</h2>
              <p className="mt-3 text-slate-600">Our focus is on polished visuals, clear workflows, and meaningful customer journeys.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
