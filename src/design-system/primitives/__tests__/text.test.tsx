/**
 * Text Primitive Tests
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from '../text';

describe('Text', () => {
  it('renders with default props', () => {
    render(<Text>Hello World</Text>);
    const text = screen.getByText('Hello World');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('text-base');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Text size="sm">Small text</Text>);
    expect(screen.getByText('Small text')).toHaveClass('text-sm');

    rerender(<Text size="lg">Large text</Text>);
    expect(screen.getByText('Large text')).toHaveClass('text-lg');
  });

  it('renders with different weights', () => {
    const { rerender } = render(<Text weight="bold">Bold text</Text>);
    expect(screen.getByText('Bold text')).toHaveClass('font-bold');

    rerender(<Text weight="light">Light text</Text>);
    expect(screen.getByText('Light text')).toHaveClass('font-light');
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Text color="primary">Primary text</Text>);
    expect(screen.getByText('Primary text')).toHaveClass('text-primary');

    rerender(<Text color="secondary">Secondary text</Text>);
    expect(screen.getByText('Secondary text')).toHaveClass('text-secondary');
  });

  it('renders with semantic variants', () => {
    const { rerender } = render(<Text variant="h1">Heading 1</Text>);
    expect(screen.getByText('Heading 1')).toHaveClass('text-3xl', 'font-semibold');

    rerender(<Text variant="body1">Body text</Text>);
    expect(screen.getByText('Body text')).toHaveClass('text-base', 'font-normal');
  });

  it('renders with different alignments', () => {
    const { rerender } = render(<Text align="center">Centered</Text>);
    expect(screen.getByText('Centered')).toHaveClass('text-center');

    rerender(<Text align="right">Right aligned</Text>);
    expect(screen.getByText('Right aligned')).toHaveClass('text-right');
  });

  it('renders as different HTML elements', () => {
    const { rerender } = render(<Text as="span">As span</Text>);
    expect(screen.getByText('As span').tagName).toBe('SPAN');

    rerender(<Text as="div">As div</Text>);
    expect(screen.getByText('As div').tagName).toBe('DIV');

    rerender(<Text as="p">As paragraph</Text>);
    expect(screen.getByText('As paragraph').tagName).toBe('P');
  });

  it('applies truncate class when truncate is true', () => {
    render(<Text truncate>Long text that should be truncated</Text>);
    expect(screen.getByText('Long text that should be truncated')).toHaveClass('truncate');
  });

  it('combines classes correctly', () => {
    render(
      <Text
        size="lg"
        weight="bold"
        color="primary"
        align="center"
        className="custom-class"
      >
        Combined styles
      </Text>
    );
    const text = screen.getByText('Combined styles');
    expect(text).toHaveClass(
      'text-lg',
      'font-bold',
      'text-primary',
      'text-center',
      'custom-class'
    );
  });
});
