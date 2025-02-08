import { OnRampTransactionType, PeerTransactionType } from "@/lib/zod";
import { Card } from "@repo/ui/card";

export const Transactions = ({
  transactions,
}: {
  transactions: (OnRampTransactionType | PeerTransactionType)[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between" key={t.key}>
            <div>
              <div className="text-sm">{typeof t === "object" && "received" in t && t.received? "Received" : "Sent"} INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {typeof t === "object" && "received" in t && t.received ? "+" : "-"} Rs{" "}
              {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
