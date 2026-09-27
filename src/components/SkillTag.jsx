export default function SkillTag({ label, type = 'teach', onRemove }) {
  return (
    <span className={`skill-tag skill-tag--${type}`}>
      {label}
      {onRemove && (
        <button
          type="button"
          className="skill-tag__remove"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
        >
          ×
        </button>
        )}
    </span>
  )
}
