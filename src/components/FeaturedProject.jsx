import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

function FeaturedProject({ project, onOpen }) {
  const mobileScreenshot = project.images.find((image) => image.orientation === 'portrait')

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onOpen(project)
  }

  return (
    <motion.article
      className="featured-project"
      aria-label={`Featured project: ${project.title}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
    >
      <div className="featured-project-copy">
        <div className="featured-project-label"><span className="featured-dot" />Featured project</div>
        <p className="featured-project-category">{project.category}</p>
        <h3>{project.title.split(' ')[0]} <span>{project.title.split(' ').slice(1).join(' ')}</span></h3>
        <p className="featured-project-description">{project.description}</p>
        <div className="featured-project-meta">
          <div>
            <span className="featured-meta-label">My role</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span className="featured-meta-label">My contribution</span>
            <strong>{project.contribution}</strong>
          </div>
          <div>
            <span className="featured-meta-label">Technology stack</span>
            <strong>{project.technologies.slice(0, 3).join(' · ')}</strong>
          </div>
        </div>
        <div className="featured-project-actions">
          <a
            className="button button-primary featured-visit"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            Visit website <ArrowUpRight size={16} />
          </a>
          {project.githubUrl && (
            <a
              className="featured-github-link"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              GitHub repository <ArrowUpRight size={14} />
            </a>
          )}
          <button
            className="featured-details-button"
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onOpen(project)
            }}
          >
            View project details <ArrowUpRight size={14} />
          </button>
        </div>
        <p className="featured-scope-note">{project.additionalInfo}</p>
      </div>
      <div className="featured-project-visual" aria-label="FleetX PH mobile app screenshot">
        <span className="featured-orbit featured-orbit--one" aria-hidden="true" />
        <span className="featured-orbit featured-orbit--two" aria-hidden="true" />
        <motion.div
          className="device-mockup"
          initial={{ rotate: 5, y: 18 }}
          whileInView={{ rotate: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="device-frame">
            <div className="device-side-button" />
            <div className="device-screen">
              <img
                className="device-screenshot"
                src={mobileScreenshot.src}
                alt={mobileScreenshot.alt}
              />
            </div>
          </div>
        </motion.div>
        <span className="featured-visual-caption">FLEETX PH MOBILE APP</span>
      </div>
    </motion.article>
  )
}

export default FeaturedProject
