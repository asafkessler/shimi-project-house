import { NextRequest, NextResponse } from 'next/server'
import { createBooking, readBookings } from '@/lib/bookings'

export async function GET() {
  try {
    const bookings = readBookings()
    return NextResponse.json({ bookings })
  } catch {
    return NextResponse.json({ error: 'Failed to read bookings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { service, packageName, packagePrice, name, email, phone, startDate, endDate, notes, paypalOrderId } = body

    if (!service || !packageName || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: service, packageName, name, email' },
        { status: 400 }
      )
    }

    if (!['mixing', 'retreat', 'studio-rental'].includes(service)) {
      return NextResponse.json({ error: 'Invalid service type' }, { status: 400 })
    }

    const booking = createBooking({
      service,
      packageName,
      packagePrice: packagePrice ?? 0,
      name,
      email,
      phone: phone ?? '',
      startDate: startDate ?? new Date().toISOString(),
      endDate: endDate ?? startDate ?? new Date().toISOString(),
      notes: notes ?? '',
      paypalOrderId: paypalOrderId,
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
