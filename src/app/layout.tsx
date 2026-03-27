import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Shimi Project House — Music Producer & Studio',
  description:
    'Professional music production, mixing, mastering, and recording studio. Offering mixing services, production retreats, and studio rental with accommodation.',
  keywords: [
    'music producer',
    'recording studio',
    'mixing',
    'mastering',
    'sound engineer',
    'production retreat',
    'studio rental',
  ],
  openGraph: {
    title: 'Shimi Project House — Music Producer & Studio',
    description:
      'Professional music production, mixing, and recording studio services.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-text font-body antialiased overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
        <footer className="border-t border-border py-10 mt-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="waveform">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="font-heading text-lg text-gold font-semibold tracking-wider">
                  SHIMI PROJECT HOUSE
                </span>
              </div>
              <nav className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
                <a href="/#services" className="hover:text-gold transition-colors">
                  Services
                </a>
                <a href="/#about" className="hover:text-gold transition-colors">
                  About
                </a>
                <a href="/#contact" className="hover:text-gold transition-colors">
                  Contact
                </a>
                <a href="/services/mixing" className="hover:text-gold transition-colors">
                  Mixing
                </a>
                <a href="/services/retreat" className="hover:text-gold transition-colors">
                  Retreat
                </a>
                <a href="/services/studio-rental" className="hover:text-gold transition-colors">
                  Studio Rental
                </a>
              </nav>
              <p className="text-text-dim text-sm">
                © {new Date().getFullYear()} Shimi Project House
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
