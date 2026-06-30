'use client'

import { FileText, Download } from 'lucide-react'

export default function ReportesPage() {
  const reportes = [
    {
      id: 1,
      titulo: 'Producción Mensual - Junio 2026',
      fecha: '2026-06-30',
      tipo: 'Producción',
    },
    {
      id: 2,
      titulo: 'Reporte Financiero - Junio 2026',
      fecha: '2026-06-30',
      tipo: 'Financiero',
    },
    {
      id: 3,
      titulo: 'Inventario de Insumos - Junio 2026',
      fecha: '2026-06-30',
      tipo: 'Inventario',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
          <FileText className="w-6 h-6 text-slate-400" />
          Reportes
        </h1>
        <p className="text-slate-400">Genera y descarga reportes de tu producción</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Reporte de Producción</h3>
          <p className="text-sm text-slate-400 mb-4">Resumen de producción por especie y período</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Peces</span>
              <span className="text-slate-200">350 kg cosechados</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Huevos gallina</span>
              <span className="text-slate-200">2,500 unidades</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Huevos pato</span>
              <span className="text-slate-200">800 unidades</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Conejos</span>
              <span className="text-slate-200">40 kg</span>
            </div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Reporte Financiero</h3>
          <p className="text-sm text-slate-400 mb-4">Ingresos, gastos y utilidad neta</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Ingresos</span>
              <span className="text-emerald-400">$4,100,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Gastos</span>
              <span className="text-red-400">$2,300,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Utilidad</span>
              <span className="text-emerald-400">$1,800,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Margen</span>
              <span className="text-emerald-400">43.9%</span>
            </div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Reporte de Inventario</h3>
          <p className="text-sm text-slate-400 mb-4">Estado actual de insumos y proyección</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Alimento total</span>
              <span className="text-slate-200">335 kg</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Días restantes</span>
              <span className="text-amber-400">12 días</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Items bajo mínimo</span>
              <span className="text-amber-400">1</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Valor total</span>
              <span className="text-slate-200">$1,250,000</span>
            </div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  )
}
