/**
 * Design System - Type Definitions
 * Global types and interfaces for the design system
 */

import { VariantProps } from 'class-variance-authority';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Common variant types
export type ComponentVariant<T extends Record<string, unknown>> = keyof T;
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Theme types
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

// Color scheme types
export type ColorScheme =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

// Spacing scale
export type SpacingScale =
  | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60
  | 64 | 72 | 80 | 96;

// Typography scale
export type TypographyScale =
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  | '7xl' | '8xl' | '9xl';

// Font weight scale
export type FontWeight =
  | 'thin' | 'extralight' | 'light' | 'normal' | 'medium'
  | 'semibold' | 'bold' | 'extrabold' | 'black';

// Border radius scale
export type BorderRadius =
  | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

// Utility types for component variants
export type ExtractVariants<T> = T extends { variants: infer V } ? V : never;
export type ExtractVariantProps<T extends (...args: unknown[]) => unknown> = VariantProps<T>;

// Common component prop patterns
export interface FormFieldProps extends BaseComponentProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

// Layout component props
export interface LayoutProps extends BaseComponentProps {
  gap?: SpacingScale;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

// Animation and transition types
export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

// Focus and accessibility types
export type FocusStyle = 'ring' | 'outline' | 'glow' | 'none';

// Export commonly used HTML element props
export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>;
export type HTMLSpanProps = React.HTMLAttributes<HTMLSpanElement>;
export type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type HTMLTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export type HTMLSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
export type HTMLLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

// Utility types for polymorphic components
export type AsProp<T extends React.ElementType> = {
  as?: T;
};

export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

export type PolymorphicComponentProp<T extends React.ElementType, Props = Record<string, never>> = {
  ref?: PolymorphicRef<T>;
} & Props;

// Forward ref utility
export type ForwardRefComponent<T, P = Record<string, never>> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

// Common event handlers
export type ChangeHandler<T = string> = (value: T) => void;
export type ClickHandler = (event: React.MouseEvent) => void;
export type FocusHandler = (event: React.FocusEvent) => void;
export type BlurHandler = (event: React.FocusEvent) => void;
