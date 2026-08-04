export function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Étude de cas ${project.title}`}
      className="fixed inset-0 z-50 grid place-items-end bg-black/45 p-3 backdrop-blur-sm sm:place-items-center"
      onMouseDown={onClose}
    >
      <article
        className="w-full max-w-2xl rounded-[1.5rem] bg-[var(--paper)] p-6 text-[var(--ink)] shadow-2xl sm:p-10"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[var(--accent)]">
              Case study / {project.year}
            </p>
            <h2 className="mt-3 font-display text-5xl tracking-[-.06em]">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] font-mono text-sm hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <div className="mt-8 grid gap-7 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[var(--muted)]">Le défi</p>
            <p className="mt-2 text-sm leading-6">Clarifier une offre ambitieuse sans perdre son caractère local et humain.</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[var(--muted)]">La démarche</p>
            <p className="mt-2 text-sm leading-6">Recherche, architecture, wireframes, système visuel puis prototype React.</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[var(--muted)]">Le résultat</p>
            <p className="mt-2 text-sm leading-6">Une expérience plus directe, mémorable et prête à faire grandir la marque.</p>
          </div>
        </div>

        <button onClick={onClose} className="mt-9 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--accent)]">
          Fermer l'étude →
        </button>
      </article>
    </div>
  )
}
