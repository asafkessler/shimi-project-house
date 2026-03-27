'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MIXING_PACKAGES } from '@/types'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const processSteps = [
  {
    step: '01',
    title: 'Send Your Files',
    desc: 'Upload your stems, session files, or raw recordings via a secure link we provide after booking.',
  },
  {
    step: '02',
    title: 'Reference & Brief',
    desc: 'We discuss your sonic vision, reference tracks, and any specific requirements before we begin.',
  },
  {
    step: '03',
    title: 'The Mix',
    desc: 'Your project is worked on in focused sessions — every element sculpted with precision and intent.',
  },
  {
    step: '04',
    title: 'Revisions & Delivery',
    desc: 'You receive a high-quality preview. After revisions, final files are delivered in all required formats.',
  },
]

const genres = [
  'Pop', 'Rock', 'Electronic', 'Hip-Hop', 'R&B', 'Jazz', 'Folk', 'Ambient',
  'Classical', 'Metal', 'Soul', 'Experimental',
]

export default function MixingPage() {
  return (
    <div className="bg-background mixing-bg">
      {/* Hero */}
      <div className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-gold-dark/4 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="gold-divider w-12" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Professional Audio</span>
              <div className="gold-divider w-12" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
              Mixing
              <span className="text-gold-shimmer italic block">Services</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Every element in its place. Every frequency with a purpose. Professional mixing that serves your artistic vision — not just the meters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book/mixing" className="btn-gold px-8 py-4 rounded-xl font-semibold shadow-gold">
                Book a Mix
              </Link>
              <a href="#packages" className="btn-outline-gold px-8 py-4 rounded-xl font-medium">
                View Packages
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-y border-border bg-surface/50 py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '400+', label: 'Tracks Mixed' },
            { value: '15+', label: 'Years Experience' },
            { value: '98%', label: 'Client Retention' },
            { value: '48h', label: 'Turnaround (Rush)' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-heading text-3xl font-bold text-gold mb-1">{s.value}</p>
              <p className="text-text-dim text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What You Get */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">The Approach</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Mixing Philosophy</h2>
            <div className="gold-divider" />
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎚',
                title: 'Analog-Informed',
                desc: 'Hybrid workflow combining the warmth of outboard gear with the precision of the digital domain.',
              },
              {
                icon: '👂',
                title: 'Reference-Led',
                desc: 'Your reference tracks and brief guide every decision. The goal is your vision, realized.',
              },
              {
                icon: '🎛',
                title: 'Genre-Fluent',
                desc: 'From intimate folk recordings to hard-hitting electronic productions — deep experience across all genres.',
              },
              {
                icon: '🔁',
                title: 'Revision-Friendly',
                desc: 'Multiple rounds of revisions included. We work until it sounds right, not until the clock runs out.',
              },
              {
                icon: '📦',
                title: 'Format Flexible',
                desc: 'Delivery in WAV, AIFF, MP3, and streaming-optimized formats. Stems available on request.',
              },
              {
                icon: '📡',
                title: 'Remote-Ready',
                desc: 'Work with clients worldwide. Secure file transfer, video calls, and annotated feedback rounds.',
              },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="card-glow bg-surface border border-border rounded-xl p-6 h-full">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-heading text-lg font-semibold text-text mb-2">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Pricing</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Mixing Packages</h2>
            <div className="gold-divider mb-6" />
            <p className="text-text-muted max-w-md mx-auto text-sm">
              Transparent pricing. No hidden fees. Every package includes direct communication with the engineer.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {MIXING_PACKAGES.map((pkg, i) => (
              <FadeUp key={pkg.id} delay={i * 0.12}>
                <div
                  className={`card-glow relative bg-surface border rounded-2xl p-8 flex flex-col h-full transition-all duration-400 ${
                    pkg.popular
                      ? 'border-gold shadow-gold'
                      : 'border-border hover:border-gold/40'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-background text-xs font-bold px-4 py-1 rounded-full tracking-wide uppercase">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-heading text-2xl font-bold text-text mb-2">{pkg.name}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-bold text-gold">${pkg.price.toLocaleString()}</span>
                    </div>
                    <p className="text-text-dim text-xs mt-1">{pkg.duration}</p>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-8">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-text-muted">
                        <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/book/mixing?package=${pkg.id}`}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm text-center block ${
                      pkg.popular ? 'btn-gold' : 'btn-outline-gold'
                    }`}
                  >
                    Book This Package
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">How It Works</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">The Process</h2>
            <div className="gold-divider" />
          </FadeUp>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <FadeUp key={step.step} delay={i * 0.12}>
                  <div className="text-center relative">
                    <div className="w-16 h-16 rounded-full bg-surface border border-border-gold flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="font-heading text-gold font-bold text-lg">{step.step}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-text mb-2">{step.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-16 px-6 border-y border-border bg-surface/20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <p className="text-text-dim text-xs uppercase tracking-widest mb-6">Genre Experience</p>
            <div className="flex flex-wrap justify-center gap-3">
              {genres.map((g) => (
                <span
                  key={g}
                  className="px-4 py-2 rounded-full border border-border text-text-muted text-sm hover:border-gold/40 hover:text-gold-muted transition-all duration-300 cursor-default"
                >
                  {g}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <div className="gold-divider mb-8" />
            <h2 className="font-heading text-4xl font-bold text-text mb-5">
              Ready to Hear Your Track Come Alive?
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Send your project for a free sample mix before you commit. Let the work speak.
            </p>
            <Link href="/book/mixing" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold shadow-gold">
              Book Your Mix
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
