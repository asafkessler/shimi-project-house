'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <div ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">

      {/* ── Background layers ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        {/* Deep forest base */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #1a2e1e 0%, #0e1a11 40%, #0b1410 100%)',
          }}
        />

        {/* Floating organic blobs */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, -50, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="blob absolute top-[8%] left-[12%] w-[480px] h-[380px] opacity-25"
          style={{ background: 'rgba(74, 122, 82, 0.5)' }}
        />
        <motion.div
          animate={{ x: [0, -50, 20, 0], y: [0, 40, -30, 0], scale: [1, 0.9, 1.08, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="blob absolute bottom-[15%] right-[10%] w-[420px] h-[350px] opacity-20"
          style={{ background: 'rgba(192, 122, 74, 0.4)' }}
        />
        <motion.div
          animate={{ x: [0, 30, -40, 0], y: [0, -20, 30, 0], scale: [1, 1.05, 0.92, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="blob absolute top-[40%] right-[25%] w-[300px] h-[280px] opacity-15"
          style={{ background: 'rgba(122, 170, 130, 0.35)' }}
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(11,20,16,0.6) 100%)',
          }}
        />

        {/* Fine grain overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10"
        style={{ background: 'linear-gradient(to top, #0b1410, transparent)' }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center justify-center gap-5 mb-10"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-sage/50" />
          <span className="text-sage-light/70 text-[11px] tracking-[0.4em] uppercase font-light font-body">
            Music · Production · Space
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-sage/50" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display text-[56px] sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] mb-6"
        >
          <span className="text-text block">A Place</span>
          <span className="text-sage-shimmer italic block mt-2">for Sound</span>
          <span className="text-text block mt-2">to Breathe</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="text-text-muted/80 text-base md:text-lg max-w-xl mx-auto mb-14 leading-relaxed font-light tracking-wide"
        >
          A sanctuary for musicians — where craft, silence, and creativity
          meet to make something worth remembering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/book/mixing"
            className="btn-sage px-9 py-4 rounded-2xl text-sm font-semibold tracking-wide animate-pulse-sage relative overflow-hidden"
          >
            <span>Book a Session</span>
          </Link>
          <a
            href="#services"
            className="btn-ghost px-9 py-4 rounded-2xl text-sm font-medium tracking-wide"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="mt-20 flex justify-center"
        >
          <div className="waveform scale-[1.6]">
            <span /><span /><span /><span /><span /><span /><span />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-text-dim text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-sage/30 to-transparent"
        />
      </motion.div>
    </div>
  )
}
