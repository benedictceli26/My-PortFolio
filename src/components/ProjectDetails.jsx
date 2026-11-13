import { ArrowUpRight, BriefcaseBusiness, CalendarDays, CircleDot, GitFork } from 'lucide-react'

function DetailSection({ title, children, className = '' }) {
  if (!children) return null

  return (
    <section className={`project-detail-section ${className}`}>
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function ProjectDetails({ project }) {
  const metadata = [
    { label: 'Role', value: project.role, icon: BriefcaseBusiness },
    {
      label: project.projectType ? 'Project type' : 'Project context',
      value: project.projectType || project.company,
      icon: CircleDot,
    },
    { label: 'Project activity', value: project.date, icon: CalendarDays },
    { label: 'Status', value: project.status, icon: CircleDot },
  ].filter(({ value }) => value)

  return (
    <div className="project-details-scroll">
      {metadata.length > 0 && (
        <div className="project-metadata">
          {metadata.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <Icon size={15} />
              <span><small>{label}</small>{value}</span>
            </div>
          ))}
        </div>
      )}

      <DetailSection title="Overview">
        {project.description && <p>{project.description}</p>}
      </DetailSection>

      <DetailSection title="The Problem">
        {project.problem && <p>{project.problem}</p>}
      </DetailSection>

      <DetailSection title="What I Built">
        {project.whatIBuilt && <p>{project.whatIBuilt}</p>}
      </DetailSection>

      <DetailSection title="The Result">
        {project.results && <p>{project.results}</p>}
      </DetailSection>

      <DetailSection title="Highlights" className="project-statistics">
        {project.statistics.length > 0 ? (
          <ul>{project.statistics.map((statistic) => <li key={statistic.label}><strong>{statistic.value}</strong><span>{statistic.label}</span></li>)}</ul>
        ) : undefined}
      </DetailSection>

      <DetailSection title="Engineering Details">
        {project.engineeringDetails && <p>{project.engineeringDetails}</p>}
      </DetailSection>

      <DetailSection title="Additional Information">
        {project.additionalInfo && <p>{project.additionalInfo}</p>}
      </DetailSection>

      <div className="project-modal-links">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Visit project <ArrowUpRight size={15} />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            <GitFork size={15} /> Source code <ArrowUpRight size={15} />
          </a>
        )}
        {!project.liveUrl && !project.githubUrl && (
          <span className="modal-unavailable">No project links provided.</span>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
