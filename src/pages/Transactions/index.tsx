import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionTable } from "./components/TransactionTable";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionTable />
    </div>
  );
}
