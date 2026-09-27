// Mock data — field names mirror the eventual SQL schema so the backend swap-in is a drop-in replacement.
// Tables: users, skills, user_skills, connections, sessions, reviews, learning_plans, plan_milestones

export const skills = [
  { id: 'skl_01', name: 'JavaScript' },
  { id: 'skl_02', name: 'Python' },
  { id: 'skl_03', name: 'UI Design' },
  { id: 'skl_04', name: 'Public Speaking' },
  { id: 'skl_05', name: 'Spanish' },
  { id: 'skl_06', name: 'Guitar' },
  { id: 'skl_07', name: 'Photography' },
  { id: 'skl_08', name: 'Creative Writing' },
  { id: 'skl_09', name: 'Yoga' },
  { id: 'skl_10', name: 'Data Analysis' },
  { id: 'skl_11', name: 'Cooking' },
  { id: 'skl_12', name: 'Video Editing' },
]

export const users = [
  {
    id: 'usr_01',
    name: 'Ava Thompson',
    email: 'ava@college.edu',
    password: 'demo1234',
    college: 'Riverside College',
    bio: 'Frontend dev who loves sketching interfaces before opening the editor.',
    avatarInitials: 'AT',
    level: 'Intermediate',
    availability: 'Weekends',
    ratingAvg: 4.8,
    sessionsCompleted: 12,
    badges: ['First Swap', '10 Sessions'],
  },
  {
    id: 'usr_02',
    name: 'Marcus Lee',
    email: 'marcus@college.edu',
    password: 'demo1234',
    college: 'Riverside College',
    bio: 'Data analyst by day, home cook by night. Happy to trade either.',
    avatarInitials: 'ML',
    level: 'Advanced',
    availability: 'Weekday evenings',
    ratingAvg: 4.6,
    sessionsCompleted: 8,
    badges: ['First Swap'],
  },
  {
    id: 'usr_03',
    name: 'Priya Nair',
    email: 'priya@college.edu',
    password: 'demo1234',
    college: 'Lakeview University',
    bio: 'Design student collecting skills like stickers. Ask me about typography.',
    avatarInitials: 'PN',
    level: 'Beginner',
    availability: 'Flexible',
    ratingAvg: 5.0,
    sessionsCompleted: 4,
    badges: ['First Swap', 'Great Reviewer'],
  },
  {
    id: 'usr_04',
    name: 'Diego Ramos',
    email: 'diego@college.edu',
    password: 'demo1234',
    college: 'Lakeview University',
    bio: 'Native Spanish speaker learning to speak in front of crowds.',
    avatarInitials: 'DR',
    level: 'Intermediate',
    availability: 'Weekends',
    ratingAvg: 4.4,
    sessionsCompleted: 6,
    badges: [],
  },
  {
    id: 'usr_05',
    name: 'Hana Kobayashi',
    email: 'hana@college.edu',
    password: 'demo1234',
    college: 'Hillcrest Institute',
    bio: 'Guitarist, photographer, and serial workshop attendee.',
    avatarInitials: 'HK',
    level: 'Advanced',
    availability: 'Weekday evenings',
    ratingAvg: 4.9,
    sessionsCompleted: 15,
    badges: ['First Swap', '10 Sessions', 'Mentor'],
  },
  {
    id: 'usr_06',
    name: 'Noah Fields',
    email: 'noah@college.edu',
    password: 'demo1234',
    college: 'Riverside College',
    bio: 'English major who will proofread anything once you show me Excel tricks.',
    avatarInitials: 'NF',
    level: 'Beginner',
    availability: 'Flexible',
    ratingAvg: 4.2,
    sessionsCompleted: 2,
    badges: ['First Swap'],
  },
  {
    id: 'usr_07',
    name: 'Zoe Bennett',
    email: 'zoe@college.edu',
    password: 'demo1234',
    college: 'Hillcrest Institute',
    bio: 'Yoga instructor trading stretches for spreadsheets.',
    avatarInitials: 'ZB',
    level: 'Intermediate',
    availability: 'Weekends',
    ratingAvg: 4.7,
    sessionsCompleted: 9,
    badges: ['10 Sessions'],
  },
  {
    id: 'usr_08',
    name: 'Ethan Cole',
    email: 'ethan@college.edu',
    password: 'demo1234',
    college: 'Lakeview University',
    bio: 'Filmmaking student. I edit, color, and over-caffeinate.',
    avatarInitials: 'EC',
    level: 'Intermediate',
    availability: 'Weekday evenings',
    ratingAvg: 4.5,
    sessionsCompleted: 7,
    badges: ['First Swap'],
  },
]

// user_skills: { id, user_id, skill_id, type: 'teach' | 'learn' }
export const userSkills = [
  { id: 'us_01', user_id: 'usr_01', skill_id: 'skl_01', type: 'teach' },
  { id: 'us_02', user_id: 'usr_01', skill_id: 'skl_03', type: 'teach' },
  { id: 'us_03', user_id: 'usr_01', skill_id: 'skl_02', type: 'learn' },
  { id: 'us_04', user_id: 'usr_01', skill_id: 'skl_10', type: 'learn' },

  { id: 'us_05', user_id: 'usr_02', skill_id: 'skl_10', type: 'teach' },
  { id: 'us_06', user_id: 'usr_02', skill_id: 'skl_02', type: 'teach' },
  { id: 'us_07', user_id: 'usr_02', skill_id: 'skl_01', type: 'learn' },
  { id: 'us_08', user_id: 'usr_02', skill_id: 'skl_03', type: 'learn' },

  { id: 'us_09', user_id: 'usr_03', skill_id: 'skl_03', type: 'teach' },
  { id: 'us_10', user_id: 'usr_03', skill_id: 'skl_08', type: 'teach' },
  { id: 'us_11', user_id: 'usr_03', skill_id: 'skl_09', type: 'learn' },
  { id: 'us_12', user_id: 'usr_03', skill_id: 'skl_05', type: 'learn' },

  { id: 'us_13', user_id: 'usr_04', skill_id: 'skl_05', type: 'teach' },
  { id: 'us_14', user_id: 'usr_04', skill_id: 'skl_11', type: 'teach' },
  { id: 'us_15', user_id: 'usr_04', skill_id: 'skl_04', type: 'learn' },
  { id: 'us_16', user_id: 'usr_04', skill_id: 'skl_01', type: 'learn' },

  { id: 'us_17', user_id: 'usr_05', skill_id: 'skl_06', type: 'teach' },
  { id: 'us_18', user_id: 'usr_05', skill_id: 'skl_07', type: 'teach' },
  { id: 'us_19', user_id: 'usr_05', skill_id: 'skl_12', type: 'learn' },
  { id: 'us_20', user_id: 'usr_05', skill_id: 'skl_04', type: 'learn' },

  { id: 'us_21', user_id: 'usr_06', skill_id: 'skl_08', type: 'teach' },
  { id: 'us_22', user_id: 'usr_06', skill_id: 'skl_12', type: 'learn' },
  { id: 'us_23', user_id: 'usr_06', skill_id: 'skl_10', type: 'learn' },

  { id: 'us_24', user_id: 'usr_07', skill_id: 'skl_09', type: 'teach' },
  { id: 'us_25', user_id: 'usr_07', skill_id: 'skl_10', type: 'learn' },
  { id: 'us_26', user_id: 'usr_07', skill_id: 'skl_07', type: 'learn' },

  { id: 'us_27', user_id: 'usr_08', skill_id: 'skl_12', type: 'teach' },
  { id: 'us_28', user_id: 'usr_08', skill_id: 'skl_07', type: 'teach' },
  { id: 'us_29', user_id: 'usr_08', skill_id: 'skl_03', type: 'learn' },
  { id: 'us_30', user_id: 'usr_08', skill_id: 'skl_01', type: 'learn' },
]

// connections: { id, requester_id, receiver_id, status: 'pending' | 'accepted' | 'rejected', created_at }
export const connections = [
  { id: 'con_01', requester_id: 'usr_01', receiver_id: 'usr_02', status: 'accepted', created_at: '2026-09-01' },
  { id: 'con_02', requester_id: 'usr_01', receiver_id: 'usr_04', status: 'accepted', created_at: '2026-09-05' },
  { id: 'con_03', requester_id: 'usr_03', receiver_id: 'usr_01', status: 'pending', created_at: '2026-09-12' },
  { id: 'con_04', requester_id: 'usr_01', receiver_id: 'usr_05', status: 'pending', created_at: '2026-09-14' },
  { id: 'con_05', requester_id: 'usr_06', receiver_id: 'usr_02', status: 'pending', created_at: '2026-09-16' },
  { id: 'con_06', requester_id: 'usr_07', receiver_id: 'usr_08', status: 'accepted', created_at: '2026-09-08' },
]

// sessions: { id, connection_id, requester_id, receiver_id, skill_id, scheduled_at, status, meet_note }
export const sessions = [
  {
    id: 'ses_01',
    connection_id: 'con_01',
    requester_id: 'usr_01',
    receiver_id: 'usr_02',
    skill_id: 'skl_10',
    scheduled_at: '2026-09-29T18:00',
    status: 'upcoming',
    meet_note: 'Meet link added at session time',
  },
  {
    id: 'ses_02',
    connection_id: 'con_02',
    requester_id: 'usr_01',
    receiver_id: 'usr_04',
    skill_id: 'skl_05',
    scheduled_at: '2026-10-03T10:30',
    status: 'upcoming',
    meet_note: 'Meet link added at session time',
  },
  {
    id: 'ses_03',
    connection_id: 'con_01',
    requester_id: 'usr_02',
    receiver_id: 'usr_01',
    skill_id: 'skl_01',
    scheduled_at: '2026-09-10T17:00',
    status: 'completed',
    meet_note: 'Meet link added at session time',
  },
  {
    id: 'ses_04',
    connection_id: 'con_06',
    requester_id: 'usr_07',
    receiver_id: 'usr_08',
    skill_id: 'skl_07',
    scheduled_at: '2026-09-20T15:00',
    status: 'completed',
    meet_note: 'Meet link added at session time',
  },
]

// reviews: { id, session_id, reviewer_id, reviewee_id, rating, comment, created_at }
export const reviews = [
  {
    id: 'rev_01',
    session_id: 'ses_03',
    reviewer_id: 'usr_01',
    reviewee_id: 'usr_02',
    rating: 5,
    comment: 'Marcus explained regression in 20 minutes better than my textbook did in 20 pages.',
    created_at: '2026-09-10',
  },
  {
    id: 'rev_02',
    session_id: 'ses_03',
    reviewer_id: 'usr_02',
    reviewee_id: 'usr_01',
    rating: 4,
    comment: 'Great intro to React hooks. Would swap again.',
    created_at: '2026-09-10',
  },
  {
    id: 'rev_03',
    session_id: 'ses_04',
    reviewer_id: 'usr_07',
    reviewee_id: 'usr_08',
    rating: 5,
    comment: 'Ethan gave a full Lightroom walkthrough. Super patient teacher.',
    created_at: '2026-09-20',
  },
]

// learning_plans: { id, user_id, title, created_at }
export const learningPlans = [
  { id: 'lp_01', user_id: 'usr_01', title: 'Data skills plan', created_at: '2026-09-02' },
]

// plan_milestones: { id, plan_id, description, done, position }
export const planMilestones = [
  { id: 'ms_01', plan_id: 'lp_01', description: 'Finish Python basics course', done: true, position: 1 },
  { id: 'ms_02', plan_id: 'lp_01', description: 'Build a small analysis project with Marcus', done: false, position: 2 },
  { id: 'ms_03', plan_id: 'lp_01', description: 'Learn pivot tables + charts', done: false, position: 3 },
  { id: 'ms_04', plan_id: 'lp_01', description: 'Present findings to a study group', done: false, position: 4 },
]

// ---------------- localStorage-backed store ----------------

const STORAGE_KEY = 'skillsync_db_v1'

function seedDb() {
  return {
    users,
    skills,
    userSkills,
    connections,
    sessions,
    reviews,
    learningPlans,
    planMilestones,
  }
}

export function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = seedDb()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }
    return JSON.parse(raw)
  } catch {
    return seedDb()
  }
}

export function saveDb(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  } catch {
    /* storage unavailable — in-memory only */
  }
}

export function resetDb() {
  const seeded = seedDb()
  saveDb(seeded)
  return seeded
}

const SESSION_USER_KEY = 'skillsync_current_user'

export function loadCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_USER_KEY))
  } catch {
    return null
  }
}

export function saveCurrentUser(userId) {
  try {
    localStorage.setItem(SESSION_USER_KEY, JSON.stringify(userId))
  } catch {
    /* noop */
  }
}

export function makeId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`
}

export const skillNameById = (db, skillId) => {
  const s = db.skills.find((sk) => sk.id === skillId)
  return s ? s.name : skillId
}

export const userById = (db, userId) => db.users.find((u) => u.id === userId)
