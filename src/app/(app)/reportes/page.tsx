'use client'

import { useState, useEffect } from 'react'
import { FileText, Printer, Fish, Egg, Bird, Rabbit, DollarSign, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

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
  const utilidad = totalIngresos - totalGastos
  const margen = totalIngresos > 0 ? ((utilidad / totalIngresos) * 100).toFixed(1) : '0'
  const alimentoTotal = inventario.reduce((a: number, i: any) => a + i.cantidad_kg, 0)
  const alertasInventario = inventario.filter((i: any) => i.cantidad_kg < i.stock_minimo).length
  const valorInventario = inventario.reduce((a: number, i: any) => a + i.cantidad_kg * i.precio_unitario, 0)

  const fmt = (n: number) => `$${n.toLocaleString('es-CO')}`
  const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
  const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })

  const handlePrint = () => { window.print() }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><FileText className="w-6 h-6 text-slate-600" /> Reportes</h1>
          <p className="text-slate-600">Resumen de tu producción animal</p>
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-emerald-500/25">
          <Printer className="w-4 h-4" /> Imprimir / PDF
        </button>
      </div>

      <div id="reporte-printable" className="space-y-8">
        {/* Header */}
        <div className="print-header bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Fish className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">AgroControl</h1>
          <p className="text-emerald-100 text-lg mt-1">Bajo Cauca, Antioquia</p>
          <div className="mt-4 pt-4 border-t border-emerald-500/50">
            <h2 className="text-xl font-semibold">Reporte General de Producción</h2>
            <p className="text-emerald-200 text-sm mt-1">{fecha} - {hora}</p>
          </div>
        </div>

        {/* KPIs Principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="print-card bg-slate-100 border border-slate-300 rounded-xl p-5 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full mb-3">
              <Fish className="w-6 h-6 text-blue-700" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPeces}</p>
            <p className="text-sm text-slate-700 mt-1">Peces Activos</p>
          </div>
          <div className="print-card bg-slate-100 border border-slate-300 rounded-xl p-5 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-200 rounded-full mb-3">
              <Egg className="w-6 h-6 text-amber-700" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{(totalHuevosGallinas + totalHuevosPatos).toLocaleString()}</p>
            <p className="text-sm text-slate-700 mt-1">Huevos / Mes</p>
          </div>
          <div className="print-card bg-slate-100 border border-slate-300 rounded-xl p-5 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-200 rounded-full mb-3">
              <DollarSign className="w-6 h-6 text-emerald-700" />
            </div>
            <p className="text-3xl font-bold text-emerald-800">{fmt(utilidad)}</p>
            <p className="text-sm text-slate-700 mt-1">Utilidad Neta</p>
          </div>
          <div className="print-card bg-slate-100 border border-slate-300 rounded-xl p-5 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full mb-3">
              <Rabbit className="w-6 h-6 text-purple-700" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalConejosNacidos}</p>
            <p className="text-sm text-slate-700 mt-1">Conejos / Mes</p>
          </div>
        </div>

        {/* Resumen Financiero Detallado */}
        <div className="print-card bg-slate-100 border border-slate-300 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-200 px-6 py-4 border-b border-slate-300">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" /> Resumen Financiero
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-emerald-200 rounded-lg">
                <TrendingUp className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                <p className="text-sm text-slate-700 mb-1">Ingresos Totales</p>
                <p className="text-2xl font-bold text-emerald-900">{fmt(totalIngresos)}</p>
              </div>
              <div className="text-center p-4 bg-red-200 rounded-lg">
                <TrendingDown className="w-8 h-8 text-red-700 mx-auto mb-2" />
                <p className="text-sm text-slate-700 mb-1">Gastos Totales</p>
                <p className="text-2xl font-bold text-red-900">{fmt(totalGastos)}</p>
              </div>
              <div className="text-center p-4 bg-blue-200 rounded-lg">
                <DollarSign className="w-8 h-8 text-blue-700 mx-auto mb-2" />
                <p className="text-sm text-slate-700 mb-1">Margen de Utilidad</p>
                <p className="text-2xl font-bold text-blue-900">{margen}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen Producción */}
        <div className="print-card bg-slate-100 border border-slate-300 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-200 px-6 py-4 border-b border-slate-300">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-700" /> Resumen de Producción
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-200 rounded-lg">
                <Fish className="w-8 h-8 text-blue-700" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{totalPeces}</p>
                  <p className="text-xs text-slate-700">Peces</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-200 rounded-lg">
                <Egg className="w-8 h-8 text-amber-700" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{totalHuevosGallinas.toLocaleString()}</p>
                  <p className="text-xs text-slate-700">Huevos Gallina</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-200 rounded-lg">
                <Bird className="w-8 h-8 text-blue-700" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{totalHuevosPatos.toLocaleString()}</p>
                  <p className="text-xs text-slate-700">Huevos Pato</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-200 rounded-lg">
                <Rabbit className="w-8 h-8 text-purple-700" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">{totalConejosNacidos}</p>
                  <p className="text-xs text-slate-700">Conejos Nacidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen Inventario */}
        <div className="print-card bg-slate-100 border border-slate-300 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-200 px-6 py-4 border-b border-slate-300">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-slate-700" /> Estado de Inventario
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border border-slate-300 rounded-lg bg-white">
                <p className="text-2xl font-bold text-slate-900">{inventario.length}</p>
                <p className="text-xs text-slate-700">Items</p>
              </div>
              <div className="text-center p-3 border border-slate-300 rounded-lg bg-white">
                <p className="text-2xl font-bold text-slate-900">{alimentoTotal.toFixed(0)} kg</p>
                <p className="text-xs text-slate-700">Alimento Total</p>
              </div>
              <div className="text-center p-3 border border-slate-300 rounded-lg bg-white">
                <p className="text-2xl font-bold text-slate-900">{fmt(valorInventario)}</p>
                <p className="text-xs text-slate-700">Valor Total</p>
              </div>
              <div className="text-center p-3 border border-slate-300 rounded-lg bg-white">
                <p className={`text-2xl font-bold ${alertasInventario > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>{alertasInventario}</p>
                <p className="text-xs text-slate-700">Alertas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla Peces */}
        {peces.length > 0 && (
          <div className="print-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-200 px-6 py-4 border-b border-slate-300">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Fish className="w-5 h-5 text-blue-700" /> Registro de Peces ({peces.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-800">Fecha</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Estanque</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Especie</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Stock</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Peso (g)</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Alimento (kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {peces.map((p: any) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">{new Date(p.fecha_registro).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-slate-900 font-medium">{p.estanque}</td>
                      <td className="px-4 py-3 text-slate-900">{p.especie}</td>
                      <td className="px-4 py-3 text-right text-slate-900 font-medium">{p.stock_actual}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{p.peso_promedio}g</td>
                      <td className="px-4 py-3 text-right text-slate-900">{p.alimento_kg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla Gallinas */}
        {gallinas.length > 0 && (
          <div className="print-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-amber-200 px-6 py-4 border-b border-slate-300">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Egg className="w-5 h-5 text-amber-700" /> Registro de Gallinas ({gallinas.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-800">Fecha</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Lote</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Hoy</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Semana</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Mes</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Mort.</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Alimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {gallinas.map((g: any) => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">{new Date(g.fecha_registro).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-slate-900 font-medium">{g.lote}</td>
                      <td className="px-4 py-3 text-right text-slate-900 font-medium">{g.huevos_hoy}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{g.huevos_semana}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{g.huevos_mes}</td>
                      <td className="px-4 py-3 text-right text-red-700">{g.mortalidad}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{g.alimento_kg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla Patos */}
        {patos.length > 0 && (
          <div className="print-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-blue-200 px-6 py-4 border-b border-slate-300">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bird className="w-5 h-5 text-blue-700" /> Registro de Patos ({patos.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-800">Fecha</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Hoy</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Mes</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Mort.</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Alimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {patos.map((p: any) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">{new Date(p.fecha_registro).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right text-slate-900 font-medium">{p.huevos_hoy}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{p.huevos_mes}</td>
                      <td className="px-4 py-3 text-right text-red-700">{p.mortalidad}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{p.alimento_kg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla Conejos */}
        {conejos.length > 0 && (
          <div className="print-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-purple-200 px-6 py-4 border-b border-slate-300">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Rabbit className="w-5 h-5 text-purple-700" /> Registro de Conejos ({conejos.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-800">Fecha</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Repr.</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Camadas</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Nacidos</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Destetados</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Peso</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Mort.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {conejos.map((c: any) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">{new Date(c.fecha_registro).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{c.reproductores}</td>
                      <td className="px-4 py-3 text-right text-slate-900 font-medium">{c.camadas_mes}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{c.nacidos_mes}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{c.destetados_mes}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{c.peso_promedio}g</td>
                      <td className="px-4 py-3 text-right text-red-700">{c.mortalidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla Transacciones */}
        {finanzas.length > 0 && (
          <div className="print-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-emerald-200 px-6 py-4 border-b border-slate-300">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-700" /> Registro Financiero ({finanzas.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-800">Fecha</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Tipo</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Categoría</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Producto</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {finanzas.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900">{new Date(t.fecha).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${t.tipo === 'ingreso' ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'}`}>
                          {t.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-900">{t.categoria}</td>
                      <td className="px-4 py-3 text-slate-900">{t.producto}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${t.tipo === 'ingreso' ? 'text-emerald-800' : 'text-red-800'}`}>{fmt(t.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla Inventario */}
        {inventario.length > 0 && (
          <div className="print-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-200 px-6 py-4 border-b border-slate-300">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-slate-700" /> Inventario de Insumos ({inventario.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-200 text-left">
                    <th className="px-4 py-3 font-semibold text-slate-800">Producto</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Cantidad</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Mínimo</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Proveedor</th>
                    <th className="px-4 py-3 font-semibold text-slate-800 text-right">Precio/kg</th>
                    <th className="px-4 py-3 font-semibold text-slate-800">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {inventario.map((i: any) => (
                    <tr key={i.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-900 font-medium">{i.producto}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{i.cantidad_kg} kg</td>
                      <td className="px-4 py-3 text-right text-slate-700">{i.stock_minimo} kg</td>
                      <td className="px-4 py-3 text-slate-900">{i.proveedor}</td>
                      <td className="px-4 py-3 text-right text-slate-900">{fmt(i.precio_unitario)}</td>
                      <td className="px-4 py-3">
                        {i.cantidad_kg < i.stock_minimo ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-200 text-amber-900">
                            <AlertTriangle className="w-3 h-3" /> Reposición
                          </span>
                        ) : (
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-200 text-emerald-900">OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="print-footer text-center py-6 border-t-2 border-slate-300">
          <p className="text-sm font-bold text-slate-800">AgroControl - Sistema de Gestión Animal</p>
          <p className="text-xs text-slate-600 mt-1">Reporte generado el {fecha} a las {hora}</p>
          <p className="text-xs text-slate-600">Bajo Cauca, Antioquia, Colombia</p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #reporte-printable, #reporte-printable * { visibility: visible; color: #1e293b !important; }
          #reporte-printable { position: absolute; left: 0; top: 0; width: 100%; padding: 15px; background: white; }
          .no-print { display: none !important; }
          .print-card { break-inside: avoid; page-break-inside: avoid; box-shadow: none !important; border: 1px solid #94a3b8 !important; }
          .print-header { background: #059669 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-header * { color: white !important; }
          .print-footer { color: #475569 !important; }
          @page { margin: 0.8cm; size: A4; }
          table { font-size: 11px; }
          th, td { padding: 6px 10px !important; color: #1e293b !important; }
          th { background-color: #e2e8f0 !important; font-weight: 600; }
        }
      `}</style>
    </div>
  )
}
