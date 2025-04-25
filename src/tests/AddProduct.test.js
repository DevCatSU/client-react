// src/components/__tests__/AddProduct.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import AddProduct from '../components/AddProduct';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

describe('AddProduct', () => {
  it('should render form fields', () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Name/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Price/)).toBeInTheDocument();
  });

  it('should show error messages for invalid inputs', async () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Price/), { target: { value: '' } });

    fireEvent.click(screen.getByText(/Add Product/));

    expect(await screen.findByText('*Product name is required.')).toBeInTheDocument();
    expect(await screen.findByText('*Description is required.')).toBeInTheDocument();
    expect(await screen.findByText('*Price is required.')).toBeInTheDocument();
  });

  it('should submit the form and add a product', async () => {
    const newProduct = {
      name: 'New iPhone',
      description: 'Latest iPhone',
      price: 999,
      available: true
    };

    axios.post.mockResolvedValueOnce({ data: newProduct });

    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/), { target: { value: 'New iPhone' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/), { target: { value: 'Latest iPhone' } });
    fireEvent.change(screen.getByPlaceholderText(/Price/), { target: { value: '999' } });
    fireEvent.click(screen.getByText(/Add Product/));

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:4000/products',
      {
        product: {
          name: 'New iPhone',
          description: 'Latest iPhone',
          price: 999,
          available: true
        }
      }
    );
  });
});
