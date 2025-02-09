import React, { ReactNode } from "react";
import Providers from "@/components/providers";
import "./globals.css";
import UserAppBar from "@/components/user-app-appbar";
import ProtectedRoute from "@/components/protected-route";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <Providers>
        <body>
          <ProtectedRoute>
            <UserAppBar />
            {children}
          </ProtectedRoute>
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
