'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { label: 'Mixing Services', href: '/services/mixing', desc: 'Professional audio mixing & mastering' },
  { label: 'Production Retreat', href: '/services/retreat', desc: 'Creative immersion packages' },
  { label: 'Studio Rental', href: '/services/studio-rental', desc: 'Studio & accommodation by day' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  const navLinkClass =
    'text-sm font-medium text-text-muted hover:text-gold transition-colors duration-200 tracking-wide'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled || !isHome || mobileOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="waveform opacity-80 group-hover:opacity-100 transition-opacity">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="font-heading text-sm sm:text-base text-gold font-semibold tracking-[0.15em] uppercase">
            Shimi Project House
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={`${navLinkClass} flex items-center gap-1`}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-surface border border-border rounded-xl shadow-card overflow-hidden"
                >
                  <div className="p-2">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-lg hover:bg-surface-2 transition-colors group"
                      >
                        <span className="text-sm font-medium text-text group-hover:text-gold transition-colors">
                          {s.label}
                        </span>
                        <span className="text-xs text-text-dim">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isHome ? (
            <>
              <a href="#about" className={navLinkClass}>About</a>
              <a href="#contact" className={navLinkClass}>Contact</a>
            </>
          ) : (
            <>
              <Link href="/#about" className={navLinkClass}>About</Link>
              <Link href="/#contact" className={navLinkClass}>Contact</Link>
            </>
          )}

          <Link
            href="/book/mixing"
            className="btn-gold px-5 py-2 rounded-lg text-sm font-semibold tracking-wide"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-text-muted transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-muted transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-muted transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface border-t border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <p className="text-xs text-text-dim uppercase tracking-widest font-medium">Services</p>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-text-muted hover:text-gold transition-colors py-1"
                >
                  {s.label}
                </Link>
              ))}
              <hr className="border-border" />
              <a href={isHome ? '#about' : '/#about'} className="text-text-muted hover:text-gold transition-colors py-1">
                About
              </a>
              <a href={isHome ? '#contact' : '/#contact'} className="text-text-muted hover:text-gold transition-colors py-1">
                Contact
              </a>
              <Link
                href="/book/mixing"
                className="btn-gold px-5 py-3 rounded-lg text-sm font-semibold text-center mt-2"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
