import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { pecesSchema, validateInput, checkRateLimit } from '@/lib/validation'

export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip, 100, 60000)) {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
    }

    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('peces')
      .select('*')
      .eq('user_id', user.id)
      .order('fecha_registro', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener peces' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip, 30, 60000)) {
      return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429 })
    }

    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    
    const validation = validateInput(pecesSchema, body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('peces')
      .insert({
        user_id: user.id,
        estanque: validation.data.estanque,
        especie: validation.data.especie,
        stock_inicial: validation.data.stockInicial,
        stock_actual: validation.data.stockActual,
        peso_promedio: validation.data.pesoPromedio,
        alimento_kg: validation.data.alimentoKg,
        notas: validation.data.notas,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear pez' }, { status: 500 })
  }
}
