import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProduct from '../components/EditProduct';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('axios');

describe('EditProduct', () => {
  it('should load product data and show form', async () => {
    const product = {
      id: 1,
      name: 'iPhone',
      description: 'Latest iPhone',
      price: 999,
      available: true
    };
    axios.get.mockResolvedValueOnce({ data: product });

    render(
      <MemoryRouter initialEntries={['/edit-product/1']}>
        <Routes>
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('iPhone')).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue('Latest iPhone')).toBeInTheDocument();
    expect(screen.getByDisplayValue('999')).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const product = {
      id: 1,
      name: 'iPhone',
      description: 'Latest iPhone',
      price: 999,
      available: true
    };
    axios.get.mockResolvedValueOnce({ data: product });
    axios.patch.mockResolvedValueOnce({});

    render(
      <MemoryRouter initialEntries={['/edit-product/1']}>
        <Routes>
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('iPhone')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByDisplayValue('iPhone'), {
      target: { value: 'New iPhone' }
    });
    fireEvent.change(screen.getByDisplayValue('Latest iPhone'), {
      target: { value: 'Updated description' }
    });
    fireEvent.change(screen.getByDisplayValue('999'), {
      target: { value: '1099' }
    });

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() =>
      expect(axios.patch).toHaveBeenCalledWith(
        'http://localhost:4000/products/1',
        {
          product: {
            name: 'New iPhone',
            description: 'Updated description',
            price: 1099,
            available: true
          }
        }
      )
    );
  });
});
