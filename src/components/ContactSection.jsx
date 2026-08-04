import { Arrow } from './Icons'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

export function ContactSection({ siteInfo }) {
  return (
    <section id="contact" className="border-t border-[var(--line)] bg-[var(--ink)] px-5 py-20 text-[var(--bg)] sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#d9f75b]">03 / Contact</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_.65fr]">
          <Reveal>
            <h2 className="font-display text-[clamp(3.9rem,8vw,8.5rem)] leading-[.8] tracking-[-.07em]">
              Une bonne idée<br /><i className="text-[var(--accent)]">mérite</i> un bel élan.
            </h2>
          </Reveal>
          <Reveal delay={120} className="self-end">
            <p className="max-w-sm text-sm leading-6 text-[var(--muted)]">{siteInfo.contactText}</p>
            <Magnetic
              as="a"
              href={`mailto:${siteInfo.email}`}
              strength={0.15}
              className="mt-6 items-center gap-3 rounded-full bg-[#d9f75b] px-5 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-[#171717] hover:brightness-95"
            >
              {siteInfo.email} <Arrow />
            </Magnetic>
            <div className="mt-10 flex gap-5 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
              <a className="nav-link hover:text-white" href={siteInfo.behance} target="_blank" rel="noopener noreferrer">Behance</a>
              <a className="nav-link hover:text-white" href={siteInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="nav-link hover:text-white" href={siteInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </Reveal>
        </div>
        <div className="mt-20 border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-[.12em] text-[var(--muted)]">
          © 2026 Cheikh Sadibou Ka · Dakar, Sénégal
        </div>
      </div>
    </section>
  )
}