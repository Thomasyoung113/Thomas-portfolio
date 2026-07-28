import { useState, useRef, useEffect, useCallback } from 'react';
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

/* ── Intersection Observer hook for scroll-triggered animations ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function App() {
  /* ── Theme / Dark Mode ── */
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  /* ── Preloader ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add('loaded');
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('loaded');
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Mobile menu ── */
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── About: Read More toggle ── */
  const [showMoreBio, setShowMoreBio] = useState(false);

  /* ── Newsletter state ── */
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  /* ── Intersection Observer refs ── */
  const { ref: featuredRef, inView: featuredInView } = useInView(0.1);
  const { ref: web3Ref, inView: web3InView } = useInView(0.1);
  const { ref: whyRef, inView: whyInView } = useInView(0.15);

  /* ── Scroll reveal — observe .reveal elements for scroll-triggered animations ── */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Smooth scroll navigation ── */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const heading = el.querySelector('h2, h3');
      if (heading instanceof HTMLElement) {
        heading.focus({ preventScroll: true });
      }
    }
    setMenuOpen(false);
  }, []);

  /* ── Newsletter subscribe handler ── */
  const handleSubscribe = useCallback(async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setSubscribeStatus('error');
      setSubscribeMessage('Please enter a valid email address.');
      return;
    }
    setIsSubscribing(true);
    try {
      const response = await fetch('https://formspree.io/f/xnjeoyea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (response.ok) {
        setSubscribeStatus('success');
        setSubscribeMessage("You're in! Watch for the next drop.");
        setEmail('');
      } else {
        setSubscribeStatus('error');
        setSubscribeMessage('Something went wrong. Try again.');
      }
    } catch (err) {
      setSubscribeStatus('error');
      setSubscribeMessage('Something went wrong. Please try again in a moment.');
    } finally {
      setIsSubscribing(false);
    }
  }, [email]);

  const handleSubscribeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <>
      {/* ── Header / Nav ── */}
      <header className="header">
        <div className="header-logo">Thomas Young</div>
        <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><button onClick={() => scrollToSection('home')}>Home</button></li>
            <li><button onClick={() => scrollToSection('about')}>About</button></li>
            <li><button onClick={() => scrollToSection('skills')}>Skills</button></li>
            <li><button onClick={() => scrollToSection('services')}>Services</button></li>
            <li><button onClick={() => scrollToSection('projects')}>Projects</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          </ul>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <i className="fas fa-bars"></i>
        </button>
      </header>

      {/* ── Hero Section ── */}
      <section id="home" className="hero" aria-label="Introduction">
        <div className="hero-content">
          <h1 className="hero-title">Hello, I am Thomas Young</h1>
          <p className="hero-subtitle">Full-stack developer</p>
          <div className="social-icons">
            <a href="https://x.com/thomas_young113" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter profile">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com/Thomasyoung113" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub profile">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://t.me/thomas_young" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Telegram contact">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="https://wa.me/2348123916673" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp contact">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="about-section" aria-labelledby="about-heading">
        <h2 id="about-heading">About Me</h2>
        <div className="about-container">
          <div className="about-text">
            <p>
              I'm Thomas Young, a mobile-first full-stack developer building across Web3 infrastructure, AI tooling, and app development. I'm constantly picking up new stacks while sharpening the ones I already use, always aiming to level up my practices as a developer.
            </p>
            <a href="/Thomas_Young_CV.pdf" className="btn" download>
              Download CV
            </a>
            <button className="btn" onClick={() => setShowMoreBio(prev => !prev)}>
              Read More
            </button>
            {showMoreBio && (
              <div className="extended-bio">
                <p>
                  Hi, I'm Ubong Thomas, I consider myself a person passionate about programming, AI and web development since 2020 I had the opportunity to get to know this world of the front-end and I was able to create my first web page only using HTML and CSS from there, I felt a great passion for web development, since you can do amazing things knowing how to use HTML, CSS, JavaScript and to this day I still feel that same passion when I create a web page. I consider myself a self-taught person since I like to be constantly learning day by day, both new technologies and new development methods that help me polish and raise my level of learning. I have experience working as a freelance web designer and developer, which gave me the opportunity to work on many interesting projects, adapting to the client's needs and budget, which allowed me to improve my skills and knowledge; Additionally, I have also had the opportunity to be part of some online and face-to-face courses that helped me enrich my skills and learn a little more about this beautiful world of web development.
                </p>
              </div>
            )}
          </div>
          <div className="about-skills">
            <div className="skill-item"><span className="skill-icon">🌐</span><span className="skill-label">HTML</span></div>
            <div className="skill-item"><span className="skill-icon">🎨</span><span className="skill-label">CSS</span></div>
            <div className="skill-item"><span className="skill-icon">⚡</span><span className="skill-label">JavaScript</span></div>
            <div className="skill-item"><span className="skill-icon">📘</span><span className="skill-label">TypeScript</span></div>
            <div className="skill-item"><span className="skill-icon">⚛️</span><span className="skill-label">React</span></div>
            <div className="skill-item"><span className="skill-icon">💚</span><span className="skill-label">Node.js</span></div>
            <div className="skill-item"><span className="skill-icon">🐍</span><span className="skill-label">Python</span></div>
            <div className="skill-item"><span className="skill-icon">🔷</span><span className="skill-label">Solidity</span></div>
            <div className="skill-item"><span className="skill-icon">🦀</span><span className="skill-label">Rust</span></div>
            <div className="skill-item"><span className="skill-icon">📦</span><span className="skill-label">Git</span></div>
          </div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section id="skills" className="skills-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        <div className="skills-grid">
          <div className="skill-card"><h3>Web3</h3><p>Proficient</p></div>
          <div className="skill-card"><h3>Smart Contracts</h3><p>Proficient</p></div>
          <div className="skill-card"><h3>Telegram Bots</h3><p>Proficient</p></div>
          <div className="skill-card"><h3>AI/ML</h3><p>Intermediate</p></div>
          <div className="skill-card"><h3>Frontend</h3><p>Expert</p></div>
          <div className="skill-card"><h3>Backend</h3><p>Proficient</p></div>
          <div className="skill-card"><h3>DevOps</h3><p>Intermediate</p></div>
          <div className="skill-card"><h3>Mobile</h3><p>Intermediate</p></div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="services-section" aria-labelledby="services-heading">
        <h2 id="services-heading">Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-paint-brush"></i>
            <h3>UX/UI Design</h3>
            <p>Design of attractive interfaces for both web and mobile users</p>
          </div>
          <div className="service-card">
            <i className="fas fa-code"></i>
            <h3>Web Development</h3>
            <p>Creation of well-structured web pages, good responsive design</p>
          </div>
          <div className="service-card">
            <i className="fas fa-chart-line"></i>
            <h3>Digital Marketing</h3>
            <p>Complete maintenance of web pages to detect and solve errors</p>
          </div>
          <div className="service-card">
            <i className="fas fa-tools"></i>
            <h3>Web Maintenance</h3>
            <p>Complete maintenance of web pages to detect and solve errors, update content</p>
          </div>
          <div className="service-card">
            <i className="fas fa-search"></i>
            <h3>Web Positioning (SEO)</h3>
            <p>Web positioning through SEO, so your website appears in main search results</p>
          </div>
          <div className="service-card">
            <i className="fas fa-rocket"></i>
            <h3>Website Optimization</h3>
            <p>Complete optimization of your web page, improving loading speed</p>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="featured-section reveal" aria-labelledby="featured-heading" ref={featuredRef}>
        <h2 className="section-eyebrow" id="featured-eyebrow">LATEST &amp; GREATEST</h2>
        <h3 className="section-title" id="featured-heading" tabIndex={-1}>Featured Work</h3>
        <div className="divider-line" aria-hidden="true"></div>
        <div className={`featured-grid ${featuredInView ? 'anim-in' : ''}`}>
          {featuredProjects.map((project, idx) => (
            <article key={project.id} className="featured-card" style={{
              animationDelay: `${idx * 0.2}s`,
              '--card-index': idx,
            } as React.CSSProperties}>
              <div className="featured-icon" aria-hidden="true">{project.icon}</div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="featured-tags" aria-label="Technologies">
                {project.tags.map(tag => (
                  <span key={tag} className="featured-tag">{tag}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="featured-link" aria-label={`View ${project.title} project`}>
                  View Project →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── Web3 Projects Section ── */}
      <section className="web3-section reveal" id="projects" aria-labelledby="web3-heading" ref={web3Ref}>
        <h2 className="section-eyebrow" id="web3-eyebrow">COMPLETE ARSENAL</h2>
        <h3 className="section-title" id="web3-heading" tabIndex={-1}>Web3 Projects</h3>
        <div className="divider-line" aria-hidden="true"></div>
        <div className={`web3-grid ${web3InView ? 'anim-in' : ''}`}>
          {web3Projects.map((project, idx) => (
            <article key={project.id} id={project.id} className="web3-card" style={{ animationDelay: `${idx * 0.1}s` } as React.CSSProperties}>
              <div className="web3-icon" aria-hidden="true">{project.icon}</div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="web3-tags" aria-label="Technologies">
                {project.tags.map(tag => (
                  <span key={tag} className="web3-tag">{tag}</span>
                ))}
              </div>
              <span className="web3-year">{project.year}</span>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="web3-link" aria-label={`View ${project.title} project`}>
                  View Project →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── Why Choose Me Section ── */}
      <section className="why-choose-section reveal" aria-labelledby="why-heading" ref={whyRef}>
        <h2 id="why-heading" tabIndex={-1}>Why Choose Me?</h2>
        <div className="divider-line" aria-hidden="true"></div>
        <div className={`why-grid ${whyInView ? 'anim-in' : ''}`}>
          {whyChoose.map((item, idx) => (
            <div key={idx} className="why-card" style={{
              animationDelay: `${(idx % 3) * 0.15}s`
            } as React.CSSProperties}>
              <div className="why-icon" aria-hidden="true">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter Section ── */}
      <section className="newsletter-section reveal" aria-labelledby="newsletter-heading">
        <div className="newsletter-content">
          <h2 id="newsletter-heading">Stay Updated</h2>
          <p>Get weekly Web3 insights and AI tool releases. Every Friday at 8pm.</p>
          <div className="newsletter-form" role="form" aria-label="Newsletter subscription">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (subscribeStatus !== 'idle') setSubscribeStatus('idle');
              }}
              onKeyDown={handleSubscribeKeyDown}
              aria-label="Email address for newsletter"
              aria-describedby={subscribeStatus !== 'idle' ? 'newsletter-feedback' : undefined}
              autoComplete="email"
              disabled={isSubscribing}
            />
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              aria-label={isSubscribing ? 'Subscribing…' : 'Subscribe to newsletter'}
            >
              {isSubscribing ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>
          {subscribeStatus !== 'idle' && (
            <p
              id="newsletter-feedback"
              className={`newsletter-feedback newsletter-feedback-${subscribeStatus}`}
              role="status"
              aria-live="polite"
            >
              {subscribeMessage}
            </p>
          )}
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        <div className="contact-content">
          <p className="contact-item">
            <a href="https://wa.me/2348123916673" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp contact">
              <i className="fab fa-whatsapp"></i> +2348123916673
            </a>
          </p>
          <div className="contact-links">
            <a href="https://x.com/thomas_young113" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Twitter profile">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com/Thomasyoung113" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub profile">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://t.me/thomas_young" target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Telegram contact">
              <i className="fab fa-telegram"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <p>page created by thomas young &copy; 2026. All Rights Reserved</p>
      </footer>
    </>
  );
}

export default App;