import fs from 'fs'
import path from 'path'
import { Booking, BookingStatus } from '@/types'

const BOOKINGS_FILE = path.join(process.cwd(), 'bookings.json')

function ensureFileExists(): void {
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, '[]', 'utf-8')
  }
}

export function readBookings(): Booking[] {
  ensureFileExists()
  try {
    const content = fs.readFileSync(BOOKINGS_FILE, 'utf-8')
    return JSON.parse(content) as Booking[]
  } catch {
    return []
  }
}

export function writeBookings(bookings: Booking[]): void {
  ensureFileExists()
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8')
}

export function getBookingById(id: string): Booking | undefined {
  const bookings = readBookings()
  return bookings.find((b) => b.id === id)
}

export function createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const bookings = readBookings()
  const newBooking: Booking = {
    ...data,
    id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  bookings.push(newBooking)
  writeBookings(bookings)
  return newBooking
}

export function updateBookingStatus(id: string, status: BookingStatus): Booking | null {
  const bookings = readBookings()
  const index = bookings.findIndex((b) => b.id === id)
  if (index === -1) return null
  bookings[index].status = status
  writeBookings(bookings)
  return bookings[index]
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | null {
  const bookings = readBookings()
  const index = bookings.findIndex((b) => b.id === id)
  if (index === -1) return null
  bookings[index] = { ...bookings[index], ...updates }
  writeBookings(bookings)
  return bookings[index]
}

export function deleteBooking(id: string): boolean {
  const bookings = readBookings()
  const filtered = bookings.filter((b) => b.id !== id)
  if (filtered.length === bookings.length) return false
  writeBookings(filtered)
  return true
}
