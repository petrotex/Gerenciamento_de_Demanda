'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/componentes/header'

export function HeaderController() {
  const pathname = usePathname()

  const noHeaderRoutes = ['/', '/login', '/register', '/reset-password']
  const shouldShowHeader = !noHeaderRoutes.includes(pathname) &&
  !pathname.startsWith('/reset-password/confirm')

  if (!shouldShowHeader) return null

  return <Header />
}