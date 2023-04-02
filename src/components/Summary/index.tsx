import { useCallback, useContext, useEffect, useState } from "react";

import { TransactionContext } from "../../contexts/TransactionContext";

import styles from "../../styles/Summary.module.css";

export function Summary() {
  const { transactions, balance } = useContext(TransactionContext);

  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  const fetchCardsInformations = useCallback(() => {
    let totalDeposits = 0;
    let totalWithdrawals = 0;

    for (const transaction of transactions) {
      switch (transaction.type) {
        case "DEPOSIT":
          totalDeposits += transaction.amount;
          break;
        case "WITHDRAWAL":
          totalWithdrawals += transaction.amount;
          break;
      }
    }

    setTotalDeposits(totalDeposits);
    setTotalWithdrawals(totalWithdrawals);
  }, [transactions]);

  useEffect(() => {
    fetchCardsInformations();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span>Depósitos</span>
        <span>R${totalDeposits}</span>
      </div>
      <div className={styles.card}>
        <span>Saques</span>
        <span>R${totalWithdrawals}</span>
      </div>
      <div className={styles.card}>
        <span>Saldo</span>
        <span>R${balance}</span>
      </div>
    </div>
  );
}
