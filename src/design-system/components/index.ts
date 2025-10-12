/**
 * Design System - Components
 * UI components built on top of primitives
 */

// Form components
export * from './input';
export * from './select';
export * from './label';
export * from './textarea';

// Layout components
export * from '../primitives/box';
export * from '../primitives/text';
export * from '../primitives/stack';
export * from '../primitives/spacer';

// App components
export * from './app-header';

// Re-export UI components (updated)
export { Button, buttonVariants } from '../../components/ui/button';
export { Badge, badgeVariants } from '../../components/ui/badge';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../../components/ui/card';
export { Separator } from '../../components/ui/separator';
