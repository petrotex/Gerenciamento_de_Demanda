'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/componentes/header'

export function HeaderController() {
  const pathname = usePathname()

  const noHeaderRoutes = ['/', '/login', '/register']
  const shouldShowHeader = !noHeaderRoutes.includes(pathname)

  if (!shouldShowHeader) return null

  return <Header />
}