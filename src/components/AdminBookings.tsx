'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Booking, BookingStatus, ServiceType } from '@/types'

interface AdminBookingsProps {
  initialBookings: Booking[]
}

const SERVICE_LABELS: Record<ServiceType, string> = {
  mixing: 'Mixing',
  retreat: 'Retreat',
  'studio-rental': 'Studio Rental',
}

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
}

export default function AdminBookings({ initialBookings }: AdminBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [filterService, setFilterService] = useState<ServiceType | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [sortField, setSortField] = useState<'createdAt' | 'startDate' | 'packagePrice'>('createdAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return bookings
      .filter((b) => {
        if (filterService !== 'all' && b.service !== filterService) return false
        if (filterStatus !== 'all' && b.status !== filterStatus) return false
        if (filterFrom && new Date(b.startDate) < new Date(filterFrom)) return false
        if (filterTo && new Date(b.startDate) > new Date(filterTo)) return false
        return true
      })
      .sort((a, b) => {
        const av = sortField === 'packagePrice' ? a[sortField] : new Date(a[sortField]).getTime()
        const bv = sortField === 'packagePrice' ? b[sortField] : new Date(b[sortField]).getTime()
        return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number)
      })
  }, [bookings, filterService, filterStatus, filterFrom, filterTo, sortField, sortDir])

  const totalRevenue = filtered
    .filter((b) => b.status === 'confirmed')
    .reduce((sum, b) => sum + b.packagePrice, 0)

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        )
      }
    } finally {
      setUpdating(null)
    }
  }

  async function deleteBooking(id: string) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id))
      }
    } finally {
      setUpdating(null)
      setDeleteConfirm(null)
    }
  }

  function toggleSort(field: typeof sortField) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => (
    <span className={`ml-1 text-xs ${sortField === field ? 'text-gold' : 'text-text-dim'}`}>
      {sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  )

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: bookings.length, color: 'text-text' },
          { label: 'Pending', value: bookings.filter((b) => b.status === 'pending').length, color: 'text-yellow-400' },
          { label: 'Confirmed', value: bookings.filter((b) => b.status === 'confirmed').length, color: 'text-green-400' },
          { label: 'Revenue (Confirmed)', value: `$${totalRevenue.toLocaleString()}`, color: 'text-gold' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-2 border border-border rounded-xl p-4">
            <p className="text-text-dim text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-2xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-surface-2 border border-border rounded-xl p-4 mb-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-text-dim mb-1.5">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value as ServiceType | 'all')}
              className="input-dark text-sm"
            >
              <option value="all">All Services</option>
              <option value="mixing">Mixing</option>
              <option value="retreat">Retreat</option>
              <option value="studio-rental">Studio Rental</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-text-dim mb-1.5">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as BookingStatus | 'all')}
              className="input-dark text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-text-dim mb-1.5">From Date</label>
            <input
              type="date"
              value={filterFrom}
              onChange={(e) => setFilterFrom(e.target.value)}
              className="input-dark text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-text-dim mb-1.5">To Date</label>
            <input
              type="date"
              value={filterTo}
              onChange={(e) => setFilterTo(e.target.value)}
              className="input-dark text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-2 border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th
                  className="text-left px-4 py-3 text-text-dim font-medium cursor-pointer hover:text-text transition-colors"
                  onClick={() => toggleSort('createdAt')}
                >
                  Created <SortIcon field="createdAt" />
                </th>
                <th className="text-left px-4 py-3 text-text-dim font-medium">Name</th>
                <th className="text-left px-4 py-3 text-text-dim font-medium">Service</th>
                <th className="text-left px-4 py-3 text-text-dim font-medium">Package</th>
                <th
                  className="text-left px-4 py-3 text-text-dim font-medium cursor-pointer hover:text-text transition-colors"
                  onClick={() => toggleSort('startDate')}
                >
                  Dates <SortIcon field="startDate" />
                </th>
                <th
                  className="text-right px-4 py-3 text-text-dim font-medium cursor-pointer hover:text-text transition-colors"
                  onClick={() => toggleSort('packagePrice')}
                >
                  Amount <SortIcon field="packagePrice" />
                </th>
                <th className="text-center px-4 py-3 text-text-dim font-medium">Status</th>
                <th className="text-right px-4 py-3 text-text-dim font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-text-dim">
                    No bookings found matching your filters.
                  </td>
                </tr>
              )}
              {filtered.map((booking, i) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-surface-3/50 transition-colors"
                >
                  <td className="px-4 py-3 text-text-muted whitespace-nowrap">
                    {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-text font-medium">{booking.name}</p>
                      <p className="text-text-dim text-xs">{booking.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-text-muted">{SERVICE_LABELS[booking.service]}</span>
                  </td>
                  <td className="px-4 py-3 text-text-muted max-w-[140px] truncate">{booking.packageName}</td>
                  <td className="px-4 py-3 text-text-muted whitespace-nowrap text-xs">
                    <div>{new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    {booking.startDate !== booking.endDate && (
                      <div className="text-text-dim">→ {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-semibold ${booking.packagePrice > 0 ? 'text-gold' : 'text-text-muted'}`}>
                      {booking.packagePrice > 0 ? `$${booking.packagePrice.toLocaleString()}` : 'Custom'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'badge-confirmed'
                        : booking.status === 'cancelled'
                        ? 'badge-cancelled'
                        : 'badge-pending'
                    }`}>
                      {STATUS_LABELS[booking.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {booking.status !== 'confirmed' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          disabled={updating === booking.id}
                          className="p-1.5 rounded-lg hover:bg-green-900/20 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                          title="Mark as confirmed"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      {booking.status !== 'pending' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'pending')}
                          disabled={updating === booking.id}
                          className="p-1.5 rounded-lg hover:bg-yellow-900/20 text-yellow-400 hover:text-yellow-300 transition-colors disabled:opacity-50"
                          title="Mark as pending"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => updateStatus(booking.id, 'cancelled')}
                          disabled={updating === booking.id}
                          className="p-1.5 rounded-lg hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          title="Mark as cancelled"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {deleteConfirm === booking.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            disabled={updating === booking.id}
                            className="px-2 py-1 text-xs rounded bg-red-800/50 text-red-300 hover:bg-red-800 transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-xs rounded bg-surface text-text-dim hover:text-text transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(booking.id)}
                          className="p-1.5 rounded-lg hover:bg-red-900/20 text-text-dim hover:text-red-400 transition-colors"
                          title="Delete booking"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-text-dim">
            <span>Showing {filtered.length} of {bookings.length} bookings</span>
            <span>
              Filtered Revenue (Confirmed):{' '}
              <span className="text-gold font-semibold">${totalRevenue.toLocaleString()}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
