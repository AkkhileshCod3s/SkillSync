// Plain-JS helpers that simulate the SQL queries — replace with real API calls later.
import { userById, skillNameById } from '../data/mockData'

// users with teach/learn skills attached
export function buildUserProfiles(db) {
  return db.users.map((u) => ({
    ...u,
    teachSkills: db.userSkills
      .filter((us) => us.user_id === u.id && us.type === 'teach')
      .map((us) => skillNameById(db, us.skill_id)),
    learnSkills: db.userSkills
      .filter((us) => us.user_id === u.id && us.type === 'learn')
      .map((us) => skillNameById(db, us.skill_id)),
  }))
}

// Simulated double-JOIN: I teach a skill they want to learn AND they teach one I want to learn.
export function matchScore(db, currentUserId, otherUserId) {
  const mine = db.userSkills.filter((us) => us.user_id === currentUserId)
  const theirs = db.userSkills.filter((us) => us.user_id === otherUserId)

  const iTeach = mine.filter((us) => us.type === 'teach').map((us) => us.skill_id)
  const iWant = mine.filter((us) => us.type === 'learn').map((us) => us.skill_id)
  const theyTeach = theirs.filter((us) => us.type === 'teach').map((us) => us.skill_id)
  const theyWant = theirs.filter((us) => us.type === 'learn').map((us) => us.skill_id)

  const give = iTeach.filter((s) => theyWant.includes(s))
  const get = iWant.filter((s) => theyTeach.includes(s))
  const bothWays = give.length > 0 && get.length > 0
  const oneWay = give.length > 0 || get.length > 0

  const score = Math.min(100, (give.length + get.length) * 25 + (bothWays ? 50 : oneWay ? 25 : 10))

  return {
    score,
    perfect: bothWays,
    giveSkills: give.map((id) => skillNameById(db, id)),
    getSkills: get.map((id) => skillNameById(db, id)),
  }
}

export function filterProfiles(db, profiles, filters) {
  const { skill, level, availability, college } = filters
  return profiles.filter((p) => {
    if (skill) {
      const all = [...p.teachSkills, ...p.learnSkills].map((s) => s.toLowerCase())
      if (!all.some((s) => s.includes(skill.toLowerCase()))) return false
    }
    if (level && p.level !== level) return false
    if (availability && p.availability !== availability) return false
    if (college && p.college !== college) return false
    return true
  })
}

// Connections with both users attached
export function buildConnectionRows(db) {
  return db.connections.map((c) => ({
    ...c,
    requester: userById(db, c.requester_id),
    receiver: userById(db, c.receiver_id),
  }))
}

export function connectionsForUser(db, userId) {
  return buildConnectionRows(db).filter(
    (c) => c.requester_id === userId || c.receiver_id === userId
  )
}

export function acceptedPartners(db, userId) {
  const rows = connectionsForUser(db, userId).filter((c) => c.status === 'accepted')
  return rows.map((c) => (c.requester_id === userId ? c.receiver : c.requester))
}

// Sessions with attached partner + skill name, relative to the current user
export function buildSessionRows(db, userId) {
  return db.sessions
    .filter((s) => s.requester_id === userId || s.receiver_id === userId)
    .map((s) => {
      const partnerId = s.requester_id === userId ? s.receiver_id : s.requester_id
      return {
        ...s,
        partner: userById(db, partnerId),
        skillName: skillNameById(db, s.skill_id),
      }
    })
    .sort((a, b) => (a.scheduled_at < b.scheduled_at ? 1 : -1))
}

export function averageRating(db, userId) {
  const ratings = db.reviews.filter((r) => r.reviewee_id === userId).map((r) => r.rating)
  if (!ratings.length) return null
  return Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
}

export function reviewsForUser(db, userId) {
  return db.reviews
    .filter((r) => r.reviewee_id === userId)
    .map((r) => ({ ...r, reviewer: userById(db, r.reviewer_id) }))
}

export function planForUser(db, userId) {
  const plan =
    db.learningPlans.find((p) => p.user_id === userId) ||
    (() => {
      const created = {
        id: `lp_${Math.random().toString(36).slice(2, 8)}`,
        user_id: userId,
        title: 'My learning plan',
        created_at: new Date().toISOString().slice(0, 10),
      }
      db.learningPlans.push(created)
      return created
    })()
  const milestones = db.planMilestones
    .filter((m) => m.plan_id === plan.id)
    .sort((a, b) => a.position - b.position)
  return { plan, milestones }
}

export function uniqueValues(profiles, key) {
  return [...new Set(profiles.map((p) => p[key]).filter(Boolean))].sort()
}

export function formatDateTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
