import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { Button } from './ui'
import logoNavbar from '../assets/logo-navbar.png'
import logoIcon from '../assets/logo-icon.png'

// Icon-only mark (favicon-style contexts, footer, empty states)
export function LogoMark({ size = 32 }) {
  return <img src={logoIcon} alt="SkillSync logo" width={size} height={size} />
}

export default function Navbar() {
  const { db, currentUserId, actions } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const user = currentUserId ? db.users.find((u) => u.id === currentUserId) : null

  const links = [
    { to: '/explore', label: 'Explore' },
    { to: '/connections', label: 'Connections' },
    { to: '/sessions', label: 'Sessions' },
    { to: '/learning-plan', label: 'Learning Plan' },
  ]

  const handleLogout = () => {
    actions.logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link to="/" className="nav__logo" onClick={() => setOpen(false)}>
          <img src={logoNavbar} alt="SkillSync" style={{ height: '36px', width: 'auto' }} />
        </Link>

        <div className="nav__links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav__auth">
          {user ? (
            <>
              <Link
                to={`/profile/${user.id}`}
                className={`nav__link ${
                  location.pathname === `/profile/${user.id}` ? 'nav__link--active' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button variant="primary-compact" arrow>
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="nav-mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="nav__link" onClick={() => setOpen(false)}>
                My Profile
                </Link>
              <button className="nav__link" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav__link" onClick={() => setOpen(false)}>
                Log in
              </Link>
              <Link to="/signup" className="nav__link" onClick={() => setOpen(false)}>
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
