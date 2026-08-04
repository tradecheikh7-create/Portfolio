import { Arrow } from './Icons'

export function Hero({ siteInfo }) {
  return (
    <section id="top" className="mx-auto max-w-[1320px] px-5 pb-16 pt-16 sm:px-8 md:pb-24 md:pt-24">
      <div className="reveal flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-[var(--muted)]">
        <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--accent)]" /> {siteInfo.availabilityText}
      </div>

      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.35fr_.65fr]">
        <h1 className="reveal-delay font-display text-[clamp(4.3rem,10.8vw,10rem)] leading-[.78] tracking-[-.07em]">
          Cheikh<br /><i className="text-[var(--accent)]">Sadibou</i> Ka<span className="text-[var(--accent)]">.</span>
        </h1>

        <div className="reveal-delay max-w-md border-l border-[var(--line)] pl-5 pb-1">
          <p className="text-sm leading-6 text-[var(--muted)] sm:text-base">{siteInfo.heroTagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-5 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-white hover:brightness-95 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]"
            >
              Voir les projets <Arrow />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 font-mono text-[10px] uppercase tracking-[.1em] hover:border-[var(--ink)]"
            >
              Écrire un mot <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 border-y border-[var(--line)] font-mono text-[10px] uppercase tracking-[.1em] sm:grid-cols-4">
        <div className="border-r border-[var(--line)] py-4">
          <span className="block text-[var(--muted)]">Focus</span>
          <b className="mt-1 block font-medium">Digital craft</b>
        </div>
        <div className="border-r border-[var(--line)] py-4 pl-4">
          <span className="block text-[var(--muted)]">Basé à</span>
          <b className="mt-1 block font-medium">Dakar, SN</b>
        </div>
        <div className="border-r border-[var(--line)] py-4 pl-4">
          <span className="block text-[var(--muted)]">Sélection</span>
          <b className="mt-1 block font-medium">2022—2025</b>
        </div>
        <div className="py-4 pl-4">
          <span className="block text-[var(--muted)]">Discipline</span>
          <b className="mt-1 block font-medium">Design + code</b>
        </div>
      </div>
    </section>
  )
}