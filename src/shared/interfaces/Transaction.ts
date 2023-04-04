import { ETransactionType } from "../enuns/ETransactionType";

export interface Transaction {
  id: number;
  amount: number;
  type: ETransactionType;
  created_at: Date;
  updated_at: Date;
}
