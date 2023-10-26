import type { Metadata } from 'next'
import {Providers} from "app/app/components/provider.component";
import './globals.css'
export const metadata: Metadata = {
  title: 'Table test task',
  description: 'Manipulation with data, and work on backend side',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Providers>
              <main>
                  {children}
              </main>
          </Providers>
      </body>
    </html>
  )
}
