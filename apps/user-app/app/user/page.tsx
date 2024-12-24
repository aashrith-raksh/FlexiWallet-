import { auth } from "@/lib";

const User = async () => {
  const session = await auth();
  console.log("\n\tSERVER SESSION FROM /user: ", session, "\n");

  return <>{JSON.stringify(session)}</>;
};

export default User;
