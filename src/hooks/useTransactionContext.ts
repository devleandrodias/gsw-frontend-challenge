import { useContext } from "react";

import { TransactionContext } from "../contexts/TransactionContext";

export const useTransactionContext = () => useContext(TransactionContext);
