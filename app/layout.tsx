import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/Header'
import ThemesProvider from '@/providers/ThemesProvider'
import '@/styles/globals.scss'
import '@/styles/theme-config.css'

export const metadata = {
  title: {
    default: 'Iowa State University Extensions and Outreach - CED',
    template: `%s - ISU Extensions and Outreach - CED`
  },
  description: 'Iowa State University Extensions and Outreach - CED Chat Interface',
  icons: {
    icon: '/Cy.png',
    shortcut: '/Cy.png',
    apple: '/Cy.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemesProvider>
          <Header />
          {children}
          <Toaster />
        </ThemesProvider>
        <Analytics />
      </body>
    </html>
  )
}
