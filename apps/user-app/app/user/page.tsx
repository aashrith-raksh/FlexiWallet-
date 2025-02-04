import { auth } from "@/lib/auth";

const User = async () => {
  const session = await auth();
  console.log("\n\tSERVER SESSION FROM /user: ", session, "\n");

  return <>{JSON.stringify(session)}</>;
};

export default User;
