import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const cardAnimation = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ project, onOpen }) {
  const previewImage = project.images?.[0]

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onOpen(project)
  }

  return (
    <motion.article
      className={`project-card project-card--${project.accent}`}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View details for ${project.title}`}
      variants={cardAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -7 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
    >
      <div className={`project-preview${previewImage ? ' project-preview--image' : ''}`}>
        {previewImage ? (
          <img
            className="project-preview-image"
            src={previewImage.src}
            alt={previewImage.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={`project-preview-brand project-preview-brand--${project.accent}`} aria-hidden="true">
            <span className="project-preview-mark">{project.mark}</span>
            <span className="project-preview-category">{project.category}</span>
            <strong>{project.title}</strong>
            {project.status && <span className="project-preview-status">{project.status}</span>}
          </div>
        )}
        <span className="project-number" aria-hidden="true">{project.number}</span>
      </div>
      <div className="project-info">
        <div>
          <div className="project-type-row">
            <p className="project-type">{project.type}</p>
            {project.projectType && <span className="project-client-badge">{project.projectType}</span>}
          </div>
          <h3>{project.title}</h3>
        </div>
        <ArrowUpRight size={19} aria-hidden="true" />
      </div>
      <p className="project-description">{project.description}</p>
      {project.technologies.length > 0 && (
        <ul className="tag-list" aria-label="Technology stack">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      )}
    </motion.article>
  )
}

export default ProjectCard
