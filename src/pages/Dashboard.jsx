import { Link } from 'react-router-dom'
import { useApp } from '../AppContext'
import { buildSessionRows, connectionsForUser, buildUserProfiles } from '../data/logic'
import SkillTag from '../components/SkillTag'
import { Button } from '../components/ui'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { SwapArrowsIcon, LoopIcon, BookIcon, SquiggleIcon } from '../components/doodleIcons'

export default function Dashboard() {
  const { db, currentUserId } = useApp()
  const uid = currentUserId || 'usr_01'
  const user = db.users.find((u) => u.id === uid)

  const sessions = buildSessionRows(db, uid)
  const upcoming = sessions.filter((s) => s.status === 'upcoming')
  const pendingReceived = connectionsForUser(db, uid).filter(
    (c) => c.status === 'pending' && c.receiver_id === uid
  )
  const myProfile = buildUserProfiles(db).find((p) => p.id === uid)

  return (
    <>
    <div className="sec sec--cream" style={{ position: 'relative' }}>
      <div className="page section">
      <Doodle
        icon={SwapArrowsIcon}
        desktop={{ top: 8, right: 40, size: 44, rotate: -6 }}
        opacity={0.15}
      />
      <Doodle
        icon={BookIcon}
        desktop={{ top: '45%', left: 6, size: 30, rotate: 9 }}
        opacity={0.12}
      />
      <Reveal delay={0}>
        <h1 className="page-heading">
          Hey {user?.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="page-sub">Here's where your swaps stand today.</p>
      </Reveal>

      <div className="dash-grid">
        <Reveal delay={0}>
        <div className="sticky-card--mint dash-card">
          <span className="mono-label text-muted">UPCOMING SESSIONS</span>
          <span className="dash-card__num">{upcoming.length}</span>
          <p className="text-muted">
            {upcoming.length
              ? `${upcoming[0].skillName} with ${upcoming[0].partner.name}`
              : 'Nothing scheduled yet.'}
          </p>
          <Link to="/sessions"><Button variant="outline">Go to sessions</Button></Link>
        </div>
        </Reveal>

        <Reveal delay={100}>
        <div className="sticky-card--teal dash-card">
          <span className="mono-label text-muted">PENDING REQUESTS</span>
          <span className="dash-card__num">{pendingReceived.length}</span>
          <p className="text-muted">
            {pendingReceived.length
              ? `${pendingReceived[0].requester.name} wants to swap!`
              : 'No new requests.'}
          </p>
          <Link to="/connections"><Button variant="outline">Go to connections</Button></Link>
        </div>
        </Reveal>

        <Reveal delay={200}>
        <div className="sticky-card--blush dash-card">
          <span className="mono-label text-muted">MY SKILLS</span>
          <span className="dash-card__num">{myProfile?.teachSkills.length || 0}</span>
          <div className="tag-wrap">
            {(myProfile?.teachSkills || []).slice(0, 3).map((s) => (
              <SkillTag key={s} label={s} type="teach" />
            ))}
          </div>
          <Link to={`/profile/${uid}`}><Button variant="outline">My profile</Button></Link>
        </div>
        </Reveal>
      </div>

      </div>
    </div>

    <section className="sec sec--black" style={{ position: 'relative' }}>
      <Doodle
        icon={LoopIcon}
        desktop={{ top: 24, left: 16, size: 36, rotate: 8 }}
        opacity={0.18}
      />
      <Doodle
        icon={SquiggleIcon}
        desktop={{ bottom: 24, right: 24, size: 40, rotate: -7 }}
        opacity={0.16}
      />
      <div className="page section">
      <Reveal delay={300}>
        <h2 className="section-sub">Quick actions</h2>
        <div className="dash-quick">
          <Link to="/explore"><Button variant="mint" arrow>Explore profiles</Button></Link>
          <Link to="/connections"><Button variant="teal" arrow>Connections</Button></Link>
          <Link to="/sessions"><Button variant="blush" arrow>Sessions</Button></Link>
          <Link to="/learning-plan"><Button variant="mint" arrow>Learning Plan</Button></Link>
        </div>
      </Reveal>
      </div>
    </section>
    </>
  )
}
