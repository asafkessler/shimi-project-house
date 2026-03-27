import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Shimi Project House — Music Producer & Studio',
  description:
    'A sanctuary for musicians. Professional mixing, production retreats, and recording studio with accommodation.',
  keywords: [
    'music producer', 'recording studio', 'mixing', 'mastering',
    'sound engineer', 'production retreat', 'studio rental',
  ],
  openGraph: {
    title: 'Shimi Project House — Music Producer & Studio',
    description: 'A sanctuary for musicians. Professional mixing, production retreats, and recording studio.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-text font-body antialiased overflow-x-hidden">
        <Navigation />
        <main>{children}</main>

        {/* ── Footer ── */}
        <footer
          className="relative overflow-hidden py-16 mt-0"
          style={{ borderTop: '1px solid rgba(45,64,40,0.5)' }}
        >
          {/* Subtle blob */}
          <div
            className="blob absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[200px] opacity-[0.06] pointer-events-none"
            style={{ background: 'rgba(74,122,82,0.6)' }}
          />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="waveform">
                    <span /><span /><span /><span /><span /><span /><span />
                  </div>
                  <span className="heading-serif text-lg text-text/90 tracking-[0.12em] uppercase">
                    Shimi Project House
                  </span>
                </div>
                <p className="text-text-dim text-xs font-light leading-relaxed max-w-xs">
                  A sanctuary for musicians.<br />Where sound becomes art.
                </p>
              </div>

              {/* Links */}
              <nav className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  { label: 'Services',       href: '/#services' },
                  { label: 'About',          href: '/#about' },
                  { label: 'Mixing',         href: '/services/mixing' },
                  { label: 'Retreat',        href: '/services/retreat' },
                  { label: 'Studio Rental',  href: '/services/studio-rental' },
                  { label: 'Contact',        href: '/#contact' },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-text-dim text-xs font-light tracking-wide hover:text-sage-light transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              {/* CTA */}
              <a
                href="/book/mixing"
                className="btn-sage px-6 py-3 rounded-xl text-xs font-semibold tracking-wide shrink-0"
              >
                <span>Book a Session</span>
              </a>
            </div>

            {/* Bottom line */}
            <div
              className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{ borderTop: '1px solid rgba(45,64,40,0.4)' }}
            >
              <p className="text-text-dim text-xs font-light">
                © {new Date().getFullYear()} Shimi Project House. All rights reserved.
              </p>
              <p className="text-text-dim text-xs font-light opacity-50">
                Built with care, tuned with intention.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
