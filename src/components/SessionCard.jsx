import { Button } from './ui'
import { formatDateTime } from '../data/logic'

export default function SessionCard({ session, onMarkComplete, onReview, reviewed }) {
  const upcoming = session.status === 'upcoming'
  return (
    <article className="session-card sticky-card sticky-card--bordered">
      <div className="session-card__row">
        <div className="session-card__info">
          <span className="mono-label text-muted">SESSION</span>
          <h3 className="session-card__skill">{session.skillName}</h3>
          <p className="session-card__meta">
            with <a href={`/profile/${session.partner.id}`}>{session.partner.name}</a> ·{' '}
            {formatDateTime(session.scheduled_at)}
          </p>
          <span className="text-whisper mono-label">{session.meet_note}</span>
        </div>
        <div className="session-card__side">
          <span
            className={`session-card__status session-card__status--${session.status} mono-label`}
          >
            {session.status}
          </span>
          {upcoming && onMarkComplete && (
            <Button variant="outline" onClick={() => onMarkComplete(session.id)}>
              Mark complete
            </Button>
          )}
          {session.status === 'completed' && !reviewed && onReview && (
            <Button variant="primary-compact" arrow onClick={() => onReview(session)}>
              Leave a review
            </Button>
            )}
        </div>
      </div>
    </article>
  )
}
