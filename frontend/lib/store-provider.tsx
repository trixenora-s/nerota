'use client';

import { useStore } from './store';
import { Provider } from 'react-redux'; // Not needed for Zustand

// Zustand doesn't need Provider - it's already global
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}