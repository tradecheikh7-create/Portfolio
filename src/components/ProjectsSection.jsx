import { useState } from 'react'
import { filters } from '../data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection({ projects, active, onChangeActive }) {
  const [search, setSearch] = useState('')

  const shown = projects.filter((p) => {
    const matchesCategory = active === 'Tous' || p.type === active

    const query = search.trim().toLowerCase()
    const matchesSearch =
      query === '' ||
      p.title?.toLowerCase().includes(query) ||
      p.client?.toLowerCase().includes(query) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(query))

    return matchesCategory && matchesSearch
  })

  return (
    <section id="work" className="border-t border-[var(--line)] bg-[var(--paper)] py-16 sm:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[var(--accent)]">01 / Selected work</p>
            <h2 className="mt-4 font-display text-5xl tracking-[-.06em] sm:text-7xl">
              Projets choisis<span className="text-[var(--accent)]">.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onChangeActive(filter)}
                className={`btn-lift rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-[.08em] transition focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)] ${
                  active === filter
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                    : 'border-[var(--line)] hover:border-[var(--ink)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2.5 sm:max-w-xs">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--muted)]">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un projet, un tag..."
            className="w-full bg-transparent font-mono text-[11px] uppercase tracking-[.05em] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Effacer la recherche"
              className="shrink-0 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]"
            >
              ×
            </button>
          )}
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {shown.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 60} />
          ))}
          {shown.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-[var(--muted)]">
              Aucun projet ne correspond à cette recherche.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}