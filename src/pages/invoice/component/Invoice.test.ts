import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useLoaderData } from 'react-router-dom';
import InvoiceComponent from './Invoice';
import type { FC } from 'react';

// Define types for the invoice
interface InvoiceType {
  id: string;
  // Add other invoice properties here
}

// Type for the component props if any
type InvoiceProps = Record<string, never>; // empty props object

const Invoice: FC<InvoiceProps> = InvoiceComponent;

// Mock the components
vi.mock('../../../components/button/GoBack', () => ({
  default: () => React.createElement('div', { 'data-testid': 'go-back' }, 'Go Back')
}));

vi.mock('./../component/InvoiceNav', () => ({
  default: ({ invoice }: { invoice: InvoiceType }) => 
    React.createElement('div', { 'data-testid': 'invoice-nav' }, `Invoice Nav ${invoice.id}`)
}));

vi.mock('./../component/InvoicePaper', () => ({
  default: ({ invoice }: { invoice: InvoiceType }) => 
    React.createElement('div', { 'data-testid': 'invoice-paper' }, `Invoice Paper ${invoice.id}`)
}));

// Mock the styles
vi.mock('../../../assets/styles/modules/invoice/invoicepage.module.css', () => ({
  default: {
    invoicePage: 'invoicePage',
    container: 'container'
  }
}));

// Mock useLoaderData
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn()
  };
});

/**
 * describe block for the Invoice component
 * @param {string} description - describes the component being tested for the Invoice component
 * @param { Function      } testFunction - callback function that contains the tests for the Invoice component  
 */

describe('Invoice Component', () => {
  const mockInvoice: InvoiceType = {
    id: 'INV001',
    // Add other required invoice properties here
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLoaderData).mockReturnValue({ invoice: mockInvoice });
  });

  it('renders successfully', () => {
    const { container } = render(React.createElement(Invoice));
    expect(container).toBeTruthy();
  });

  it('renders all child components', () => {
    render(React.createElement(Invoice));
    
    expect(screen.getByTestId('go-back')).toBeDefined();
    expect(screen.getByTestId('invoice-nav')).toBeDefined();
    expect(screen.getByTestId('invoice-paper')).toBeDefined();
  });

  it('passes invoice data to child components', () => {
    render(React.createElement(Invoice));
    
    expect(screen.getByTestId('invoice-nav').textContent).includes(mockInvoice.id);
    expect(screen.getByTestId('invoice-paper').textContent).includes(mockInvoice.id);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(React.createElement(Invoice));
    
    expect(container.firstElementChild?.classList.contains('invoicePage')).toBe(true);
    expect(container.firstElementChild?.firstElementChild?.classList.contains('container')).toBe(true);
  });

  it('uses loader data correctly', () => {
    render(React.createElement(Invoice));
    expect(useLoaderData).toHaveBeenCalled();
  });
});