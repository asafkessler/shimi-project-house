'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div ref={ref} className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <motion.div
        style={{ y: bgY }}
        className="hero-bg absolute inset-0 scale-110"
      >
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c07] via-[#0a0a0a] to-background" />

        {/* Atmospheric color clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#c9a84c]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-[#8b6914]/6 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-[#c9a84c]/3 rounded-full blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="gold-divider w-12" />
          <span className="text-gold text-xs tracking-[0.35em] uppercase font-medium">
            Professional Music Production
          </span>
          <div className="gold-divider w-12" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
        >
          <span className="text-text block">Where Sound</span>
          <span className="text-gold-shimmer block italic mt-1">Becomes Art</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          A sanctuary for musicians and artists. Professional mixing, immersive production retreats,
          and world-class studio space — all under one roof.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/book/mixing"
            className="btn-gold px-8 py-4 rounded-xl text-base font-semibold tracking-wide shadow-gold animate-pulse-gold"
          >
            Book a Session
          </Link>
          <a
            href="#services"
            className="btn-outline-gold px-8 py-4 rounded-xl text-base font-medium"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Animated waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="waveform scale-150">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-text-dim text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </div>
  )
}
