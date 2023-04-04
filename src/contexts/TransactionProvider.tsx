import { useCallback, useEffect, useState } from "react";

import {
  GetATMExtractReponse,
  TransactionProviderProps,
  CreateDepositTransactionInput,
  CreateWithdrawTransactionInput,
  CreateWithdrawTransactionOutput,
} from "./TransactionContext.types";

import { api } from "../lib/axios";
import { TransactionContext } from "./TransactionContext";
import { Transaction } from "../shared/interfaces/Transaction";

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async () => {
    const { data } = await api.get<GetATMExtractReponse>("/atm/extract");

    setBalance(data.balance);
    setTransactions(data.transactions);
  }, []);

  const createDepositTransaction = useCallback(
    async ({ amount }: CreateDepositTransactionInput) => {
      await api.post("/atm/deposit", { amount });
    },
    []
  );

  const createWithdrawTransaction = useCallback(
    async ({ amount }: CreateWithdrawTransactionInput) => {
      const response = await api.post<CreateWithdrawTransactionOutput>(
        "/atm/withdraw",
        { amount }
      );

      return response.data;
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        balance,
        transactions,
        fetchTransactions,
        createDepositTransaction,
        createWithdrawTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
