'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { motion } from 'framer-motion'
import { PricingPackage } from '@/types'
import PayPalButton from './PayPalButton'

interface BookingFormProps {
  service: 'mixing' | 'retreat' | 'studio-rental'
  packages: PricingPackage[]
  selectedPackageId?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  notes: string
}

type Step = 'package' | 'dates' | 'details' | 'payment' | 'confirmed'

export default function BookingForm({ service, packages, selectedPackageId }: BookingFormProps) {
  const [step, setStep] = useState<Step>('package')
  const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(
    selectedPackageId ? packages.find((p) => p.id === selectedPackageId) ?? null : null
  )
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const needsDateRange = service !== 'mixing'
  const isCustomPackage = selectedPkg?.price === 0

  const steps: { key: Step; label: string }[] = [
    { key: 'package', label: 'Package' },
    { key: 'dates', label: 'Dates' },
    { key: 'details', label: 'Details' },
    { key: 'payment', label: 'Payment' },
  ]
  const stepIndex = steps.findIndex((s) => s.key === step)

  function handleSelectPackage(pkg: PricingPackage) {
    setSelectedPkg(pkg)
    if (pkg.price === 0) {
      // Custom — jump to details
      setStep('details')
    } else {
      setStep('dates')
    }
  }

  function handleDatesNext() {
    if (needsDateRange && (!startDate || !endDate)) return
    if (!needsDateRange && !startDate) return
    setStep('details')
  }

  function handleDetailsNext() {
    if (!formData.name || !formData.email) return
    setStep('payment')
  }

  async function handleBookingSuccess(paypalOrderId: string) {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          packageName: selectedPkg!.name,
          packagePrice: selectedPkg!.price,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          startDate: startDate?.toISOString() ?? new Date().toISOString(),
          endDate: endDate?.toISOString() ?? startDate?.toISOString() ?? new Date().toISOString(),
          notes: formData.notes,
          paypalOrderId,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      setBookingId(data.booking.id)
      setStep('confirmed')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  async function handleContactSubmit() {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          packageName: 'Custom Package',
          packagePrice: 0,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          notes: formData.notes,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setBookingId(data.booking.id)
      setStep('confirmed')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (step === 'confirmed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-heading text-3xl font-bold text-text mb-4">
          {isCustomPackage ? 'Enquiry Received!' : 'Booking Confirmed!'}
        </h2>
        <p className="text-text-muted mb-6 max-w-md mx-auto">
          {isCustomPackage
            ? "Thank you for your enquiry. We'll be in touch within 24 hours to discuss your custom package."
            : "Your booking has been received and payment processed. We'll send confirmation details to your email shortly."}
        </p>
        {bookingId && (
          <p className="text-text-dim text-sm mb-8">
            Reference: <span className="text-gold font-mono">{bookingId}</span>
          </p>
        )}
        <a href="/" className="btn-gold px-8 py-3 rounded-xl font-semibold inline-block">
          Back to Home
        </a>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Progress steps */}
      <div className="flex items-center justify-center mb-10 gap-0">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all duration-300 ${
                  i < stepIndex
                    ? 'bg-gold border-gold text-background'
                    : i === stepIndex
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-border text-text-dim bg-transparent'
                }`}
              >
                {i < stepIndex ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-xs mt-1.5 ${i === stepIndex ? 'text-gold' : 'text-text-dim'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-px mx-1 mb-5 transition-all duration-300 ${
                  i < stepIndex ? 'bg-gold/50' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800/40 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Step: Package Selection */}
      {step === 'package' && (
        <motion.div
          key="package"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading text-2xl font-bold text-text mb-2">Choose Your Package</h2>
          <p className="text-text-muted text-sm mb-8">Select the package that best suits your needs.</p>
          <div className="grid gap-4">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                  selectedPkg?.id === pkg.id
                    ? 'border-gold bg-gold/5 shadow-gold'
                    : 'border-border bg-surface hover:border-gold/40 hover:bg-surface-2'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-text">{pkg.name}</span>
                    {pkg.popular && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/25 font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="font-heading text-lg font-bold text-gold">
                    {pkg.price === 0 ? 'Contact' : `$${pkg.price.toLocaleString()}`}
                  </span>
                </div>
                <p className="text-text-muted text-sm mb-3">{pkg.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <span key={i} className="text-xs text-text-dim flex items-center gap-1">
                      <span className="text-gold">·</span> {f}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step: Dates */}
      {step === 'dates' && (
        <motion.div
          key="dates"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading text-2xl font-bold text-text mb-2">Select Dates</h2>
          <p className="text-text-muted text-sm mb-8">
            {needsDateRange ? 'Choose your start and end dates.' : 'Choose your preferred date.'}
          </p>

          <div className="bg-surface-2 border border-border rounded-xl p-6 mb-6">
            <p className="text-text-muted text-sm mb-4">
              Selected package:{' '}
              <span className="text-gold font-medium">{selectedPkg?.name}</span> —{' '}
              <span className="text-text font-medium">${selectedPkg?.price}</span>
            </p>

            {needsDateRange ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-muted mb-2">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date)
                      if (endDate && date && date > endDate) setEndDate(null)
                    }}
                    minDate={new Date()}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select start date"
                    className="input-dark"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-2">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate ?? new Date()}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select end date"
                    className="input-dark"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm text-text-muted mb-2">Session Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date)
                    setEndDate(date)
                  }}
                  minDate={new Date()}
                  placeholderText="Select your date"
                  className="input-dark"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('package')}
              className="btn-outline-gold px-6 py-3 rounded-xl font-medium text-sm"
            >
              Back
            </button>
            <button
              onClick={handleDatesNext}
              disabled={needsDateRange ? !startDate || !endDate : !startDate}
              className="btn-gold px-6 py-3 rounded-xl font-semibold text-sm flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}

      {/* Step: Details */}
      {step === 'details' && (
        <motion.div
          key="details"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading text-2xl font-bold text-text mb-2">Your Details</h2>
          <p className="text-text-muted text-sm mb-8">Fill in your contact information.</p>

          <div className="space-y-4 mb-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-muted mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="input-dark"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="input-dark"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="input-dark"
              />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-2">Notes / Project Details</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Tell us about your project, genre, any special requirements..."
                rows={4}
                className="input-dark resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(isCustomPackage ? 'package' : 'dates')}
              className="btn-outline-gold px-6 py-3 rounded-xl font-medium text-sm"
            >
              Back
            </button>
            {isCustomPackage ? (
              <button
                onClick={handleContactSubmit}
                disabled={!formData.name || !formData.email}
                className="btn-gold px-6 py-3 rounded-xl font-semibold text-sm flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Enquiry
              </button>
            ) : (
              <button
                onClick={handleDetailsNext}
                disabled={!formData.name || !formData.email}
                className="btn-gold px-6 py-3 rounded-xl font-semibold text-sm flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Step: Payment */}
      {step === 'payment' && selectedPkg && (
        <motion.div
          key="payment"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-heading text-2xl font-bold text-text mb-2">Confirm & Pay</h2>
          <p className="text-text-muted text-sm mb-8">Review your booking and complete payment.</p>

          {/* Summary */}
          <div className="bg-surface-2 border border-border rounded-xl p-6 mb-8">
            <h3 className="text-sm uppercase tracking-wider text-text-dim font-medium mb-4">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Package</span>
                <span className="text-text font-medium">{selectedPkg.name}</span>
              </div>
              {startDate && (
                <div className="flex justify-between">
                  <span className="text-text-muted">{needsDateRange ? 'Start Date' : 'Date'}</span>
                  <span className="text-text font-medium">
                    {startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              )}
              {needsDateRange && endDate && (
                <div className="flex justify-between">
                  <span className="text-text-muted">End Date</span>
                  <span className="text-text font-medium">
                    {endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-muted">Name</span>
                <span className="text-text font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Email</span>
                <span className="text-text font-medium">{formData.email}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="text-text font-semibold">Total</span>
                <span className="text-gold font-heading text-2xl font-bold">
                  ${selectedPkg.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <PayPalButton
            amount={selectedPkg.price}
            description={`${selectedPkg.name} — Shimi Project House`}
            onSuccess={handleBookingSuccess}
            onError={(msg) => setError(msg)}
          />

          <button
            onClick={() => setStep('details')}
            className="w-full mt-4 btn-outline-gold px-6 py-3 rounded-xl font-medium text-sm"
          >
            Back
          </button>
        </motion.div>
      )}
    </div>
  )
}
