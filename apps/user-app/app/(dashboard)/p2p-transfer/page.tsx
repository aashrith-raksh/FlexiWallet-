import PeerTransactions from "@/components/peer-transactions";
import PeerTransferForm from "@/components/peer-transfer-form";

export default function P2PTransferForm() {
  return (
    <div>
      <PeerTransferForm>
        <PeerTransactions />
      </PeerTransferForm>
    </div>
  );
}
