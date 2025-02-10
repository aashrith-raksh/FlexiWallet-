"use server";

import { prisma } from "@repo/db";
import { auth } from "./auth";
import {
  getCurrentUser,
  getUserFromDB_ByPhone,
} from "./utils";

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

export async function createPeerTransaction(data: {
  receiverPhoneNumber: string;
  amount: number;
}) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        message: "Unauthenticated request",
      };
    }

    const senderId = currentUser!.id;
    const { receiverPhoneNumber, amount } = data;
    const amountToSend = amount * 100;

    // GET THE RECEIVER ID
    const receiver = await getUserFromDB_ByPhone(receiverPhoneNumber);

    if (!receiver) {
      return {
        message: "Invalid reciver phone number",
      };
    }

    const receiverId = receiver.id;

    await prisma.$transaction(async (tx) => {
      const senderBalanceRecord = await tx.balance.findFirst({
        where: {
          userId: Number(senderId),
        },
      });

      const senderBalance = senderBalanceRecord.amount;

      if (senderBalance < amountToSend) {
        throw new Error("Insufficient funds");
      }

      await tx.$executeRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(senderId)} FOR UPDATE`;
      await tx.$executeRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(receiverId)} FOR UPDATE`;

      await tx.balance.update({
        where: {
          userId: Number(senderId),
        },
        data: {
          amount: {
            decrement: Number(amountToSend),
          },
        },
      });

      await tx.balance.update({
        where: {
          userId: Number(receiverId),
        },
        data: {
          amount: {
            increment: Number(amountToSend),
          },
        },
      });

      await tx.peerTransaction.create({
        data: {
          amount: amountToSend,
          timestamp: new Date(),
          senderId: Number(senderId),
          receiverId: Number(receiverId),
        },
      });
    });

    return {
      message: `Transaction Successful`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        error:true,
        message: error.message || "An error occured while P2P transfer",
      };
    }
  }
}
