export default function GraphBackground() {
  return (
    <div
      aria-hidden="true"
      className="graph-background"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(26,51,0,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,51,0,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0, 0 0',
      }}
    />
  );
}
