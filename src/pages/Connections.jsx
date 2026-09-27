import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../AppContext'
import { connectionsForUser } from '../data/logic'
import { Avatar, Button } from '../components/ui'
import SkillTag from '../components/SkillTag'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import { LoopIcon, SquiggleIcon, StarOutlineIcon, SwapArrowsIcon } from '../components/doodleIcons'

const TABS = [
  { key: 'sent', label: 'Pending Sent' },
  { key: 'received', label: 'Pending Received' },
  { key: 'accepted', label: 'Accepted' },
]

export default function Connections() {
  const { db, currentUserId, actions } = useApp()
  const [tab, setTab] = useState('sent')

  const all = connectionsForUser(db, currentUserId || 'usr_01')

  const sent = all.filter((c) => c.status === 'pending' && c.requester_id === (currentUserId || 'usr_01'))
  const received = all.filter((c) => c.status === 'pending' && c.receiver_id === (currentUserId || 'usr_01'))
  const accepted = all.filter((c) => c.status === 'accepted')

  const partnerOf = (c) =>
    c.requester_id === (currentUserId || 'usr_01') ? c.receiver : c.requester

  const rows = { sent, received, accepted }[tab]

  return (
    <div className="page section" style={{ position: 'relative' }}>
      <Doodle
        icon={LoopIcon}
        desktop={{ top: 4, right: 48, size: 38, rotate: 9 }}
        opacity={0.15}
      />
      <Doodle
        icon={SquiggleIcon}
        desktop={{ bottom: -16, left: 20, size: 44, rotate: -6 }}
        opacity={0.15}
      />
      <Doodle
        icon={StarOutlineIcon}
        desktop={{ top: '40%', left: 6, size: 28, rotate: -12 }}
        opacity={0.12}
      />
      <Doodle
        icon={SwapArrowsIcon}
        desktop={{ top: '65%', right: 4, size: 44, rotate: 7 }}
        opacity={0.13}
      />
      <h1 className="page-heading">Connections</h1>
      <p className="page-sub">Manage your swap partners and pending requests.</p>

      <Reveal delay={0}>
        <div className="tab-row">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`tab-btn ${tab === t.key ? 'tab-btn--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label} ({rows ? { sent: sent.length, received: received.length, accepted: accepted.length }[t.key] : 0})
            </button>
          ))}
        </div>
      </Reveal>

      <div className="conn-list" key={tab}>
        {rows.length === 0 && <p className="text-muted">Nothing here yet.</p>}
        {rows.map((c, index) => {
          const partner = partnerOf(c)
          return (
            <Reveal key={c.id} delay={Math.min(index * 80, 400)}>
            <div className="sticky-card sticky-card--bordered conn-row">
              <Avatar initials={partner?.avatarInitials} />
              <div className="conn-row__info">
                <Link to={`/profile/${partner?.id}`} className="conn-row__name">
                  {partner?.name || 'Unknown user'}
                </Link>
                <span className="text-muted mono-label">{partner?.college}</span>
              </div>
              <div className="conn-row__skills tag-wrap">
                {(partner?.teachSkills || []).map((s) => (
                  <SkillTag key={s} label={s} type="teach" />
                ))}
              </div>
              <div className="conn-row__actions">
                {tab === 'received' && (
                  <>
                    <Button variant="primary-compact" arrow onClick={() => actions.respondToConnection(c.id, true)}>
                      Accept
                    </Button>
                    <Button variant="outline" onClick={() => actions.respondToConnection(c.id, false)}>
                      Reject
                    </Button>
                  </>
                )}
                {tab === 'sent' && <span className="text-muted mono-label">waiting…</span>}
                {tab === 'accepted' && (
                  <Link to="/sessions">
                    <Button variant="mint">Schedule session</Button>
                  </Link>
                )}
              </div>
            </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
