/**
 * Design System - Theme Configuration
 * CSS custom properties for light and dark themes
 */

import { colors, semanticColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { borderRadius } from './border-radius';
import { shadows } from './shadows';

// Light theme CSS variables
export const lightTheme = {
  // Background colors
  '--background': colors.neutral[50],
  '--background-secondary': colors.neutral[100],
  '--background-tertiary': colors.neutral[200],

  // Foreground colors
  '--foreground': colors.neutral[900],
  '--foreground-secondary': colors.neutral[700],
  '--foreground-tertiary': colors.neutral[600],

  // Surface colors
  '--surface-primary': colors.neutral[50],
  '--surface-secondary': colors.neutral[100],
  '--surface-tertiary': colors.neutral[200],

  // Border colors
  '--border': colors.neutral[300],
  '--border-subtle': colors.neutral[200],
  '--border-strong': colors.neutral[400],

  // Primary colors
  '--primary': colors.primary[500],
  '--primary-foreground': colors.neutral[50],
  '--primary-hover': colors.primary[600],
  '--primary-pressed': colors.primary[700],
  '--primary-disabled': colors.primary[300],
  '--primary-background': colors.primary[50],

  // Secondary colors
  '--secondary': colors.secondary[500],
  '--secondary-foreground': colors.neutral[50],
  '--secondary-hover': colors.secondary[600],
  '--secondary-pressed': colors.secondary[700],
  '--secondary-disabled': colors.secondary[300],
  '--secondary-background': colors.secondary[50],

  // Accent colors
  '--accent': colors.accent[500],
  '--accent-foreground': colors.neutral[50],
  '--accent-hover': colors.accent[600],
  '--accent-pressed': colors.accent[700],
  '--accent-disabled': colors.accent[300],
  '--accent-background': colors.accent[50],

  // Status colors
  '--success': colors.success[500],
  '--success-background': colors.success[50],
  '--success-border': colors.success[200],

  '--warning': colors.warning[500],
  '--warning-background': colors.warning[50],
  '--warning-border': colors.warning[200],

  '--error': colors.error[500],
  '--error-background': colors.error[50],
  '--error-border': colors.error[200],

  '--info': colors.info[500],
  '--info-background': colors.info[50],
  '--info-border': colors.info[200],

  // Input colors
  '--input': colors.neutral[200],
  '--input-border': colors.neutral[300],
  '--input-focus': colors.primary[500],

  // Ring colors
  '--ring': colors.primary[500],
  '--ring-offset': colors.neutral[50],

  // Shadows
  '--shadow-xs': shadows.xs,
  '--shadow-sm': shadows.sm,
  '--shadow-md': shadows.md,
  '--shadow-lg': shadows.lg,
  '--shadow-xl': shadows.xl,
  '--shadow-2xl': shadows['2xl'],

  // Focus shadows
  '--shadow-focus': '0 0 0 2px rgb(59 130 246 / 0.2)',
  '--shadow-focus-error': '0 0 0 2px rgb(239 68 68 / 0.2)',
  '--shadow-focus-success': '0 0 0 2px rgb(34 197 94 / 0.2)',

  // Typography
  '--font-sans': typography.fontFamily.sans.join(', '),
  '--font-mono': typography.fontFamily.mono.join(', '),

  // Spacing
  '--space-unit': spacing.unit,

  // Border radius
  '--radius-xs': borderRadius.xs,
  '--radius-sm': borderRadius.sm,
  '--radius-md': borderRadius.md,
  '--radius-lg': borderRadius.lg,
  '--radius-xl': borderRadius.xl,
  '--radius-2xl': borderRadius['2xl'],
  '--radius-3xl': borderRadius['3xl'],
  '--radius-full': borderRadius.full,
} as const;

// Dark theme CSS variables
export const darkTheme = {
  // Background colors
  '--background': colors.neutral[900],
  '--background-secondary': colors.neutral[800],
  '--background-tertiary': colors.neutral[700],

  // Foreground colors
  '--foreground': colors.neutral[50],
  '--foreground-secondary': colors.neutral[300],
  '--foreground-tertiary': colors.neutral[400],

  // Surface colors
  '--surface-primary': colors.neutral[900],
  '--surface-secondary': colors.neutral[800],
  '--surface-tertiary': colors.neutral[700],

  // Border colors
  '--border': colors.neutral[700],
  '--border-subtle': colors.neutral[800],
  '--border-strong': colors.neutral[600],

  // Primary colors (adjusted for dark theme)
  '--primary': colors.primary[400],
  '--primary-foreground': colors.neutral[900],
  '--primary-hover': colors.primary[300],
  '--primary-pressed': colors.primary[500],
  '--primary-disabled': colors.primary[700],
  '--primary-background': colors.primary[900],

  // Secondary colors (adjusted for dark theme)
  '--secondary': colors.secondary[400],
  '--secondary-foreground': colors.neutral[900],
  '--secondary-hover': colors.secondary[300],
  '--secondary-pressed': colors.secondary[500],
  '--secondary-disabled': colors.secondary[700],
  '--secondary-background': colors.secondary[900],

  // Accent colors (adjusted for dark theme)
  '--accent': colors.accent[400],
  '--accent-foreground': colors.neutral[900],
  '--accent-hover': colors.accent[300],
  '--accent-pressed': colors.accent[500],
  '--accent-disabled': colors.accent[700],
  '--accent-background': colors.accent[900],

  // Status colors (adjusted for dark theme)
  '--success': colors.success[400],
  '--success-background': colors.success[900],
  '--success-border': colors.success[800],

  '--warning': colors.warning[400],
  '--warning-background': colors.warning[900],
  '--warning-border': colors.warning[800],

  '--error': colors.error[400],
  '--error-background': colors.error[900],
  '--error-border': colors.error[800],

  '--info': colors.info[400],
  '--info-background': colors.info[900],
  '--info-border': colors.info[800],

  // Input colors (adjusted for dark theme)
  '--input': colors.neutral[800],
  '--input-border': colors.neutral[700],
  '--input-focus': colors.primary[400],

  // Ring colors (adjusted for dark theme)
  '--ring': colors.primary[400],
  '--ring-offset': colors.neutral[900],

  // Shadows (adjusted for dark theme - more subtle)
  '--shadow-xs': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  '--shadow-sm': '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
  '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
  '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
  '--shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
  '--shadow-2xl': '0 25px 50px -12px rgb(0 0 0 / 0.6)',

  // Focus shadows (adjusted for dark theme)
  '--shadow-focus': '0 0 0 2px rgb(59 130 246 / 0.4)',
  '--shadow-focus-error': '0 0 0 2px rgb(239 68 68 / 0.4)',
  '--shadow-focus-success': '0 0 0 2px rgb(34 197 94 / 0.4)',

  // Typography (same as light theme)
  '--font-sans': typography.fontFamily.sans.join(', '),
  '--font-mono': typography.fontFamily.mono.join(', '),

  // Spacing (same as light theme)
  '--space-unit': spacing.unit,

  // Border radius (same as light theme)
  '--radius-xs': borderRadius.xs,
  '--radius-sm': borderRadius.sm,
  '--radius-md': borderRadius.md,
  '--radius-lg': borderRadius.lg,
  '--radius-xl': borderRadius.xl,
  '--radius-2xl': borderRadius['2xl'],
  '--radius-3xl': borderRadius['3xl'],
  '--radius-full': borderRadius.full,
} as const;

// Theme type
export type ThemeConfig = Record<keyof typeof lightTheme, string>;
export type ThemeName = 'light' | 'dark';

// Get theme configuration by name
export function getThemeConfig(themeName: ThemeName): ThemeConfig {
  return themeName === 'dark' ? darkTheme : lightTheme;
}

// Apply theme to CSS variables
export function applyTheme(themeName: ThemeName): void {
  const themeConfig = getThemeConfig(themeName);
  const root = document.documentElement;

  Object.entries(themeConfig).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}
