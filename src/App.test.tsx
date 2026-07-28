import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Portfolio', () => {
  it('renders the hero header', () => {
    render(<App />);
    expect(screen.getByText('Hello, I am Thomas Young')).toBeInTheDocument();
  });

  it('renders the hero subtitle', () => {
    render(<App />);
    expect(screen.getByText('Full-stack developer')).toBeInTheDocument();
  });

  it('renders the About Me section', () => {
    render(<App />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders the Skills section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument();
  });

  it('renders the Services section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /services/i })).toBeInTheDocument();
  });

  it('renders service cards', () => {
    render(<App />);
    expect(screen.getByText('UX/UI Design')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Web Positioning (SEO)')).toBeInTheDocument();
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
    const twitterLinks = screen.getAllByRole('link', { name: /twitter/i });
    expect(twitterLinks[0]).toHaveAttribute('href', 'https://x.com/thomas_young113');
    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/Thomasyoung113');
    const telegramLinks = screen.getAllByRole('link', { name: /telegram/i });
    expect(telegramLinks[0]).toHaveAttribute('href', 'https://t.me/thomas_young');
    const whatsappLinks = screen.getAllByRole('link', { name: /whatsapp/i });
    expect(whatsappLinks[0]).toHaveAttribute('href', 'https://wa.me/2348123916673');
  });

  it('renders the footer with copyright', () => {
    render(<App />);
    expect(screen.getByText(/© 2026/)).toBeInTheDocument();
  });

  it('renders Download CV button', () => {
    render(<App />);
    const cvLink = screen.getByText('Download CV');
    expect(cvLink).toBeInTheDocument();
    expect(cvLink.closest('a')).toHaveAttribute('href', '/Thomas_Young_CV.pdf');
  });

  it('renders Read More button', () => {
    render(<App />);
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });
});