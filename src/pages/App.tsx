import { Transactions } from "./Transactions";
import { TransactionProvider } from "../contexts/TransactionContext";

export function App() {
  return (
    <TransactionProvider>
      <Transactions />
    </TransactionProvider>
  );
}
