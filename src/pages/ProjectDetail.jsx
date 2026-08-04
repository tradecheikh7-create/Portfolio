import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProject } from '../lib/projectsApi'
import { Arrow } from '../components/Icons'
import { Reveal } from '../components/Reveal'

export function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getProject(id).then((p) => {
      if (active) {
        setProject(p)
        setLoading(false)
      }
    })
    return () => { active = false }
  }, [id])

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--bg)] font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
        Chargement...
      </div>
    )
  }

  if (!project) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--bg)] text-center text-[var(--ink)]">
        <div>
          <p className="font-display text-3xl">Projet introuvable</p>
          <Link to="/" className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--accent)]">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen page-transition bg-[var(--bg)] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] px-5 py-5 sm:px-8">
        <Link to="/" className="font-mono text-[11px] uppercase tracking-[.1em] hover:text-[var(--accent)]">
          ← Retour aux projets
        </Link>
      </header>

      {project.cover && (
        <div className="aspect-[2/1] w-full overflow-hidden sm:aspect-[2.6/1]">
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mx-auto max-w-[900px] px-5 py-14 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[var(--accent)]">
          {project.type} · {project.year}
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-[-.05em] sm:text-6xl">{project.title}</h1>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-[var(--line)] py-6 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          {project.client && (
            <div>
              <span className="block text-[9px] text-[var(--muted)]">Client</span>
              <span className="mt-1 block text-[var(--ink)]">{project.client}</span>
            </div>
          )}
          <div>
            <span className="block text-[9px] text-[var(--muted)]">Catégorie</span>
            <span className="mt-1 block text-[var(--ink)]">{project.type}</span>
          </div>
          <div>
            <span className="block text-[9px] text-[var(--muted)]">Année</span>
            <span className="mt-1 block text-[var(--ink)]">{project.year}</span>
          </div>
          <div className="flex gap-1.5">
            {(project.colors || []).map((c) => (
              <span key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[9px] uppercase tracking-[.08em] text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {project.description && (
          <p className="mt-10 whitespace-pre-line text-lg leading-8 tracking-[-.01em] text-[var(--ink)]">
            {project.description}
          </p>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-14 -mx-5 flex flex-col gap-6 sm:-mx-8 md:mx-0">
            {project.gallery.map((url, i) => (
              <Reveal key={url} delay={i * 80}>
                <img src={url} alt="" className="w-full" />
              </Reveal>
            ))}
          </div>
        )}

        <Link
          to="/#work"
          className="mt-16 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--accent)]"
        >
          Voir d'autres projets <Arrow diagonal />
        </Link>
      </div>
    </div>
  )
}