import { z } from 'zod'

// Validation schemas for each module
export const pecesSchema = z.object({
  estanque: z.string().min(1).max(50),
  especie: z.string().min(1).max(50),
  stockInicial: z.number().int().min(0).max(10000),
  stockActual: z.number().int().min(0).max(10000),
  pesoPromedio: z.number().min(0).max(10000),
  alimentoKg: z.number().min(0).max(10000),
  notas: z.string().max(500).optional().nullable(),
})

export const gallinasSchema = z.object({
  huevosHoy: z.number().int().min(0).max(1000),
  huevosSemana: z.number().int().min(0).max(10000),
  huevosMes: z.number().int().min(0).max(50000),
  mortalidad: z.number().int().min(0).max(1000),
  alimentoKg: z.number().min(0).max(10000),
  lote: z.string().min(1).max(50),
  notas: z.string().max(500).optional().nullable(),
})

export const patosSchema = z.object({
  huevosHoy: z.number().int().min(0).max(1000),
  huevosMes: z.number().int().min(0).max(50000),
  mortalidad: z.number().int().min(0).max(1000),
  alimentoKg: z.number().min(0).max(10000),
  notas: z.string().max(500).optional().nullable(),
})

export const conejosSchema = z.object({
  reproductores: z.number().int().min(0).max(1000),
  camadasMes: z.number().int().min(0).max(100),
  nacidosMes: z.number().int().min(0).max(1000),
  destetadosMes: z.number().int().min(0).max(1000),
  pesoPromedio: z.number().min(0).max(10000),
  mortalidad: z.number().int().min(0).max(1000),
  alimentoKg: z.number().min(0).max(10000),
  notas: z.string().max(500).optional().nullable(),
})

export const transaccionSchema = z.object({
  tipo: z.enum(['ingreso', 'gasto']),
  categoria: z.string().min(1).max(50),
  producto: z.string().min(1).max(50),
  cantidad: z.number().min(0).max(100000),
  precioUnitario: z.number().min(0).max(1000000),
  total: z.number().min(0).max(100000000),
  descripcion: z.string().max(500).optional(),
})

export const inventarioSchema = z.object({
  producto: z.string().min(1).max(100),
  cantidadKg: z.number().min(0).max(100000),
  proveedor: z.string().min(1).max(100),
  precioUnitario: z.number().min(0).max(1000000),
  stockMinimo: z.number().min(0).max(100000),
})

// Validation helper
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  const errorMessage = result.error.issues.map(e => e.message).join(', ')
  return { success: false, error: errorMessage }
}

// Rate limiting (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(ip: string, limit = 100, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

// Sanitize string input
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .trim()
    .slice(0, 1000) // Limit length
}
