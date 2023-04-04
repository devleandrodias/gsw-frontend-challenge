import { useEffect, useState } from "react";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";

import { SummaryCard, SummaryContainer } from "./styles";
import { formatBRLCurrency } from "../../utils/formatBRLCurrency";
import { useTransactionContext } from "../../hooks/useTransactionContext";

export function Summary() {
  const { transactions, balance } = useTransactionContext();

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
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Depósitos</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{formatBRLCurrency(totalDeposits)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saques</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{formatBRLCurrency(totalWithdrawals)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saldo</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{formatBRLCurrency(balance)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
