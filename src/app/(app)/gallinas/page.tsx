'use client'

import { useState, useEffect } from 'react'
import { Plus, Egg, X, Trash2, AlertCircle } from 'lucide-react'

interface Gallina {
  id: number
  lote: string
  huevos_hoy: number
  huevos_semana: number
  huevos_mes: number
  mortalidad: number
  alimento_kg: number
  notas: string | null
  fecha_registro: string
}

export default function GallinasPage() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<Gallina[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    lote: '',
    huevosHoy: '',
    huevosSemana: '',
    huevosMes: '',
    mortalidad: '0',
    alimentoKg: '',
    notas: '',
  })

  const fetchData = async () => {
    try {
      const res = await fetch('/api/gallinas')
      if (!res.ok) throw new Error('Error al cargar')
      setData(await res.json())
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
      const res = await fetch('/api/gallinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lote: form.lote,
          huevosHoy: Number(form.huevosHoy),
          huevosSemana: Number(form.huevosSemana),
          huevosMes: Number(form.huevosMes),
          mortalidad: Number(form.mortalidad),
          alimentoKg: Number(form.alimentoKg),
          notas: form.notas || null,
        }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      setShowForm(false)
      setForm({ lote: '', huevosHoy: '', huevosSemana: '', huevosMes: '', mortalidad: '0', alimentoKg: '', notas: '' })
      fetchData()
    } catch (err: any) { setError(err.message) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este registro?')) return
    await fetch(`/api/gallinas?id=${id}`, { method: 'DELETE' })
    fetchData()
  }

  const total = data.reduce((acc, g) => ({
    hoy: acc.hoy + g.huevos_hoy,
    semana: acc.semana + g.huevos_semana,
    mes: acc.mes + g.huevos_mes,
    mortalidad: acc.mortalidad + g.mortalidad,
  }), { hoy: 0, semana: 0, mes: 0, mortalidad: 0 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
            <Egg className="w-6 h-6 text-amber-400" /> Gallinas
          </h1>
          <p className="text-slate-400">Producción de huevos y manejo de lotes</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cerrar' : 'Nuevo Registro'}
        </button>
      </div>

      {error && <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"><AlertCircle className="w-4 h-4" /><span>{error}</span></div>}

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Producción Diaria</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Lote</label>
              <input type="text" required value={form.lote} onChange={e => setForm({ ...form, lote: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Huevos Hoy</label>
              <input type="number" required value={form.huevosHoy} onChange={e => setForm({ ...form, huevosHoy: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Huevos Semana</label>
              <input type="number" required value={form.huevosSemana} onChange={e => setForm({ ...form, huevosSemana: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Huevos Mes</label>
              <input type="number" required value={form.huevosMes} onChange={e => setForm({ ...form, huevosMes: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Mortalidad</label>
              <input type="number" value={form.mortalidad} onChange={e => setForm({ ...form, mortalidad: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Alimento (kg)</label>
              <input type="number" step="0.01" required value={form.alimentoKg} onChange={e => setForm({ ...form, alimentoKg: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div className="lg:col-span-3">
              <button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">Guardar</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Resumen</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-amber-400">{total.hoy}</p>
            <p className="text-sm text-slate-400">Huevos Hoy</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-slate-200">{total.semana}</p>
            <p className="text-sm text-slate-400">Huevos Semana</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-slate-200">{total.mes.toLocaleString()}</p>
            <p className="text-sm text-slate-400">Huevos Mes</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-red-400">{total.mortalidad}</p>
            <p className="text-sm text-slate-400">Mortalidad</p>
          </div>
        </div>

        {loading ? <p className="text-slate-400">Cargando...</p> : data.length === 0 ? <p className="text-slate-400">No hay registros.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-2">Fecha</th><th className="text-left py-2">Lote</th><th className="text-right py-2">Hoy</th><th className="text-right py-2">Semana</th><th className="text-right py-2">Mes</th><th className="text-right py-2">Mort.</th><th className="text-right py-2">Alimento</th><th className="text-right py-2"></th>
              </tr></thead>
              <tbody>{data.map(g => (
                <tr key={g.id} className="border-b border-slate-700/50 text-slate-200">
                  <td className="py-2">{new Date(g.fecha_registro).toLocaleDateString()}</td>
                  <td className="py-2">{g.lote}</td>
                  <td className="py-2 text-right">{g.huevos_hoy}</td>
                  <td className="py-2 text-right">{g.huevos_semana}</td>
                  <td className="py-2 text-right">{g.huevos_mes}</td>
                  <td className="py-2 text-right">{g.mortalidad}</td>
                  <td className="py-2 text-right">{g.alimento_kg}</td>
                  <td className="py-2 text-right"><button onClick={() => handleDelete(g.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
