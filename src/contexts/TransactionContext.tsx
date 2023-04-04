import { createContext } from "react";

import { TransactionContextType } from "./TransactionContext.types";

export const TransactionContext = createContext<TransactionContextType>({
  balance: 0,
  transactions: [],
  fetchTransactions: async () => {},
  createDepositTransaction: async () => {},
  createWithdrawTransaction: async () => ({ notes: [] }),
});
