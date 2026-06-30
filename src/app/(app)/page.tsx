'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Package, TrendingUp, AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  const [kpis, setKpis] = useState([
    { label: 'Ingresos del Mes', value: '$0', change: '', icon: DollarSign, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
    { label: 'Registros Totales', value: '0', change: '', icon: Package, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
    { label: 'Utilidad', value: '$0', change: '', icon: TrendingUp, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
    { label: 'Alertas', value: '0', change: '', icon: AlertTriangle, color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
  ])
  const [actividad, setActividad] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/finanzas').then(r => r.json()),
      fetch('/api/peces').then(r => r.json()),
      fetch('/api/gallinas').then(r => r.json()),
      fetch('/api/patos').then(r => r.json()),
      fetch('/api/conejos').then(r => r.json()),
      fetch('/api/inventario').then(r => r.json()),
    ]).then(([finanzas, peces, gallinas, patos, conejos, inventario]) => {
      const f = Array.isArray(finanzas) ? finanzas : []
      const p = Array.isArray(peces) ? peces : []
      const g = Array.isArray(gallinas) ? gallinas : []
      const pa = Array.isArray(patos) ? patos : []
      const c = Array.isArray(conejos) ? conejos : []
      const inv = Array.isArray(inventario) ? inventario : []

      const ingresos = f.filter((t: any) => t.tipo === 'ingreso').reduce((a: number, t: any) => a + t.total, 0)
      const gastos = f.filter((t: any) => t.tipo === 'gasto').reduce((a: number, t: any) => a + t.total, 0)
      const totalRegistros = p.length + g.length + pa.length + c.length
      const alertas = inv.filter((i: any) => i.cantidad_kg < i.stock_minimo).length

      setKpis([
        { label: 'Ingresos del Mes', value: `$${ingresos.toLocaleString('es-CO')}`, change: `${f.filter((t: any) => t.tipo === 'ingreso').length} transacciones`, icon: DollarSign, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
        { label: 'Registros Totales', value: `${totalRegistros}`, change: `${p.length} peces, ${g.length} gallinas`, icon: Package, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
        { label: 'Utilidad', value: `$${(ingresos - gastos).toLocaleString('es-CO')}`, change: ingresos > 0 ? `${(((ingresos - gastos) / ingresos) * 100).toFixed(1)}% margen` : 'Sin datos', icon: TrendingUp, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
        { label: 'Alertas', value: `${alertas}`, change: alertas > 0 ? 'Reposición needed' : 'Todo OK', icon: AlertTriangle, color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
      ])

      const recent = [
        ...p.slice(0, 2).map((r: any) => ({ text: `Pez: ${r.especie} - ${r.estanque}`, fecha: r.fecha_registro })),
        ...g.slice(0, 2).map((r: any) => ({ text: `Gallinas: ${r.huevos_hoy} huevos hoy`, fecha: r.fecha_registro })),
        ...pa.slice(0, 1).map((r: any) => ({ text: `Patos: ${r.huevos_hoy} huevos hoy`, fecha: r.fecha_registro })),
        ...c.slice(0, 1).map((r: any) => ({ text: `Conejos: ${r.nacidos_mes} nacidos`, fecha: r.fecha_registro })),
      ].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).slice(0, 5)
      setActividad(recent)
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-200">Dashboard</h1>
        <p className="text-slate-400">Resumen de tu producción animal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
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

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Actividad Reciente</h3>
        {actividad.length === 0 ? <p className="text-slate-400 text-sm">Sin actividad aún. Crea registros en los módulos.</p> : (
          <div className="space-y-3">
            {actividad.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                <span className="text-slate-200 text-sm">{a.text}</span>
                <span className="text-slate-400 text-xs">{new Date(a.fecha).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
