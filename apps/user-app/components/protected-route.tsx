"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin"); // Redirect to sign-in page
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loader while checking session
  }

  if (session) {
    return <>{children}</>;
  }

  return null; // This prevents flickering of protected content
}
