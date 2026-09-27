import { useState } from 'react'
import { useApp } from '../AppContext'
import { planForUser } from '../data/logic'
import { Button, ProgressBar } from '../components/ui'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { StarOutlineIcon, SquiggleIcon, LoopIcon, BookIcon } from '../components/doodleIcons'

export default function LearningPlan() {
  const { db, currentUserId, actions } = useApp()
  const uid = currentUserId || 'usr_01'
  const { plan, milestones } = planForUser(db, uid)

  const [newMilestone, setNewMilestone] = useState('')

  const done = milestones.filter((m) => m.done).length
  const pct = milestones.length ? (done / milestones.length) * 100 : 0

  const add = (e) => {
    e.preventDefault()
    if (!newMilestone.trim()) return
    actions.addMilestone(newMilestone.trim())
    setNewMilestone('')
  }

  return (
    <div className="page page--narrow section" style={{ position: 'relative' }}>
      <Doodle
        icon={StarOutlineIcon}
        desktop={{ top: 8, right: -8, size: 34, rotate: 8 }}
        opacity={0.15}
      />
      <Doodle
        icon={SquiggleIcon}
        desktop={{ bottom: -16, left: -12, size: 48, rotate: -4 }}
        opacity={0.15}
      />
      <Doodle
        icon={LoopIcon}
        desktop={{ top: '45%', right: -6, size: 26, rotate: 12 }}
        opacity={0.12}
      />
      <Doodle
        icon={BookIcon}
        desktop={{ bottom: '20%', left: -8, size: 30, rotate: 8 }}
        opacity={0.12}
      />
      <Reveal delay={0}>
        <div className="plan-title-row">
          <h1 className="page-heading">Learning Plan</h1>
        </div>
      </Reveal>

      <div className="sticky-card sticky-card--bordered plan-card">
        <Reveal delay={0}>
          <div className="plan-head">
            <span className="section-sub">{plan.title}</span>
            <span className="mono-label text-muted">
              {done}/{milestones.length} done
            </span>
          </div>

          <ProgressBar value={pct} />
        </Reveal>

        <div className="plan-list">
          {milestones.map((m, index) => (
            <Reveal key={m.id} delay={Math.min(index * 80, 400)}>
            <div className={`plan-item ${m.done ? 'plan-item--done' : ''}`}>
              <label className="plan-item__label">
                <input
                  type="checkbox"
                  checked={m.done}
                  onChange={() => actions.toggleMilestone(m.id)}
                />
                <span>{m.description}</span>
              </label>
              <button
                className="plan-item__remove"
                aria-label={`Remove milestone`}
                onClick={() => actions.removeMilestone(m.id)}
              >
                ×
              </button>
            </div>
            </Reveal>
          ))}
          {milestones.length === 0 && (
            <p className="text-muted">No milestones yet — add your first below.</p>
          )}
        </div>

        <form onSubmit={add} className="plan-add">
          <input
            placeholder="Next milestone…"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
          />
          <Button variant="primary-compact" arrow type="submit">Add milestone</Button>
        </form>
      </div>
    </div>
  )
}
