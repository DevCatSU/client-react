import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { BrowserRouter } from "react-router-dom";

describe('ProductList Unit Test', () => {
  it('renders table headers correctly', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Price (€)')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders "Add New product" button', () => {
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    expect(screen.getByText('Add New product')).toBeInTheDocument();
  });
});
