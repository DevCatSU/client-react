import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Product Management header', () => {
  render(<App />);
  const heading = screen.getByText(/Product Management/i);
  expect(heading).toBeInTheDocument();
});