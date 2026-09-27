import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { Button } from '../components/ui'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { LoopIcon } from '../components/doodleIcons'

export default function Login() {
  const { actions } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const res = actions.login(form)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="auth-page" style={{ position: 'relative' }}>
      <Doodle
        icon={LoopIcon}
        desktop={{ top: 96, right: '14%', size: 34, rotate: 9 }}
        mobile={{ top: 40, left: '50%', size: 24, rotate: 0 }}
        opacity={0.15}
      />
      <div className="sticky-card sticky-card--bordered auth-card">
        <Reveal delay={0}>
          <h1 className="page-heading">Welcome back</h1>
          <p className="text-muted">
            Demo accounts use any email like <span className="mono-label">ava@college.edu</span> with
            password <span className="mono-label">demo1234</span>.
          </p>
        </Reveal>

        <Reveal delay={100}>
        <form onSubmit={submit} className="auth-form">
          <div className="form-field">
            <label className="form-label" htmlFor="li-email">Email</label>
            <input id="li-email" type="email" value={form.email} onChange={set('email')} placeholder="you@college.edu" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="li-pass">Password</label>
            <input id="li-pass" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-actions">
            <Button variant="primary" arrow type="submit">Log In</Button>
            <span className="text-muted">
              New here? <Link to="/signup">Create an account</Link>
            </span>
          </div>
        </form>
        </Reveal>
      </div>
    </div>
  )
}
