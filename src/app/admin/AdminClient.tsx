'use client'

import AdminBookings from '@/components/AdminBookings'
import { Booking } from '@/types'

interface Props {
  initialBookings: Booking[]
}

export default function AdminClient({ initialBookings }: Props) {
  return <AdminBookings initialBookings={initialBookings} />
}
