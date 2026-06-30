'use client'

import { useState } from 'react'
import { Plus, Package, AlertTriangle } from 'lucide-react'

export default function InventarioPage() {
  const [showForm, setShowForm] = useState(false)

  const inventario = [
    { producto: 'Alimento Tilapia', cantidad: 150, minimo: 50, proveedor: 'Acuícolas SA', precio: 3500 },
    { producto: 'Alimento Gallinas', cantidad: 80, minimo: 100, proveedor: 'Avícola Total', precio: 4200 },
    { producto: 'Alimento Patos', cantidad: 45, minimo: 30, proveedor: 'Avícola Total', precio: 4000 },
    { producto: 'Alimento Conejos', cantidad: 60, minimo: 25, proveedor: 'Cunicultura MX', precio: 3800 },
    { producto: 'Vitaminas', cantidad: 5, minimo: 2, proveedor: 'VetAgro', precio: 25000 },
    { producto: 'Antibióticos', cantidad: 3, minimo: 1, proveedor: 'VetAgro', precio: 18000 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-400" />
            Inventario
          </h1>
          <p className="text-slate-400">Control de insumos y proveedores</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Item
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Registrar Compra</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Producto</label>
              <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Cantidad (kg)</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Proveedor</label>
              <input type="text" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Precio Unitario</label>
              <input type="number" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Stock Mínimo</label>
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
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Stock Actual</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
                <th className="pb-3 font-medium">Producto</th>
                <th className="pb-3 font-medium">Cantidad</th>
                <th className="pb-3 font-medium">Mínimo</th>
                <th className="pb-3 font-medium">Proveedor</th>
                <th className="pb-3 font-medium">Precio</th>
                <th className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {inventario.map((item) => {
                const necesitaReposicion = item.cantidad < item.minimo
                return (
                  <tr key={item.producto} className="text-sm">
                    <td className="py-3 text-slate-200">{item.producto}</td>
                    <td className="py-3 text-slate-200">{item.cantidad} kg</td>
                    <td className="py-3 text-slate-400">{item.minimo} kg</td>
                    <td className="py-3 text-slate-400">{item.proveedor}</td>
                    <td className="py-3 text-slate-200">${item.precio.toLocaleString()}</td>
                    <td className="py-3">
                      {necesitaReposicion ? (
                        <span className="flex items-center gap-1 text-amber-400">
                          <AlertTriangle className="w-4 h-4" />
                          Reposición
                        </span>
                      ) : (
                        <span className="text-emerald-400">OK</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
