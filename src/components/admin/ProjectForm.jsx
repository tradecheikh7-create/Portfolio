import { useEffect, useState } from 'react'
import { uploadProjectImage, deleteProjectImage } from '../../lib/storage'

const CATEGORY_OPTIONS = ['Identité de marque', 'UI/UX Produit', 'Direction artistique']

const EMPTY = {
  title: '',
  client: '',
  type: CATEGORY_OPTIONS[0],
  year: String(new Date().getFullYear()),
  colors: ['#16130E', '#E7B730', '#ECE6D6'],
  wide: false,
  description: '',
  cover: '',
  gallery: [],
  tags: '',
}

export function ProjectForm({ initial, onSave, onCancel }) {
  const [values, setValues] = useState(EMPTY)
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState('')
  const [galleryFiles, setGalleryFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (initial) {
      setValues({
        title: initial.title || '',
        client: initial.client || '',
        type: initial.type || CATEGORY_OPTIONS[0],
        year: initial.year || String(new Date().getFullYear()),
        colors: initial.colors && initial.colors.length === 3 ? initial.colors : EMPTY.colors,
        wide: !!initial.wide,
        description: initial.description || '',
        cover: initial.cover || '',
        gallery: initial.gallery || [],
        tags: (initial.tags || []).join(', '),
      })
      setCoverPreview(initial.cover || '')
    } else {
      setValues(EMPTY)
      setCoverPreview('')
    }
    setCoverFile(null)
    setGalleryFiles([])
  }, [initial])

  function updateColor(index, value) {
    const next = [...values.colors]
    next[index] = value
    setValues({ ...values, colors: next })
  }

  function handleCoverChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  function handleGalleryChange(e) {
    const files = Array.from(e.target.files || [])
    setGalleryFiles((prev) => [...prev, ...files])
  }

  function removeExistingGalleryImage(url) {
    setValues({ ...values, gallery: values.gallery.filter((g) => g !== url) })
  }

  function removeNewGalleryFile(index) {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setUploading(true)
    try {
      let cover = values.cover
      if (coverFile) {
        if (values.cover) await deleteProjectImage(values.cover)
        cover = await uploadProjectImage(coverFile, 'covers')
      }

      const newGalleryUrls = []
      for (const file of galleryFiles) {
        const url = await uploadProjectImage(file, 'gallery')
        newGalleryUrls.push(url)
      }

      const finalValues = {
        ...values,
        cover,
        gallery: [...values.gallery, ...newGalleryUrls],
        tags: values.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }

      await onSave(finalValues)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Titre du projet
          <input
            type="text"
            required
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>

        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Client
          <input
            type="text"
            value={values.client}
            onChange={(e) => setValues({ ...values, client: e.target.value })}
            placeholder="Ex: Jangalma, projet personnel..."
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Catégorie
          <select
            value={values.type}
            onChange={(e) => setValues({ ...values, type: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Année
          <input
            type="text"
            value={values.year}
            onChange={(e) => setValues({ ...values, year: e.target.value })}
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
        </label>
      </div>

      <label className="mt-5 block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
        Description
        <textarea
          rows={4}
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          placeholder="Contexte, défi, démarche, résultat..."
          className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
      </label>

      <label className="mt-5 block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
        Tags (séparés par des virgules)
        <input
          type="text"
          value={values.tags}
          onChange={(e) => setValues({ ...values, tags: e.target.value })}
          placeholder="Ex: fintech, dark mode, mobile"
          className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
        />
      </label>

      <div className="mt-5">
        <span className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Image de couverture
        </span>
        {coverPreview && (
          <img src={coverPreview} alt="" className="mt-2 h-32 w-full rounded-lg object-cover" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="mt-2 w-full text-sm"
        />
      </div>

      <div className="mt-5">
        <span className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Galerie (plusieurs images)
        </span>
        <div className="mt-2 flex flex-wrap gap-3">
          {values.gallery.map((url) => (
            <div key={url} className="relative">
              <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => removeExistingGalleryImage(url)}
                className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--ink)] text-xs text-[var(--bg)]"
              >
                ×
              </button>
            </div>
          ))}
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative">
              <img src={URL.createObjectURL(file)} alt="" className="h-20 w-20 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => removeNewGalleryFile(i)}
                className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--ink)] text-xs text-[var(--bg)]"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className="mt-3 w-full text-sm"
        />
      </div>

      <div className="mt-5">
        <span className="block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Palette (3 couleurs, utilisée si pas d'image de couverture)
        </span>
        <div className="mt-2 flex gap-3">
          {values.colors.map((color, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border border-[var(--line)] bg-transparent"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="w-24 rounded-lg border border-[var(--line)] bg-transparent px-2 py-1.5 font-mono text-xs outline-none focus:border-[var(--accent)]"
              />
            </div>
          ))}
        </div>
      </div>

      <label className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
        <input
          type="checkbox"
          checked={values.wide}
          onChange={(e) => setValues({ ...values, wide: e.target.checked })}
        />
        Afficher en grand format (mise en avant)
      </label>

      <div className="mt-8 flex gap-3">
        <button
          type="submit"
          disabled={uploading}
          className="rounded-full bg-[var(--ink)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--bg)] disabled:opacity-50"
        >
          {uploading ? 'Envoi en cours...' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={uploading}
          className="rounded-full border border-[var(--line)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[.1em]"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}