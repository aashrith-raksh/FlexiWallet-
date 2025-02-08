import { prisma } from "@repo/db";
import { auth } from "./auth";

export const getCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const getUserFromDB_ByPhone = async (userPhone: string) => {
  const user = await prisma.user.findFirst({
    where: {
      phone: userPhone,
    },
  });

  return user;
};

export const getUserFromDB_ById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  return user;
};
