"use client";
import { redirect } from "next/navigation";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  if (!session?.user) {
    return redirect("/api/auth/signin");
  } else {
    return <>{children}</>;
  }
}
