/**
 * Utility to generate CSS variables from design tokens
 * This can be used to auto-generate CSS custom properties
 */

import { colors, semanticColors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import { borderRadius } from '../tokens/border-radius';
import { shadows } from '../tokens/shadows';

export function generateColorVariables(): string {
  const cssVars: string[] = [];

  // Generate color variables
  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      cssVars.push(`  --color-${colorName}-${shade}: ${value};`);
    });
  });

  // Generate semantic color variables
  Object.entries(semanticColors).forEach(([category, colors]) => {
    Object.entries(colors).forEach(([name, value]) => {
      cssVars.push(`  --color-${category}-${name}: ${value};`);
    });
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

export function generateTypographyVariables(): string {
  const cssVars: string[] = [];

  // Font families
  cssVars.push(`  --font-family-sans: ${typography.fontFamily.sans.map(f => `"${f}"`).join(', ')};`);
  cssVars.push(`  --font-family-mono: ${typography.fontFamily.mono.map(f => `"${f}"`).join(', ')};`);

  // Font sizes
  Object.entries(typography.fontSize).forEach(([size, value]) => {
    cssVars.push(`  --font-size-${size}: ${value};`);
  });

  // Font weights
  Object.entries(typography.fontWeight).forEach(([weight, value]) => {
    cssVars.push(`  --font-weight-${weight}: ${value};`);
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

export function generateSpacingVariables(): string {
  const cssVars: string[] = [];

  Object.entries(spacing).forEach(([space, value]) => {
    cssVars.push(`  --spacing-${space}: ${value};`);
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

export function generateBorderRadiusVariables(): string {
  const cssVars: string[] = [];

  Object.entries(borderRadius).forEach(([radius, value]) => {
    cssVars.push(`  --border-radius-${radius}: ${value};`);
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

export function generateShadowVariables(): string {
  const cssVars: string[] = [];

  Object.entries(shadows).forEach(([shadow, value]) => {
    if (typeof value === 'string') {
      cssVars.push(`  --shadow-${shadow}: ${value};`);
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subShadow, subValue]) => {
        cssVars.push(`  --shadow-${shadow}-${subShadow}: ${subValue};`);
      });
    }
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

export function generateAllVariables(): string {
  return [
    generateColorVariables(),
    generateTypographyVariables(),
    generateSpacingVariables(),
    generateBorderRadiusVariables(),
    generateShadowVariables(),
  ].join('\n\n');
}

// Utility to write to file (for build process)
export async function writeCssVariablesToFile(filepath: string): Promise<void> {
  const { writeFile } = await import('node:fs/promises');
  const css = generateAllVariables();
  await writeFile(filepath, css);
}
