import { ReactNode } from "react";
import { INote } from "../shared/interfaces/Note";
import { Transaction } from "../shared/interfaces/Transaction";

export interface CreateDepositTransactionInput {
  amount: number;
}

export interface CreateWithdrawTransactionInput {
  amount: number;
}

export interface CreateWithdrawTransactionOutput {
  notes: INote[];
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

export interface TransactionProviderProps {
  children: ReactNode;
}

export interface GetATMExtractReponse {
  balance: number;
  transactions: Transaction[];
}
