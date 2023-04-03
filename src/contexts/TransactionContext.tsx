import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";

import { api } from "../lib/axios";

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
}

export const TransactionContext = createContext<TransactionContextType>({
  balance: 0,
  transactions: [],
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, balance }}>
      {children}
    </TransactionContext.Provider>
  );
}
