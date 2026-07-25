import { useState } from 'react';
import './App.css';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  year: string;
  icon?: string;
}

const featuredProjects: Project[] = [
  {
    id: 'contentbot',
    title: 'ContentBot',
    description: 'AI-powered Telegram bot for social media content generation. Dual-mode: normal chat and dedicated platform formatting.',
    tags: ['Telegram', 'Python', 'AI', 'NaraRouter'],
    year: '2026',
    icon: '🤖'
  },
  {
    id: 'arch-oracle',
    title: 'Arch Oracle',
    description: 'Decentralized floor price oracle for Bitcoin Ordinals on Arch Network. Enterprise-grade infrastructure.',
    tags: ['Rust', 'Solana', 'Bitcoin', 'Oracle'],
    year: '2024',
    icon: '🔮'
  },
  {
    id: 'word-of-the-day-bot',
    title: 'Word of the Day Bot',
    description: 'Telegram bot delivering an interesting English word daily at 8am WAT, spanning topics from science to history to everyday life.',
    tags: ['Telegram', 'Python', 'AI'],
    link: 'https://github.com/Thomasyoung113/word-of-the-day-bot',
    year: '2026',
    icon: '📖'
  }
];

const web3Projects: Project[] = [
  {
    id: 'ozak-ai',
    title: 'Ozak AI Ambassador Program',
    description: 'Selected as OZ (Ozak Community Member). Ambassador for AI project growth, spreading word to new communities worldwide. Referral Code: 74b5886899',
    tags: ['AI', 'Ambassador', 'Community'],
    year: '2026',
    icon: '🌟'
  },
  {
    id: 'multichain-deployer',
    title: 'MultiDeploy',
    description: 'Cross-chain smart contract deployment orchestrator supporting Arc, Tempo, and Base Mainnet. 5,000+ tx/round.',
    tags: ['Next.js', 'TypeScript', 'Web3', 'Solidity'],
    link: 'https://github.com/Thomasyoung113/multichain-deployer',
    year: '2025',
    icon: '⛓️'
  },
  {
    id: 'smart-contract-scanner',
    title: 'Smart Contract Security Scanner',
    description: 'Multi-chain security analyzer for 7 EVM chains. Rug pull detection, scam patterns, liquidity lock analysis.',
    tags: ['React', 'EVM', 'Security', 'Web3'],
    year: '2025',
    icon: '🛡️'
  },
  {
    id: 'tweetstudio',
    title: 'TweetStudio',
    description: 'Twitter/X mockup generator with live preview, PNG export, dark/light mode, thread support, PWA capabilities.',
    tags: ['React', 'TypeScript', 'Tailwind', 'AppDeploy'],
    year: '2026',
    icon: '✍️'
  },
  {
    id: 'web3-newsletter',
    title: 'Web3 Newsletter Generator',
    description: 'Auto-pull Web3 news, AI analysis, post insights every Friday 8pm to Telegram/X/Email/Markdown.',
    tags: ['Node.js', 'AI', 'NaraRouter', 'Cron'],
    year: '2026',
    icon: '📰'
  },
  {
    id: 'pitch-read',
    title: 'Pitch Read',
    description: 'Cricket match win-probability and score predictor trained on 18,000+ international T20/ODI matches. React frontend, Flask/scikit-learn backend.',
    tags: ['React', 'Python', 'scikit-learn', 'Flask'],
    link: 'https://pitch-read-cricket-predictor-ic80si.v2.appdeploy.ai/',
    year: '2026',
    icon: '🏏'
  },
  {
    id: 'court-line',
    title: 'Court Line',
    description: 'Statistical NBA score predictor with Elo ratings that update after every finished game. Daily learning loop grades predictions against real results.',
    tags: ['Next.js', 'TypeScript', 'Elo', 'Vercel'],
    link: 'https://github.com/Thomasyoung113/NBA-score-predictor',
    year: '2026',
    icon: '🏀'
  },
  {
    id: 'convallax-amm',
    title: 'Convallax AMM Bot',
    description: 'Options market-making bot deployed on Polygon Amoy testnet via the Convallax platform. Automated PnL tracking and spread management.',
    tags: ['TypeScript', 'DeFi', 'Options', 'Market Making'],
    link: 'https://github.com/Thomasyoung113/convallax-amm-script',
    year: '2026',
    icon: '📊'
  }
];

const benefits = [
  {
    icon: '⚙️',
    title: 'Innovative',
    description: 'Modern solutions for complex problems.'
  },
  {
    icon: '✓',
    title: 'Production Ready',
    description: 'Enterprise-grade Web3 infrastructure live on mainnet.'
  },
  {
    icon: '🧠',
    title: 'AI-Integrated',
    description: 'Content automation, security, oracles, and analytics.'
  }
];

const whyChoose = [
  {
    icon: '💪',
    title: 'Deep Expertise',
    description: 'EVM chains, smart contracts, Bitcoin, Solana'
  },
  {
    icon: '🚀',
    title: 'Proven Track Record',
    description: 'Live mainnet deployments across multiple chains'
  },
  {
    icon: '🎯',
    title: 'Community Focused',
    description: 'Active in Web3 and African tech circles'
  },
  {
    icon: '📱',
    title: 'Cross-Platform',
    description: 'Building solutions that work everywhere'
  },
  {
    icon: '⚡',
    title: 'Fast Shipping',
    description: 'Rapid deployment from ideation to mainnet'
  }
];

function App() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setSubscribeStatus('error');
      setSubscribeMessage('Please enter a valid email address.');
      return;
    }
    setIsSubscribing(true);
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await response.json();
      const alreadySubscribed = data?.alreadySubscribed;
      setSubscribeStatus('success');
      setSubscribeMessage(
        alreadySubscribed
          ? "You're already on the list. Watch for the next drop, Friday at 8pm."
          : "You're in! Watch for the next drop, Friday at 8pm."
      );
      setEmail('');
    } catch (err) {
      setSubscribeStatus('error');
      setSubscribeMessage('Something went wrong. Please try again in a moment.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSubscribeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <div className="portfolio">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Portfolio</h1>
          <p className="hero-subtitle">Web3 Builder</p>
          <p className="hero-tagline">Building decentralized systems and AI tools</p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => scrollToSection('projects')}>Explore Projects</button>
            <button className="cta-secondary" onClick={() => scrollToSection('contact')}>Get in Touch</button>
          </div>
        </div>
        <div className="hero-accent">✨</div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="featured-section">
        <h2 className="section-eyebrow">LATEST & GREATEST</h2>
        <h3 className="section-title">Featured Work</h3>
        <div className="divider-line"></div>
        <div className="featured-grid">
          {featuredProjects.map((project, idx) => (
            <div key={project.id} className="featured-card" style={{
              animationDelay: `${idx * 0.2}s`
            }}>
              <div className="featured-icon">{project.icon}</div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="featured-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="featured-tag">{tag}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="featured-link">View Project →</a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Rooted in Code.</h2>
        <h3>Built for You.</h3>
        <div className="divider-line"></div>
        <p className="about-text">
          Web3 developer specializing in smart contract deployment, decentralized oracles, content automation, 
          and security tooling.
        </p>
        <div className="about-benefits">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card" style={{
              animationDelay: `${idx * 0.1}s`
            }}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h4>{benefit.title}</h4>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Web3 Projects Section */}
      <section className="web3-section" id="projects">
        <h2 className="section-eyebrow">COMPLETE ARSENAL</h2>
        <h3 className="section-title">Web3 Projects</h3>
        <div className="divider-line"></div>
        <div className="web3-grid">
          {web3Projects.map((project, idx) => (
            <div key={project.id} id={project.id} className="web3-card" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="web3-icon">{project.icon}</div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="web3-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="web3-tag">{tag}</span>
                ))}
              </div>
              <span className="web3-year">{project.year}</span>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="web3-link">View Project →</a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <h2>Why Choose Me?</h2>
        <div className="divider-line"></div>
        <div className="why-grid">
          {whyChoose.map((item, idx) => (
            <div key={idx} className="why-card" style={{
              animationDelay: `${(idx % 3) * 0.15}s`
            }}>
              <div className="why-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Get weekly Web3 insights and AI tool releases. Every Friday at 8pm.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (subscribeStatus !== 'idle') setSubscribeStatus('idle');
              }}
              onKeyDown={handleSubscribeKeyDown}
              aria-label="Email address"
            />
            <button onClick={handleSubscribe} disabled={isSubscribing}>{isSubscribing ? 'Subscribing…' : 'Subscribe'}</button>
          </div>
          {subscribeStatus !== 'idle' && (
            <p className={`newsletter-feedback newsletter-feedback-${subscribeStatus}`} role="status">
              {subscribeMessage}
            </p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2>Connect</h2>
        <div className="divider-line"></div>
        <p className="contact-intro">Always open to collaborations on Web3 projects.</p>
        <div className="contact-links-container">
          <a id="social-twitter" href="https://x.com/thomas_young113" target="_blank" rel="noopener noreferrer" className="contact-link">Twitter</a>
          <a id="social-github" href="https://github.com/Thomasyoung113" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
          <a id="social-telegram" href="https://t.me/thomas_young" target="_blank" rel="noopener noreferrer" className="contact-link">Telegram</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="divider-line"></div>
        <p className="footer-credit">© 2026</p>
      </footer>
    </div>
  );
}

export default App;
