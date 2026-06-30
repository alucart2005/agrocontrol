import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { inventarioSchema, validateInput, checkRateLimit } from '@/lib/validation'

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
      .from('inventario')
      .select('*')
      .eq('user_id', user.id)
      .order('fecha_compra', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener inventario' }, { status: 500 })
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
    
    const validation = validateInput(inventarioSchema, body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('inventario')
      .insert({
        user_id: user.id,
        producto: validation.data.producto,
        cantidad_kg: validation.data.cantidadKg,
        proveedor: validation.data.proveedor,
        precio_unitario: validation.data.precioUnitario,
        stock_minimo: validation.data.stockMinimo,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear item' }, { status: 500 })
  }
}
