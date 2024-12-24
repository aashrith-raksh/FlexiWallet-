"use client"
import { signIn, signOut} from "@/lib";
import { Appbar } from "@repo/ui/appbar";
import { useSession } from "next-auth/react";

export default function Page(): JSX.Element {
  const session = useSession();
  return (
   <div className="min-h-[200px] bg-red-500">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}