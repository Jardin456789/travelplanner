'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '../hooks/use-theme';

interface DesignSystemProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
}

export function DesignSystemProvider({
  children,
  defaultTheme = 'system'
}: DesignSystemProviderProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      {children}
    </ThemeProvider>
  );
}
