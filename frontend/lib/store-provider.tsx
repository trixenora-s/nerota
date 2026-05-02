'use client';

// Zustand doesn't need Provider - it's already global
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}