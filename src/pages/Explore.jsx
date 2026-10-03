import { useMemo, useState } from 'react'
import { useApp } from '../AppContext'
import {
  buildUserProfiles,
  matchScore,
  filterProfiles,
  uniqueValues,
} from '../data/logic'
import MatchCard from '../components/MatchCard'
import { Button } from '../components/ui'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { StarOutlineIcon, SquiggleIcon, LoopIcon, LightbulbIcon } from '../components/doodleIcons'

export default function Explore() {
  const { db, currentUserId, actions } = useApp()
  const profiles = useMemo(() => buildUserProfiles(db), [db])

  const [filters, setFilters] = useState({ skill: '', level: '', availability: '', college: '' })
  const [toast, setToast] = useState('')

  const others = profiles.filter((p) => p.id !== currentUserId)
  const filtered = filterProfiles(db, others, filters)
  const levels = uniqueValues(profiles, 'level')
  const availabilities = uniqueValues(profiles, 'availability')
  const colleges = uniqueValues(profiles, 'college')

  const setFilter = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })

  const handleConnect = (profile) => {
    const res = actions.requestConnection(profile.id)
    setToast(res.ok ? `Request sent to ${profile.name}!` : res.error)
    setTimeout(() => setToast(''), 2500)
  }

  return (
    <div className="sec sec--cream" style={{ position: 'relative' }}>
      <Doodle
        icon={StarOutlineIcon}
        desktop={{ top: 8, right: 40, size: 36, rotate: 7 }}
        opacity={0.15}
      />
      <Doodle
        icon={SquiggleIcon}
        desktop={{ bottom: -20, left: 24, size: 48, rotate: -4 }}
        opacity={0.15}
      />
      <Doodle
        icon={LoopIcon}
        desktop={{ top: '35%', left: 24, size: 30, rotate: 11 }}
        opacity={0.12}
      />
      <Doodle
        icon={LightbulbIcon}
        desktop={{ top: '60%', right: 40, size: 34, rotate: -9 }}
        opacity={0.13}
      />
      <div className="page section">
      <Reveal delay={0}>
        <h1 className="page-heading">Explore profiles</h1>
        <p className="page-sub">
          Find people whose skills complement yours. Log in to send connection requests.
        </p>

        <div className="filter-bar">
        <input
          className="filter-bar__skill"
          placeholder="Search any skill…"
          value={filters.skill}
          onChange={setFilter('skill')}
        />
        <select value={filters.level} onChange={setFilter('level')}>
          <option value="">All levels</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select value={filters.availability} onChange={setFilter('availability')}>
          <option value="">Any availability</option>
          {availabilities.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <select value={filters.college} onChange={setFilter('college')}>
          <option value="">Any college</option>
          {colleges.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {(filters.skill || filters.level || filters.availability || filters.college) && (
          <Button
            variant="outline"
            onClick={() => setFilters({ skill: '', level: '', availability: '', college: '' })}
          >
            Clear
          </Button>
        )}
        </div>
      </Reveal>

      {toast && <p className="explore-toast">{toast}</p>}

      <div className="match-grid">
        {filtered.map((p, index) => {
          const match = matchScore(db, currentUserId || 'usr_01', p.id)
          const connected =
            currentUserId &&
            db.connections.some(
              (c) =>
                (c.requester_id === p.id && c.receiver_id === currentUserId) ||
                (c.requester_id === currentUserId && c.receiver_id === p.id)
            )
          return (
            <Reveal key={p.id} delay={Math.min(index * 80, 400)}>
              <MatchCard
                profile={p}
                match={match}
                connected={connected}
                onConnect={() => handleConnect(p)}
              />
            </Reveal>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted">No profiles match those filters — try clearing one.</p>
      )}
      </div>
    </div>
  )
}
