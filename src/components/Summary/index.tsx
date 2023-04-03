import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

import { useContext, useEffect, useState } from "react";

import { formatBRLCurrency } from "../../utils/formatBRLCurrency";
import { TransactionContext } from "../../contexts/TransactionContext";

import styles from "../../styles/Summary.module.css";

export function Summary() {
  const { transactions, balance } = useContext(TransactionContext);

  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  useEffect(() => {
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <span>Depósitos</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong className={styles.cardStrong}>
          {formatBRLCurrency(totalDeposits)}
        </strong>
      </div>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <span>Saques</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong className={styles.cardStrong}>
          {formatBRLCurrency(totalWithdrawals)}
        </strong>
      </div>
      <div className={styles.card}>
        <header className={styles.cardHeader}>
          <span>Saldo</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong className={styles.cardStrong}>
          {formatBRLCurrency(balance)}
        </strong>
      </div>
    </div>
  );
}
