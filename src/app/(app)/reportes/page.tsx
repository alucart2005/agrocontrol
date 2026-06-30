'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Fish, Egg, Bird, Rabbit, DollarSign, Package } from 'lucide-react'

export default function ReportesPage() {
  const [peces, setPeces] = useState<any[]>([])
  const [gallinas, setGallinas] = useState<any[]>([])
  const [patos, setPatos] = useState<any[]>([])
  const [conejos, setConejos] = useState<any[]>([])
  const [finanzas, setFinanzas] = useState<any[]>([])
  const [inventario, setInventario] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/peces').then(r => r.json()),
      fetch('/api/gallinas').then(r => r.json()),
      fetch('/api/patos').then(r => r.json()),
      fetch('/api/conejos').then(r => r.json()),
      fetch('/api/finanzas').then(r => r.json()),
      fetch('/api/inventario').then(r => r.json()),
    ]).then(([p, g, pa, c, f, i]) => {
      setPeces(Array.isArray(p) ? p : [])
      setGallinas(Array.isArray(g) ? g : [])
      setPatos(Array.isArray(pa) ? pa : [])
      setConejos(Array.isArray(c) ? c : [])
      setFinanzas(Array.isArray(f) ? f : [])
      setInventario(Array.isArray(i) ? i : [])
    })
  }, [])

  const totalPeces = peces.reduce((a, p) => a + p.stock_actual, 0)
  const totalHuevosGallinas = gallinas.reduce((a, g) => a + g.huevos_mes, 0)
  const totalHuevosPatos = patos.reduce((a, p) => a + p.huevos_mes, 0)
  const totalConejosNacidos = conejos.reduce((a, c) => a + c.nacidos_mes, 0)
  const totalIngresos = finanzas.filter((t: any) => t.tipo === 'ingreso').reduce((a: number, t: any) => a + t.total, 0)
  const totalGastos = finanzas.filter((t: any) => t.tipo === 'gasto').reduce((a: number, t: any) => a + t.total, 0)
  const alimentoTotal = inventario.reduce((a: number, i: any) => a + i.cantidad_kg, 0)
  const alertasInventario = inventario.filter((i: any) => i.cantidad_kg < i.stock_minimo).length

  const fmt = (n: number) => `$${n.toLocaleString('es-CO')}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2"><FileText className="w-6 h-6 text-slate-400" /> Reportes</h1>
        <p className="text-slate-400">Resumen de tu producción animal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Producción */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Producción</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Fish className="w-4 h-4 text-blue-400" /> Peces</span><span className="text-slate-200">{totalPeces} en estanques</span></div>
            <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Egg className="w-4 h-4 text-amber-400" /> Huevos gallina</span><span className="text-slate-200">{totalHuevosGallinas.toLocaleString()} /mes</span></div>
            <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Bird className="w-4 h-4 text-blue-400" /> Huevos pato</span><span className="text-slate-200">{totalHuevosPatos.toLocaleString()} /mes</span></div>
            <div className="flex justify-between"><span className="text-slate-400 flex items-center gap-2"><Rabbit className="w-4 h-4 text-purple-400" /> Conejos nacidos</span><span className="text-slate-200">{totalConejosNacidos} /mes</span></div>
          </div>
        </div>

        {/* Financiero */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Financiero</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Ingresos</span><span className="text-emerald-400">{fmt(totalIngresos)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Gastos</span><span className="text-red-400">{fmt(totalGastos)}</span></div>
            <div className="flex justify-between border-t border-slate-700 pt-3"><span className="text-slate-200 font-medium">Utilidad</span><span className={`font-bold ${totalIngresos - totalGastos >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{fmt(totalIngresos - totalGastos)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Margen</span><span className="text-slate-200">{totalIngresos > 0 ? (((totalIngresos - totalGastos) / totalIngresos) * 100).toFixed(1) : 0}%</span></div>
          </div>
        </div>

        {/* Inventario */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Inventario</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Items totales</span><span className="text-slate-200">{inventario.length}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Alimento total</span><span className="text-slate-200">{alimentoTotal.toFixed(1)} kg</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Valor inventario</span><span className="text-slate-200">{fmt(inventario.reduce((a: number, i: any) => a + i.cantidad_kg * i.precio_unitario, 0))}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Alertas reposición</span><span className={alertasInventario > 0 ? 'text-amber-400' : 'text-emerald-400'}>{alertasInventario}</span></div>
          </div>
        </div>
      </div>

      {/* Resumen por módulo */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Resumen por Módulo</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <Fish className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-200">{peces.length}</p>
            <p className="text-xs text-slate-400">Registros Peces</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <Egg className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-200">{gallinas.length}</p>
            <p className="text-xs text-slate-400">Registros Gallinas</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <Bird className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-200">{patos.length}</p>
            <p className="text-xs text-slate-400">Registros Patos</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <Rabbit className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-200">{conejos.length}</p>
            <p className="text-xs text-slate-400">Registros Conejos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
