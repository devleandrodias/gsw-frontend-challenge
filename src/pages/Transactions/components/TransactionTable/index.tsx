import { useContext } from "react";

import styles from "../../../../styles/Transaction.module.css";

import {
  ETransactionType,
  TransactionContext,
} from "../../../../contexts/TransactionContext";

export function TransactionTable() {
  const { transactions } = useContext(TransactionContext);

  const getTransactionType = (type: ETransactionType) => {
    switch (type) {
      case ETransactionType.DEPOSIT:
        return "Depósito";
      case ETransactionType.WITHDRAWAL:
        return "Saque";
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 0.5rem",
        }}
      >
        <tbody>
          {transactions.map((transaction) => (
            <tr className={styles.tableRow}>
              <td className={styles.tableData}>
                {getTransactionType(transaction.type)}
              </td>
              <td className={styles.tableData}>{transaction.amount}</td>
              <td className={styles.tableData}>
                {new Date(transaction.created_at).toISOString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
