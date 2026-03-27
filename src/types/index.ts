export type ServiceType = 'mixing' | 'retreat' | 'studio-rental'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Booking {
  id: string
  service: ServiceType
  packageName: string
  packagePrice: number
  name: string
  email: string
  phone: string
  startDate: string
  endDate: string
  notes: string
  status: BookingStatus
  paypalOrderId?: string
  createdAt: string
}

export interface PricingPackage {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  duration?: string
  popular?: boolean
}

export const MIXING_PACKAGES: PricingPackage[] = [
  {
    id: 'basic-mix',
    name: 'Basic Mix',
    price: 150,
    description: 'Professional mixing for single tracks with full stereo mastering.',
    features: [
      'Up to 32 tracks',
      'Stereo mix delivery',
      '2 revision rounds',
      '5-7 day turnaround',
      'WAV + MP3 delivery',
    ],
    duration: 'Per Track',
  },
  {
    id: 'full-mix-master',
    name: 'Full Mix + Master',
    price: 300,
    description: 'Complete mix and master package — ready for streaming and release.',
    features: [
      'Unlimited tracks',
      'Stereo mix + master',
      '4 revision rounds',
      '7-10 day turnaround',
      'Streaming-optimized delivery',
      'Stems delivery included',
    ],
    duration: 'Per Track',
    popular: true,
  },
  {
    id: 'album-package',
    name: 'Album Package',
    price: 2000,
    description: 'Full album mixing and mastering with cohesive sonic identity.',
    features: [
      'Up to 10 tracks',
      'Full mix + master',
      'Unlimited revisions',
      '3-4 week turnaround',
      'Album-sequenced masters',
      'Stems + multitracks',
      'Priority support',
    ],
    duration: '10 Tracks',
  },
]

export const RETREAT_PACKAGES: PricingPackage[] = [
  {
    id: 'weekend-retreat',
    name: 'Weekend Retreat',
    price: 800,
    description: 'An intensive 2-day creative deep dive in a fully equipped studio environment.',
    features: [
      '2 full days in studio',
      'Private accommodation included',
      'Full kitchen access',
      'Equipment library access',
      'Daily producer consultation',
      'High-speed internet',
    ],
    duration: '2 Days',
  },
  {
    id: 'week-retreat',
    name: 'Week Retreat',
    price: 2500,
    description: 'Five days of uninterrupted creative immersion with full studio access.',
    features: [
      '5 full days in studio',
      'Private suite accommodation',
      'All meals included',
      'Full equipment access',
      'Daily 1-on-1 sessions',
      'Final mix consultation',
      'Transport from airport',
      'Priority booking',
    ],
    duration: '5 Days',
    popular: true,
  },
  {
    id: 'custom-retreat',
    name: 'Custom Package',
    price: 0,
    description: 'Tailored retreat experience designed around your specific creative goals.',
    features: [
      'Flexible duration',
      'Custom accommodation',
      'Bespoke daily schedule',
      'Dedicated engineer',
      'Custom equipment setup',
      'All-inclusive options',
    ],
    duration: 'Custom',
  },
]

export const STUDIO_RENTAL_PACKAGES: PricingPackage[] = [
  {
    id: 'half-day',
    name: 'Half Day',
    price: 200,
    description: 'Four focused hours in a world-class recording environment.',
    features: [
      '4 hours studio time',
      'Engineer on request',
      'Outboard gear access',
      'Instrument hire available',
      'Lounge access',
    ],
    duration: '4 Hours',
  },
  {
    id: 'full-day',
    name: 'Full Day',
    price: 350,
    description: 'A complete studio day — ideal for tracking sessions and creative work.',
    features: [
      '8 hours studio time',
      'Engineer included',
      'Full outboard rack',
      'Instrument library',
      'Lounge + kitchen access',
      'Free parking',
    ],
    duration: '8 Hours',
    popular: true,
  },
  {
    id: 'weekly',
    name: 'Weekly',
    price: 1400,
    description: 'Five days of exclusive studio access for your project or album recording.',
    features: [
      '5 full days studio',
      'Dedicated engineer',
      'Full gear access',
      'Overnight access available',
      'Accommodation option',
      'Catering on request',
      'Priority scheduling',
    ],
    duration: '5 Days',
  },
]
