'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Leaf, CheckCircle, XCircle } from 'lucide-react'

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { hash } = window.location
      
      if (hash) {
        const { error } = await supabase.auth.exchangeCodeForSession(hash)
        
        if (error) {
          setStatus('error')
        } else {
          setStatus('success')
          setTimeout(() => {
            window.location.href = '/'
          }, 2000)
        }
      } else {
        setStatus('error')
      }
    }

    handleAuthCallback()
  }, [supabase, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {status === 'loading' && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700/50 rounded-full mb-4">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-slate-200">Procesando...</h1>
            <p className="text-slate-400 mt-2">Verificando tu identidad</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-slate-200">¡Autenticado!</h1>
            <p className="text-slate-400 mt-2">Redirigiendo al dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-xl font-bold text-slate-200">Error</h1>
            <p className="text-slate-400 mt-2">No se pudo completar la autenticación</p>
          </>
        )}
      </div>
    </div>
  )
}
