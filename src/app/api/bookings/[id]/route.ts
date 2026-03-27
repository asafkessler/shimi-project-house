import { NextRequest, NextResponse } from 'next/server'
import { getBookingById, updateBookingStatus, updateBooking, deleteBooking } from '@/lib/bookings'
import { BookingStatus } from '@/types'

type Params = { params: { id: string } }

export async function GET(_request: NextRequest, { params }: Params) {
  const booking = getBookingById(params.id)
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }
  return NextResponse.json({ booking })
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json()
    const { status, ...otherUpdates } = body

    // Validate status if provided
    if (status && !['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    let booking
    if (status && Object.keys(otherUpdates).length === 0) {
      booking = updateBookingStatus(params.id, status as BookingStatus)
    } else {
      booking = updateBooking(params.id, { ...(status ? { status } : {}), ...otherUpdates })
    }

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const success = deleteBooking(params.id)
  if (!success) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }
  return NextResponse.json({ message: 'Booking deleted successfully' })
}
