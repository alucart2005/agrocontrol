import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const [ingresos, gastos, peces, gallinas, patos, conejos] = await Promise.all([
      supabase.from('transacciones').select('total').eq('tipo', 'ingreso').eq('user_id', user.id),
      supabase.from('transacciones').select('total').eq('tipo', 'gasto').eq('user_id', user.id),
      supabase.from('peces').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('gallinas').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('patos').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('conejos').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    ])

    const totalIngresos = (ingresos.data as any[])?.reduce((sum: number, t: any) => sum + (t.total || 0), 0) || 0
    const totalGastos = (gastos.data as any[])?.reduce((sum: number, t: any) => sum + (t.total || 0), 0) || 0

    return NextResponse.json({
      ingresos: totalIngresos,
      gastos: totalGastos,
      utilidad: totalIngresos - totalGastos,
      conteos: {
        peces: peces.count || 0,
        gallinas: gallinas.count || 0,
        patos: patos.count || 0,
        conejos: conejos.count || 0,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener dashboard' }, { status: 500 })
  }
}
