import React from "react";

export interface TransactionContextType {}

export const TransactionsContext = React.createContext<TransactionContextType>(
  {}
);

export interface TransactionProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider({ children }: TransactionProviderProps) {
  return <div>{children}</div>;
}
