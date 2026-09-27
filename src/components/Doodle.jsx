import { useEffect, useState } from 'react';

// Responsive positions: desktop = { top, left, right, bottom, size, rotate };
// mobile = same shape or null (null hides the doodle on ≤480px phones).
export default function Doodle({
  icon: Icon,
  desktop = {},
  mobile = null,
  opacity = 0.18,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile && !mobile) return null; // hide on phone if no mobile position given

  const pos = isMobile ? mobile : desktop;
  const size = isMobile ? Math.min(pos.size ?? 24, 24) : (pos.size ?? 40);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        right: pos.right,
        bottom: pos.bottom,
        width: size,
        height: size,
        opacity,
        transform: `rotate(${pos.rotate ?? 0}deg)`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Icon />
    </div>
  );
}
