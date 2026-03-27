'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  href: string
  bookHref: string
  startingAt: string
  accent?: 'sage' | 'copper'
  delay?: number
}

export default function ServiceCard({
  title,
  description,
  icon,
  features,
  href,
  bookHref,
  startingAt,
  accent = 'sage',
  delay = 0,
}: ServiceCardProps) {
  const accentColor  = accent === 'sage' ? '#7aaa82' : '#c07a4a'
  const accentLight  = accent === 'sage' ? '#a8cead' : '#d4956a'
  const accentGlow   = accent === 'sage' ? 'rgba(122,170,130,0.12)' : 'rgba(192,122,74,0.12)'
  const accentBorder = accent === 'sage' ? 'rgba(122,170,130,0.25)' : 'rgba(192,122,74,0.25)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #192519 0%, #111c14 100%)',
        border: '1px solid rgba(45, 64, 40, 0.7)',
        transition: 'box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease',
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
      />

      <div className="p-8 flex flex-col flex-1">

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-all duration-400"
          style={{
            background: `rgba(${accent === 'sage' ? '122,170,130' : '192,122,74'}, 0.08)`,
            border: `1px solid rgba(${accent === 'sage' ? '122,170,130' : '192,122,74'}, 0.2)`,
            color: accentColor,
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className="heading-serif text-2xl mb-4 transition-colors duration-300"
          style={{ color: '#f0e8dc' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-muted/80 text-sm leading-relaxed mb-7 font-light">{description}</p>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-text-muted/70 font-light">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: accentColor, opacity: 0.7 }}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div
          className="pt-6 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(45, 64, 40, 0.6)' }}
        >
          <div>
            <p className="text-text-dim text-[10px] uppercase tracking-[0.2em] mb-1 font-medium">Starting at</p>
            <p
              className="heading-serif text-2xl font-semibold"
              style={{ color: accentLight }}
            >
              {startingAt}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={href}
              className="btn-ghost px-4 py-2 rounded-xl text-xs font-medium tracking-wide"
            >
              Details
            </Link>
            <Link
              href={bookHref}
              className={accent === 'sage' ? 'btn-sage px-4 py-2 rounded-xl text-xs font-semibold tracking-wide' : 'btn-copper px-4 py-2 rounded-xl text-xs font-semibold tracking-wide'}
            >
              <span>Book</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 60px ${accentGlow}` }}
      />
    </motion.div>
  )
}
