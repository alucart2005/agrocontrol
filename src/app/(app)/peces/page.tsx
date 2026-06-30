'use client'

import { useState } from 'react'
import { Plus, Fish } from 'lucide-react'

export default function PecesPage() {
  const [showForm, setShowForm] = useState(false)

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
          <Plus className="w-4 h-4" />
          Nuevo Registro
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Peso/Alimentación</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Estanque</label>
              <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option>Estanque 1</option>
                <option>Estanque 2</option>
                <option>Estanque 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Especie</label>
              <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option>Tilapia</option>
                <option>Cachama</option>
                <option>Trucha</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Stock Actual</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Peso Promedio (g)</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Alimento (kg)</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Estanques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { nombre: 'Estanque 1', especie: 'Tilapia', stock: 200, peso: '350g' },
            { nombre: 'Estanque 2', especie: 'Tilapia', stock: 150, peso: '280g' },
            { nombre: 'Estanque 3', especie: 'Cachama', stock: 100, peso: '400g' },
          ].map((estanque) => (
            <div key={estanque.nombre} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
              <div className="flex items-center gap-2 mb-2">
                <Fish className="w-5 h-5 text-blue-400" />
                <h4 className="font-medium text-slate-200">{estanque.nombre}</h4>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-slate-400">Especie: <span className="text-slate-200">{estanque.especie}</span></p>
                <p className="text-slate-400">Stock: <span className="text-slate-200">{estanque.stock}</span></p>
                <p className="text-slate-400">Peso prom: <span className="text-slate-200">{estanque.peso}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
