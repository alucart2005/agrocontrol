'use client'

import { useState } from 'react'
import { Plus, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

export default function FinanzasPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            Finanzas
          </h1>
          <p className="text-slate-400">Control de ingresos y gastos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Transacción
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Transacción</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Tipo</label>
              <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Categoría</label>
              <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option>Venta huevos</option>
                <option>Venta carne</option>
                <option>Alimento</option>
                <option>Medicina</option>
                <option>Infraestructura</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Producto</label>
              <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200">
                <option>Gallinas</option>
                <option>Patos</option>
                <option>Conejos</option>
                <option>Peces</option>
                <option>General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Cantidad</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Precio Unitario</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Total</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm text-slate-400 mb-1">Descripción</label>
              <textarea className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" rows={2} />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-slate-200">Ingresos del Mes</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-400">$4,100,000</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Huevos gallina</span>
              <span className="text-slate-200">$1,250,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Huevos pato</span>
              <span className="text-slate-200">$640,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tilapia</span>
              <span className="text-slate-200">$1,600,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Conejos</span>
              <span className="text-slate-200">$600,000</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-slate-200">Gastos del Mes</h3>
          </div>
          <p className="text-3xl font-bold text-red-400">$2,300,000</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Alimento</span>
              <span className="text-slate-200">$1,500,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Medicina</span>
              <span className="text-slate-200">$400,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Infraestructura</span>
              <span className="text-slate-200">$300,000</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Otros</span>
              <span className="text-slate-200">$100,000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Utilidad del Mes</h3>
        <div className="flex items-center gap-4">
          <p className="text-4xl font-bold text-emerald-400">$1,800,000</p>
          <span className="text-emerald-400 text-sm">+43.9% margen</span>
        </div>
      </div>
    </div>
  )
}
