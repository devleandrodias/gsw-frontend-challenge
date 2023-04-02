import { Transactions } from "./Transactions";
import { TransactionsProvider } from "../contexts/TransactionContext";

export function App() {
  return (
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>
  );
}
