import { useEffect, useState } from 'react'
import { getSiteInfo, updateSiteInfo, DEFAULT_SITE_INFO } from '../../lib/siteInfoApi'

export function SiteInfoForm() {
  const [values, setValues] = useState(DEFAULT_SITE_INFO)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSiteInfo().then((data) => {
      setValues(data)
      setLoading(false)
    })
  }, [])

  function updateSkill(index, field, value) {
    const next = [...values.skills]
    next[index] = { ...next[index], [field]: value }
    setValues({ ...values, skills: next })
  }

  function addSkillBlock() {
    setValues({ ...values, skills: [...values.skills, { title: '', text: '' }] })
  }

  function removeSkillBlock(index) {
    setValues({ ...values, skills: values.skills.filter((_, i) => i !== index) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await updateSiteInfo(values)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Chargement...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
      <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
        Texte de disponibilité (en haut de la page)
        <input
          type="text"
          value={values.availabilityText}
          onChange={(e) => setValues({ ...values, availabilityText: e.target.value })}
          className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
      </label>

      <label className="mt-5 block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
        Tagline (sous ton nom)
        <textarea
          rows={3}
          value={values.heroTagline}
          onChange={(e) => setValues({ ...values, heroTagline: e.target.value })}
          className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
      </label>

      <label className="mt-5 block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
        Texte "À propos"
        <textarea
          rows={3}
          value={values.aboutText}
          onChange={(e) => setValues({ ...values, aboutText: e.target.value })}
          className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
      </label>

      <div className="mt-6">
        <span className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Blocs de compétences
        </span>
        <div className="mt-3 space-y-4">
          {values.skills.map((skill, i) => (
            <div key={i} className="rounded-lg border border-[var(--line)] p-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={skill.title}
                  onChange={(e) => updateSkill(i, 'title', e.target.value)}
                  placeholder="Titre (ex: Design)"
                  className="w-1/2 rounded-lg border border-[var(--line)] bg-transparent px-3 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="button"
                  onClick={() => removeSkillBlock(i)}
                  className="font-mono text-[10px] uppercase tracking-[.1em] text-[var(--accent)]"
                >
                  Supprimer
                </button>
              </div>
              <textarea
                rows={2}
                value={skill.text}
                onChange={(e) => updateSkill(i, 'text', e.target.value)}
                placeholder="Description"
                className="mt-3 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSkillBlock}
          className="mt-3 rounded-full border border-[var(--line)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[.1em] hover:border-[var(--ink)]"
        >
          + Ajouter un bloc
        </button>
      </div>

      <label className="mt-6 block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
        Texte de contact
        <textarea
          rows={2}
          value={values.contactText}
          onChange={(e) => setValues({ ...values, contactText: e.target.value })}
          className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
      </label>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Email
          <input
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Behance
          <input
            type="url"
            value={values.behance}
            onChange={(e) => setValues({ ...values, behance: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          LinkedIn
          <input
            type="url"
            value={values.linkedin}
            onChange={(e) => setValues({ ...values, linkedin: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          GitHub
          <input
            type="url"
            value={values.github}
            onChange={(e) => setValues({ ...values, github: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[var(--ink)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--bg)] disabled:opacity-50"
        >
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        {saved && <span className="font-mono text-[10px] uppercase tracking-[.1em] text-[var(--accent)]">Enregistré ✓</span>}
      </div>
    </form>
  )
}