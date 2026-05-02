export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
          <h1 className="text-4xl font-semibold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Connect with our event planning team to build your custom décor package and secure availability.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Reach us directly</h2>
              <p className="text-slate-600">Phone: +91 98765 43210</p>
              <p className="text-slate-600">Email: hello@celebrdecor.com</p>
              <p className="text-slate-600">Office hours: Mon – Sat, 10 AM – 7 PM</p>
            </div>
            <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Request a premium consultation</h2>
              <p className="text-slate-600">Share your event details and we will propose a tailored planning and décor solution.</p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <textarea
                  placeholder="Tell us about your event"
                  className="h-36 w-full rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                />
                <button className="w-full rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition">
                  Submit request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
