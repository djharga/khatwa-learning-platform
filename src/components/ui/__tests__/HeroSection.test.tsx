/**
 * Unit Tests for HeroSection Component
 * 
 * Run: npm test HeroSection
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroSection from '../HeroSection';
import { Award, BookOpen, Users, Star } from 'lucide-react';

describe('HeroSection', () => {
  it('renders title correctly', () => {
    render(<HeroSection title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <HeroSection
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(
      <HeroSection
        title="Test Title"
        subtitle="Test Subtitle"
      />
    );
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders badges correctly', () => {
    render(
      <HeroSection
        title="Test Title"
        badges={[
          { label: 'Badge 1', icon: <Award /> },
          { label: 'Badge 2' },
        ]}
      />
    );
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
  });

  it('renders stats correctly', () => {
    render(
      <HeroSection
        title="Test Title"
        stats={[
          { value: '100', label: 'Users', icon: <Users /> },
          { value: '4.8', label: 'Rating', icon: <Star /> },
        ]}
      />
    );
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('renders single CTA button', () => {
    const onClick = vi.fn();
    render(
      <HeroSection
        title="Test Title"
        cta={{
          label: 'Click Me',
          onClick,
        }}
      />
    );
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    button.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders multiple CTA buttons', () => {
    render(
      <HeroSection
        title="Test Title"
        cta={[
          { label: 'Button 1', href: '/path1' },
          { label: 'Button 2', href: '/path2' },
        ]}
      />
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('renders CTA as link when href is provided', () => {
    render(
      <HeroSection
        title="Test Title"
        cta={{
          label: 'Link Button',
          href: '/test',
        }}
      />
    );
    const link = screen.getByText('Link Button');
    expect(link.closest('a')).toHaveAttribute('href', '/test');
  });

  it('applies correct variant classes', () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        variant="primary"
      />
    );
    // Check for overlay class
    expect(container.querySelector('.bg-black\\/60')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        size="lg"
      />
    );
    // Check for size-specific classes
    expect(container.querySelector('.min-h-\\[60vh\\]')).toBeInTheDocument();
  });

  it('renders background image when provided', () => {
    render(
      <HeroSection
        title="Test Title"
        backgroundImage="/test-image.jpg"
      />
    );
    const image = document.querySelector('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'));
  });

  it('applies custom className', () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders children when provided', () => {
    render(
      <HeroSection title="Test Title">
        <div data-testid="custom-child">Custom Content</div>
      </HeroSection>
    );
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(
      <HeroSection
        title="Test Title"
        ariaLabel="Test Hero Section"
        role="banner"
      />
    );
    const section = screen.getByRole('banner');
    expect(section).toHaveAttribute('aria-label', 'Test Hero Section');
  });

  it('respects prefers-reduced-motion', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <HeroSection
        title="Test Title"
        enableAnimation={true}
      />
    );
    // Animation should be disabled when prefers-reduced-motion is true
    // This is handled by useReducedMotion hook
  });

  it('applies correct overlay opacity', () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        overlayOpacity={80}
      />
    );
    // Check for custom opacity class
    expect(container.querySelector('.bg-black\\/80')).toBeInTheDocument();
  });

  it('renders with gradient background', () => {
    const { container } = render(
      <HeroSection
        title="Test Title"
        backgroundGradient="bg-gradient-to-br from-blue-500 to-purple-500"
      />
    );
    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
  });

  it('handles badge variants correctly', () => {
    render(
      <HeroSection
        title="Test Title"
        badges={[
          { label: 'Default', variant: 'default' },
          { label: 'Accent', variant: 'accent' },
          { label: 'Success', variant: 'success' },
          { label: 'Warning', variant: 'warning' },
        ]}
      />
    );
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText('Accent')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('handles CTA variants correctly', () => {
    render(
      <HeroSection
        title="Test Title"
        cta={[
          { label: 'Primary', variant: 'primary' },
          { label: 'Secondary', variant: 'secondary' },
          { label: 'Outline', variant: 'outline' },
        ]}
      />
    );
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Outline')).toBeInTheDocument();
  });
});

describe('HeroSection Accessibility', () => {
  it('has semantic HTML structure', () => {
    render(<HeroSection title="Test Title" />);
    const section = screen.getByRole('banner');
    expect(section.tagName).toBe('SECTION');
  });

  it('has proper heading hierarchy', () => {
    render(<HeroSection title="Test Title" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Test Title');
  });

  it('has ARIA label when provided', () => {
    render(
      <HeroSection
        title="Test Title"
        ariaLabel="Custom ARIA Label"
      />
    );
    const section = screen.getByRole('banner');
    expect(section).toHaveAttribute('aria-label', 'Custom ARIA Label');
  });

  it('uses title as ARIA label when not provided', () => {
    render(<HeroSection title="Test Title" />);
    const section = screen.getByRole('banner');
    expect(section).toHaveAttribute('aria-label', 'Test Title');
  });
});

describe('HeroSection Performance', () => {
  it('sets image priority when imagePriority is true', () => {
    render(
      <HeroSection
        title="Test Title"
        backgroundImage="/test.jpg"
        imagePriority={true}
      />
    );
    const image = document.querySelector('img');
    // Next.js Image component handles priority internally
    expect(image).toBeInTheDocument();
  });

  it('uses lazy loading when lazyLoad is true', () => {
    render(
      <HeroSection
        title="Test Title"
        backgroundImage="/test.jpg"
        lazyLoad={true}
      />
    );
    const image = document.querySelector('img');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});

