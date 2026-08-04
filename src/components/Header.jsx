import { Magnetic } from './Magnetic'

export function Header({ dark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color:var(--bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-[11px] font-bold tracking-[-.05em]">
          CSK<span className="text-[var(--accent)]">®</span>
        </a>
        <nav className="hidden items-center gap-7 font-mono text-[10px] uppercase tracking-[.1em] md:flex">
          <a className="nav-link" href="#work">Projets</a>
          <a className="nav-link" href="#about">À propos</a>
          <a className="nav-link" href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDark}
            className="btn-lift rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest hover:border-[var(--accent)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
          <Magnetic
            as="a"
            href="#contact"
            strength={0.15}
            className="hidden rounded-full bg-[var(--ink)] px-4 py-2 font-mono text-[9px] uppercase tracking-[.1em] text-[var(--bg)] sm:block"
          >
            Travaillons ensemble
          </Magnetic>
        </div>
      </div>
    </header>
  )
}