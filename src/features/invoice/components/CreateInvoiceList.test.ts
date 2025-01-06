import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CreateInvoiceList from '../CreateInvoiceList';

// Mock react-responsive
vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn().mockReturnValue(true)
}));

// Mock utilities
vi.mock('../../../utilities/formatCurrencies', () => ({
  default: vi.fn().mockReturnValue('£1,800.00')
}));

vi.mock('../../../utilities/formatDate', () => ({
  formatToDateString: vi.fn().mockReturnValue('19 Aug 2023')
}));

vi.mock('../../../utilities/getTotal', () => ({
  default: vi.fn().mockReturnValue(1800)
}));

vi.mock('../../../utilities/extractPrices', () => ({
  default: vi.fn().mockReturnValue([800, 1000])
}));

// Mock sample invoice data
const mockInvoice = {
  id: 'RT3080',
  paymentDue: '2023-08-19',
  clientName: 'Jensen Huang',
  status: 'paid',
  items: [
    { price: 800, quantity: 1 },
    { price: 1000, quantity: 1 }
  ]
};

// Wrapper component for Router context
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('CreateInvoiceList', () => {
  it('renders invoice details correctly', () => {
    render(<CreateInvoiceList invoice={mockInvoice} />, { wrapper });

    // Check if all main elements are rendered
    expect(screen.getByText('#RT3080')).toBeInTheDocument();
    expect(screen.getByText('Jensen Huang')).toBeInTheDocument();
    expect(screen.getByText('£1,800.00')).toBeInTheDocument();
    expect(screen.getByText('Due 19 Aug 2023')).toBeInTheDocument();
  });

  it('creates correct link to invoice details', () => {
    render(<CreateInvoiceList invoice={mockInvoice} />, { wrapper });
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/invoice/RT3080');
  });

  it('displays status component', () => {
    render(<CreateInvoiceList invoice={mockInvoice} />, { wrapper });
    
    // Assuming Status component renders a div with status text
    const statusElement = screen.getByText('paid', { exact: false });
    expect(statusElement).toBeInTheDocument();
  });

  it('shows arrow icon on wide screens', () => {
    render(<CreateInvoiceList invoice={mockInvoice} />, { wrapper });
    
    const arrowImage = screen.getByAltText('arrow right');
    expect(arrowImage).toBeInTheDocument();
  });
});