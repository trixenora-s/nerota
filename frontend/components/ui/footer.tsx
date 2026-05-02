export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="font-semibold text-slate-900">CelebDecor</span>
          <span>Professional décor and event planning for every celebration.</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-500">
          <a href="/about" className="hover:text-slate-900">
            About
          </a>
          <a href="/contact" className="hover:text-slate-900">
            Contact
          </a>
          <a href="/privacy" className="hover:text-slate-900">
            Privacy
          </a>
          <span>Designed for seamless booking and real account sync.</span>
        </div>
      </div>
    </footer>
  );
}
