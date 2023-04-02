import { useContext } from "react";
import { TransactionContext } from "../../../../contexts/TransactionContext";

export function TransactionTable() {
  const { transactions } = useContext(TransactionContext);

  return (
    <table>
      <tbody>
        {transactions.map((transaction) => (
          <tr>
            <td>{transaction.type}</td>
            <td>{transaction.amount}</td>
            <td>{new Date(transaction.created_at).toISOString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
