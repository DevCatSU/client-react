import { render, screen, fireEvent } from "@testing-library/react";
import AddProduct from "../components/AddProduct";
import { MemoryRouter } from "react-router-dom";

describe('AddProduct Unit Test', () => {
  it('renders form fields correctly', () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price')).toBeInTheDocument();
  });

  it('can fill form fields', () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'iPhone' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Latest model' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '1000' } });

    expect(screen.getByDisplayValue('iPhone')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Latest model')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
  });
});
