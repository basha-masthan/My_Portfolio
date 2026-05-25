import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

/* ─── Data ─── */
const FEATURES = [
  { icon: '🔍', title: 'AI Job Discovery', desc: 'Search across LinkedIn, Indeed, Naukri & more simultaneously. AI aggregates and ranks the best matches for your profile.', accent: '#6366f1' },
  { icon: '📄', title: 'Smart Resume Builder', desc: 'Generate ATS-optimized resumes tailored to each job description. AI highlights your most relevant experience automatically.', accent: '#06b6d4' },
  { icon: '📊', title: 'Application Tracker', desc: 'Kanban-style pipeline from wishlist to offer. Never lose track of where you stand with each application.', accent: '#8b5cf6' },
  { icon: '🎯', title: 'Interview Preparation', desc: 'AI-guided prep with role-specific practice questions, study roadmaps, and skill-gap identification.', accent: '#10b981' },
  { icon: '✉️', title: 'Cover Letter AI', desc: 'Auto-generate personalized cover letters matched to the tone and requirements of each specific role.', accent: '#f59e0b' },
  { icon: '🧠', title: 'Skills Gap Analysis', desc: 'Identify missing skills and get personalized learning paths to close the gap before your interview.', accent: '#ec4899' },
];

const WORKFLOW = [
  { num: '01', title: 'Discover', desc: 'Search jobs or paste any listing URL to import instantly.', icon: '🔍' },
  { num: '02', title: 'Analyze', desc: 'AI extracts role requirements, skills, and key hiring signals.', icon: '🧠' },
  { num: '03', title: 'Tailor', desc: 'Generate a resume and cover letter matched to the role.', icon: '✨' },
  { num: '04', title: 'Track', desc: 'Add to your pipeline and monitor every application status.', icon: '📊' },
  { num: '05', title: 'Prepare', desc: 'Study with AI-guided training for your upcoming interview.', icon: '🎯' },
  { num: '06', title: 'Succeed', desc: 'Land the job with data-driven confidence and preparation.', icon: '🚀' },
];

const TECH_STACK = [
  'Next.js 14', 'React', 'Node.js', 'MongoDB',
  'Google Gemini AI', 'JWT Auth', 'REST APIs', 'Cloudinary',
];



const STATS = [
  { value: '10K+', label: 'Jobs Analyzed' },
  { value: '5K+', label: 'Resumes Built' },
  { value: '98%', label: 'ATS Match Rate' },
  { value: '6', label: 'AI Modules' },
];

/* ─── Component ─── */
const JobHuntDemo = () => {
  const handleLaunchApp = () => {
    window.open('https://fbt-jobhunt.futureboundtech.online/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="jh-demo-shell">
      {/* Animated Background */}
      <div className="jh-bg">
        <div className="jh-orb jh-orb-1" />
        <div className="jh-orb jh-orb-2" />
        <div className="jh-orb jh-orb-3" />
        <div className="jh-grid-dots" />
      </div>

      {/* Top Navigation Bar */}
      <div className="jh-topbar">
        <div className="jh-topbar-left">
          <Link to="/" className="jh-back-btn">
            ← Back to Portfolio
          </Link>
          <div className="jh-topbar-logo">
            <span className="jh-topbar-logo-icon">⚡</span>
            <span>FBT Job Hunt</span>
            <span className="jh-topbar-badge">AI</span>
          </div>
        </div>
        <div className="jh-topbar-right">
          <button
            className="jh-live-btn"
            onClick={handleLaunchApp}
            title="Launch Job Hunt AI"
          >
            <span className="jh-live-dot" style={{ background: '#4ade80' }} />
            Launch App ↗
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="jh-content">

        {/* ── Hero ── */}
        <div className="jh-hero">
          <div className="jh-hero-badge">
            <span className="jh-hero-badge-dot" />
            Full-Stack AI Application
          </div>
          <h1 className="jh-hero-title">
            AI Job Hunt —<br />
            <span className="jh-gradient-text">Your Career, Supercharged</span>
          </h1>
          <p className="jh-hero-sub">
            An end-to-end AI-powered career platform. From intelligent job discovery to
            tailored resume generation, interview prep, and application tracking — all
            in one intelligent workspace.
          </p>

          <div className="jh-tech-pills">
            {TECH_STACK.map(tech => (
              <span key={tech} className="jh-tech-pill">{tech}</span>
            ))}
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="jh-stats-bar">
          {STATS.map(s => (
            <div key={s.label} className="jh-stat">
              <span className="jh-stat-val">{s.value}</span>
              <span className="jh-stat-label">{s.label}</span>
            </div>
          ))}
        </div>



        {/* ── Features Grid ── */}
        <div className="jh-section-header" style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="jh-section-tag">Features</span>
          <h2 className="jh-section-title">
            Everything You Need to <span className="jh-gradient-text">Win the Job</span>
          </h2>
        </div>
        <div className="jh-features-grid" style={{ marginBottom: '70px' }}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="jh-feature-card"
              style={{ '--card-accent': f.accent }}
            >
              <span className="jh-feature-icon">{f.icon}</span>
              <div className="jh-feature-title">{f.title}</div>
              <div className="jh-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Workflow ── */}
        <div className="jh-workflow-section">
          <div className="jh-section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="jh-section-tag">Process</span>
            <h2 className="jh-section-title">
              From Search to <span className="jh-gradient-text">Success</span>
            </h2>
          </div>
          <div className="jh-timeline">
            {WORKFLOW.map((step, i) => (
              <div key={i} className="jh-timeline-step">
                <div className="jh-timeline-num">{step.icon}</div>
                <div className="jh-timeline-body">
                  <h3>{step.num} · {step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="jh-cta">
          <h2 className="jh-cta-title">
            Ready to <span className="jh-gradient-text">Experience</span> It?
          </h2>
          <p className="jh-cta-sub">
            Click below to launch and explore all 6 AI modules on the live platform.
          </p>
          <div className="jh-cta-actions">
            <button className="jh-btn-primary" onClick={handleLaunchApp}>
              <span>⚡</span> Launch Job Hunt AI
            </button>
            <Link to="/" className="jh-btn-secondary">
              ← Back to Portfolio
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobHuntDemo;
