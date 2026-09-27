import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { Button } from '../components/ui'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { StarOutlineIcon } from '../components/doodleIcons'

export default function Signup() {
  const { actions } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '' })
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Please fill in name, email, and password.')
      return
    }
    const res = actions.signUp(form)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/profile-setup')
  }

  return (
    <div className="auth-page" style={{ position: 'relative' }}>
      <Doodle
        icon={StarOutlineIcon}
        desktop={{ top: 96, left: '12%', size: 36, rotate: -8 }}
        mobile={{ top: 40, left: '50%', size: 24, rotate: 0 }}
        opacity={0.15}
      />
      <Doodle
        icon={StarOutlineIcon}
        desktop={{ bottom: 96, right: '12%', size: 28, rotate: 6 }}
        opacity={0.15}
      />
      <div className="sticky-card sticky-card--bordered auth-card">
        <Reveal delay={0}>
          <h1 className="page-heading">Create your account</h1>
          <p className="text-muted">No real password needed — this is a demo.</p>
        </Reveal>

        <Reveal delay={100}>
        <form onSubmit={submit} className="auth-form">
          <div className="form-field">
            <label className="form-label" htmlFor="su-name">Name</label>
            <input id="su-name" value={form.name} onChange={set('name')} placeholder="Jordan Rivers" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="su-email">Email</label>
            <input id="su-email" type="email" value={form.email} onChange={set('email')} placeholder="you@college.edu" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="su-pass">Password</label>
            <input id="su-pass" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="su-college">College</label>
            <input id="su-college" value={form.college} onChange={set('college')} placeholder="Riverside College" />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-actions">
            <Button variant="primary" arrow type="submit">Sign Up</Button>
            <span className="text-muted">
              Already have an account? <Link to="/login">Log in</Link>
            </span>
          </div>
        </form>
        </Reveal>
      </div>
    </div>
  )
}
