import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { subscribeToProjects, addProject, updateProject, deleteProject, reorderProjects } from '../lib/projectsApi'
import { ProjectForm } from '../components/admin/ProjectForm'
import { SiteInfoForm } from '../components/admin/SiteInfoForm'

export function Admin() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState('projects') // 'projects' | 'settings'
  const [projects, setProjects] = useState([])
  const [mode, setMode] = useState(null) // null | 'add' | project being edited
  const [busy, setBusy] = useState(false)
  const dragIndex = useRef(null)

  useEffect(() => {
    const unsubscribe = subscribeToProjects(setProjects)
    return unsubscribe
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/admin/login')
  }

  async function handleSave(values) {
    setBusy(true)
    try {
      if (mode === 'add') {
        await addProject(values)
      } else {
        await updateProject(mode.id, values)
      }
      setMode(null)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer ce projet ? Cette action est définitive.')) return
    await deleteProject(id)
  }

  function handleDragStart(index) {
    dragIndex.current = index
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  async function handleDrop(index) {
    const from = dragIndex.current
    if (from === null || from === index) return
    const next = [...projects]
    const [moved] = next.splice(from, 1)
    next.splice(index, 0, moved)
    setProjects(next) // optimistic UI
    dragIndex.current = null
    await reorderProjects(next)
  }

  return (
    <div className="min-h-screen page-transition bg-[var(--bg)] px-5 py-10 text-[var(--ink)] sm:px-8">
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[var(--accent)]">Espace admin</p>
            <h1 className="mt-2 font-display text-4xl tracking-[-.05em]">Tableau de bord</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-full border border-[var(--line)] px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] hover:border-[var(--ink)]"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          <button
            onClick={() => setTab('projects')}
            className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] ${
              tab === 'projects' ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]' : 'border-[var(--line)]'
            }`}
          >
            Projets
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] ${
              tab === 'settings' ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]' : 'border-[var(--line)]'
            }`}
          >
            Infos du site
          </button>
        </div>

        {tab === 'settings' && (
          <div className="mt-8">
            <SiteInfoForm />
          </div>
        )}

        {tab === 'projects' && (
          <>
            {!mode && (
              <button
                onClick={() => setMode('add')}
                className="mt-8 rounded-full bg-[var(--accent)] px-5 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-white"
              >
                + Ajouter un projet
              </button>
            )}

            {mode && (
              <div className="mt-8">
                <ProjectForm
                  initial={mode === 'add' ? null : mode}
                  onSave={handleSave}
                  onCancel={() => setMode(null)}
                />
                {busy && <p className="mt-3 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Enregistrement...</p>}
              </div>
            )}

            <p className="mt-10 font-mono text-[9px] uppercase tracking-[.1em] text-[var(--muted)]">
              Glisse-dépose une ligne pour réordonner l'affichage sur le site.
            </p>
            <div className="mt-3 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)]">
              {projects.length === 0 && (
                <p className="p-6 text-sm text-[var(--muted)]">Aucun projet pour l'instant.</p>
              )}
              {projects.map((p, index) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className="flex cursor-move flex-wrap items-center justify-between gap-4 p-5 hover:bg-black/[.02]"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-[var(--muted)]">⠿</span>
                    <div className="flex gap-1">
                      {(p.colors || []).map((c) => (
                        <span key={c} className="h-4 w-4 rounded-full border border-[var(--line)]" style={{ background: c }} />
                      ))}
                    </div>
                    <div>
                      <p className="font-display text-xl tracking-[-.03em]">{p.title}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[.08em] text-[var(--muted)]">
                        {p.type} · {p.year}
                        {p.tags && p.tags.length > 0 ? ` · ${p.tags.map((t) => '#' + t).join(' ')}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode(p)}
                      className="rounded-full border border-[var(--line)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[.1em] hover:border-[var(--ink)]"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-full border border-[var(--line)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--accent)] hover:border-[var(--accent)]"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}