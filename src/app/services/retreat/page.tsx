'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { RETREAT_PACKAGES } from '@/types'

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

const amenities = [
  { icon: '🎹', label: 'Steinway Grand Piano' },
  { icon: '🎸', label: 'Vintage Guitar Library' },
  { icon: '🎛', label: 'Full Outboard Rack' },
  { icon: '🛏', label: 'Private En-Suite Room' },
  { icon: '🍽', label: 'Catering Available' },
  { icon: '📡', label: 'High-Speed Internet' },
  { icon: '🌿', label: 'Garden & Terrace' },
  { icon: '🎧', label: 'Headphone Lounge' },
  { icon: '📺', label: 'Reference Monitors' },
  { icon: '🔒', label: 'Private 24/7 Access' },
  { icon: '🚗', label: 'Airport Transport' },
  { icon: '☕', label: 'Barista Coffee Setup' },
]

const itinerary = [
  {
    time: 'Morning',
    activity: 'Creative Session',
    desc: 'Start fresh with a focused creative block — tracking, production, or composition.',
  },
  {
    time: 'Afternoon',
    activity: 'Producer Consultation',
    desc: 'One-on-one session with Shimi to review progress, shape arrangements, and solve creative problems.',
  },
  {
    time: 'Evening',
    activity: 'Review & Listen',
    desc: 'A dedicated listening session in the control room to evaluate the day\'s work and plan tomorrow.',
  },
  {
    time: 'Night',
    activity: 'Rest & Reflect',
    desc: 'Your private accommodation is steps away. Rest, note ideas, prepare for another creative day.',
  },
]

export default function RetreatPage() {
  return (
    <div className="bg-background retreat-bg">
      {/* Hero */}
      <div className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-gold/4 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[350px] bg-gold-dark/4 rounded-full blur-[90px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="gold-divider w-12" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Creative Immersion</span>
              <div className="gold-divider w-12" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
              Production
              <span className="text-gold-shimmer italic block">Retreat</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Leave the distractions behind. Multi-day packages combining world-class studio access, private accommodation, and dedicated creative mentorship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book/retreat" className="btn-gold px-8 py-4 rounded-xl font-semibold shadow-gold">
                Book a Retreat
              </Link>
              <a href="#packages" className="btn-outline-gold px-8 py-4 rounded-xl font-medium">
                View Packages
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy */}
      <section className="py-24 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp delay={0.1}>
              <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-5">The Concept</p>
              <h2 className="font-heading text-4xl font-bold text-text mb-6 leading-tight">
                Total Creative
                <span className="text-gold-shimmer italic block mt-1">Immersion</span>
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  The retreat concept was born from a simple observation: artists make their best work when they&apos;re fully present. No commute, no meetings, no algorithm. Just the work, the space, and the people who know how to support it.
                </p>
                <p>
                  Every retreat is structured but not rigid. Mornings might be production sessions, afternoons a deep-dive into arrangements, evenings a listening session and conversation. The schedule adapts to where the creative energy is.
                </p>
                <p>
                  Accommodation is steps from the studio. Meals are taken care of. The only thing you need to bring is your focus.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              {/* Daily Itinerary */}
              <div className="bg-surface border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-surface-2">
                  <p className="text-text-dim text-xs uppercase tracking-wider font-medium">Typical Day</p>
                </div>
                <div className="divide-y divide-border">
                  {itinerary.map((item) => (
                    <div key={item.time} className="p-5 flex gap-4">
                      <div className="w-20 shrink-0">
                        <p className="text-gold text-xs font-semibold uppercase tracking-wide">{item.time}</p>
                      </div>
                      <div>
                        <p className="text-text font-medium text-sm mb-0.5">{item.activity}</p>
                        <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Pricing</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Retreat Packages</h2>
            <div className="gold-divider mb-6" />
            <p className="text-text-muted max-w-md mx-auto text-sm">
              All-inclusive packages. Everything listed is included — no unexpected costs on arrival.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {RETREAT_PACKAGES.map((pkg, i) => (
              <FadeUp key={pkg.id} delay={i * 0.12}>
                <div
                  className={`card-glow relative bg-surface border rounded-2xl p-8 flex flex-col h-full ${
                    pkg.popular ? 'border-gold shadow-gold' : 'border-border hover:border-gold/40'
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
                      {pkg.price > 0 ? (
                        <span className="font-heading text-4xl font-bold text-gold">
                          ${pkg.price.toLocaleString()}
                        </span>
                      ) : (
                        <span className="font-heading text-3xl font-bold text-gold">Custom Pricing</span>
                      )}
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
                    href={pkg.price > 0 ? `/book/retreat?package=${pkg.id}` : '/book/retreat?package=custom-retreat'}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm text-center block ${
                      pkg.popular ? 'btn-gold' : 'btn-outline-gold'
                    }`}
                  >
                    {pkg.price > 0 ? 'Book This Retreat' : 'Enquire Now'}
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 px-6 bg-surface/30">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">What&apos;s Included</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Studio & Facilities</h2>
            <div className="gold-divider" />
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {amenities.map((a, i) => (
              <FadeUp key={a.label} delay={i * 0.05}>
                <div className="card-glow bg-surface border border-border rounded-xl p-4 text-center group hover:border-gold/40 transition-all duration-300">
                  <div className="text-3xl mb-3">{a.icon}</div>
                  <p className="text-text-muted text-sm leading-tight">{a.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Questions</p>
            <h2 className="font-heading text-4xl font-bold text-text mb-4">Common Questions</h2>
            <div className="gold-divider" />
          </FadeUp>

          <div className="space-y-4">
            {[
              {
                q: 'Is the accommodation private?',
                a: 'Yes. Each retreat guest has their own private room with en-suite bathroom. The studio and communal areas are shared only if multiple solo artists are booked simultaneously — which we always disclose in advance.',
              },
              {
                q: 'Can I bring collaborators?',
                a: 'Absolutely. Additional guests can be arranged (additional accommodation fees apply). Many artists come with a co-producer or collaborator — this often makes for the most productive sessions.',
              },
              {
                q: 'What level of artist is the retreat for?',
                a: 'All levels are welcome. We\'ve hosted emerging artists on their first album and established names working on their tenth. The experience adapts to where you are and what you need.',
              },
              {
                q: 'Do I need to bring equipment?',
                a: 'No. The studio has everything you need. If you have specific software or hardware preferences, let us know in advance and we\'ll do our best to accommodate.',
              },
              {
                q: 'What is the cancellation policy?',
                a: 'Cancellations more than 14 days before the retreat start date receive a full refund. Within 14 days, 50% is refunded. No refund for cancellations within 48 hours of arrival.',
              },
            ].map((faq, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <details className="group bg-surface border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-surface-2 transition-colors">
                    <span className="font-medium text-text pr-4">{faq.q}</span>
                    <svg
                      className="w-4 h-4 text-gold shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-surface/20">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <div className="gold-divider mb-8" />
            <h2 className="font-heading text-4xl font-bold text-text mb-5">
              Your Most Productive Week Starts Here
            </h2>
            <p className="text-text-muted mb-8 leading-relaxed">
              Leave the city behind. Come with ideas. Leave with an album.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book/retreat" className="btn-gold px-8 py-4 rounded-xl font-semibold shadow-gold">
                Book a Retreat
              </Link>
              <Link href="/#contact" className="btn-outline-gold px-8 py-4 rounded-xl font-medium">
                Ask a Question
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
