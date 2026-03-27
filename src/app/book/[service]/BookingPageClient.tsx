'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BookingForm from '@/components/BookingForm'
import { PricingPackage } from '@/types'

interface Props {
  service: 'mixing' | 'retreat' | 'studio-rental'
  packages: PricingPackage[]
  serviceLabel: string
  selectedPackageId?: string
}

export default function BookingPageClient({ service, packages, serviceLabel, selectedPackageId }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/4 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <nav className="flex items-center justify-center gap-2 text-sm text-text-dim mb-6">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/services/${service}`} className="hover:text-gold transition-colors">
                {serviceLabel}
              </Link>
              <span>/</span>
              <span className="text-text-muted">Book</span>
            </nav>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-divider w-10" />
              <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Booking</span>
              <div className="gold-divider w-10" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-4">
              Book {serviceLabel}
            </h1>
            <p className="text-text-muted text-base max-w-md mx-auto leading-relaxed">
              Complete your booking below. Payment is secured via PayPal.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-surface border border-border rounded-2xl p-6 md:p-10"
          >
            <BookingForm
              service={service}
              packages={packages}
              selectedPackageId={selectedPackageId}
            />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-text-dim text-xs"
          >
            {[
              {
                icon: (
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                text: 'Secure SSL Payment',
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                text: 'PayPal Buyer Protection',
              },
              {
                icon: (
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                text: 'Instant Confirmation Email',
              },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-1.5">
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
