'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Ene', ingresos: 3200000, gastos: 1800000 },
  { name: 'Feb', ingresos: 3500000, gastos: 1900000 },
  { name: 'Mar', ingresos: 3800000, gastos: 2100000 },
  { name: 'Abr', ingresos: 4000000, gastos: 2200000 },
  { name: 'May', ingresos: 3900000, gastos: 2150000 },
  { name: 'Jun', ingresos: 4100000, gastos: 2300000 },
]

export function ChartIngresos() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
        <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
          }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
        />
        <Legend />
        <Bar dataKey="ingresos" name="Ingresos" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="gastos" name="Gastos" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
