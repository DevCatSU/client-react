import { render, screen } from "@testing-library/react";
import ProductDetail from "../components/ProductDetail";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

const mockProduct = {
  id: 1,
  name: "Test Product",
  description: "Test Description",
  price: 100,
  available: true,
};

describe("ProductDetail Unit Test", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockProduct });
  });

  it("renders title correctly", async () => {
    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    expect(await screen.findByText("Product Detail")).toBeInTheDocument();
  });

  it('renders "Back to Product List" button', async () => {
    render(
      <MemoryRouter>
        <ProductDetail />
      </MemoryRouter>
    );

    expect(await screen.findByText("Back to Product List")).toBeInTheDocument();
  });
});
