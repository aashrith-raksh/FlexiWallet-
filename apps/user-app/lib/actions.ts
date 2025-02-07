"use server";

import { prisma } from "@repo/db";
import { auth } from "./auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        message: "Unauthenticated request",
      };
    }

    const token = (Math.random() * 1000).toString();

    const newTransaction = await prisma.onRampTransaction.create({
      data: {
        provider,
        amount: amount * 100,
        token,
        startTime: new Date(),
        status: "Processing",
        userId: Number(session?.user?.id),
      },
    });

    console.log("transaction created:", newTransaction);

    return {
      message: "Successfully added a transaction",
      transaction: newTransaction,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        message: error.message,
      };
    }
  }
}
