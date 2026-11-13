import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Code2, Database, Layers3, Server, Smartphone } from 'lucide-react'

const technologyIcons = {
  MongoDB: Database,
  Express: Server,
  React: Layers3,
  'React Native': Smartphone,
  Expo: Smartphone,
  Kotlin: Code2,
  'Jetpack Compose': Layers3,
  Firestore: Database,
  'Cloud Firestore': Database,
  'Node.js': Code2,
}

function ProjectGallery({ project }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = project.images || []
  const activeImage = images[activeIndex]

  useEffect(() => {
    if (images.length < 2) return undefined

    const handleKeyDown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (event.target instanceof HTMLElement && event.target.isContentEditable) return
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return

      event.preventDefault()
      setActiveIndex((index) => (
        (index + (event.key === 'ArrowRight' ? 1 : -1) + images.length) % images.length
      ))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  const goTo = (direction) => {
    setActiveIndex((index) => (index + direction + images.length) % images.length)
  }

  return (
    <section className="project-gallery" aria-label="Project screenshots">
      <div className={`project-gallery-stage${activeImage?.orientation === 'portrait' ? ' project-gallery-stage--portrait' : ''}`}>
        {activeImage ? (
          <>
            <img
              key={activeImage.src}
              className="project-gallery-image"
              src={activeImage.src}
              alt={activeImage.alt}
            />
            {images.length > 1 && (
              <>
                <button
                  className="gallery-arrow gallery-arrow--previous"
                  type="button"
                  aria-label="Previous project image"
                  onClick={() => goTo(-1)}
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  className="gallery-arrow gallery-arrow--next"
                  type="button"
                  aria-label="Next project image"
                  onClick={() => goTo(1)}
                >
                  <ArrowRight size={17} />
                </button>
              </>
            )}
          </>
        ) : (
          <div className={`project-gallery-empty project-gallery-empty--${project.accent}`}>
            <span>{project.mark}</span>
            <p>No project screenshots have been provided yet.</p>
          </div>
        )}
      </div>

      {activeImage && (
        <div className="gallery-caption-row">
          <p>{activeImage.caption}</p>
          <span className="gallery-counter" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} <i>/</i> {String(images.length).padStart(2, '0')}
          </span>
        </div>
      )}

      {images.length > 1 && (
        <div className="gallery-thumbnails" role="group" aria-label="Choose a project screenshot">
          {images.map((image, index) => (
            <button
              key={image.src || image.caption}
              className={`gallery-thumbnail${index === activeIndex ? ' gallery-thumbnail--active' : ''}`}
              type="button"
              aria-label={`Show ${image.caption}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {image.src ? (
                <img src={image.src} alt="" loading="lazy" />
              ) : (
                <span>{String(index + 1).padStart(2, '0')}</span>
              )}
            </button>
          ))}
        </div>
      )}

      <section className="modal-technologies">
        <div className="modal-section-heading">
          <h3>Technology stack</h3>
          <span>{String(project.technologies.length).padStart(2, '0')}</span>
        </div>
        {project.technologies.length > 0 ? (
          <ul className="technology-badges">
            {project.technologies.map((technology) => {
              const Icon = technologyIcons[technology] || Code2
              return <li key={technology}><Icon size={14} /><span>{technology}</span></li>
            })}
          </ul>
        ) : (
          <p className="modal-unavailable">Technology details not provided.</p>
        )}
      </section>
    </section>
  )
}

export default ProjectGallery
