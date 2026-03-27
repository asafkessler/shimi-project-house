'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { STUDIO_RENTAL_PACKAGES } from '@/types'

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

const studioSpecs = [
  {
    category: 'Control Room',
    items: [
      'Neve 8078 Console (24-channel)',
      'Genelec 8351 Main Monitors',
      'Yamaha NS-10 Near-fields',
      'Pro Tools HDX + Logic Pro',
      'Full Outboard Signal Chain',
    ],
  },
  {
    category: 'Live Room',
    items: [
      'Variable Acoustic Treatment',
      '65 sqm / 700 sqft',
      'Steinway Model B Grand Piano',
      'Hammond B3 + Leslie 122',
      'Drum Kit (Pearl Reference)',
    ],
  },
  {
    category: 'Vocal Booth',
    items: [
      'Neumann U87 Condenser',
      'Shure SM7B Dynamic',
      'AKG C414 Condenser',
      'SSL VHD Preamp',
      'Lexicon 480L Reverb',
    ],
  },
  {
    category: 'Outboard Gear',
    items: [
      'Neve 1073 Preamps (×4)',
      'LA-2A Compressor (×2)',
      '1176 Compressor (×4)',
      'SSL G-Bus Compressor',
      'Eventide H3000 Effects',
    ],
  },
]

const instruments = [
  'Steinway Model B Grand Piano',
  'Fender Stratocaster (1964 Vintage)',
  'Gibson Les Paul Standard',
  'Martin D-28 Acoustic',
  'Fender Jazz Bass',
  'Hammond B3 Organ',
  'Moog Subsequent 37',
  'Roland Juno-106',
  'Pearl Reference Drum Kit',
  'Full Percussion Library',
  'Lap Steel Guitar',
  'Cello & Viola (on request)',
]

export default function StudioRentalPage() {
  return (
    <div className="bg-background studio-bg">
      {/* Hero */}
      <div className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-gold/5 rounded-full blur-[110px]" />
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[350px] bg-gold-dark/4 rounded-full blur-[90px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="gold-divider w-12" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">World-Class Facility</span>
              <div className="gold-divider w-12" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
              Studio
              <span className="text-gold-shimmer italic block">Rental</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Book our professional recording facility by the half-day, full day, or week. Experienced engineer included on all full-day bookings.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book/studio-rental" className="btn-gold px-8 py-4 rounded-xl font-semibold shadow-gold">
                Check Availability
              </Link>
              <a href="#packages" className="btn-outline-gold px-8 py-4 rounded-xl font-medium">
                View Pricing
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick facts */}
      <div className="border-y border-border bg-surface/50 py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '65 sqm', label: 'Live Room' },
            { value: 'Neve', label: 'Console' },
            { value: '24/7', label: 'Access (Weekly)' },
            { value: '2', label: 'Rooms + Booth' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-heading text-2xl font-bold text-gold mb-1">{s.value}</p>
              <p className="text-text-dim text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <section id="packages" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Pricing</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Rental Packages</h2>
            <div className="gold-divider mb-6" />
            <p className="text-text-muted max-w-md mx-auto text-sm">
              Transparent hourly and day rates. No unexpected charges. Engineer included on full-day bookings.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {STUDIO_RENTAL_PACKAGES.map((pkg, i) => (
              <FadeUp key={pkg.id} delay={i * 0.12}>
                <div
                  className={`card-glow relative bg-surface border rounded-2xl p-8 flex flex-col h-full ${
                    pkg.popular ? 'border-gold shadow-gold' : 'border-border hover:border-gold/40'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gold text-background text-xs font-bold px-4 py-1 rounded-full tracking-wide uppercase">
                        Best Value
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-heading text-2xl font-bold text-text mb-2">{pkg.name}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-bold text-gold">
                        ${pkg.price.toLocaleString()}
                      </span>
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
                    href={`/book/studio-rental?package=${pkg.id}`}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm text-center block ${
                      pkg.popular ? 'btn-gold' : 'btn-outline-gold'
                    }`}
                  >
                    Book {pkg.name}
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Add-ons */}
          <FadeUp className="mt-10">
            <div className="bg-surface-2 border border-border rounded-xl p-6">
              <p className="text-text-dim text-xs uppercase tracking-wider font-medium mb-4">Optional Add-ons</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Accommodation (per night)', price: '$120' },
                  { name: 'Additional Engineer (per day)', price: '$200' },
                  { name: 'Catering Package (per day)', price: '$80' },
                  { name: 'Rush Booking (48h notice)', price: '+25%' },
                ].map((addon) => (
                  <div key={addon.name} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
                    <span className="text-text-muted text-xs">{addon.name}</span>
                    <span className="text-gold text-sm font-semibold ml-2 shrink-0">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Studio Specs */}
      <section className="py-24 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Equipment</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Studio Specifications</h2>
            <div className="gold-divider" />
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studioSpecs.map((spec, i) => (
              <FadeUp key={spec.category} delay={i * 0.1}>
                <div className="card-glow bg-surface border border-border rounded-xl p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold text-gold mb-4 pb-3 border-b border-border">
                    {spec.category}
                  </h3>
                  <ul className="space-y-2">
                    {spec.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="text-gold-dark mt-1">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Instrument Library</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Available Instruments</h2>
            <div className="gold-divider mb-6" />
            <p className="text-text-muted text-sm max-w-md mx-auto">
              Bring your ideas. We provide the instruments. All included in your rental.
            </p>
          </FadeUp>

          <FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {instruments.map((inst) => (
                <div
                  key={inst}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-surface border border-border hover:border-gold/30 transition-colors group"
                >
                  <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                  </svg>
                  <span className="text-text-muted text-sm group-hover:text-text transition-colors">{inst}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-24 px-6 bg-surface/20">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Booking</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">How to Book</h2>
            <div className="gold-divider" />
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Choose Your Package',
                desc: 'Select a half-day, full day, or weekly package. Add any extras like accommodation or catering.',
              },
              {
                step: '02',
                title: 'Pick Your Dates',
                desc: 'Check availability via the booking calendar and select your preferred dates.',
              },
              {
                step: '03',
                title: 'Confirm & Pay',
                desc: 'Complete your booking with secure PayPal payment. You\'ll receive confirmation within minutes.',
              },
            ].map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.1}>
                <div className="text-center p-6 bg-surface border border-border rounded-xl">
                  <div className="w-14 h-14 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading text-gold font-bold text-xl">{s.step}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text mb-2">{s.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <div className="gold-divider mb-8" />
            <h2 className="font-heading text-4xl font-bold text-text mb-5">
              Book Your Studio Session
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Limited availability. Advance booking recommended.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book/studio-rental" className="btn-gold px-8 py-4 rounded-xl font-semibold shadow-gold">
                Book Now
              </Link>
              <Link href="/#contact" className="btn-outline-gold px-8 py-4 rounded-xl font-medium">
                Contact Us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
