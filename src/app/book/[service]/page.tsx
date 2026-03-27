import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BookingPageClient from './BookingPageClient'
import { MIXING_PACKAGES, RETREAT_PACKAGES, STUDIO_RENTAL_PACKAGES } from '@/types'

type ServiceParam = 'mixing' | 'retreat' | 'studio-rental'

const SERVICE_META: Record<ServiceParam, { title: string; description: string }> = {
  mixing: {
    title: 'Book Mixing Services — Shimi Project House',
    description: 'Book a professional mixing session. Choose your package and get started.',
  },
  retreat: {
    title: 'Book a Production Retreat — Shimi Project House',
    description: 'Book an immersive production retreat. Creative sessions, private accommodation, full studio access.',
  },
  'studio-rental': {
    title: 'Book Studio Rental — Shimi Project House',
    description: 'Book the recording studio by the day or week. Full gear access, engineer included.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { service: string }
}): Promise<Metadata> {
  const meta = SERVICE_META[params.service as ServiceParam]
  if (!meta) return { title: 'Book — Shimi Project House' }
  return { title: meta.title, description: meta.description }
}

export function generateStaticParams() {
  return [
    { service: 'mixing' },
    { service: 'retreat' },
    { service: 'studio-rental' },
  ]
}

const SERVICE_PACKAGES = {
  mixing: MIXING_PACKAGES,
  retreat: RETREAT_PACKAGES,
  'studio-rental': STUDIO_RENTAL_PACKAGES,
}

const SERVICE_LABELS: Record<ServiceParam, string> = {
  mixing: 'Mixing Services',
  retreat: 'Production Retreat',
  'studio-rental': 'Studio Rental',
}

export default function BookingPage({
  params,
  searchParams,
}: {
  params: { service: string }
  searchParams: { package?: string }
}) {
  const service = params.service as ServiceParam
  const packages = SERVICE_PACKAGES[service]

  if (!packages) {
    notFound()
  }

  return (
    <BookingPageClient
      service={service}
      packages={packages}
      serviceLabel={SERVICE_LABELS[service]}
      selectedPackageId={searchParams.package}
    />
  )
}
