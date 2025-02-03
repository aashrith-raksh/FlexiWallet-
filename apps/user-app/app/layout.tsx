import React, { ReactNode } from 'react'
import Providers from '@/components/providers'
import "./globals.css";

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <html>
      <Providers>
        <body>
          {children}
        </body>
      </Providers>
    </html>
  )
}

export default RootLayout
