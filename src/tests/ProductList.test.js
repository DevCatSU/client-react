import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ProductList', () => {
  it('should render a list of products', async () => {
    const products = [
      { id: 1, name: 'iPhone', description: 'Latest iPhone', price: 999, available: true },
      { id: 2, name: 'Galaxy S21', description: 'Samsung phone', price: 799, available: false },
    ];
    axios.get.mockResolvedValueOnce({ data: products });

    renderWithRouter(<ProductList />);

    await waitFor(() => screen.getByText('iPhone'));
    expect(screen.getByText('iPhone')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S21')).toBeInTheDocument();
  });

  it('should handle product deletion', async () => {
    const products = [
      { id: 1, name: 'iPhone', description: 'Latest iPhone', price: 999, available: true },
    ];
    axios.get.mockResolvedValueOnce({ data: products });
    axios.delete.mockResolvedValueOnce({});

    renderWithRouter(<ProductList />);

    await waitFor(() => screen.getByText('iPhone'));
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(screen.queryByText('iPhone')).toBeNull();
    });
  });
});
