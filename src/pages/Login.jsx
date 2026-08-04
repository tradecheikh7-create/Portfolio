import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError("Email ou mot de passe incorrect.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-screen page-transition place-items-center bg-[var(--bg)] px-5 text-[var(--ink)]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-8">
        <p className="font-mono text-[10px] uppercase tracking-[.15em] text-[var(--accent)]">Espace admin</p>
        <h1 className="mt-3 font-display text-3xl tracking-[-.04em]">Connexion</h1>

        <label className="mt-8 block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
        </label>

        <label className="mt-5 block font-mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
        </label>

        {error && <p className="mt-4 text-sm text-[var(--accent)]">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 w-full rounded-full bg-[var(--ink)] px-5 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-[var(--bg)] disabled:opacity-50"
        >
          {submitting ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}