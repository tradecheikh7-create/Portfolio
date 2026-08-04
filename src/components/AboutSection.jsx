import { Reveal } from './Reveal'

export function AboutSection({ siteInfo }) {
  return (
    <section id="about" className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 sm:px-8 md:grid-cols-[.7fr_1.3fr] md:py-28">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[var(--accent)]">02 / À propos</p>
        <p className="mt-5 font-display text-4xl leading-[.95] tracking-[-.05em]">
          Une pratique<br />entre les mondes.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <p className="max-w-2xl text-xl leading-8 tracking-[-.03em] sm:text-2xl">{siteInfo.aboutText}</p>
        <div className="mt-10 grid gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
          {siteInfo.skills.map((skill, i) => (
            <Reveal key={skill.title} delay={150 + i * 90}>
              <span className="font-mono text-[9px] uppercase tracking-[.13em] text-[var(--muted)]">{skill.title}</span>
              <p className="mt-3 text-sm leading-6">{skill.text}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  )
}