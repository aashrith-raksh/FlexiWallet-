import React, { ReactNode } from 'react'
import Providers from '@/components/providers'
import "./globals.css";
import UserAppBar from '@/components/user-app-appbar';

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <html>
      <Providers>
        <body>
          <UserAppBar/>
          {children}
        </body>
      </Providers>
    </html>
  )
}

export default RootLayout
