'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/componentes/footer'

export function FooterController() {
  const pathname = usePathname()

  const noFooterRoutes = ['/', '/login', '/register', '/reset-password']
  const shouldShowFooter =
    !noFooterRoutes.includes(pathname) &&
    !pathname.startsWith('/reset-password/confirm')

  if (!shouldShowFooter) return null

  return <Footer />
}
