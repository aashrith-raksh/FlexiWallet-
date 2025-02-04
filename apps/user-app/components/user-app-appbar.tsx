"use client"
import { signIn, signOut} from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useSession } from "next-auth/react";

export default function UserAppBar(): JSX.Element {
  const session = useSession();
  return (
   <div className="">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}
