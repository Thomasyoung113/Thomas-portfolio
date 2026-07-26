import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Portfolio', () => {
  it('renders the hero header', () => {
    render(<App />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders the hero tagline', () => {
    render(<App />);
    expect(screen.getByText(/Building decentralized systems and AI tools/)).toBeInTheDocument();
  });

  it('renders the Featured Work section', () => {
    render(<App />);
    expect(screen.getByText('Featured Work')).toBeInTheDocument();
  });

  it('renders the Web3 Projects section', () => {
    render(<App />);
    expect(screen.getByText('Web3 Projects')).toBeInTheDocument();
  });

  it('renders the newsletter form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /twitter/i })).toHaveAttribute('href', 'https://x.com/thomas_young113');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/Thomasyoung113');
    expect(screen.getByRole('link', { name: /telegram contact/i })).toHaveAttribute('href', 'https://t.me/thomas_young');
  });

  it('renders the footer with copyright', () => {
    render(<App />);
    expect(screen.getByText(/© 2026/)).toBeInTheDocument();
  });
});