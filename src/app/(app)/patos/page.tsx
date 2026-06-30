'use client'

import { useState } from 'react'
import { Plus, Bird } from 'lucide-react'

export default function PatosPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
            <Bird className="w-6 h-6 text-blue-400" />
            Patos
          </h1>
          <p className="text-slate-400">Producción de huevos y carne de pato</p>
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
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Producción</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Huevos Hoy</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Huevos Mes</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Mortalidad</label>
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
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Resumen Producción</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-400">35</p>
            <p className="text-sm text-slate-400">Huevos Hoy</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-slate-200">800</p>
            <p className="text-sm text-slate-400">Huevos Mes</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-red-400">1</p>
            <p className="text-sm text-slate-400">Mortalidad</p>
          </div>
        </div>
      </div>
    </div>
  )
}
