import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage(): Promise<JSX.Element> {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }

  return <h1 className="text-2xl text-slate-500">Landign page</h1>;
}
