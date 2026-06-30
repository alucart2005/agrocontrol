'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const publicPaths = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/callback']

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  useEffect(() => {
    if (!loading && !user && !isPublicPath) {
      router.push('/auth/login')
    }
  }, [loading, user, isPublicPath, router])

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Cargando...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated (for protected routes)
  if (!user && !isPublicPath) {
    return null
  }

  return <>{children}</>
}
