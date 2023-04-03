import { ETransactionType } from "../contexts/TransactionContext";

export const getTransactionType = (type: ETransactionType) => {
  switch (type) {
    case ETransactionType.DEPOSIT:
      return "Depósito";
    case ETransactionType.WITHDRAWAL:
      return "Saque";
  }
};
