import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../AppContext'
import {
  buildUserProfiles,
  averageRating,
  reviewsForUser,
} from '../data/logic'
import SkillTag from '../components/SkillTag'
import { Avatar, Button, StarRating } from '../components/ui'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { LightbulbIcon, SquiggleIcon, StarOutlineIcon, SwapArrowsIcon } from '../components/doodleIcons'
import { Award } from 'lucide-react'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const AVAILABILITY = ['Flexible', 'Weekday evenings', 'Weekends']

export default function Profile() {
  const { id } = useParams()
  const { db, currentUserId, actions } = useApp()
  const isOwn = id === currentUserId
  const profile = buildUserProfiles(db).find((p) => p.id === id)

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)

  if (!profile) {
    return (
      <div className="page section">
        <h1 className="page-heading">Profile not found</h1>
      </div>
    )
  }

  const rating = averageRating(db, id)
  const reviews = reviewsForUser(db, id)
  const user = db.users.find((u) => u.id === id)

  const setF = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const startEdit = () => {
    setForm({
      name: profile.name,
      bio: profile.bio || '',
      college: profile.college,
      level: profile.level,
      availability: profile.availability,
      teachInput: '',
      learnInput: '',
    })
    setEditing(true)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    actions.saveProfileFields(id, {
      name: form.name,
      bio: form.bio,
      college: form.college,
      level: form.level,
      availability: form.availability,
    })
    ;[form.teachInput, form.learnInput]
      .flatMap((v, i) => v.split(',').map((s) => s.trim()).filter(Boolean).map((s) => ({ s, type: i === 0 ? 'teach' : 'learn' })))
      .forEach(({ s, type }) => actions.addSkill(id, s, type))
    setEditing(false)
  }

  return (
    <div className="page section" style={{ position: 'relative' }}>
      <Doodle
        icon={LightbulbIcon}
        desktop={{ top: 4, right: 32, size: 40, rotate: 7 }}
        opacity={0.15}
      />
      <Doodle
        icon={SquiggleIcon}
        desktop={{ bottom: -20, left: 20, size: 48, rotate: -6 }}
        opacity={0.15}
      />
      <Doodle
        icon={StarOutlineIcon}
        desktop={{ top: '40%', left: 4, size: 26, rotate: 11 }}
        opacity={0.12}
      />
      <Doodle
        icon={SwapArrowsIcon}
        desktop={{ top: '70%', right: 6, size: 42, rotate: -8 }}
        opacity={0.13}
      />
      <Reveal delay={0}>
      <div className="profile-head sticky-card sticky-card--bordered">
        <Avatar initials={profile.avatarInitials} />
        <div className="profile-head__info">
          {editing ? (
            <>
              <input value={form.name} onChange={setF('name')} aria-label="Name" />
              <input value={form.college} onChange={setF('college')} aria-label="College" />
            </>
          ) : (
            <>
              <h1 className="profile-head__name">{profile.name}</h1>
              <span className="mono-label text-muted">{profile.college}</span>
            </>
          )}
          <div className="profile-head__meta">
            <StarRating value={rating || 0} size="sm" />
            <span className="text-muted mono-label">{profile.sessionsCompleted} sessions</span>
          </div>
          <div className="profile-badges">
            {(user?.badges || []).map((b) => (
              <span key={b} className="badge-yellow">
                <Award size={14} /> {b}
              </span>
            ))}
          </div>
        </div>
        {isOwn && !editing && (
          <Button variant="outline" onClick={startEdit}>Edit profile</Button>
        )}
      </div>
      </Reveal>

      <div className="profile-grid">
        <Reveal delay={100}>
        <div className="sticky-card--mint profile-card">
          <h2 className="section-sub">Can teach</h2>
          <div className="tag-wrap">
            {profile.teachSkills.map((s) => (
              <SkillTag key={s} label={s} type="teach" />
            ))}
            {profile.teachSkills.length === 0 && <span className="text-muted">None listed yet.</span>}
          </div>
          {editing && (
            <input
              placeholder="Add teach skills, comma separated"
              value={form.teachInput}
              onChange={setF('teachInput')}
            />
          )}
        </div>
        </Reveal>

        <Reveal delay={200}>
        <div className="sticky-card--teal profile-card">
          <h2 className="section-sub">Wants to learn</h2>
          <div className="tag-wrap">
            {profile.learnSkills.map((s) => (
              <SkillTag key={s} label={s} type="learn" />
            ))}
            {profile.learnSkills.length === 0 && <span className="text-muted">None listed yet.</span>}
          </div>
          {editing && (
            <input
              placeholder="Add learn skills, comma separated"
              value={form.learnInput}
              onChange={setF('learnInput')}
            />
          )}
        </div>
        </Reveal>
      </div>

      <Reveal delay={300}>
      <div className="sticky-card sticky-card--bordered profile-bio-card">
        <h2 className="section-sub">About</h2>
        {editing ? (
          <>
            <textarea rows="3" value={form.bio} onChange={setF('bio')} />
            <div className="profile-edit-row">
              <div className="form-field">
                <label className="form-label" htmlFor="pf-level">Level</label>
                <select id="pf-level" value={form.level} onChange={setF('level')}>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="pf-avail">Availability</label>
                <select id="pf-avail" value={form.availability} onChange={setF('availability')}>
                  {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="profile-edit-row">
              <Button variant="primary-compact" arrow onClick={saveEdit}>Save</Button>
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </>
        ) : (
          <p className="profile-bio">
            {profile.bio || <span className="text-muted">No bio yet.</span>}
          </p>
        )}
      </div>
      </Reveal>

      <div className="sticky-card sticky-card--bordered profile-reviews">
        <h2 className="section-sub">Reviews</h2>
        {reviews.length === 0 && <p className="text-muted">No reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="review-row">
            <Avatar initials={r.reviewer?.avatarInitials || '?'} />
            <div className="review-row__body">
              <div className="review-row__top">
                <span className="review-row__name">{r.reviewer?.name || 'Anonymous'}</span>
                <StarRating value={r.rating} size="sm" />
              </div>
              <p className="review-row__comment">{r.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
