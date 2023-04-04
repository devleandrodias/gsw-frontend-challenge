import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";

import { api } from "../lib/axios";

export interface CreateDepositTransactionInput {
  amount: number;
}

export interface CreateWithdrawTransactionInput {
  amount: number;
}

export interface CreateWithdrawTransactionOutput {
  notes: {
    note: number;
    quantity: number;
  }[];
}

export enum ETransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export interface Transaction {
  id: number;
  amount: number;
  type: ETransactionType;
  created_at: Date;
  updated_at: Date;
}

export interface TransactionContextType {
  balance: number;
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  createDepositTransaction: (
    data: CreateDepositTransactionInput
  ) => Promise<void>;
  createWithdrawTransaction: (
    data: CreateWithdrawTransactionInput
  ) => Promise<CreateWithdrawTransactionOutput>;
}

export const TransactionContext = createContext<TransactionContextType>({
  balance: 0,
  transactions: [],
  fetchTransactions: async () => {},
  createDepositTransaction: async () => {},
  createWithdrawTransaction: async () => ({ notes: [] }),
});

export interface TransactionProviderProps {
  children: ReactNode;
}

export interface GetATMExtractReponse {
  balance: number;
  transactions: Transaction[];
}

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
