"use client";

import PeerTransactions from "@/components/peer-transactions";
import { createPeerTransaction } from "@/lib/actions";
import { useState } from "react";

export default function P2PTransferForm() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await createPeerTransaction({
        receiverPhoneNumber: phone,
        amount: Number(amount),
      });
      console.log(response);
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold">P2P Transfer</h2>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+911234567890"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
      {/* <PeerTransactions /> */}
    </div>
  );
}
