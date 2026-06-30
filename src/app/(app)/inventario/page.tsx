'use client'

import { useState, useEffect } from 'react'
import { Plus, Package, AlertTriangle, X, Trash2, AlertCircle } from 'lucide-react'

interface Item {
  id: number
  producto: string
  cantidad_kg: number
  proveedor: string
  precio_unitario: number
  stock_minimo: number
  fecha_compra: string
}

export default function InventarioPage() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ producto: '', cantidadKg: '', proveedor: '', precioUnitario: '', stockMinimo: '' })

  const fetchData = async () => {
    try {
      const res = await fetch('/api/inventario')
      if (!res.ok) throw new Error('Error')
      setData(await res.json())
    } catch { setError('Error al cargar datos') } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null)
    try {
      const res = await fetch('/api/inventario', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto: form.producto, cantidadKg: Number(form.cantidadKg), proveedor: form.proveedor, precioUnitario: Number(form.precioUnitario), stockMinimo: Number(form.stockMinimo) }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      setShowForm(false); setForm({ producto: '', cantidadKg: '', proveedor: '', precioUnitario: '', stockMinimo: '' }); fetchData()
    } catch (err: any) { setError(err.message) }
  }

  const handleDelete = async (id: number) => { if (!confirm('¿Eliminar?')) return; await fetch(`/api/inventario?id=${id}`, { method: 'DELETE' }); fetchData() }

  const totalValor = data.reduce((a, i) => a + (i.cantidad_kg * i.precio_unitario), 0)
  const alertas = data.filter(i => i.cantidad_kg < i.stock_minimo)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2"><Package className="w-6 h-6 text-blue-400" /> Inventario</h1>
          <p className="text-slate-400">Control de insumos y proveedores</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {showForm ? 'Cerrar' : 'Nuevo Item'}
        </button>
      </div>

      {error && <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"><AlertCircle className="w-4 h-4" /><span>{error}</span></div>}

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Compra</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Producto</label><input type="text" required value={form.producto} onChange={e => setForm({ ...form, producto: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Cantidad (kg)</label><input type="number" step="0.01" required value={form.cantidadKg} onChange={e => setForm({ ...form, cantidadKg: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Proveedor</label><input type="text" required value={form.proveedor} onChange={e => setForm({ ...form, proveedor: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Precio Unitario ($/kg)</label><input type="number" required value={form.precioUnitario} onChange={e => setForm({ ...form, precioUnitario: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Stock Mínimo (kg)</label><input type="number" step="0.01" required value={form.stockMinimo} onChange={e => setForm({ ...form, stockMinimo: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">Guardar</button></div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <p className="text-sm text-slate-400">Items en Inventario</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">{data.length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <p className="text-sm text-slate-400">Valor Total</p>
          <p className="text-3xl font-bold text-slate-200 mt-1">${totalValor.toLocaleString('es-CO')}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <p className="text-sm text-slate-400">Alertas Reposición</p>
          <p className={`text-3xl font-bold mt-1 ${alertas.length > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>{alertas.length}</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Stock Actual</h3>
        {loading ? <p className="text-slate-400">Cargando...</p> : data.length === 0 ? <p className="text-slate-400">Sin items registrados.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="py-2">Producto</th><th className="py-2">Cantidad</th><th className="py-2">Mínimo</th><th className="py-2">Proveedor</th><th className="py-2">Precio/kg</th><th className="py-2">Estado</th><th className="py-2"></th>
              </tr></thead>
              <tbody>{data.map(i => (
                <tr key={i.id} className="border-b border-slate-700/50 text-slate-200">
                  <td className="py-3">{i.producto}</td>
                  <td className="py-3">{i.cantidad_kg} kg</td>
                  <td className="py-3 text-slate-400">{i.stock_minimo} kg</td>
                  <td className="py-3 text-slate-400">{i.proveedor}</td>
                  <td className="py-3">${i.precio_unitario.toLocaleString('es-CO')}</td>
                  <td className="py-3">{i.cantidad_kg < i.stock_minimo ? (
                    <span className="flex items-center gap-1 text-amber-400"><AlertTriangle className="w-4 h-4" /> Reposición</span>
                  ) : <span className="text-emerald-400">OK</span>}</td>
                  <td className="py-3 text-right"><button onClick={() => handleDelete(i.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
