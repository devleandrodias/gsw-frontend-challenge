import { useContext } from "react";

import styles from "../../../../styles/Transaction.module.css";

import {
  ETransactionType,
  TransactionContext,
} from "../../../../contexts/TransactionContext";

import { formatBRLDate } from "../../../../utils/formatBRLDate";
import { formatBRLCurrency } from "../../../../utils/formatBRLCurrency";

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
              <td
                className={styles.tableData}
                style={{
                  color:
                    transaction.type === ETransactionType.DEPOSIT
                      ? "#00B37E"
                      : "#F75A68",
                }}
              >
                {transaction.type === ETransactionType.WITHDRAWAL && "- "}
                {formatBRLCurrency(transaction.amount)}
              </td>
              <td className={styles.tableData}>
                {formatBRLDate(String(transaction.created_at))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
