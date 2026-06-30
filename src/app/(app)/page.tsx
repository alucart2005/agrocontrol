'use client'

import { DollarSign, Package, TrendingUp, AlertTriangle } from 'lucide-react'
import { ChartIngresos } from '@/components/dashboard/ChartIngresos'
import { Alertas } from '@/components/dashboard/Alertas'

const kpis = [
  {
    label: 'Ingresos del Mes',
    value: '$4,100,000',
    change: '+12%',
    icon: DollarSign,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
  },
  {
    label: 'Producción Total',
    value: '380 kg',
    change: '+8%',
    icon: Package,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
  },
  {
    label: 'Crecimiento',
    value: '+12%',
    change: '+3%',
    icon: TrendingUp,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
  },
  {
    label: 'Alertas Activas',
    value: '3',
    change: '-2',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-200">Dashboard</h1>
        <p className="text-slate-400">Resumen de tu producción animal</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-200 mt-1">{kpi.value}</p>
                <p className={`text-sm mt-1 ${kpi.color}`}>{kpi.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Ingresos vs Gastos</h3>
          <ChartIngresos />
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Alertas Pendientes</h3>
          <Alertas />
        </div>
      </div>
    </div>
  )
}
