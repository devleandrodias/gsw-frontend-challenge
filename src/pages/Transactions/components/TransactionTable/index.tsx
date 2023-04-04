import { useContext } from "react";

import { formatBRLDate } from "../../../../utils/formatBRLDate";
import { formatBRLCurrency } from "../../../../utils/formatBRLCurrency";
import { getTransactionType } from "../../../../utils/formatBRLTransactionType";
import { TransactionContext } from "../../../../contexts/TransactionContext";
import { ETransactionType } from "../../../../shared/enuns/ETransactionType";

import {
  PriceHighLight,
  TransactionsTable,
  TransactionsTableContainer,
} from "./styles";

export function TransactionTable() {
  const { transactions } = useContext(TransactionContext);

  return (
    <TransactionsTableContainer>
      <TransactionsTable>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{getTransactionType(transaction.type)}</td>
              <td>
                <PriceHighLight type={transaction.type}>
                  {transaction.type === ETransactionType.WITHDRAWAL && "- "}
                  {formatBRLCurrency(transaction.amount)}
                </PriceHighLight>
              </td>
              <td>{formatBRLDate(String(transaction.created_at))}</td>
            </tr>
          ))}
        </tbody>
      </TransactionsTable>
    </TransactionsTableContainer>
  );
}
