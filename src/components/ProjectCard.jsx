import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Arrow } from './Icons'
import { ProjectArt } from './ProjectArt'
import { Reveal } from './Reveal'

export function ProjectCard({ project, delay = 0 }) {
  const artRef = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  function handleMouseMove(e) {
    const el = artRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.015)`
  }

  function handleMouseLeave() {
    if (artRef.current) artRef.current.style.transform = ''
  }

  return (
    <Reveal delay={delay}>
      <Link
        to={`/projets/${project.id}`}
        className="project-card group block text-left focus:outline-2 focus:outline-offset-4 focus:outline-[var(--accent)]"
      >
        <div
          ref={artRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`tilt-wrap overflow-hidden ${project.wide ? 'aspect-[1.5/1]' : 'aspect-[1.15/1]'}`}
        >
          {project.cover ? (
            <>
              {!imgLoaded && <div className="shimmer h-full w-full" />}
              <img
                src={project.cover}
                alt={project.title}
                onLoad={() => setImgLoaded(true)}
                className={`project-art h-full w-full object-cover ${imgLoaded ? '' : 'hidden'}`}
              />
            </>
          ) : (
            <ProjectArt kind={project.art} title={project.title} colors={project.colors} />
          )}
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] items-start gap-3">
          <div>
            <h3 className="font-display text-3xl tracking-[-.05em]">{project.title}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
              {project.type} · {project.year}
            </p>
          </div>
          <span className="project-arrow grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] transition-all">
            <Arrow diagonal />
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="flex gap-1.5">
            {(project.colors || []).map((color) => (
              <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            ))}
          </div>
          {(project.tags || []).map((tag) => (
            <span key={tag} className="font-mono text-[9px] uppercase tracking-[.06em] text-[var(--muted)]">
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </Reveal>
  )
}