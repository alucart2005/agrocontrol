'use client'

import { useState, useEffect } from 'react'
import { Plus, Fish, X, Trash2, AlertCircle } from 'lucide-react'

interface Pez {
  id: number
  estanque: string
  especie: string
  stock_inicial: number
  stock_actual: number
  peso_promedio: number
  alimento_kg: number
  notas: string | null
  fecha_registro: string
}

export default function PecesPage() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<Pez[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    estanque: 'Estanque 1',
    especie: 'Tilapia',
    stockInicial: '',
    stockActual: '',
    pesoPromedio: '',
    alimentoKg: '',
    notas: '',
  })

  const fetchData = async () => {
    try {
      const res = await fetch('/api/peces')
      if (!res.ok) throw new Error('Error al cargar')
      const json = await res.json()
      setData(json)
    } catch {
      setError('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('/api/peces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estanque: form.estanque,
          especie: form.especie,
          stockInicial: Number(form.stockInicial),
          stockActual: Number(form.stockActual),
          pesoPromedio: Number(form.pesoPromedio),
          alimentoKg: Number(form.alimentoKg),
          notas: form.notas || null,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || err.details || 'Error al guardar')
      }

      setShowForm(false)
      setForm({ estanque: 'Estanque 1', especie: 'Tilapia', stockInicial: '', stockActual: '', pesoPromedio: '', alimentoKg: '', notas: '' })
      fetchData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este registro?')) return
    try {
      await fetch(`/api/peces?id=${id}`, { method: 'DELETE' })
      fetchData()
    } catch {
      setError('Error al eliminar')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
            <Fish className="w-6 h-6 text-blue-400" />
            Peces
          </h1>
          <p className="text-slate-400">Gestión de estanques y producción piscícola</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cerrar' : 'Nuevo Registro'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Peso/Alimentación</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Estanque</label>
              <select value={form.estanque} onChange={e => setForm({ ...form, estanque: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option>Estanque 1</option>
                <option>Estanque 2</option>
                <option>Estanque 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Especie</label>
              <select value={form.especie} onChange={e => setForm({ ...form, especie: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option>Tilapia</option>
                <option>Cachama</option>
                <option>Trucha</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Stock Inicial</label>
              <input type="number" required value={form.stockInicial} onChange={e => setForm({ ...form, stockInicial: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Stock Actual</label>
              <input type="number" required value={form.stockActual} onChange={e => setForm({ ...form, stockActual: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Peso Promedio (g)</label>
              <input type="number" step="0.01" required value={form.pesoPromedio} onChange={e => setForm({ ...form, pesoPromedio: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Alimento (kg)</label>
              <input type="number" step="0.01" required value={form.alimentoKg} onChange={e => setForm({ ...form, alimentoKg: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm text-slate-400 mb-1">Notas</label>
              <input type="text" value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" placeholder="Opcional" />
            </div>
            <div className="lg:col-span-3">
              <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Registros</h3>
        {loading ? (
          <p className="text-slate-400">Cargando...</p>
        ) : data.length === 0 ? (
          <p className="text-slate-400">No hay registros. Crea el primero.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left py-2">Fecha</th>
                  <th className="text-left py-2">Estanque</th>
                  <th className="text-left py-2">Especie</th>
                  <th className="text-right py-2">Stock</th>
                  <th className="text-right py-2">Peso (g)</th>
                  <th className="text-right py-2">Alimento (kg)</th>
                  <th className="text-right py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((pez) => (
                  <tr key={pez.id} className="border-b border-slate-700/50 text-slate-200">
                    <td className="py-2">{new Date(pez.fecha_registro).toLocaleDateString()}</td>
                    <td className="py-2">{pez.estanque}</td>
                    <td className="py-2">{pez.especie}</td>
                    <td className="py-2 text-right">{pez.stock_actual}</td>
                    <td className="py-2 text-right">{pez.peso_promedio}</td>
                    <td className="py-2 text-right">{pez.alimento_kg}</td>
                    <td className="py-2 text-right">
                      <button onClick={() => handleDelete(pez.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
