'use client'

import { useState, useEffect } from 'react'
import { Plus, DollarSign, TrendingUp, TrendingDown, X, Trash2, AlertCircle } from 'lucide-react'

interface Transaccion {
  id: number
  tipo: string
  categoria: string
  producto: string
  cantidad: number
  precio_unitario: number
  total: number
  descripcion: string | null
  fecha: string
}

export default function FinanzasPage() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<Transaccion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    tipo: 'ingreso', categoria: 'Venta huevos', producto: 'Gallinas',
    cantidad: '', precioUnitario: '', total: '', descripcion: '',
  })

  const fetchData = async () => {
    try {
      const res = await fetch('/api/finanzas')
      if (!res.ok) throw new Error('Error')
      setData(await res.json())
    } catch { setError('Error al cargar datos') } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const autoTotal = Number(form.cantidad) * Number(form.precioUnitario)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null)
    const total = autoTotal || Number(form.total)
    try {
      const res = await fetch('/api/finanzas', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: form.tipo, categoria: form.categoria, producto: form.producto, cantidad: Number(form.cantidad), precioUnitario: Number(form.precioUnitario), total, descripcion: form.descripcion || null }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      setShowForm(false); setForm({ tipo: 'ingreso', categoria: 'Venta huevos', producto: 'Gallinas', cantidad: '', precioUnitario: '', total: '', descripcion: '' }); fetchData()
    } catch (err: any) { setError(err.message) }
  }

  const handleDelete = async (id: number) => { if (!confirm('¿Eliminar?')) return; await fetch(`/api/finanzas?id=${id}`, { method: 'DELETE' }); fetchData() }

  const ingresos = data.filter(t => t.tipo === 'ingreso').reduce((a, t) => a + t.total, 0)
  const gastos = data.filter(t => t.tipo === 'gasto').reduce((a, t) => a + t.total, 0)
  const utilidad = ingresos - gastos
  const margen = ingresos > 0 ? ((utilidad / ingresos) * 100).toFixed(1) : '0'

  const ingresosByCategoria = data.filter(t => t.tipo === 'ingreso').reduce((acc, t) => { acc[t.categoria] = (acc[t.categoria] || 0) + t.total; return acc }, {} as Record<string, number>)
  const gastosByCategoria = data.filter(t => t.tipo === 'gasto').reduce((acc, t) => { acc[t.categoria] = (acc[t.categoria] || 0) + t.total; return acc }, {} as Record<string, number>)

  const fmt = (n: number) => `$${n.toLocaleString('es-CO')}`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2"><DollarSign className="w-6 h-6 text-emerald-400" /> Finanzas</h1>
          <p className="text-slate-400">Control de ingresos y gastos</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {showForm ? 'Cerrar' : 'Nueva Transacción'}
        </button>
      </div>

      {error && <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"><AlertCircle className="w-4 h-4" /><span>{error}</span></div>}

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Transacción</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Tipo</label>
              <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option value="ingreso">Ingreso</option><option value="gasto">Gasto</option>
              </select></div>
            <div><label className="block text-sm text-slate-400 mb-1">Categoría</label>
              <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                {form.tipo === 'ingreso' ? <>
                  <option>Venta huevos</option><option>Venta carne</option><option>Venta peces</option><option>Otro ingreso</option>
                </> : <>
                  <option>Alimento</option><option>Medicina</option><option>Infraestructura</option><option>Mano de obra</option><option>Otro gasto</option>
                </>}
              </select></div>
            <div><label className="block text-sm text-slate-400 mb-1">Producto</label>
              <select value={form.producto} onChange={e => setForm({ ...form, producto: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option>Gallinas</option><option>Patos</option><option>Conejos</option><option>Peces</option><option>General</option>
              </select></div>
            <div><label className="block text-sm text-slate-400 mb-1">Cantidad</label><input type="number" required value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Precio Unitario</label><input type="number" required value={form.precioUnitario} onChange={e => setForm({ ...form, precioUnitario: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Total</label><input type="number" value={autoTotal || form.total} onChange={e => setForm({ ...form, total: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" placeholder="Auto-calculado" /></div>
            <div className="md:col-span-2 lg:col-span-3"><label className="block text-sm text-slate-400 mb-1">Descripción</label><input type="text" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" placeholder="Opcional" /></div>
            <div><button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">Guardar</button></div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-emerald-400" /><h3 className="text-sm text-slate-400">Ingresos</h3></div>
          <p className="text-3xl font-bold text-emerald-400">{fmt(ingresos)}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-5 h-5 text-red-400" /><h3 className="text-sm text-slate-400">Gastos</h3></div>
          <p className="text-3xl font-bold text-red-400">{fmt(gastos)}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 text-blue-400" /><h3 className="text-sm text-slate-400">Utilidad</h3></div>
          <p className={`text-3xl font-bold ${utilidad >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{fmt(utilidad)}</p>
          <p className="text-sm text-slate-400 mt-1">Margen: {margen}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-3">Ingresos por Categoría</h3>
          {Object.entries(ingresosByCategoria).length === 0 ? <p className="text-slate-400 text-sm">Sin datos</p> : (
            <div className="space-y-2">{Object.entries(ingresosByCategoria).map(([cat, total]) => (
              <div key={cat} className="flex justify-between text-sm"><span className="text-slate-400">{cat}</span><span className="text-emerald-400">{fmt(total)}</span></div>
            ))}</div>
          )}
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-3">Gastos por Categoría</h3>
          {Object.entries(gastosByCategoria).length === 0 ? <p className="text-slate-400 text-sm">Sin datos</p> : (
            <div className="space-y-2">{Object.entries(gastosByCategoria).map(([cat, total]) => (
              <div key={cat} className="flex justify-between text-sm"><span className="text-slate-400">{cat}</span><span className="text-red-400">{fmt(total)}</span></div>
            ))}</div>
          )}
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Historial</h3>
        {loading ? <p className="text-slate-400">Cargando...</p> : data.length === 0 ? <p className="text-slate-400">Sin transacciones registradas.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-2">Fecha</th><th className="text-left py-2">Tipo</th><th className="text-left py-2">Categoría</th><th className="text-left py-2">Producto</th><th className="text-right py-2">Total</th><th className="text-right py-2"></th>
              </tr></thead>
              <tbody>{data.map(t => (
                <tr key={t.id} className="border-b border-slate-700/50 text-slate-200">
                  <td className="py-2">{new Date(t.fecha).toLocaleDateString()}</td>
                  <td className="py-2"><span className={t.tipo === 'ingreso' ? 'text-emerald-400' : 'text-red-400'}>{t.tipo === 'ingreso' ? 'Ingreso' : 'Gasto'}</span></td>
                  <td className="py-2">{t.categoria}</td>
                  <td className="py-2">{t.producto}</td>
                  <td className="py-2 text-right font-medium">{fmt(t.total)}</td>
                  <td className="py-2 text-right"><button onClick={() => handleDelete(t.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
