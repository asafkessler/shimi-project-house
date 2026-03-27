'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'

function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const services = [
  {
    title: 'Mixing Services',
    description:
      'Transform your raw recordings into polished, release-ready tracks. From intimate acoustic recordings to full-scale productions — every element placed with intention.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    features: [
      'Professional stereo mixing',
      'Stem mastering',
      'Revision rounds included',
      'Streaming-optimized delivery',
    ],
    href: '/services/mixing',
    bookHref: '/book/mixing',
    startingAt: '$150',
  },
  {
    title: 'Production Retreat',
    description:
      'Immerse yourself in a dedicated creative environment. Multi-day packages combining studio access, private accommodation, and one-on-one production mentorship.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: [
      'Private accommodation included',
      'Full studio access',
      'Daily producer sessions',
      'All meals & transport',
    ],
    href: '/services/retreat',
    bookHref: '/book/retreat',
    startingAt: '$800',
  },
  {
    title: 'Studio Rental',
    description:
      'Book our world-class recording facility by the hour, day, or week. Full outboard gear, instrument library, and experienced engineers available on request.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    features: [
      'Half-day to weekly options',
      'Full outboard rack',
      'Accommodation available',
      'Engineer on request',
    ],
    href: '/services/studio-rental',
    bookHref: '/book/studio-rental',
    startingAt: '$200',
  },
]

const testimonials = [
  {
    quote:
      'Working at Shimi Project House was transformative. The acoustic environment, the gear, and Shimi\'s ear for sound elevated my album to a level I didn\'t think was possible.',
    name: 'Mara K.',
    role: 'Independent Artist',
  },
  {
    quote:
      'The retreat package was exactly what I needed to break through creative blocks. Five days, fully immersed, and I came out with half an album. The space does something to you.',
    name: 'Daniel R.',
    role: 'Electronic Music Producer',
  },
  {
    quote:
      'I\'ve recorded in studios across three continents. This one has something special — an intimacy in the sound that you can\'t manufacture with money. Just with vision.',
    name: 'Yael S.',
    role: 'Session Guitarist & Vocalist',
  },
]

const galleryItems = [
  { label: 'Control Room', aspect: 'col-span-2 row-span-2' },
  { label: 'Vocal Booth', aspect: '' },
  { label: 'Live Room', aspect: '' },
  { label: 'Lounge', aspect: '' },
  { label: 'Outboard Rack', aspect: '' },
  { label: 'Piano Corner', aspect: 'col-span-2' },
]

export default function HomePage() {
  return (
    <div className="bg-background">
      <Hero />

      {/* Services Section */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">What We Offer</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-5">
              Services Built for Artists
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-text-muted max-w-xl mx-auto leading-relaxed">
              From a single mix to a full creative retreat — every service is designed to serve the work.
            </p>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 bg-surface/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Visual */}
            <FadeSection delay={0.1}>
              <div className="relative">
                {/* Main image placeholder */}
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-surface-2 via-surface-3 to-background border border-border overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="waveform scale-[2] mb-8 justify-center">
                        <span /><span /><span /><span /><span /><span /><span />
                      </div>
                      <p className="text-text-dim text-sm tracking-widest uppercase">Shimi</p>
                    </div>
                  </div>
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                {/* Stats card */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="absolute -bottom-6 -right-6 bg-surface border border-border-gold rounded-2xl p-6 shadow-gold"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: '15+', label: 'Years Experience' },
                      { value: '400+', label: 'Tracks Mixed' },
                      { value: '80+', label: 'Artists Hosted' },
                      { value: '3', label: 'Genre Awards' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="font-heading text-2xl font-bold text-gold">{stat.value}</p>
                        <p className="text-text-dim text-xs mt-0.5 leading-tight">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </FadeSection>

            {/* Right: Text */}
            <FadeSection delay={0.2} className="lg:pl-8">
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-5">About the Studio</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
                Sound as a
                <span className="text-gold-shimmer italic block mt-1">Craft & Philosophy</span>
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed mb-8">
                <p>
                  Shimi Project House was built from a single conviction: that the right environment transforms what&apos;s possible in music. As a producer, guitarist, pianist, and sound engineer with over 15 years in the field, every decision in this space — acoustic, aesthetic, technical — serves that belief.
                </p>
                <p>
                  The studio combines analogue warmth with modern precision. From Neve preamps to custom-tuned room acoustics, from a Steinway grand to a curated collection of vintage guitars — every tool is chosen to serve the music, not the ego.
                </p>
                <p>
                  Whether you&apos;re here to record, mix, or immerse yourself in a week-long creative retreat, you leave with work that sounds like it was made in exactly the right place.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Music Producer', 'Sound Engineer', 'Guitarist', 'Pianist', 'Mix Engineer'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-border-gold text-xs text-gold-muted font-medium bg-surface-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/services/mixing"
                className="btn-gold inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold"
              >
                Explore Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">The Space</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-5">
              Inside the Studio
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-text-muted max-w-xl mx-auto">
              Designed for focus. Built for sound. Every room crafted to serve the creative process.
            </p>
          </FadeSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`${item.aspect} relative rounded-xl overflow-hidden bg-gradient-to-br from-surface-2 to-surface-3 border border-border group cursor-pointer`}
              >
                {/* Gradient patterns to simulate photos */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: [
                      'radial-gradient(ellipse at 20% 80%, #c9a84c22 0%, transparent 70%), radial-gradient(ellipse at 80% 20%, #8b691422 0%, transparent 70%)',
                      'radial-gradient(ellipse at 50% 50%, #c9a84c15 0%, transparent 80%)',
                      'radial-gradient(ellipse at 30% 70%, #8b691418 0%, transparent 60%), linear-gradient(135deg, #1a1a1a, #0f0c07)',
                      'radial-gradient(ellipse at 70% 30%, #c9a84c12 0%, transparent 70%)',
                      'linear-gradient(45deg, #111 0%, #1a1505 100%)',
                      'radial-gradient(ellipse at 50% 80%, #c9a84c20 0%, transparent 60%), linear-gradient(180deg, #0a0a0a, #161208)',
                    ][i % 6],
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-400" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-gold text-sm font-medium">{item.label}</p>
                </div>

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-text-dim opacity-30 group-hover:opacity-50 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-28 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Client Words</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-5">
              What Artists Say
            </h2>
            <div className="gold-divider" />
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="card-glow bg-surface border border-border rounded-2xl p-8 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold fill-gold" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <div className="quote-mark mb-3">&ldquo;</div>

                <p className="text-text-muted leading-relaxed text-sm flex-1 -mt-6">{t.quote}</p>

                <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <span className="text-gold font-heading font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-text font-medium text-sm">{t.name}</p>
                    <p className="text-text-dim text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <FadeSection delay={0.1}>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-5">Get in Touch</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
                Let&apos;s Make
                <span className="text-gold-shimmer italic block mt-1">Something Real</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-10 max-w-md">
                Whether you have a project in mind, want to enquire about availability, or just want to discuss your vision — reach out. Every collaboration starts with a conversation.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'hello@shimiprojecthouse.com',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    label: 'Phone',
                    value: '+1 (555) 000-0000',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    label: 'Location',
                    value: 'Available on booking confirmation',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border-gold flex items-center justify-center text-gold shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-text-dim text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-text-muted text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>

            {/* Right: Form */}
            <FadeSection delay={0.2}>
              <ContactForm />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-[#1a1408] to-background" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 50%, #c9a84c33 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeSection>
            <div className="gold-divider mb-8" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-text-muted mb-10 leading-relaxed max-w-xl mx-auto">
              Your next record deserves the right environment. Book a session, a retreat, or a studio day — and let the work begin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book/mixing" className="btn-gold px-8 py-4 rounded-xl font-semibold text-base shadow-gold-lg">
                Book a Session
              </Link>
              <Link href="/services/retreat" className="btn-outline-gold px-8 py-4 rounded-xl font-medium text-base">
                View Retreats
              </Link>
            </div>
            <div className="gold-divider mt-8" />
          </FadeSection>
        </div>
      </section>
    </div>
  )
}

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to an email service
    alert('Thank you for your message. We\'ll be in touch within 24 hours.')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-2xl p-8 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-text-muted mb-2">Name</label>
          <input type="text" placeholder="Your name" className="input-dark" required />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-2">Email</label>
          <input type="email" placeholder="your@email.com" className="input-dark" required />
        </div>
      </div>
      <div>
        <label className="block text-sm text-text-muted mb-2">Subject</label>
        <select className="input-dark">
          <option value="">Select a service</option>
          <option value="mixing">Mixing Services</option>
          <option value="retreat">Production Retreat</option>
          <option value="studio-rental">Studio Rental</option>
          <option value="general">General Enquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-text-muted mb-2">Message</label>
        <textarea
          placeholder="Tell us about your project..."
          rows={5}
          className="input-dark resize-none"
          required
        />
      </div>
      <button type="submit" className="btn-gold w-full py-3.5 rounded-xl font-semibold text-sm">
        Send Message
      </button>
    </form>
  )
}
