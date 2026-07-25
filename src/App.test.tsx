import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Portfolio', () => {
  it('renders the hero header', () => {
    render(<App />);
    expect(screen.getByText('@thomas_young113')).toBeInTheDocument();
  });

  it('renders the hero tagline', () => {
    render(<App />);
    expect(screen.getByText(/Building decentralized systems and AI tools from Termux/)).toBeInTheDocument();
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
    expect(screen.getByText('Twitter').closest('a')).toHaveAttribute('href', 'https://x.com/thomas_young113');
    expect(screen.getByText('GitHub').closest('a')).toHaveAttribute('href', 'https://github.com/Thomasyoung113');
    expect(screen.getByText('Telegram').closest('a')).toHaveAttribute('href', 'https://t.me/thomas_young');
  });

  it('renders the footer with faith message', () => {
    render(<App />);
    expect(screen.getByText(/#TheBoyGodIsHelping/)).toBeInTheDocument();
  });
});