import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import ProjectDetails from './ProjectDetails.jsx'
import ProjectGallery from './ProjectGallery.jsx'

function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!project) return undefined

    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusableElements?.length) {
          event.preventDefault()
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
        return
      }

    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previousFocusRef.current instanceof HTMLElement) previousFocusRef.current.focus()
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop"
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.section
            ref={dialogRef}
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 22, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="project-modal-drag-indicator" aria-hidden="true"><span /></div>
            <header className="project-modal-header">
              <div className="project-modal-heading">
                <p>{project.number} <span>project</span></p>
                <h2 id="project-modal-title">{project.title}</h2>
                <span className="project-modal-category">{project.category}</span>
              </div>
              <button
                ref={closeButtonRef}
                className="project-modal-close"
                type="button"
                aria-label="Close project details"
                onClick={onClose}
              >
                <X size={19} />
              </button>
            </header>

            <div className="project-modal-content">
              <ProjectGallery project={project} />
              <ProjectDetails project={project} />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ProjectModal
