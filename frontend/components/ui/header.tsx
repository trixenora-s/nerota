'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Search, ShoppingCart, User, Bell, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { eventCategories } from '../../lib/content';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();
  const { cart } = useStore();
  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 supports-[backdrop-filter:blur()]:bg-white/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🎉</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              CelebDecor
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, themes, decorations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            
            <div className="relative group">
              <span className="px-3 py-2 text-sm font-medium text-gray-700 group-hover:text-gray-900 cursor-pointer transition-colors flex items-center gap-1">
                Events
              </span>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                <div className="p-4 space-y-1">
                  {eventCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/events/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all duration-200"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/gallery" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {session ? (
              <>
                <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm font-medium">{session.user?.name}</span>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2"
                      >
                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1 transition-colors">
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                        <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1 transition-colors">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Orders
                        </Link>
                        <Link href="/wishlist" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1 transition-colors">
                          <Heart className="w-4 h-4 mr-2" />
                          Wishlist
                        </Link>
                        <Link href="/notifications" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1 transition-colors">
                          <Bell className="w-4 h-4 mr-2" />
                          Notifications
                        </Link>
                        <Link href="/saved-addresses" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-1 transition-colors">
                          📍 Addresses
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg mx-1 transition-colors"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;