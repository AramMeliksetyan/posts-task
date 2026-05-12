import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test("renders navigation", () => {
  render(<App />);
  expect(
    screen.getByRole("navigation", { name: "Main navigation" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Open menu" })
  ).toBeInTheDocument();
});
