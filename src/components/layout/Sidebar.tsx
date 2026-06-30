'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Fish,
  Egg,
  Bird,
  Rabbit,
  DollarSign,
  Package,
  FileText,
} from 'lucide-react'

const menuItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/peces', label: 'Peces', icon: Fish },
  { href: '/gallinas', label: 'Gallinas', icon: Egg },
  { href: '/patos', label: 'Patos', icon: Bird },
  { href: '/conejos', label: 'Conejos', icon: Rabbit },
  { href: '/finanzas', label: 'Finanzas', icon: DollarSign },
  { href: '/inventario', label: 'Inventario', icon: Package },
  { href: '/reportes', label: 'Reportes', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <h1 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          AgroControl
        </h1>
        <p className="text-xs text-slate-400 mt-1">Bajo Cauca, Antioquia</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-xs text-slate-400">Última actualización</p>
          <p className="text-sm text-slate-200 mt-1">Hoy, 12:30 PM</p>
        </div>
      </div>
    </aside>
  )
}
