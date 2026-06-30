'use client'

import { Bell, LogOut, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/login')
  }

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user?.email?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <header className="h-16 bg-slate-900/30 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-200">Bienvenido</h2>
        <p className="text-xs text-slate-400">{user?.user_metadata?.full_name || user?.email}</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center text-sm font-medium text-emerald-400">
            {getUserInitials()}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">{user?.user_metadata?.full_name || 'Usuario'}</p>
            <p className="text-xs text-slate-400">Finca</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
