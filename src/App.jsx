import React, { useEffect, useRef, useState } from 'react';
import './App.css';

/* ── DATA ── */
const SKILLS = [
  { name: 'React', level: 90, color: '#61dafb', icon: '⚛️' },
  { name: 'JavaScript', level: 88, color: '#f7df1e', icon: '🟨' },
  { name: 'Node.js', level: 82, color: '#68a063', icon: '🟢' },
  { name: 'PHP', level: 85, color: '#777bb4', icon: '🐘' },
  { name: 'MySQL', level: 80, color: '#00758f', icon: '🐬' },
  { name: 'CSS/SCSS', level: 87, color: '#f06529', icon: '🎨' },
  { name: 'Git', level: 85, color: '#f05032', icon: '🔀' },
  { name: 'Docker', level: 65, color: '#2496ed', icon: '🐳' },
];

const PROJECTS = [
  {
    title: 'FitPhysique Gym System',
    desc: 'Hệ thống quản lý phòng gym full-stack với JWT authentication, dashboard thời gian thực và lịch PT tự động.',
    tags: ['React', 'Node.js', 'MySQL', 'JWT'],
    color: '#8b5cf6',
    icon: '💪',
    link: '#',
    stars: 42,
  },
  {
    title: 'Inventory Management',
    desc: 'Ứng dụng quản lý kho hàng với kiến trúc 3-tier, xử lý phức tạp purchase orders và export issues.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'REST API'],
    color: '#3b82f6',
    icon: '📦',
    link: '#',
    stars: 28,
  },
  {
    title: 'Dev Portfolio',
    desc: 'Portfolio cá nhân với thiết kế glassmorphism, animation mượt mà và responsive hoàn toàn.',
    tags: ['React', 'Vite', 'CSS', 'Animation'],
    color: '#06b6d4',
    icon: '🚀',
    link: '#',
    stars: 19,
  },
];

const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com', icon: GithubIcon, color: '#333' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: LinkedInIcon, color: '#0077b5' },
  { name: 'Twitter', url: 'https://twitter.com', icon: TwitterIcon, color: '#1da1f2' },
  { name: 'Email', url: 'mailto:dev@example.com', icon: EmailIcon, color: '#ea4335' },
];

const TIMELINE = [
  { year: '2024–nay', title: 'Full Stack Developer', org: 'Freelance', desc: 'Xây dựng web app với React & Node.js cho khách hàng trong nước.' },
  { year: '2023', title: 'Backend Intern', org: 'Tech Startup', desc: 'Phát triển REST API với PHP, tối ưu query MySQL tăng tốc 60%.' },
  { year: '2021–2025', title: 'Sinh viên CNTT', org: 'Đại học Công nghệ', desc: 'Chuyên ngành Kỹ thuật phần mềm, GPA 3.6/4.0.' },
];

/* ── SVG ICONS ── */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

/* ── ANIMATED BACKGROUND ── */
function Background() {
  return (
    <div className="bg-wrap" aria-hidden>
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-grid" />
    </div>
  );
}

/* ── TYPING ANIMATION ── */
function TypingText({ texts, speed = 100, pause = 2000 }) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, idx, texts, speed, pause]);

  useEffect(() => {
    setDisplayed(texts[idx].slice(0, charIdx));
  }, [charIdx, idx, texts]);

  return (
    <span className="typing-text">
      {displayed}
      <span className="cursor">|</span>
    </span>
  );
}

/* ── SKILL BAR ── */
function SkillBar({ skill, delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="skill-item" ref={ref} style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-header">
        <span className="skill-icon">{skill.icon}</span>
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{
            width: animated ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: animated ? `0 0 10px ${skill.color}66` : 'none',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ── PROJECT CARD ── */
function ProjectCard({ project, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`project-card ${hovered ? 'hovered' : ''}`}
      style={{ animationDelay: `${delay}ms`, '--card-color': project.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-glow" />
      <div className="project-icon">{project.icon}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="project-footer">
        <span className="project-stars">⭐ {project.stars}</span>
        <a href={project.link} className="project-link">Xem dự án →</a>
      </div>
    </div>
  );
}

/* ── STAT COUNTER ── */
function StatCounter({ value, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const step = value / 50;
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-value">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── MAIN APP ── */
export default function App() {
  const [navActive, setNavActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavActive(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setNavActive(e.target.id); });
      },
      { threshold: 0.4 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Background />

      {/* NAV */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <span className="logo-bracket">&lt;</span>
          Dev
          <span className="logo-bracket">/&gt;</span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`nav-btn ${navActive === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
                id={`nav-${link.id}`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-badge">✨ Available for hire</div>
          <h1 className="hero-name">
            Xin chào, mình là<br />
            <span className="gradient-text">Minh Dev</span>
          </h1>
          <p className="hero-role">
            <TypingText texts={['Full Stack Developer', 'React Enthusiast', 'Problem Solver', 'UI Craftsman']} />
          </p>
          <p className="hero-desc">
            Đam mê xây dựng những sản phẩm web đẹp, nhanh và có ý nghĩa.
            Từ backend đến frontend — mình có mặt ở cả hai.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>
              Xem dự án 🚀
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('contact')}>
              Liên hệ mình
            </button>
          </div>
          <div className="hero-socials">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} className="social-icon" title={s.name} target="_blank" rel="noopener noreferrer">
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-avatar-wrap">
          <div className="avatar-ring ring-1" />
          <div className="avatar-ring ring-2" />
          <div className="avatar-ring ring-3" />
          <div className="avatar-frame">
            <img src="/avatar.png" alt="Developer Avatar" className="avatar-img" />
          </div>
          <div className="orbit-dot dot-1" />
          <div className="orbit-dot dot-2" />
          <div className="orbit-dot dot-3" />
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll down</span>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="stats-inner">
          <StatCounter value={15} label="Dự án hoàn thành" suffix="+" />
          <div className="stat-divider" />
          <StatCounter value={3} label="Năm kinh nghiệm" suffix="+" />
          <div className="stat-divider" />
          <StatCounter value={8} label="Công nghệ" suffix="+" />
          <div className="stat-divider" />
          <StatCounter value={100} label="Cam kết chất lượng" suffix="%" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="section-inner about-inner">
          <div className="about-text">
            <div className="section-label">// About Me</div>
            <h2 className="section-title">Một chút về <span className="gradient-text">mình</span></h2>
            <p className="about-desc">
              Mình là sinh viên CNTT năm cuối với niềm đam mê cháy bỏng với lập trình web.
              Mình thích giải quyết các vấn đề phức tạp bằng code sạch, đẹp và hiệu quả.
            </p>
            <p className="about-desc">
              Ngoài giờ code, mình thích đọc sách về kiến trúc phần mềm, chơi game indie
              và uống cà phê ☕ — đặc biệt là khi debug lúc 2 giờ sáng 😅
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">🎓</span>
                <div>
                  <div className="highlight-title">Đại học Công nghệ</div>
                  <div className="highlight-sub">Kỹ thuật Phần mềm · GPA 3.6</div>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">📍</span>
                <div>
                  <div className="highlight-title">Hà Nội, Việt Nam</div>
                  <div className="highlight-sub">Remote friendly 🌏</div>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💬</span>
                <div>
                  <div className="highlight-title">Tiếng Việt & English</div>
                  <div className="highlight-sub">Giao tiếp chuyên nghiệp</div>
                </div>
              </div>
            </div>
          </div>

          <div className="timeline">
            <div className="section-label">// Journey</div>
            {TIMELINE.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <div className="timeline-title">{item.title}</div>
                  <div className="timeline-org">{item.org}</div>
                  <div className="timeline-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section section-alt">
        <div className="section-inner">
          <div className="section-label centered">// Skills</div>
          <h2 className="section-title centered">Công nghệ mình <span className="gradient-text">yêu thích</span></h2>
          <p className="section-sub centered">Những công cụ mình dùng hàng ngày để biến ý tưởng thành sản phẩm</p>

          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={i * 80} />
            ))}
          </div>

          <div className="tech-stack">
            {['React', 'Vite', 'Node.js', 'Express', 'PHP', 'Laravel', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'Git', 'Linux'].map(tech => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="section-inner">
          <div className="section-label centered">// Projects</div>
          <h2 className="section-title centered">Những dự án <span className="gradient-text">nổi bật</span></h2>
          <p className="section-sub centered">Một vài sản phẩm mình đã xây dựng và tự hào nhất</p>

          <div className="projects-grid">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section-alt">
        <div className="section-inner contact-inner">
          <div className="section-label centered">// Contact</div>
          <h2 className="section-title centered">Kết nối <span className="gradient-text">với mình</span></h2>
          <p className="section-sub centered">Có dự án thú vị? Hãy cùng nhau tạo ra điều gì đó tuyệt vời!</p>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <div>
                  <div className="contact-label">Email</div>
                  <a href="mailto:minhdev@example.com" className="contact-value">minhdev@example.com</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">💼</div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <a href="#" className="contact-value">linkedin.com/in/minhdev</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">🐙</div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <a href="#" className="contact-value">github.com/minhdev</a>
                </div>
              </div>
              <div className="available-badge">
                <span className="available-dot" />
                Sẵn sàng nhận dự án mới
              </div>
            </div>

            <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Tin nhắn đã gửi! 🎉'); }}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Tên của bạn</label>
                  <input id="name" type="text" placeholder="Nguyễn Văn A" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="ban@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Tiêu đề</label>
                <input id="subject" type="text" placeholder="Hợp tác dự án" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Nội dung</label>
                <textarea id="message" rows="5" placeholder="Mô tả dự án hoặc ý tưởng của bạn..." required />
              </div>
              <button type="submit" className="btn-primary full-width" id="send-message">
                Gửi tin nhắn 🚀
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>Minh Dev<span className="logo-bracket">/&gt;</span>
          </div>
          <p className="footer-text">Made with ❤️ &amp; ☕ · © 2025 Minh Dev</p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} className="social-icon small" title={s.name} target="_blank" rel="noopener noreferrer">
                <s.icon />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
