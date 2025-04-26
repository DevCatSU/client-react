import { render, screen } from "@testing-library/react";
import EditProduct from "../components/EditProduct";
import { MemoryRouter } from "react-router-dom";

describe('EditProduct Unit Test', () => {
  it('renders Update and Cancel buttons', () => {
    render(
      <MemoryRouter>
        <EditProduct />
      </MemoryRouter>
    );

    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(
      <MemoryRouter>
        <EditProduct />
      </MemoryRouter>
    );

    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });
});
