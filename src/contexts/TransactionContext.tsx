import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";

import { api } from "../lib/axios";

export interface CreateTransactionInput {
  amount: number;
  type: ETransactionType;
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
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextType>({
  balance: 0,
  transactions: [],
  fetchTransactions: async () => {},
  createTransaction: async () => {},
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

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      if (data.type === ETransactionType.DEPOSIT) {
        await api.post("/atm/deposit", { amount: data.amount });
      }

      if (data.type === ETransactionType.WITHDRAWAL) {
        await api.post("/atm/withdraw", { amount: data.amount });
      }
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, balance, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
