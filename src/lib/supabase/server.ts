import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client during build time
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => ({
              then: (resolve: Function) => resolve({ data: [], error: null }),
            }),
            single: () => ({
              then: (resolve: Function) => resolve({ data: null, error: null }),
            }),
            head: () => ({
              then: (resolve: Function) => resolve({ count: 0, error: null }),
            }),
          }),
          order: () => ({
            then: (resolve: Function) => resolve({ data: [], error: null }),
          }),
          single: () => ({
            then: (resolve: Function) => resolve({ data: null, error: null }),
          }),
        }),
        insert: () => ({
          select: () => ({
            single: () => ({
              then: (resolve: Function) => resolve({ data: null, error: null }),
            }),
          }),
        }),
      }),
    } as any
  }

  const cookieStore = await cookies()
  
  return createSupabaseServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component - ignore
          }
        },
      },
    }
  )
}
