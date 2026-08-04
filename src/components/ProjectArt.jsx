export function ProjectArt({ kind, title, colors }) {
  if (kind === 'ecosync')
    return (
      <div className="project-art relative h-full overflow-hidden bg-[#16130E] p-5 text-white sm:p-8">
        <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-[#1F6F5C] opacity-90" />
        <div className="absolute bottom-[-18%] left-[-6%] h-40 w-40 rotate-12 rounded-[38%] border-[14px] border-[#E7B730] opacity-80" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.18em]">
            <span>ecosync west africa</span>
            <span>Impact</span>
          </div>
          <div className="max-w-[260px]">
            <p className="font-display text-4xl leading-[.9] sm:text-5xl">
              Le plastique,<br /><i>traçé</i> et valorisé.
            </p>
            <div className="mt-7 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex justify-between font-mono text-[9px] uppercase text-white/65">
                <span>Collecte du jour</span>
                <span>+18%</span>
              </div>
              <strong className="mt-5 block text-2xl">2 340 kg triés</strong>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-3/4 rounded-full bg-[#E7B730]" />
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[.15em] text-[#E7B730]">Afrique de l'Ouest — Product Design</span>
        </div>
      </div>
    )

  if (kind === 'mova')
    return (
      <div className="project-art relative h-full overflow-hidden bg-[#0D1E3D] p-6 text-[#ECE6D6]">
        <div className="absolute -right-10 top-6 h-52 w-52 rounded-full bg-[#00C87A] opacity-90" />
        <div className="relative flex h-full flex-col justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[.2em]">Mova®</span>
          <div>
            <p className="font-display text-5xl leading-[.85]">
              La finance,<br /><i>sans friction.</i>
            </p>
            <div className="mt-5 flex gap-2">
              <span className="h-5 w-5 rounded-full bg-[#00C87A]" />
              <span className="h-5 w-5 rounded-full border border-[#ECE6D6]" />
            </div>
          </div>
        </div>
      </div>
    )

  if (kind === 'klyss')
    return (
      <div className="project-art relative h-full overflow-hidden bg-[#ECE6D6] p-6 text-[#16130E]">
        <div className="absolute -right-8 top-5 h-52 w-36 rounded-[50%] bg-[#7B61FF] rotate-[25deg]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[.18em]">K-lyss / mobile money</div>
          <p className="max-w-[180px] font-display text-5xl leading-[.86]">
            Payer,<br />c'est <i>simple.</i>
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-[#7B61FF]" /> Dakar, SN
          </div>
        </div>
      </div>
    )

  if (kind === 'djolof')
    return (
      <div className="project-art relative h-full overflow-hidden bg-[#0E0E13] p-6 text-[#ECE6D6]">
        <div className="absolute -right-9 bottom-[-20%] h-56 w-56 rounded-full border-[16px] border-[#6C63FF] opacity-80" />
        <div className="relative flex h-full flex-col justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[.18em]">Djolof Digit / ERP</span>
          <p className="font-display text-5xl leading-[.85]">
            Piloter sa PME<br /><i>en un regard.</i>
          </p>
          <div className="rounded-xl border border-white/15 bg-white/5 p-3 font-mono text-[9px] uppercase text-white/60">
            RH · CRM · Finance · Stock
          </div>
        </div>
      </div>
    )

  if (kind === 'kam')
    return (
      <div className="project-art relative h-full overflow-hidden bg-[#D9B382] p-6 text-[#3b2c1f]">
        <div className="absolute -right-9 top-16 h-52 w-52 rounded-full border-[18px] border-[#7A4B2A]" />
        <div className="relative flex h-full flex-col justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[.18em]">K.A.M / hair & wellness</span>
          <p className="font-display text-5xl leading-[.85]">
            Racines<br /><i>affirmées.</i>
          </p>
          <div className="w-28 rounded-t-[48%] bg-[#7A4B2A] p-3 text-center font-display text-2xl text-[#f4e6d3]">
            K<br /><span className="font-mono text-[7px] uppercase">A · M</span>
          </div>
        </div>
      </div>
    )

  if (kind === 'amfood')
    return (
      <div className="project-art relative h-full overflow-hidden bg-[#231F1B] p-6 text-[#f4ede0]">
        <div className="absolute -left-10 -top-8 h-48 w-48 rounded-full bg-[#B23A1E] opacity-90" />
        <div className="relative flex h-full flex-col justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[.18em]">Am'food / @AMFOOD5</span>
          <p className="font-display text-5xl leading-[.85]">
            Le feu,<br /><i>en image.</i>
          </p>
          <div className="flex gap-2">
            <span className="h-5 w-5 rounded-full bg-[#D98A2B]" />
            <span className="h-5 w-5 rounded-full bg-[#B23A1E]" />
          </div>
        </div>
      </div>
    )

  if (kind === 'jangalma')
    return (
      <div className="project-art relative h-full overflow-hidden bg-[#1F3B57] p-6 text-[#ECE6D6]">
        <div className="absolute -right-10 -bottom-10 h-52 w-52 rounded-full bg-[#E7B730] opacity-85" />
        <div className="relative flex h-full flex-col justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[.18em]">Jangalma / refonte UI</span>
          <p className="font-display text-5xl leading-[.85]">
            Apprendre,<br /><i>autrement.</i>
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[.15em] text-[#E7B730]">Dakar, SN</span>
        </div>
      </div>
    )

  // Fallback used for any project added later from /admin without a custom illustration.
  const c = colors && colors.length ? colors : ['#16130E', '#E7B730', '#ECE6D6']
  return (
    <div className="project-art relative h-full overflow-hidden p-6" style={{ background: c[0], color: c[2] || '#ECE6D6' }}>
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-80" style={{ background: c[1] }} />
      <div className="relative flex h-full flex-col justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[.18em] opacity-80">Projet</span>
        <p className="font-display text-4xl leading-[.9] sm:text-5xl">{title}</p>
        <div className="flex gap-1.5">
          {c.map((color) => (
            <span key={color} className="h-4 w-4 rounded-full border border-white/30" style={{ background: color }} />
          ))}
        </div>
      </div>
    </div>
  )
}