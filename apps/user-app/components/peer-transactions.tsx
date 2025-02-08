import React from "react";
import { Transactions } from "./transaction-card";
import { getCurrentUser } from "@/lib/utils";
import { prisma } from "@repo/db";

const PeerTransactions = async () => {
  async function getPeerTransactions() {
    const user = await getCurrentUser();
    const sentPeerTransactions = await prisma.peerTransaction.findMany({
      where: {
        senderId: Number(user?.id),
      },
    });

    const recievedPeerTransactions = await prisma.peerTransaction.findMany({
      where: {
        receiverId: Number(user?.id),
      },
    });

    const mergedPeerTransactions = [
      ...sentPeerTransactions,
      ...recievedPeerTransactions,
    ].map((tx) => {
      return {
        amount: tx.amount,
        time: tx.timestamp,
        key:tx.id,
        received: (Number(user.id) == tx.receiverId)
      };
    });

    return mergedPeerTransactions;
  }

  const transactions = await getPeerTransactions();
  return (
    <div>
      <Transactions transactions={transactions} />
    </div>
  );
};

export default PeerTransactions;
