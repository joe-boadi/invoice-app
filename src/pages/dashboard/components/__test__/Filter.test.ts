import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Filter from '../Filter';

// Mock the Dropdown component
vi.mock('../../../../components/button/Dropdown', () => ({
  default: React.forwardRef(({ options, label, searchParam, }: {
    options: Array<{ label: string; value: string }>;
    label: string;
    searchParam: string;
    smallScreenIcon: React.ReactNode;
  }, ) => 
    React.createElement('div', { 
      'data-testid': 'dropdown',
      'data-options': JSON.stringify(options),
      'data-label': label,
      'data-search-param': searchParam,
    }, 'Dropdown Component')
  )
}));

// Mock heroicons
vi.mock('@heroicons/react/24/solid', () => ({
  FunnelIcon: ({ width }: { width: number }) => 
    React.createElement('div', { 
      'data-testid': 'funnel-icon',
      'data-width': width 
    })
}));

describe('Filter Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders successfully', () => {
    const { container } = render(React.createElement(Filter));
    expect(container).toBeTruthy();
  });

  it('renders the Dropdown component with correct props', () => {
    render(React.createElement(Filter));
    const dropdown = screen.getByTestId('dropdown');

    // Check if dropdown exists
    expect(dropdown).toBeDefined();

    // Verify the props passed to Dropdown
    const options = JSON.parse(dropdown.getAttribute('data-options') || '[]');
    expect(options).toEqual([
      { label: 'Draft', value: 'draft' },
      { label: 'Pending', value: 'pending' },
      { label: 'Paid', value: 'paid' }
    ]);

    expect(dropdown.getAttribute('data-label')).toBe('Filter by status');
    expect(dropdown.getAttribute('data-search-param')).toBe('filter');
  });

  it('maintains correct component structure', () => {
    const { container } = render(React.createElement(Filter));
    
    // Check if the component is wrapped in a div
    expect(container.firstElementChild?.tagName).toBe('DIV');
    
    // Check if Dropdown is direct child of the wrapper div
    expect(container.firstElementChild?.firstElementChild?.getAttribute('data-testid')).toBe('dropdown');
  });

  // Test for correct filter options
  it('provides correct filter options', () => {
    render(React.createElement(Filter));
    const dropdown = screen.getByTestId('dropdown');
    const options = JSON.parse(dropdown.getAttribute('data-options') || '[]');

    expect(options).toHaveLength(3);
    expect(options).toContainEqual({ label: 'Draft', value: 'draft' });
    expect(options).toContainEqual({ label: 'Pending', value: 'pending' });
    expect(options).toContainEqual({ label: 'Paid', value: 'paid' });
  });
});