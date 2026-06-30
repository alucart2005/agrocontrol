import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { patosSchema, validateInput, checkRateLimit } from '@/lib/validation'

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
      .from('patos')
      .select('*')
      .eq('user_id', user.id)
      .order('fecha_registro', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener patos' }, { status: 500 })
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
    
    const validation = validateInput(patosSchema, body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('patos')
      .insert({
        user_id: user.id,
        huevos_hoy: validation.data.huevosHoy,
        huevos_mes: validation.data.huevosMes,
        mortalidad: validation.data.mortalidad,
        alimento_kg: validation.data.alimentoKg,
        notas: validation.data.notas,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear pato' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { error } = await supabase.from('patos').delete().eq('id', id).eq('user_id', user.id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
