import { Link, useNavigate } from 'react-router-dom'
import { TaglineBadge, Button } from '../components/ui'
import { LogoMark } from '../components/Navbar'
import logoIcon from '../assets/logo-icon.png'
import Reveal from '../components/Reveal'
import Doodle from '../components/Doodle'
import {
  SwapArrowsIcon,
  StarOutlineIcon,
  LightbulbIcon,
  BookIcon,
  SquiggleIcon,
  LoopIcon,
} from '../components/doodleIcons'
import { Repeat, Sparkles, Wrench, HandCoins, Users, ClipboardCheck } from 'lucide-react'

const sketchStyle = {
  position: 'absolute',
  pointerEvents: 'none',
}

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="landing">
      {/* SECTION 2 — HERO */}
      <section className="hero">
        {/* Decorative sketch doodles — hand-drawn monoline, Forest Ink, low opacity */}
        <svg style={sketchStyle} className="sketch sketch--swap" viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M10 22 h74" />
          <path d="M74 10 l14 12 -14 12" />
          <path d="M110 40 h-74" />
          <path d="M46 28 l-14 12 14 12" />
        </svg>
        <svg style={sketchStyle} className="sketch sketch--star" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M30 8 l6.5 15 16.5 1.5 -12.5 11 4 16.5 -14.5 -9 -14.5 9 4 -16.5 -12.5 -11 16.5 -1.5 z" />
        </svg>
        <svg style={sketchStyle} className="sketch sketch--bulb" viewBox="0 0 70 90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M35 8 c-14 0 -23 10 -23 21 0 9 6 14 9 20 2 4 2 7 2 10 h24 c0 -3 0 -6 2 -10 3 -6 9 -11 9 -20 0 -11 -9 -21 -23 -21 z" />
          <path d="M26 68 c2 3 6 4 9 4 s7 -1 9 -4" />
          <path d="M28 77 c2 2 5 3 7 3 s5 -1 7 -3" />
        </svg>
        <svg style={sketchStyle} className="sketch sketch--book" viewBox="0 0 90 70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M45 16 c-8 -6 -20 -8 -32 -6 v44 c12 -2 24 0 32 6" />
          <path d="M45 16 c8 -6 20 -8 32 -6 v44 c-12 -2 -24 0 -32 6" />
          <path d="M20 22 c6 -1 12 0 17 2" />
          <path d="M20 32 c6 -1 12 0 17 2" />
          <path d="M70 22 c-6 -1 -12 0 -17 2" />
        </svg>
        <svg style={sketchStyle} className="sketch sketch--squiggle" viewBox="0 0 160 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M6 14 c14-12 24 10 38-2 s24 10 38-2 24 10 38-2 24 10 34 0" />
        </svg>
        <svg style={sketchStyle} className="sketch sketch--squiggle2" viewBox="0 0 90 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 10 c6 -8 10 6 16 -2 s10 6 16 -2 10 6 16 -2 10 6 16 -2 10 4 16 1" />
        </svg>
        <svg style={sketchStyle} className="sketch sketch--loop" viewBox="0 0 70 70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M35 10 c16 -2 27 10 26 24 -1 15 -13 26 -27 25 -14 -1 -24 -12 -23 -25 1 -12 10 -22 24 -24 6 -1 12 1 16 4" />
        </svg>

        <Doodle
          icon={StarOutlineIcon}
          desktop={{ top: '38%', left: '5%', size: 30, rotate: -12 }}
          opacity={0.13}
        />
        <Doodle
          icon={BookIcon}
          desktop={{ top: '18%', right: '5%', size: 40, rotate: 9 }}
          opacity={0.14}
        />
        <Doodle
          icon={SquiggleIcon}
          desktop={{ top: '72%', left: '8%', size: 46, rotate: 5 }}
          opacity={0.12}
        />
        <Doodle
          icon={LightbulbIcon}
          desktop={{ top: '60%', right: '7%', size: 30, rotate: 12 }}
          opacity={0.12}
        />

        <Reveal delay={0}>
          <TaglineBadge icon={<Repeat size={16} />}>
            Learn something new, teach something you know
          </TaglineBadge>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="hero__headline">
            Skill <span className="hl">swap</span>, not
            <br />
            skill shop.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="hero__subhead">
            SkillSync connects people who want to learn with people who already know how. No fees
            for learning something new — just trade a skill you have for one you want.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero__ctas">
            <Button variant="primary" arrow onClick={() => navigate('/signup')}>
              Create My Profile
            </Button>
            <Link to="/explore">
              <Button variant="mint">Explore Profiles</Button>
            </Link>
          </div>
          <p className="hero__caption">free forever · no credit card · browse before you sign up</p>
        </Reveal>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="section">
        <Doodle
          icon={LoopIcon}
          desktop={{ top: 8, left: 24, size: 40, rotate: -7 }}
          mobile={{ top: -28, left: '50%', size: 24, rotate: 0 }}
          opacity={0.16}
        />
        <Doodle
          icon={StarOutlineIcon}
          desktop={{ top: '45%', left: 12, size: 28, rotate: 12 }}
          opacity={0.12}
        />
        <Doodle
          icon={SquiggleIcon}
          desktop={{ top: '70%', left: 20, size: 44, rotate: -8 }}
          opacity={0.14}
        />
        <Doodle
          icon={SwapArrowsIcon}
          desktop={{ top: '30%', right: 16, size: 48, rotate: 6 }}
          opacity={0.15}
        />
        <Doodle
          icon={LightbulbIcon}
          desktop={{ top: '62%', right: 24, size: 32, rotate: -12 }}
          opacity={0.13}
        />
        <Doodle
          icon={StarOutlineIcon}
          desktop={{ bottom: 8, right: 40, size: 32, rotate: 8 }}
          mobile={{ bottom: -24, left: '50%', size: 24, rotate: 0 }}
          opacity={0.16}
        />
        <Doodle
          icon={BookIcon}
          desktop={{ bottom: -16, left: '38%', size: 36, rotate: 10 }}
          opacity={0.12}
        />
        <Doodle
          icon={LoopIcon}
          desktop={{ top: '18%', right: '2.5%', size: 26, rotate: -9 }}
          opacity={0.12}
        />
        <Doodle
          icon={LightbulbIcon}
          desktop={{ top: '40%', left: '2.5%', size: 34, rotate: 9 }}
          opacity={0.13}
        />
        <div className="how-header">
          <Reveal>
            <TaglineBadge icon={<Wrench size={16} />}>the process</TaglineBadge>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="how__heading">Three steps. Zero cost.</h2>
          </Reveal>
        </div>
        <div className="how-grid">
          <Reveal delay={0}>
            <article className="sticky-card--mint how-card">
              <span className="how-card__num">1</span>
              <h3>List your skills</h3>
              <p>
                Tell us what you're good at and what you're dying to learn. Guitar, Python, public
                speaking — whatever it is.
              </p>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="sticky-card--teal how-card">
              <span className="how-card__num">2</span>
              <h3>Get matched</h3>
              <p>
                We find people whose 'want to learn' matches your 'can teach' — and vice versa.
                Perfect swaps get a special badge.
              </p>
            </article>
          </Reveal>
          <Reveal delay={240}>
            <article className="sticky-card--blush how-card">
              <span className="how-card__num">3</span>
              <h3>Schedule &amp; learn</h3>
              <p>
                Pick a time, hop on a call, and start swapping knowledge. Rate each other after so
                the community stays high-quality.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* SECTION 4 — WHY SKILLSYNC */}
      <section className="section">
        <Doodle
          icon={SquiggleIcon}
          desktop={{ top: 4, left: '6%', size: 44, rotate: -5 }}
          opacity={0.14}
        />
        <Doodle
          icon={LoopIcon}
          desktop={{ top: '30%', right: '3%', size: 36, rotate: 9 }}
          opacity={0.13}
        />
        <Doodle
          icon={StarOutlineIcon}
          desktop={{ bottom: 16, left: '3%', size: 30, rotate: -11 }}
          opacity={0.15}
        />
        <Doodle
          icon={SwapArrowsIcon}
          desktop={{ bottom: -8, right: '7%', size: 46, rotate: 4 }}
          opacity={0.14}
        />
        <Doodle
          icon={BookIcon}
          desktop={{ top: '55%', left: '1.5%', size: 30, rotate: 8 }}
          opacity={0.12}
        />
        <Doodle
          icon={SquiggleIcon}
          desktop={{ bottom: '30%', right: '2%', size: 34, rotate: -8 }}
          opacity={0.12}
        />
        <div className="how-header">
          <Reveal>
            <h2 className="why__heading">Why people are swapping, not shopping</h2>
          </Reveal>
        </div>
        <div className="why-grid">
          <Reveal delay={0}>
            <div className="why-col">
              <HandCoins size={24} />
              <h3>No money changes hands</h3>
              <p>
                Traditional tutoring costs money. SkillSync runs on trade — you teach, you learn,
                everyone wins.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="why-col">
              <Users size={24} />
              <h3>Real people, real skills</h3>
              <p>
                Every profile is a real person with real skills to offer — not a course catalog.
                Learn from someone who's actually excited to teach.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="why-col">
              <ClipboardCheck size={24} />
              <h3>Built for students &amp; self-learners</h3>
              <p>
                Whether you're on campus or just curious, SkillSync makes it easy to find your next
                mentor — or your next student.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — PERFECT MATCH CALLOUT */}
      <section className="section">
        <Doodle
          icon={BookIcon}
          desktop={{ top: -8, right: '4%', size: 44, rotate: 7 }}
          opacity={0.15}
        />
        <Doodle
          icon={LightbulbIcon}
          desktop={{ bottom: -12, left: '4%', size: 40, rotate: -9 }}
          opacity={0.15}
        />
        <Doodle
          icon={StarOutlineIcon}
          desktop={{ top: '40%', right: '1.5%', size: 26, rotate: -14 }}
          opacity={0.12}
        />
        <Doodle
          icon={LoopIcon}
          desktop={{ top: '55%', left: '1.5%', size: 30, rotate: 13 }}
          opacity={0.12}
        />
        <Doodle
          icon={SquiggleIcon}
          desktop={{ top: '20%', left: '5%', size: 40, rotate: 7 }}
          opacity={0.13}
        />
        <Doodle
          icon={SwapArrowsIcon}
          desktop={{ bottom: '12%', right: '5%', size: 42, rotate: -4 }}
          opacity={0.13}
        />
        <Doodle
          icon={StarOutlineIcon}
          desktop={{ top: '12%', left: '2%', size: 24, rotate: 14 }}
          opacity={0.11}
        />
        <Reveal>
          <div className="sticky-card perfect-match">
            <TaglineBadge icon={<Sparkles size={16} />}>our favorite feature</TaglineBadge>
            <h2 className="perfect-match__heading">
              When two people swap exactly what the other wants
            </h2>
            <p className="perfect-match__body">
              We call it a Perfect Match — you teach them what they're learning, they teach you
              what you're learning. It's the cleanest trade on the platform, and we flag it for you
              automatically.
            </p>
          </div>
        </Reveal>
      </section>

      {/* SECTION 6 — FINAL CTA */}
      <section className="final-cta" style={{ position: 'relative' }}>
        <Doodle
          icon={SwapArrowsIcon}
          desktop={{ top: 24, left: 48, size: 48, rotate: -5 }}
          opacity={0.18}
        />
        <Doodle
          icon={SquiggleIcon}
          desktop={{ bottom: 48, right: 48, size: 48, rotate: 6 }}
          opacity={0.16}
        />
        <Doodle
          icon={StarOutlineIcon}
          desktop={{ top: '35%', left: '2%', size: 34, rotate: 10 }}
          opacity={0.14}
        />
        <Doodle
          icon={LightbulbIcon}
          desktop={{ top: '20%', right: '3%', size: 36, rotate: 8 }}
          opacity={0.13}
        />
        <Doodle
          icon={LoopIcon}
          desktop={{ bottom: '18%', left: '6%', size: 28, rotate: -13 }}
          opacity={0.12}
        />
        <Doodle
          icon={BookIcon}
          desktop={{ bottom: 24, right: '6%', size: 38, rotate: -7 }}
          opacity={0.14}
        />
        <Doodle
          icon={SquiggleIcon}
          desktop={{ top: '55%', left: '10%', size: 36, rotate: -9 }}
          opacity={0.12}
        />
        <Doodle
          icon={LoopIcon}
          desktop={{ top: '10%', right: '10%', size: 26, rotate: 14 }}
          opacity={0.11}
        />
        <Reveal delay={0}>
          <h2 className="final-cta__headline">
            Ready to <span className="hl">swap</span>?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="final-cta__subhead">Join people already trading skills on SkillSync.</p>
        </Reveal>
        <Reveal delay={200}>
          <Button variant="primary" arrow onClick={() => navigate('/signup')}>
            Create My Profile
          </Button>
          <p className="hero__caption">takes less than 2 minutes</p>
        </Reveal>
      </section>

      {/* SECTION 7 — FOOTER (always visible, no Reveal) */}
      <footer className="landing__footer" style={{ position: 'relative' }}>
        <Doodle
          icon={SquiggleIcon}
          desktop={{ top: -18, left: '4%', size: 42, rotate: -6 }}
          opacity={0.13}
        />
        <Doodle
          icon={StarOutlineIcon}
          desktop={{ bottom: 16, right: '5%', size: 26, rotate: 11 }}
          opacity={0.12}
        />
        <div className="landing__footer-brand">
          <img src={logoIcon} alt="SkillSync logo" width={28} height={28} />
          <span className="landing__footer-wordmark">SkillSync</span>
          <span className="landing__footer-tagline">Skill swap, not skill shop.</span>
        </div>
        <nav className="landing__footer-links">
          <Link to="/explore">Explore Profiles</Link>
          <span aria-hidden="true">·</span>
          <a href="#how-it-works">How It Works</a>
          <span aria-hidden="true">·</span>
          <Link to="/login">Login</Link>
        </nav>
        <p className="landing__footer-copy">
          © {new Date().getFullYear()} SkillSync. Built for people who love to learn.
        </p>
      </footer>
    </div>
  )
}
