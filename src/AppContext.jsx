import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  loadDb,
  saveDb,
  loadCurrentUser,
  saveCurrentUser,
  makeId,
} from './data/mockData'
import { averageRating } from './data/logic'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [db, setDb] = useState(() => loadDb())
  const [currentUserId, setCurrentUserId] = useState(() => loadCurrentUser())

  useEffect(() => {
    saveDb(db)
  }, [db])

  const update = (fn) => setDb((prev) => {
    const next = { ...prev, ...fn(prev) }
    return next
  })

  const actions = {
    signUp({ name, email, password, college }) {
      if (db.users.some((u) => u.email === email)) {
        return { ok: false, error: 'An account with that email already exists — try logging in.' }
      }
      const initials = name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
      const user = {
        id: makeId('usr'),
        name,
        email,
        password,
        college: college || 'Riverside College',
        bio: '',
        avatarInitials: initials || 'SS',
        level: 'Beginner',
        availability: 'Flexible',
        ratingAvg: null,
        sessionsCompleted: 0,
        badges: [],
      }
      update((prev) => ({ users: [...prev.users, user] }))
      setCurrentUserId(user.id)
      saveCurrentUser(user.id)
      return { ok: true }
    },

    login({ email, password }) {
      const user = db.users.find((u) => u.email === email && u.password === password)
      if (!user) return { ok: false, error: 'Invalid email or password.' }
      setCurrentUserId(user.id)
      saveCurrentUser(user.id)
      return { ok: true }
    },

    logout() {
      setCurrentUserId(null)
      saveCurrentUser(null)
    },

    saveProfileFields(userId, fields) {
      update((prev) => ({
        users: prev.users.map((u) => (u.id === userId ? { ...u, ...fields } : u)),
      }))
    },

    addSkill(userId, name, type) {
      update((prev) => {
        let skill = prev.skills.find((s) => s.name.toLowerCase() === name.toLowerCase())
        if (!skill) {
          skill = { id: makeId('skl'), name }
          return {
            skills: [...prev.skills, skill],
            userSkills: [
              ...prev.userSkills,
              { id: makeId('us'), user_id: userId, skill_id: skill.id, type },
            ],
          }
        }
        if (
          prev.userSkills.some(
            (us) => us.user_id === userId && us.skill_id === skill.id && us.type === type
          )
        ) {
          return {}
        }
        return {
          userSkills: [
            ...prev.userSkills,
            { id: makeId('us'), user_id: userId, skill_id: skill.id, type },
          ],
        }
      })
    },

    removeSkill(entryId) {
      update((prev) => ({ userSkills: prev.userSkills.filter((us) => us.id !== entryId) }))
    },

    requestConnection(partnerId) {
      if (!currentUserId) return { ok: false, error: 'Log in first.' }
      if (db.connections.some(
        (c) =>
          (c.requester_id === currentUserId && c.receiver_id === partnerId) ||
          (c.requester_id === partnerId && c.receiver_id === currentUserId)
      )) {
        return { ok: false, error: 'Connection already exists.' }
      }
      const con = {
        id: makeId('con'),
        requester_id: currentUserId,
        receiver_id: partnerId,
        status: 'pending',
        created_at: new Date().toISOString().slice(0, 10),
      }
      update((prev) => ({ connections: [...prev.connections, con] }))
      return { ok: true }
    },

    respondToConnection(connectionId, accept) {
      update((prev) => ({
        connections: prev.connections.map((c) =>
          c.id === connectionId ? { ...c, status: accept ? 'accepted' : 'rejected' } : c
        ),
      }))
    }

    ,
    scheduleSession({ connectionId, partnerId, skillId, scheduledAt }) {
      const ses = {
        id: makeId('ses'),
        connection_id: connectionId,
        requester_id: currentUserId,
        receiver_id: partnerId,
        skill_id: skillId,
        scheduled_at: scheduledAt,
        status: 'upcoming',
        meet_note: 'Meet link added at session time',
      }
      update((prev) => ({ sessions: [...prev.sessions, ses] }))
      return { ok: true }
    },

    completeSession(sessionId) {
      update((prev) => ({
        sessions: prev.sessions.map((s) =>
          s.id === sessionId ? { ...s, status: 'completed' } : s
        ),
      }))
    },

    submitReview({ sessionId, revieweeId, rating, comment }) {
      const review = {
        id: makeId('rev'),
        session_id: sessionId,
        reviewer_id: currentUserId,
        reviewee_id: revieweeId,
        rating,
        comment,
        created_at: new Date().toISOString().slice(0, 10),
      }
      update((prev) => ({ reviews: [...prev.reviews, review] }))
      return { ok: true }
    },

    addMilestone(description) {
      if (!currentUserId || !description.trim()) return
      update((prev) => {
        const plan =
          prev.learningPlans.find((p) => p.user_id === currentUserId) ||
          {
            id: makeId('lp'),
            user_id: currentUserId,
            title: 'My learning plan',
            created_at: new Date().toISOString().slice(0, 10),
          }
        const planExists = prev.learningPlans.some((p) => p.id === plan.id)
        const maxPos = Math.max(
          0,
          ...prev.planMilestones.filter((m) => m.plan_id === plan.id).map((m) => m.position)
        )
        return {
          learningPlans: planExists
            ? prev.learningPlans
            : [...prev.learningPlans, plan],
          planMilestones: [
            ...prev.planMilestones,
            {
              id: makeId('ms'),
              plan_id: plan.id,
              description: description.trim(),
              done: false,
              position: maxPos + 1,
            },
          ],
        }
      })
    },

    toggleMilestone(milestoneId) {
      update((prev) => ({
        planMilestones: prev.planMilestones.map((m) =>
          m.id === milestoneId ? { ...m, done: !m.done } : m
        ),
      }))
    },

    removeMilestone(milestoneId) {
      update((prev) => ({
        planMilestones: prev.planMilestones.filter((m) => m.id !== milestoneId),
      }))
    },
  }

  return <AppContext.Provider value={{ db, currentUserId, actions }}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
