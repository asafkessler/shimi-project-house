'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
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
      'Every element placed with intention. From intimate acoustic recordings to dense electronic productions — your sound, refined.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    features: [
      'Professional stereo mixing',
      'Stem mastering',
      'Unlimited revisions',
      'Streaming-optimized delivery',
    ],
    href: '/services/mixing',
    bookHref: '/book/mixing',
    startingAt: '$150',
    accent: 'sage' as const,
  },
  {
    title: 'Production Retreat',
    description:
      'Multi-day creative immersions. Private accommodation, full studio access, and one-on-one sessions that break blocks and build worlds.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: [
      'Private accommodation',
      'Full studio access',
      'Daily producer sessions',
      'Meals & transport included',
    ],
    href: '/services/retreat',
    bookHref: '/book/retreat',
    startingAt: '$800',
    accent: 'copper' as const,
  },
  {
    title: 'Studio Rental',
    description:
      'Book the space as yours. World-class gear, curated instrument library, and the quiet you need to work with no compromises.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    features: [
      'Half-day to weekly rates',
      'Full outboard rack',
      'Accommodation available',
      'Engineer on request',
    ],
    href: '/services/studio-rental',
    bookHref: '/book/studio-rental',
    startingAt: '$200',
    accent: 'sage' as const,
  },
]

const testimonials = [
  {
    quote: 'Working at Shimi Project House was transformative. The acoustic environment, the gear, and the ear for sound elevated my album to a level I didn\'t think was possible.',
    name: 'Mara K.',
    role: 'Independent Artist',
  },
  {
    quote: 'The retreat was exactly what I needed to break through creative blocks. Five days, fully immersed, and I came out with half an album. The space does something to you.',
    name: 'Daniel R.',
    role: 'Electronic Music Producer',
  },
  {
    quote: 'I\'ve recorded in studios across three continents. This one has something special — an intimacy in the sound that you can\'t manufacture with money. Just with vision.',
    name: 'Yael S.',
    role: 'Session Guitarist & Vocalist',
  },
]

const galleryItems = [
  { label: 'Control Room',   span: 'col-span-2 row-span-2', hue: '142' },
  { label: 'Vocal Booth',    span: '',                       hue: '28'  },
  { label: 'Live Room',      span: '',                       hue: '142' },
  { label: 'Lounge',         span: '',                       hue: '28'  },
  { label: 'Outboard Rack',  span: '',                       hue: '142' },
  { label: 'Piano Corner',   span: 'col-span-2',             hue: '28'  },
]

export default function HomePage() {
  return (
    <div style={{ background: '#0b1410' }}>
      <Hero />

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-20">
            <div className="line-accent mb-8" />
            <p className="text-sage/60 text-[11px] tracking-[0.4em] uppercase font-light mb-5 font-body">
              What We Offer
            </p>
            <h2 className="heading-display text-5xl md:text-6xl text-text mb-6">
              Services for Artists
            </h2>
            <p className="text-text-muted/70 max-w-lg mx-auto leading-relaxed font-light text-sm">
              From a single mix to a full week of creation — every service is designed to serve the work.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section id="about" className="py-32 px-6 relative overflow-hidden">
        {/* Background blob */}
        <div
          className="blob absolute -left-32 top-1/3 w-[500px] h-[500px] opacity-10 pointer-events-none"
          style={{ background: 'rgba(74, 122, 82, 0.6)' }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: visual */}
            <Reveal delay={0.1}>
              <div className="relative">
                <div
                  className="aspect-[4/5] rounded-3xl overflow-hidden relative"
                  style={{ background: 'linear-gradient(145deg, #192519, #0f1a11)', border: '1px solid rgba(45,64,40,0.6)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="waveform scale-[2.5] mb-10 justify-center">
                        <span /><span /><span /><span /><span /><span /><span />
                      </div>
                      <p className="text-text-dim text-xs tracking-[0.3em] uppercase font-light">Shimi</p>
                    </div>
                  </div>
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(11,20,16,0.5) 0%, transparent 60%)' }}
                  />
                </div>

                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, x: 24, y: 24 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.9 }}
                  className="absolute -bottom-8 -right-6 p-6 rounded-2xl"
                  style={{
                    background: 'linear-gradient(160deg, #192519, #111c14)',
                    border: '1px solid rgba(45,64,40,0.8)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { value: '15+',  label: 'Years' },
                      { value: '400+', label: 'Tracks' },
                      { value: '80+',  label: 'Artists' },
                      { value: '3',    label: 'Awards' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="heading-serif text-2xl text-sage-light">{stat.value}</p>
                        <p className="text-text-dim text-[10px] mt-0.5 tracking-wider uppercase font-light">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </Reveal>

            {/* Right: text */}
            <Reveal delay={0.2} className="lg:pl-6">
              <p className="text-sage/60 text-[11px] tracking-[0.4em] uppercase font-light mb-6 font-body">
                About the Studio
              </p>
              <h2 className="heading-display text-5xl md:text-6xl text-text mb-3 leading-tight">
                Sound as a
              </h2>
              <h2 className="heading-display text-5xl md:text-6xl italic mb-8 leading-tight text-copper-shimmer">
                Craft & Philosophy
              </h2>
              <div className="space-y-5 text-text-muted/75 leading-relaxed mb-10 font-light text-sm">
                <p>
                  Shimi Project House was built from a single conviction: that the right environment transforms what&apos;s possible in music. As a producer, guitarist, pianist, and sound engineer with over 15 years in the field, every decision here — acoustic, aesthetic, technical — serves that belief.
                </p>
                <p>
                  The studio combines analogue warmth with modern precision. From Neve preamps to custom-tuned room acoustics, from a Steinway grand to a curated collection of vintage guitars — every tool is chosen to serve the music, not the ego.
                </p>
                <p>
                  Whether you&apos;re here to record, mix, or immerse yourself in a week-long creative retreat, you leave with work that sounds like it was made in exactly the right place.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Music Producer', 'Sound Engineer', 'Guitarist', 'Pianist', 'Mix Engineer'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-xs font-light font-body"
                    style={{
                      border: '1px solid rgba(122,170,130,0.2)',
                      color: 'rgba(168,206,173,0.7)',
                      background: 'rgba(122,170,130,0.04)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/services/mixing"
                className="btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-medium tracking-wide"
              >
                Explore Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section id="gallery" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-20">
            <div className="line-accent mb-8" />
            <p className="text-sage/60 text-[11px] tracking-[0.4em] uppercase font-light mb-5 font-body">The Space</p>
            <h2 className="heading-display text-5xl md:text-6xl text-text mb-6">Inside the Studio</h2>
            <p className="text-text-muted/70 max-w-md mx-auto font-light text-sm leading-relaxed">
              Designed for focus. Built for sound.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.07, duration: 0.7 }}
                className={`${item.span} relative rounded-2xl overflow-hidden cursor-pointer group`}
                style={{ border: '1px solid rgba(45,64,40,0.5)' }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: [
                      `radial-gradient(ellipse at 30% 70%, hsla(${item.hue},40%,20%,0.8) 0%, hsla(${item.hue},30%,10%,0.9) 100%)`,
                      `radial-gradient(ellipse at 70% 30%, hsla(${item.hue},35%,18%,0.8) 0%, #0b1410 100%)`,
                      `linear-gradient(135deg, hsla(${item.hue},30%,15%,0.9) 0%, #0b1410 100%)`,
                    ][i % 3],
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(11,20,16,0.9), transparent)' }}
                >
                  <p className="text-sage-light text-sm font-light tracking-wider">{item.label}</p>
                </div>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-7 h-7 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{ color: i % 2 === 0 ? '#7aaa82' : '#c07a4a' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section id="testimonials" className="py-32 px-6 relative overflow-hidden">
        <div
          className="blob absolute right-[-100px] top-1/4 w-[400px] h-[400px] opacity-8 pointer-events-none"
          style={{ background: 'rgba(192,122,74,0.4)' }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-20">
            <div className="line-accent mb-8" />
            <p className="text-sage/60 text-[11px] tracking-[0.4em] uppercase font-light mb-5 font-body">Client Words</p>
            <h2 className="heading-display text-5xl md:text-6xl text-text">What Artists Say</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.12, duration: 0.9 }}
                className="card-organic p-8 flex flex-col"
              >
                <div className="quote-mark mb-2">&ldquo;</div>
                <p className="text-text-muted/75 leading-relaxed text-sm flex-1 -mt-5 font-light">
                  {t.quote}
                </p>
                <div
                  className="mt-8 pt-6 flex items-center gap-4"
                  style={{ borderTop: '1px solid rgba(45,64,40,0.5)' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(122,170,130,0.08)', border: '1px solid rgba(122,170,130,0.2)' }}
                  >
                    <span className="heading-serif text-sage font-semibold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-text/90 font-medium text-sm">{t.name}</p>
                    <p className="text-text-dim text-xs font-light mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <Reveal delay={0.1}>
              <div className="line-accent mb-8 mx-0 w-12"
                style={{ margin: '0 0 32px 0' }}
              />
              <p className="text-sage/60 text-[11px] tracking-[0.4em] uppercase font-light mb-6 font-body">Get in Touch</p>
              <h2 className="heading-display text-5xl md:text-6xl text-text mb-3">Let&apos;s Make</h2>
              <h2 className="heading-display text-5xl md:text-6xl italic text-copper-shimmer mb-10">Something Real</h2>
              <p className="text-text-muted/70 leading-relaxed mb-12 max-w-md font-light text-sm">
                Whether you have a project in mind, want to ask about availability, or just want to talk about your vision — reach out. Every collaboration starts with a conversation.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Email', value: 'hello@shimiprojecthouse.com' },
                  { label: 'Phone', value: '+1 (555) 000-0000' },
                  { label: 'Location', value: 'Shared on booking confirmation' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <p className="text-text-dim text-[10px] uppercase tracking-[0.25em] mb-0.5 font-medium">{item.label}</p>
                      <p className="text-text-muted/70 text-sm font-light">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div
          className="blob absolute inset-x-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-15 pointer-events-none"
          style={{ background: 'rgba(74, 122, 82, 0.5)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="line-accent mb-12" />
            <h2 className="heading-display text-5xl md:text-6xl text-text mb-6 leading-tight">
              Ready to Start<br />Creating?
            </h2>
            <p className="text-text-muted/70 mb-12 leading-relaxed max-w-md mx-auto font-light text-sm">
              Your next record deserves the right environment. Book a session, a retreat, or a studio day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book/mixing" className="btn-sage px-9 py-4 rounded-2xl text-sm font-semibold tracking-wide">
                <span>Book a Session</span>
              </Link>
              <Link href="/services/retreat" className="btn-ghost px-9 py-4 rounded-2xl text-sm font-medium tracking-wide">
                View Retreats
              </Link>
            </div>
            <div className="line-accent mt-12" />
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you. We\'ll be in touch within 24 hours.')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl p-8 space-y-5"
      style={{
        background: 'linear-gradient(160deg, #192519, #111c14)',
        border: '1px solid rgba(45,64,40,0.7)',
      }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-text-muted/60 mb-2.5 tracking-wide font-light">Name</label>
          <input type="text" placeholder="Your name" className="input-forest" required />
        </div>
        <div>
          <label className="block text-xs text-text-muted/60 mb-2.5 tracking-wide font-light">Email</label>
          <input type="email" placeholder="your@email.com" className="input-forest" required />
        </div>
      </div>
      <div>
        <label className="block text-xs text-text-muted/60 mb-2.5 tracking-wide font-light">Interested in</label>
        <select className="input-forest">
          <option value="">Select a service</option>
          <option value="mixing">Mixing Services</option>
          <option value="retreat">Production Retreat</option>
          <option value="studio-rental">Studio Rental</option>
          <option value="general">General Enquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-text-muted/60 mb-2.5 tracking-wide font-light">Message</label>
        <textarea
          placeholder="Tell us about your project..."
          rows={5}
          className="input-forest resize-none"
          required
        />
      </div>
      <button type="submit" className="btn-sage w-full py-4 rounded-2xl font-semibold text-sm tracking-wide">
        <span>Send Message</span>
      </button>
    </form>
  )
}
