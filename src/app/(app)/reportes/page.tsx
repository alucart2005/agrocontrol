'use client'

import { useState, useEffect } from 'react'
import { FileText, Printer, Fish, Egg, Bird, Rabbit, DollarSign, Package } from 'lucide-react'

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
  const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })

  const handlePrint = () => { window.print() }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2"><FileText className="w-6 h-6 text-slate-400" /> Reportes</h1>
          <p className="text-slate-400">Resumen de tu producción animal</p>
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          <Printer className="w-4 h-4" /> Imprimir / PDF
        </button>
      </div>

      {/* Reporte Imprimible */}
      <div id="reporte-printable" className="space-y-6">
        {/* Header del reporte */}
        <div className="print-header text-center border-b-2 border-slate-300 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">AgroControl</h1>
          <p className="text-slate-600">Bajo Cauca, Antioquia</p>
          <h2 className="text-xl font-semibold text-slate-700 mt-2">Reporte General de Producción</h2>
          <p className="text-sm text-slate-500">{fecha}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Producción */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 print-card">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Producción</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-600">Peces en estanques</span><span className="font-semibold text-slate-800">{totalPeces}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Huevos gallina /mes</span><span className="font-semibold text-slate-800">{totalHuevosGallinas.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Huevos pato /mes</span><span className="font-semibold text-slate-800">{totalHuevosPatos.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Conejos nacidos /mes</span><span className="font-semibold text-slate-800">{totalConejosNacidos}</span></div>
            </div>
          </div>

          {/* Financiero */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 print-card">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Financiero</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-600">Ingresos</span><span className="font-semibold text-emerald-600">{fmt(totalIngresos)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Gastos</span><span className="font-semibold text-red-600">{fmt(totalGastos)}</span></div>
              <div className="flex justify-between border-t pt-2"><span className="text-slate-800 font-bold">Utilidad</span><span className={`font-bold ${totalIngresos - totalGastos >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmt(totalIngresos - totalGastos)}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Margen</span><span className="font-semibold text-slate-800">{totalIngresos > 0 ? (((totalIngresos - totalGastos) / totalIngresos) * 100).toFixed(1) : 0}%</span></div>
            </div>
          </div>

          {/* Inventario */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 print-card">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Inventario</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-600">Items totales</span><span className="font-semibold text-slate-800">{inventario.length}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Alimento total</span><span className="font-semibold text-slate-800">{alimentoTotal.toFixed(1)} kg</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Valor inventario</span><span className="font-semibold text-slate-800">{fmt(inventario.reduce((a: number, i: any) => a + i.cantidad_kg * i.precio_unitario, 0))}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Alertas reposición</span><span className={`font-semibold ${alertasInventario > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{alertasInventario}</span></div>
            </div>
          </div>
        </div>

        {/* Tabla Peces */}
        {peces.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 print-card">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Detalle Peces</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-slate-600">
                <th className="py-1">Fecha</th><th className="py-1">Estanque</th><th className="py-1">Especie</th><th className="py-1 text-right">Stock</th><th className="py-1 text-right">Peso (g)</th><th className="py-1 text-right">Alimento (kg)</th>
              </tr></thead>
              <tbody>{peces.map((p: any) => (
                <tr key={p.id} className="border-b border-slate-100">
                  <td className="py-1">{new Date(p.fecha_registro).toLocaleDateString()}</td>
                  <td className="py-1">{p.estanque}</td>
                  <td className="py-1">{p.especie}</td>
                  <td className="py-1 text-right">{p.stock_actual}</td>
                  <td className="py-1 text-right">{p.peso_promedio}</td>
                  <td className="py-1 text-right">{p.alimento_kg}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* Tabla Gallinas */}
        {gallinas.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 print-card">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Detalle Gallinas</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-slate-600">
                <th className="py-1">Fecha</th><th className="py-1">Lote</th><th className="py-1 text-right">Hoy</th><th className="py-1 text-right">Semana</th><th className="py-1 text-right">Mes</th><th className="py-1 text-right">Mort.</th><th className="py-1 text-right">Alimento</th>
              </tr></thead>
              <tbody>{gallinas.map((g: any) => (
                <tr key={g.id} className="border-b border-slate-100">
                  <td className="py-1">{new Date(g.fecha_registro).toLocaleDateString()}</td>
                  <td className="py-1">{g.lote}</td>
                  <td className="py-1 text-right">{g.huevos_hoy}</td>
                  <td className="py-1 text-right">{g.huevos_semana}</td>
                  <td className="py-1 text-right">{g.huevos_mes}</td>
                  <td className="py-1 text-right">{g.mortalidad}</td>
                  <td className="py-1 text-right">{g.alimento_kg}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* Tabla Transacciones */}
        {finanzas.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 print-card">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Detalle Financiero</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-slate-600">
                <th className="py-1">Fecha</th><th className="py-1">Tipo</th><th className="py-1">Categoría</th><th className="py-1">Producto</th><th className="py-1 text-right">Total</th>
              </tr></thead>
              <tbody>{finanzas.map((t: any) => (
                <tr key={t.id} className="border-b border-slate-100">
                  <td className="py-1">{new Date(t.fecha).toLocaleDateString()}</td>
                  <td className="py-1">{t.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}</td>
                  <td className="py-1">{t.categoria}</td>
                  <td className="py-1">{t.producto}</td>
                  <td className="py-1 text-right font-semibold">{fmt(t.total)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* Tabla Inventario */}
        {inventario.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 print-card">
            <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Detalle Inventario</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-slate-600">
                <th className="py-1">Producto</th><th className="py-1 text-right">Cantidad</th><th className="py-1 text-right">Mínimo</th><th className="py-1">Proveedor</th><th className="py-1 text-right">Precio/kg</th><th className="py-1">Estado</th>
              </tr></thead>
              <tbody>{inventario.map((i: any) => (
                <tr key={i.id} className="border-b border-slate-100">
                  <td className="py-1">{i.producto}</td>
                  <td className="py-1 text-right">{i.cantidad_kg} kg</td>
                  <td className="py-1 text-right">{i.stock_minimo} kg</td>
                  <td className="py-1">{i.proveedor}</td>
                  <td className="py-1 text-right">{fmt(i.precio_unitario)}</td>
                  <td className="py-1">{i.cantidad_kg < i.stock_minimo ? 'Reposición' : 'OK'}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 border-t border-slate-200 pt-4 print-footer">
          <p>AgroControl - Reporte generado el {fecha}</p>
          <p>Bajo Cauca, Antioquia, Colombia</p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #reporte-printable, #reporte-printable * { visibility: visible; }
          #reporte-printable { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
          .no-print { display: none !important; }
          .print-card { break-inside: avoid; page-break-inside: avoid; }
          .print-header { border-bottom-color: #333 !important; }
          .print-footer { color: #666 !important; }
          @page { margin: 1cm; }
        }
      `}</style>
    </div>
  )
}
