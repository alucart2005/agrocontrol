'use client'

import { useState, useEffect } from 'react'
import { Plus, Bird, X, Trash2, AlertCircle } from 'lucide-react'

interface Pato {
  id: number
  huevos_hoy: number
  huevos_mes: number
  mortalidad: number
  alimento_kg: number
  notas: string | null
  fecha_registro: string
}

export default function PatosPage() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<Pato[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ huevosHoy: '', huevosMes: '', mortalidad: '0', alimentoKg: '', notas: '' })

  const fetchData = async () => {
    try {
      const res = await fetch('/api/patos')
      if (!res.ok) throw new Error('Error al cargar')
      setData(await res.json())
    } catch { setError('Error al cargar datos') } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null)
    try {
      const res = await fetch('/api/patos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ huevosHoy: Number(form.huevosHoy), huevosMes: Number(form.huevosMes), mortalidad: Number(form.mortalidad), alimentoKg: Number(form.alimentoKg), notas: form.notas || null }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      setShowForm(false); setForm({ huevosHoy: '', huevosMes: '', mortalidad: '0', alimentoKg: '', notas: '' }); fetchData()
    } catch (err: any) { setError(err.message) }
  }

  const handleDelete = async (id: number) => { if (!confirm('¿Eliminar?')) return; await fetch(`/api/patos?id=${id}`, { method: 'DELETE' }); fetchData() }

  const total = data.reduce((a, p) => ({ hoy: a.hoy + p.huevos_hoy, mes: a.mes + p.huevos_mes, mortalidad: a.mortalidad + p.mortalidad }), { hoy: 0, mes: 0, mortalidad: 0 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2"><Bird className="w-6 h-6 text-blue-400" /> Patos</h1>
          <p className="text-slate-400">Producción de huevos y carne de pato</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {showForm ? 'Cerrar' : 'Nuevo Registro'}
        </button>
      </div>

      {error && <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"><AlertCircle className="w-4 h-4" /><span>{error}</span></div>}

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Producción</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Huevos Hoy</label><input type="number" required value={form.huevosHoy} onChange={e => setForm({ ...form, huevosHoy: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Huevos Mes</label><input type="number" required value={form.huevosMes} onChange={e => setForm({ ...form, huevosMes: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Mortalidad</label><input type="number" value={form.mortalidad} onChange={e => setForm({ ...form, mortalidad: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Alimento (kg)</label><input type="number" step="0.01" required value={form.alimentoKg} onChange={e => setForm({ ...form, alimentoKg: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div className="lg:col-span-3"><button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">Guardar</button></div>
          </form>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Resumen</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-blue-400">{total.hoy}</p><p className="text-sm text-slate-400">Huevos Hoy</p></div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-slate-200">{total.mes.toLocaleString()}</p><p className="text-sm text-slate-400">Huevos Mes</p></div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-red-400">{total.mortalidad}</p><p className="text-sm text-slate-400">Mortalidad</p></div>
        </div>
        {loading ? <p className="text-slate-400">Cargando...</p> : data.length === 0 ? <p className="text-slate-400">No hay registros.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-2">Fecha</th><th className="text-right py-2">Hoy</th><th className="text-right py-2">Mes</th><th className="text-right py-2">Mort.</th><th className="text-right py-2">Alimento</th><th className="text-right py-2"></th>
              </tr></thead>
              <tbody>{data.map(p => (
                <tr key={p.id} className="border-b border-slate-700/50 text-slate-200">
                  <td className="py-2">{new Date(p.fecha_registro).toLocaleDateString()}</td>
                  <td className="py-2 text-right">{p.huevos_hoy}</td>
                  <td className="py-2 text-right">{p.huevos_mes}</td>
                  <td className="py-2 text-right">{p.mortalidad}</td>
                  <td className="py-2 text-right">{p.alimento_kg}</td>
                  <td className="py-2 text-right"><button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
