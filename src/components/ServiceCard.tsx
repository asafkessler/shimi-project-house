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
  accentColor?: string
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
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-glow group relative bg-surface border border-border rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="p-8 flex flex-col flex-1">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-surface-2 border border-border-gold flex items-center justify-center mb-6 text-gold group-hover:border-gold/50 group-hover:bg-surface-3 transition-all duration-400">
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl font-semibold text-text mb-3 group-hover:text-gold-light transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-6">{description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-8 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
              <svg
                className="w-4 h-4 text-gold mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-text-dim text-xs uppercase tracking-wider mb-0.5">Starting at</p>
            <p className="text-gold font-semibold text-xl font-heading">{startingAt}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={href}
              className="btn-outline-gold px-4 py-2 rounded-lg text-sm font-medium"
            >
              Learn More
            </Link>
            <Link
              href={bookHref}
              className="btn-gold px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Book
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-500" />
    </motion.div>
  )
}
