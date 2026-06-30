'use client'

import { useState, useEffect } from 'react'
import { Plus, Rabbit, X, Trash2, AlertCircle } from 'lucide-react'

interface Conejo {
  id: number
  reproductores: number
  camadas_mes: number
  nacidos_mes: number
  destetados_mes: number
  peso_promedio: number
  mortalidad: number
  alimento_kg: number
  notas: string | null
  fecha_registro: string
}

export default function ConejosPage() {
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<Conejo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ reproductores: '', camadasMes: '', nacidosMes: '', destetadosMes: '', pesoPromedio: '', mortalidad: '0', alimentoKg: '', notas: '' })

  const fetchData = async () => {
    try {
      const res = await fetch('/api/conejos')
      if (!res.ok) throw new Error('Error al cargar')
      setData(await res.json())
    } catch { setError('Error al cargar datos') } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null)
    try {
      const res = await fetch('/api/conejos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reproductores: Number(form.reproductores), camadasMes: Number(form.camadasMes), nacidosMes: Number(form.nacidosMes), destetadosMes: Number(form.destetadosMes), pesoPromedio: Number(form.pesoPromedio), mortalidad: Number(form.mortalidad), alimentoKg: Number(form.alimentoKg), notas: form.notas || null }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      setShowForm(false); setForm({ reproductores: '', camadasMes: '', nacidosMes: '', destetadosMes: '', pesoPromedio: '', mortalidad: '0', alimentoKg: '', notas: '' }); fetchData()
    } catch (err: any) { setError(err.message) }
  }

  const handleDelete = async (id: number) => { if (!confirm('¿Eliminar?')) return; await fetch(`/api/conejos?id=${id}`, { method: 'DELETE' }); fetchData() }

  const total = data.reduce((a, c) => ({ reproductores: c.reproductores, camadas: a.camadas + c.camadas_mes, nacidos: a.nacidos + c.nacidos_mes, destetados: a.destetados + c.destetados_mes, mortalidad: a.mortalidad + c.mortalidad }), { reproductores: 0, camadas: 0, nacidos: 0, destetados: 0, mortalidad: 0 })
  const latest = data[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2"><Rabbit className="w-6 h-6 text-purple-400" /> Conejos</h1>
          <p className="text-slate-400">Cunicultura - Reproducción y producción</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {showForm ? 'Cerrar' : 'Nuevo Registro'}
        </button>
      </div>

      {error && <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"><AlertCircle className="w-4 h-4" /><span>{error}</span></div>}

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Camadas/Peso</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Reproductores</label><input type="number" required value={form.reproductores} onChange={e => setForm({ ...form, reproductores: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Camadas Mes</label><input type="number" required value={form.camadasMes} onChange={e => setForm({ ...form, camadasMes: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Nacidos Mes</label><input type="number" required value={form.nacidosMes} onChange={e => setForm({ ...form, nacidosMes: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Destetados Mes</label><input type="number" required value={form.destetadosMes} onChange={e => setForm({ ...form, destetadosMes: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Peso Promedio (g)</label><input type="number" step="0.01" required value={form.pesoPromedio} onChange={e => setForm({ ...form, pesoPromedio: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Mortalidad</label><input type="number" value={form.mortalidad} onChange={e => setForm({ ...form, mortalidad: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Alimento (kg)</label><input type="number" step="0.01" required value={form.alimentoKg} onChange={e => setForm({ ...form, alimentoKg: e.target.value })} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" /></div>
            <div><button type="submit" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">Guardar</button></div>
          </form>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Resumen</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-purple-400">{latest?.reproductores || 0}</p><p className="text-sm text-slate-400">Reproductores</p></div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-slate-200">{total.camadas}</p><p className="text-sm text-slate-400">Camadas Mes</p></div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-slate-200">{total.nacidos}</p><p className="text-sm text-slate-400">Nacidos Mes</p></div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-slate-200">{total.destetados}</p><p className="text-sm text-slate-400">Destetados</p></div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-red-400">{total.mortalidad}</p><p className="text-sm text-slate-400">Mortalidad</p></div>
        </div>
        {loading ? <p className="text-slate-400">Cargando...</p> : data.length === 0 ? <p className="text-slate-400">No hay registros.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left py-2">Fecha</th><th className="text-right py-2">Repr.</th><th className="text-right py-2">Camadas</th><th className="text-right py-2">Nacidos</th><th className="text-right py-2">Destet.</th><th className="text-right py-2">Peso</th><th className="text-right py-2">Mort.</th><th className="text-right py-2"></th>
              </tr></thead>
              <tbody>{data.map(c => (
                <tr key={c.id} className="border-b border-slate-700/50 text-slate-200">
                  <td className="py-2">{new Date(c.fecha_registro).toLocaleDateString()}</td>
                  <td className="py-2 text-right">{c.reproductores}</td>
                  <td className="py-2 text-right">{c.camadas_mes}</td>
                  <td className="py-2 text-right">{c.nacidos_mes}</td>
                  <td className="py-2 text-right">{c.destetados_mes}</td>
                  <td className="py-2 text-right">{c.peso_promedio}g</td>
                  <td className="py-2 text-right">{c.mortalidad}</td>
                  <td className="py-2 text-right"><button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
