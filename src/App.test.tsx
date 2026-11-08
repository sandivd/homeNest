import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => { localStorage.clear(); window.location.hash = '#/buy'; });

test('filters listings, saves a home, and retains it after remounting', async () => {
  const view = render(<App />);
  const search = screen.getByPlaceholderText('City, neighborhood, ZIP');
  fireEvent.change(search, { target: { value: 'Palo Alto' } });
  fireEvent.click(screen.getByRole('button', { name: /find my home/i }));
  expect(screen.getByRole('button', { name: '456 Oak Avenue' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: '123 Main Street' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Save 456 Oak Avenue' }));
  expect(JSON.parse(localStorage.getItem('homenest-saved-homes')!)).toContain('2');
  view.unmount();
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /Saved/ }));
  expect(screen.getByRole('button', { name: '456 Oak Avenue' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: '123 Main Street' })).not.toBeInTheDocument();
});

test('opens price and tax history and updates the mortgage estimate', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: '123 Main Street' }));
  const dialog = await screen.findByRole('dialog');
  expect(within(dialog).getByRole('img', { name: 'Price history for 123 Main Street' })).toBeInTheDocument();
  expect(within(dialog).getByText('Property tax history')).toBeInTheDocument();
  const total = dialog.querySelector('.monthly-total')!;
  const original = total.textContent;
  fireEvent.change(within(dialog).getByLabelText(/Down payment/), { target: { value: '40' } });
  expect(total.textContent).not.toBe(original);
  fireEvent.click(within(dialog).getByRole('button', { name: 'Close home details' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
