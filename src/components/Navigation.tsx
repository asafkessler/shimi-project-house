'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { label: 'Mixing Services',    href: '/services/mixing',        desc: 'Professional audio mixing' },
  { label: 'Production Retreat', href: '/services/retreat',       desc: 'Creative immersion packages' },
  { label: 'Studio Rental',      href: '/services/studio-rental', desc: 'Studio & accommodation by day' },
]

export default function Navigation() {
  const [scrolled, setScrolled]         = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  const linkClass =
    'text-[13px] font-light text-text-muted/80 hover:text-sage-light transition-colors duration-300 tracking-wider font-body'

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome || mobileOpen
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="waveform opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <span /><span /><span /><span /><span /><span /><span />
          </div>
          <span className="heading-serif text-text text-base tracking-[0.12em] uppercase group-hover:text-sage-light transition-colors duration-300">
            Shimi Project House
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`${linkClass} flex items-center gap-1.5`}>
              Services
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-72"
                  style={{
                    background: 'linear-gradient(160deg, #192519, #111c14)',
                    border: '1px solid rgba(45,64,40,0.9)',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                    overflow: 'hidden',
                  }}
                >
                  <div className="p-2">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex flex-col gap-0.5 px-4 py-3.5 rounded-xl hover:bg-sage/5 transition-colors duration-200 group"
                      >
                        <span className="text-sm font-medium text-text/90 group-hover:text-sage-light transition-colors font-body">
                          {s.label}
                        </span>
                        <span className="text-xs text-text-dim font-light">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isHome ? (
            <>
              <a href="#about"   className={linkClass}>About</a>
              <a href="#contact" className={linkClass}>Contact</a>
            </>
          ) : (
            <>
              <Link href="/#about"   className={linkClass}>About</Link>
              <Link href="/#contact" className={linkClass}>Contact</Link>
            </>
          )}

          <Link
            href="/book/mixing"
            className="btn-sage px-6 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide"
          >
            <span>Book Now</span>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-text-muted/70 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text-muted/70 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text-muted/70 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(17,28,20,0.98)', borderTop: '1px solid rgba(45,64,40,0.6)' }}
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              <p className="text-[10px] text-text-dim uppercase tracking-[0.3em] font-medium">Services</p>
              {services.map((s) => (
                <Link key={s.href} href={s.href}
                  className="text-text-muted/80 hover:text-sage-light transition-colors py-0.5 font-light tracking-wide text-sm">
                  {s.label}
                </Link>
              ))}
              <hr style={{ borderColor: 'rgba(45,64,40,0.5)' }} />
              <a href={isHome ? '#about' : '/#about'}
                className="text-text-muted/80 hover:text-sage-light transition-colors py-0.5 font-light tracking-wide text-sm">
                About
              </a>
              <a href={isHome ? '#contact' : '/#contact'}
                className="text-text-muted/80 hover:text-sage-light transition-colors py-0.5 font-light tracking-wide text-sm">
                Contact
              </a>
              <Link href="/book/mixing"
                className="btn-sage px-5 py-3.5 rounded-xl text-sm font-semibold text-center mt-2">
                <span>Book Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
