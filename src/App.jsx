import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Braces,
  CalendarDays,
  Cpu,
  Database,
  GitFork,
  GraduationCap,
  Headphones,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Wifi,
  Wrench,
  X,
} from 'lucide-react'
import FeaturedProject from './components/FeaturedProject.jsx'
import ProjectCard from './components/ProjectCard.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import { fleetxProject, projectExperience, projects } from './data/projects.js'
import './App.css'

const githubUrl = 'https://github.com/benedictceli26'
const emailAddress = 'benedictceli2630@gmail.com'

const navigation = [
  { id: 'home', label: 'Home', icon: Monitor },
  { id: 'projects', label: 'Projects', icon: BriefcaseBusiness, count: '03' },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'skills', label: 'Skills', icon: Layers3 },
  { id: 'about', label: 'About', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
]

const skillGroups = [
  {
    name: 'IT Support & Technical Skills',
    icon: Headphones,
    skills: ['IT Support', 'Technical Assistance', 'Troubleshooting'],
  },
  {
    name: 'Hardware & Software',
    icon: Cpu,
    skills: ['Computer Systems', 'Hardware Troubleshooting', 'Software Troubleshooting', 'Installation & Configuration', 'System Maintenance'],
  },
  {
    name: 'Networking',
    icon: Wifi,
    skills: ['Networking Fundamentals'],
  },
  {
    name: 'Programming & Development',
    icon: Braces,
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Vite', 'Node.js', 'Express'],
  },
  {
    name: 'Database Management',
    icon: Database,
    skills: ['MongoDB'],
  },
  {
    name: 'Development Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Vercel'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function SectionHeading({ eyebrow, children, description }) {
  return (
    <motion.div
      className="section-heading"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </motion.div>
  )
}

function Sidebar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat('en-PH', {
        timeZone: 'Asia/Manila',
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date()))
    }

    updateTime()
    const intervalId = window.setInterval(updateTime, 60_000)
    return () => window.clearInterval(intervalId)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="mobile-header">
        <a className="mobile-brand" href="#home" onClick={closeMenu}>
          <span className="brand-monogram">AC</span>
          <span>Ashley Celi</span>
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <aside className={`sidebar${menuOpen ? ' sidebar--open' : ''}`} aria-label="Portfolio sidebar">
        <div className="sidebar-topline">
          <span className="live-dot" />
          <p><time>{time || '—'}</time> <span>in Muntinlupa</span></p>
        </div>

        <a className="profile" href="#home" onClick={closeMenu}>
          <span className="profile-avatar" aria-hidden="true">
            <span className="avatar-orbit avatar-orbit--one" />
            <span className="avatar-orbit avatar-orbit--two" />
            <span className="avatar-initials">AC</span>
            <span className="avatar-status">✦</span>
          </span>
          <span className="profile-name">Ashley Benedict Celi</span>
          <span className="profile-role">IT Student · IT Support</span>
        </a>

        <div className="social-links" aria-label="Social profiles">
          <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitFork size={17} />
          </a>
          <a href={`mailto:${emailAddress}`} aria-label="Email">
            <Mail size={17} />
          </a>
          <a href="#contact" aria-label="Contact section" onClick={closeMenu}>
            <ArrowUpRight size={17} />
          </a>
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          <p className="nav-label">Navigate</p>
          {navigation.map(({ id, label, icon: Icon, count }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${activeSection === id ? ' nav-link--active' : ''}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={closeMenu}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
              {count && <span className="nav-count">{count}</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="availability-dot" />
          <span>Interested in IT Support opportunities</span>
        </div>
      </aside>
      {menuOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={closeMenu} />}
    </>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [activeProject, setActiveProject] = useState(null)
  const openProject = useCallback((project) => setActiveProject(project), [])
  const closeProjectModal = useCallback(() => setActiveProject(null), [])

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleEntries[0]) setActiveSection(visibleEntries[0].target.id)
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.6] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Sidebar activeSection={activeSection} />
      <main id="main">
        <section className="hero-section" id="home" aria-labelledby="hero-title">
          <svg className="hero-geometry" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M92 124 252 25 450 90 544 246 476 424 300 511 125 429 70 274Z" />
            <path d="m252 25 48 486m150-421-150 421M92 124l382 300M70 274l380-184m-325 339L252 25" />
            <path className="geometry-accent" d="m1050-30 128 194-35 178 55 175-84 198-193 91-178-77-168 34" />
          </svg>
          <div className="hero-content">
            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="kicker-line" />
              ASHLEY BENEDICT CELI
            </motion.p>
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero-title-light">IT SUPPORT</span>
              <span className="hero-title-bold">ENTHUSIAST</span>
            </motion.h1>
            <p className="hero-subtitle">
              IT Student <span>|</span> Technical Support <span>|</span> Troubleshooting <span>|</span> Software Development
            </p>
            <motion.p
              className="hero-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              Passionate about technology, troubleshooting, and solving technical problems. I enjoy helping people with technology-related challenges while also exploring software development and building practical applications.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a className="button button-primary" href="#contact">
                Get in touch <ArrowUpRight size={17} />
              </a>
              <a className="button button-quiet" href={githubUrl} target="_blank" rel="noreferrer">
                <GitFork size={17} /> GitHub
              </a>
            </motion.div>
          </div>
          <a className="hero-scroll" href="#projects" aria-label="Scroll to projects">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDownRight size={15} />
          </a>
          <span className="hero-index">01 — 06</span>
        </section>

        <section className="intro-section content-section" aria-label="Introduction">
          <p className="eyebrow">A LITTLE ABOUT MY WORK</p>
          <p className="intro-statement">
            People-first technical support.
            <span>Software development as an additional strength.</span>
          </p>
          <div className="intro-meta">
            <span><MapPin size={14} /> Muntinlupa City, Philippines</span>
            <span><GraduationCap size={15} /> IT Student · Technical Support</span>
          </div>
        </section>

        <section className="projects-section content-section" id="projects">
          <SectionHeading
            eyebrow="Selected work"
            description="Development projects that demonstrate my technical capabilities, problem-solving approach, and continued learning."
          >
            Technical skills, put into practice.
          </SectionHeading>
          <FeaturedProject project={fleetxProject} onOpen={openProject} />
          <div className="projects-grid">
            {projects.filter((project) => !project.featured).map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={openProject} />
            ))}
          </div>
          <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">
            Explore my GitHub <ArrowRight size={16} />
          </a>
        </section>

        <section className="experience-section content-section" id="experience">
          <SectionHeading
            eyebrow="Project experience"
            description="Project responsibilities supported by the repositories. Dates reflect project activity, not employment."
          >
            Experience built through projects.
          </SectionHeading>
          <div className="experience-grid">
            {projectExperience.map((project, index) => (
              <motion.article
                className="experience-card"
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -4 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
              >
                <div className="experience-card-meta">
                  <span className="experience-kind"><BriefcaseBusiness size={14} />Project experience</span>
                  <span className="experience-date"><CalendarDays size={14} />Project activity · {project.date}</span>
                </div>
                <h3>{project.role}</h3>
                <p className="experience-project-title">{project.title}</p>
                <p className="experience-description">{project.whatIBuilt}</p>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <a className="experience-link" href={project.githubUrl} target="_blank" rel="noreferrer">
                  <GitFork size={15} /> View repository <ArrowUpRight size={14} />
                </a>
              </motion.article>
            ))}
          </div>
          <p className="experience-date-note">
            Dates are based on repository commit activity only; they are not verified employment dates.
          </p>
        </section>

        <section className="skills-section content-section" id="skills">
          <SectionHeading
            eyebrow="Support & development"
            description="My interests span hands-on technical support, computer systems, and software development. Listed areas reflect my interests and current tools, not certifications."
          >
            A well-rounded toolkit.
          </SectionHeading>
          <div className="skills-layout">
            <div className="skills-note">
              <span className="skills-icon"><Headphones size={21} /></span>
              <h3>Support first. Build on that.</h3>
              <p>My primary career interest is IT Support and technical assistance, with software development as a complementary strength.</p>
              <span className="skills-note-mark" aria-hidden="true">&lt;/&gt;</span>
            </div>
            <div className="skill-groups">
              {skillGroups.map(({ name, icon: Icon, skills }, index) => (
                <motion.div
                  className="skill-group"
                  key={name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="skill-group-title"><Icon size={16} /><span>{name}</span></div>
                  <ul className="tag-list">
                    {skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section content-section" id="about">
          <SectionHeading
            eyebrow="A bit about me"
            description="Interested in supporting people and maintaining reliable systems, while continuing to grow as a developer."
          >
            Technology, support, and problem-solving.
          </SectionHeading>
          <div className="about-layout">
            <div className="about-copy">
              <p className="about-lead">
                Hello, I&apos;m <span>Ashley Benedict Celi</span> — an IT student whose primary career interest is IT Support and Technical Support.
              </p>
              <p>
                I&apos;m passionate about troubleshooting and helping people with technology-related challenges. Software development remains an additional strength: I enjoy exploring web and mobile applications and building practical projects.
              </p>
              <h3 className="about-interests-title">Areas I&apos;m interested in</h3>
              <ul className="about-interests">
                <li>IT Support and Technical Assistance</li>
                <li>Hardware and Software Troubleshooting</li>
                <li>Computer Systems</li>
                <li>Networking Fundamentals</li>
                <li>Software Installation and Configuration</li>
                <li>System Maintenance</li>
                <li>Web and Mobile Application Development</li>
              </ul>
              <a className="text-link" href={`mailto:${emailAddress}`}>
                Let&apos;s connect <ArrowRight size={16} />
              </a>
            </div>
            <div className="about-facts">
              <div className="fact-card">
                <span className="fact-number">01</span>
                <span className="fact-label">Based in</span>
                <strong>Muntinlupa City</strong>
                <span className="fact-subtext">Philippines</span>
              </div>
              <div className="fact-card">
                <span className="fact-number">02</span>
                <span className="fact-label">Focused on</span>
                <strong>IT Support</strong>
                <span className="fact-subtext">Primary career interest</span>
              </div>
              <div className="fact-card fact-card--wide">
                <span className="fact-number">03</span>
                <span className="fact-label">Looking for</span>
                <strong>Technical Support &amp; development</strong>
                <span className="fact-subtext">Open to OJT and internship opportunities</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section content-section" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <p className="eyebrow">Have an opportunity in mind?</p>
              <h2>Let&apos;s start<br /><span>a conversation.</span></h2>
              <p className="contact-description">
                I&apos;m interested in IT Support and Technical Support opportunities, and also welcome software development and internship opportunities.
              </p>
              <a className="button button-primary" href={`mailto:${emailAddress}?subject=Portfolio%20inquiry`}>
                <Mail size={16} /> Email me <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="contact-details">
              <span className="contact-detail-label">EMAIL</span>
              <a className="contact-email" href={`mailto:${emailAddress}`}>{emailAddress}</a>
              <span className="contact-divider" />
              <span className="contact-detail-label">ELSEWHERE</span>
              <a className="contact-social" href={githubUrl} target="_blank" rel="noreferrer">
                <GitFork size={17} /> GitHub <ArrowUpRight size={14} />
              </a>
              <span className="contact-location"><MapPin size={15} /> Muntinlupa City, Philippines</span>
            </div>
            <span className="contact-decoration" aria-hidden="true">AC</span>
          </div>
        </section>

        <footer className="site-footer">
          <a className="footer-brand" href="#home"><span className="footer-mark">AC</span>Ashley Benedict Celi</a>
          <span>© {new Date().getFullYear()} Ashley Benedict Celi</span>
          <a href="#home">Back to top <ArrowUpRight size={13} /></a>
        </footer>
      </main>
      <ProjectModal project={activeProject} onClose={closeProjectModal} />
    </div>
  )
}

export default App
