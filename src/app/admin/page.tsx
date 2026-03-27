import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { readBookings } from '@/lib/bookings'
import AdminClient from './AdminClient'

export const metadata = {
  title: 'Admin — Shimi Project House',
}

// We check a simple cookie-based auth for the admin panel
// The actual password check happens in the AdminClient or this server component

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { auth?: string }
}) {
  const cookieStore = cookies()
  const authCookie = cookieStore.get('admin_auth')

  // Simple password from env
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  // Check if logging in via query param
  const isAuthed =
    authCookie?.value === adminPassword || searchParams.auth === adminPassword

  if (!isAuthed && searchParams.auth && searchParams.auth !== adminPassword) {
    // Wrong password, redirect to login
    redirect('/admin')
  }

  if (!isAuthed) {
    return <AdminLoginPage />
  }

  // Fetch bookings server-side
  const bookings = readBookings()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-24 pb-10 px-6 border-b border-border bg-surface/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-1">Management</p>
            <h1 className="font-heading text-3xl font-bold text-text">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-text-dim text-sm">{bookings.length} total bookings</span>
            <a
              href="/admin"
              className="btn-outline-gold px-4 py-2 rounded-lg text-sm font-medium"
            >
              Refresh
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <AdminClient initialBookings={bookings} />
        </div>
      </div>
    </div>
  )
}

function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="waveform">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
            <span className="font-heading text-gold font-semibold tracking-wider">SHIMI PROJECT HOUSE</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-text mb-2">Admin Login</h1>
          <p className="text-text-dim text-sm">Enter the admin password to access the dashboard</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">
          <form action="/admin" method="GET">
            <div className="mb-6">
              <label className="block text-sm text-text-muted mb-2">Password</label>
              <input
                type="password"
                name="auth"
                placeholder="Enter password"
                className="input-dark text-center text-lg tracking-widest"
                autoFocus
                required
              />
            </div>
            <button type="submit" className="btn-gold w-full py-3.5 rounded-xl font-semibold">
              Access Dashboard
            </button>
          </form>

          <p className="text-center text-text-dim text-xs mt-6">
            Protected area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}
