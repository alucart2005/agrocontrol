'use client'

import { Fish, Egg, DollarSign } from 'lucide-react'

const alertas = [
  {
    id: 1,
    icon: Fish,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    mensaje: 'Tilapia lista para cosecha',
    detalle: 'Estanque 1 - 3 días',
  },
  {
    id: 2,
    icon: Egg,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    mensaje: 'Comprar alimento gallinas',
    detalle: '50 kg restantes',
  },
  {
    id: 3,
    icon: DollarSign,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    mensaje: 'Pago proveedor pendiente',
    detalle: '$500,000',
  },
]

export function Alertas() {
  return (
    <div className="space-y-3">
      {alertas.map((alerta) => (
        <div
          key={alerta.id}
          className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg"
        >
          <div className={`p-2 rounded-lg ${alerta.bgColor}`}>
            <alerta.icon className={`w-4 h-4 ${alerta.color}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-200">{alerta.mensaje}</p>
            <p className="text-xs text-slate-400">{alerta.detalle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
