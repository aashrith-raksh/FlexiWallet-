"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";
import { RecoilRoot } from "recoil";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
};

export default Providers;
