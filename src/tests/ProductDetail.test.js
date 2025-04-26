import { render, screen, waitFor } from '@testing-library/react';
import ProductDetail from '../components/ProductDetail';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('axios');

describe('ProductDetail', () => {
  it('should show product details', async () => {
    const product = { id: 1, name: 'iPhone', description: 'Latest iPhone', price: 999, available: true };
    axios.get.mockResolvedValueOnce({ data: product });

    render(
      <MemoryRouter initialEntries={['/product-detail/1']}>
        <Routes>
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('iPhone'));

    expect(screen.getByText('iPhone')).toBeInTheDocument();
    expect(screen.getByText('Latest iPhone')).toBeInTheDocument();
    expect(screen.getByText('999 Euro')).toBeInTheDocument();
  });
});
