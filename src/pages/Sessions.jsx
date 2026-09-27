import { useState } from 'react'
import { useApp } from '../AppContext'
import { buildSessionRows, acceptedPartners } from '../data/logic'
import { userById, skillNameById } from '../data/mockData'
import SessionCard from '../components/SessionCard'
import { Avatar, Button, StarRating } from '../components/ui'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { BookIcon, SquiggleIcon, LoopIcon, StarOutlineIcon } from '../components/doodleIcons'

export default function Sessions() {
  const { db, currentUserId, actions } = useApp()
  const uid = currentUserId || 'usr_01'

  const sessions = buildSessionRows(db, uid)
  const partners = acceptedPartners(db, uid)

  const [form, setForm] = useState({
    connectionId: '',
    skillId: '',
    scheduledAt: '',
  })
  const [reviewFor, setReviewFor] = useState(null)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [notice, setNotice] = useState('')

  const flash = (msg) => {
    setNotice(msg)
    setTimeout(() => setNotice(''), 2500)
  }

  const handleSchedule = (e) => {
    e.preventDefault()
    if (!form.connectionId || !form.skillId || !form.scheduledAt) {
      flash('Pick a connection, a skill, and a time first.')
      return
    }
    const partner = userById(db, form.connectionId)
    actions.scheduleSession({
      connectionId: form.connectionId,
      partnerId: form.connectionId,
      skillId: form.skillId,
      scheduledAt: form.scheduledAt,
    })
    flash(`Session scheduled with ${partner?.name || 'partner'}!`)
    setForm({ connectionId: '', skillId: '', scheduledAt: '' })
  }

  const submitReview = (e) => {
    e.preventDefault()
    if (!rating) {
      flash('Pick a star rating first.')
      return
    }
    actions.submitReview({
      sessionId: reviewFor.id,
      revieweeId: reviewFor.partner.id,
      rating,
      comment: comment.trim(),
    })
    setReviewFor(null)
    setRating(0)
    setComment('')
    flash('Review submitted — thanks!')
  }

  const reviewedSessionIds = db.reviews
    .filter((r) => r.reviewer_id === uid)
    .map((r) => r.session_id)

  // skills the partner teaches, offered to the scheduler
  const skillOptions = form.connectionId
    ? db.userSkills
        .filter((us) => us.user_id === form.connectionId && us.type === 'teach')
        .map((us) => ({ id: us.skill_id, name: skillNameById(db, us.skill_id) }))
    : []

  return (
    <div className="page section" style={{ position: 'relative' }}>
      <Doodle
        icon={BookIcon}
        desktop={{ top: 8, right: 40, size: 40, rotate: 6 }}
        opacity={0.15}
      />
      <Doodle
        icon={SquiggleIcon}
        desktop={{ bottom: -24, left: 24, size: 48, rotate: -5 }}
        opacity={0.15}
      />
      <Doodle
        icon={LoopIcon}
        desktop={{ top: '45%', left: 4, size: 28, rotate: 10 }}
        opacity={0.12}
      />
      <Doodle
        icon={StarOutlineIcon}
        desktop={{ top: '70%', right: 8, size: 30, rotate: -11 }}
        opacity={0.13}
      />
      <Reveal delay={0}>
        <h1 className="page-heading">Sessions</h1>
        <p className="page-sub">Schedule skill swaps with your connections and review completed ones.</p>
      </Reveal>

      {notice && <p className="explore-toast">{notice}</p>}

      <div className="sessions-grid">
        <div className="sessions-list">
          <h2 className="section-sub">Upcoming &amp; past</h2>
          {sessions.length === 0 && <p className="text-muted">No sessions yet — schedule one below.</p>}
          {sessions.map((s, index) => (
            <Reveal key={s.id} delay={Math.min(index * 80, 400)}>
              <SessionCard
                session={s}
                reviewed={reviewedSessionIds.includes(s.id)}
                onMarkComplete={(id) => {
                  actions.completeSession(id)
                  flash('Session marked complete. Leave a review!')
                }}
                onReview={(session) => {
                  setReviewFor(session)
                  setRating(0)
                  setComment('')
                }}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
        <div className="sticky-card sticky-card--bordered schedule-card">
          <h2 className="section-sub">Schedule a session</h2>
          <form onSubmit={handleSchedule} className="schedule-form">
            <div className="form-field">
              <label className="form-label" htmlFor="sc-partner">Connection</label>
              <select
                id="sc-partner"
                value={form.connectionId}
                onChange={(e) => setForm({ ...form, connectionId: e.target.value })}
              >
                <option value="">Choose a connection…</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="sc-skill">Skill to learn</label>
              <select
                id="sc-skill"
                value={form.skillId}
                onChange={(e) => setForm({ ...form, skillId: e.target.value })}
                disabled={!form.connectionId}
              >
                <option value="">
                  {form.connectionId ? 'Choose a skill…' : 'Pick a connection first'}
                </option>
                {skillOptions.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="sc-time">Date &amp; time</label>
              <input
                id="sc-time"
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
              />
            </div>
            <Button variant="primary" arrow type="submit">Schedule Session</Button>
          </form>
        </div>
        </Reveal>
      </div>

      {reviewFor && (
        <div className="modal-backdrop" onClick={() => setReviewFor(null)}>
        <Reveal delay={0}>
        <div
          className="sticky-card sticky-card--bordered review-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="section-sub">Review your session</h2>
          <p className="text-muted">
            How was swapping with {reviewFor.partner.name} on {reviewFor.skillName}?
          </p>
          <form onSubmit={submitReview} className="review-form">
              <StarRating value={rating} onChange={setRating} size="lg" />
              <textarea
                rows="3"
                placeholder="What did you learn? What should they keep doing?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="review-form__actions">
                <Button variant="primary" arrow type="submit">Submit Review</Button>
                <Button variant="outline" type="button" onClick={() => setReviewFor(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Reveal>
        </div>
      )}
    </div>
  )
}
