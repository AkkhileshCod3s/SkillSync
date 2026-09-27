import SkillTag from './SkillTag'
import { Avatar, Button } from './ui'
import { Star } from 'lucide-react'

export default function MatchCard({ profile, match, onConnect, connected }) {
  return (
    <article className="match-card sticky-card sticky-card--bordered">
      <div className="match-card__head">
        <Avatar initials={profile.avatarInitials} />
        <div className="match-card__id">
          <h3 className="match-card__name">
            <a href={`/profile/${profile.id}`}>{profile.name}</a>
          </h3>
          <span className="mono-label text-muted">{profile.college}</span>
        </div>
        <div className="match-card__score">
          {match.perfect && (
            <span className="badge-yellow">
              <Star size={14} fill="var(--color-highlighter-yellow)" stroke="var(--color-forest-ink)" /> Perfect Match
            </span>
          )}
          <span className="match-card__pct">{match.score}%</span>
        </div>
      </div>

      {profile.bio && <p className="match-card__bio">{profile.bio}</p>}

      <div className="match-card__tags">
        <div className="match-card__tagrow">
          <span className="mono-label text-muted">CAN TEACH</span>
          <div className="tag-wrap">
            {profile.teachSkills.map((s) => (
              <SkillTag key={s} label={s} type="teach" />
            ))}
          </div>
        </div>
        <div className="match-card__tagrow">
          <span className="mono-label text-muted">WANTS TO LEARN</span>
          <div className="tag-wrap">
            {profile.learnSkills.map((s) => (
              <SkillTag key={s} label={s} type="learn" />
            ))}
          </div>
        </div>
      </div>

      <div className="match-card__foot">
        <span className="text-muted mono-label">
          {profile.level} · {profile.availability}
        </span>
        <Button variant="mint" onClick={onConnect} disabled={connected}>
          {connected ? 'Requested ✓' : 'Connect'}
        </Button>
      </div>
    </article>
  )
}
