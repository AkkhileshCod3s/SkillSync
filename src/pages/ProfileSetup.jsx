import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { Button } from '../components/ui'
import SkillTag from '../components/SkillTag'
import Reveal from '../components/Reveal'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const AVAILABILITY = ['Flexible', 'Weekday evenings', 'Weekends']

export default function ProfileSetup() {
  const { db, currentUserId, actions } = useApp()
  const navigate = useNavigate()
  const user = db.users.find((u) => u.id === currentUserId)

  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    college: user?.college || '',
    level: user?.level || 'Beginner',
    availability: user?.availability || 'Flexible',
  })
  const [teachInput, setTeachInput] = useState('')
  const [learnInput, setLearnInput] = useState('')

  const [teach, setTeach] = useState(() =>
    db.userSkills
      .filter((us) => us.user_id === currentUserId && us.type === 'teach')
      .map((us) => ({
        entryId: us.id,
        label: db.skills.find((s) => s.id === us.skill_id)?.name || '',
      }))
  )
  const [learn, setLearn] = useState(() =>
    db.userSkills
      .filter((us) => us.user_id === currentUserId && us.type === 'learn')
      .map((us) => ({
        entryId: us.id,
        label: db.skills.find((s) => s.id === us.skill_id)?.name || '',
      }))
  )

  const removed = useRef({ teach: [], learn: [] })

  const setP = (k) => (e) => setProfile({ ...profile, [k]: e.target.value })

  const addTag = (list, setList, input, setInput) => {
    const v = input.trim()
    if (!v) return
    if (list.some((t) => t.label.toLowerCase() === v.toLowerCase())) {
      setInput('')
      return
    }
    setList([...list, { entryId: null, label: v }])
    setInput('')
  }

  const handleRemove = (list, setList, kind, tag) => {
    setList(list.filter((t) => t !== tag))
    if (tag.entryId) removed.current[kind].push(tag.entryId)
  }

  const next = () => setStep((s) => Math.min(4, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const finish = () => {
    actions.saveProfileFields(currentUserId, {
      name: profile.name || 'Anonymous',
      bio: profile.bio,
      college: profile.college,
      level: profile.level,
      availability: profile.availability,
    })
    teach.forEach((t) => {
      if (!t.entryId) actions.addSkill(currentUserId, t.label, 'teach')
    })
    learn.forEach((t) => {
      if (!t.entryId) actions.addSkill(currentUserId, t.label, 'learn')
    })
    removed.current.teach.forEach((id) => actions.removeSkill(id))
    removed.current.learn.forEach((id) => actions.removeSkill(id))
    navigate('/dashboard')
  }

  const steps = ['Profile', 'Can teach', 'Want to learn', 'Level & availability']

  return (
    <div className="page page--narrow setup-page">
      <h1 className="page-heading">Set up your profile</h1>
      <p className="page-sub">Four quick steps — you can edit everything later.</p>      <Reveal delay={0} key={`steps-${step}`}>
        <h1 className="page-heading">Set up your profile</h1>
      <div className="setup-steps mono-label">{steps.map((label, i) => (
          <button
            key={label}
            className={`setup-step ${step === i + 1 ? 'setup-step--active' : ''} ${
              step > i + 1 ? 'setup-step--done' : ''
            }`}
            onClick={() => setStep(i + 1)}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>
      </Reveal>

      <Reveal delay={100} key={`step-card-${step}`}>
      <div className="sticky-card sticky-card--bordered setup-card">
        {step === 1 && (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="ps-name">Name</label>
              <input id="ps-name" value={profile.name} onChange={setP('name')} />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="ps-bio">Bio</label>
              <textarea
                id="ps-bio"
                rows="3"
                value={profile.bio}
                onChange={setP('bio')}
                placeholder="What do you love doing? What are you curious about?"
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="ps-college">College</label>
              <input id="ps-college" value={profile.college} onChange={setP('college')} />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="setup-card__title">Skills I can teach</h3>
            <div className="tag-input-row">
              <input
                value={teachInput}
                onChange={(e) => setTeachInput(e.target.value)}
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag(teach, setTeach, teachInput, setTeachInput)
                  }
                }}
              />
              <Button
                variant="outline"
                onClick={() => addTag(teach, setTeach, teachInput, setTeachInput)}
              >
                Add
              </Button>
            </div>
            <div className="tag-wrap">
              {teach.map((t) => (
                <SkillTag
                  key={t.entryId || t.label}
                  label={t.label}
                  type="teach"
                  onRemove={() => handleRemove(teach, setTeach, 'teach', t)}
                />
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="setup-card__title">Skills I want to learn</h3>
            <div className="tag-input-row">
              <input
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag(learn, setLearn, learnInput, setLearnInput)
                  }
                }}
              />
              <Button
                variant="outline"
                onClick={() => addTag(learn, setLearn, learnInput, setLearnInput)}
              >
                Add
              </Button>
            </div>
            <div className="tag-wrap">
              {learn.map((t) => (
                <SkillTag
                  key={t.entryId || t.label}
                  label={t.label}
                  type="learn"
                  onRemove={() => handleRemove(learn, setLearn, 'learn', t)}
                />
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="form-field">
              <label className="form-label" htmlFor="ps-level">Skill level</label>
              <select id="ps-level" value={profile.level} onChange={setP('level')}>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="ps-avail">Availability</label>
              <select id="ps-avail" value={profile.availability} onChange={setP('availability')}>
                {AVAILABILITY.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <p className="text-muted">That's it — save and head to your dashboard.</p>
          </>
        )}

        <div className="setup-nav">
          {step > 1 && <Button variant="outline" onClick={back}>Back</Button>}
          {step < 4 ? (
            <Button variant="primary" arrow onClick={next}>Continue</Button>
          ) : (
            <Button variant="primary" arrow onClick={finish}>Finish Setup</Button>
          )}
        </div>
      </div>
      </Reveal>
    </div>
  )
}
