import { useForm, Controller } from "react-hook-form";
import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";

import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

import * as Dialog from "@radix-ui/react-dialog";

import {
  ETransactionType,
  TransactionContext,
} from "../../../../contexts/TransactionContext";
import { useContext } from "react";

type NewTransactionFormInputs = {
  amount: number;
  type: ETransactionType;
};

export function TransactionModal() {
  const { createTransaction, fetchTransactions } =
    useContext(TransactionContext);

  const { reset, register, control, handleSubmit } =
    useForm<NewTransactionFormInputs>();

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction({
      type: data.type,
      amount: data.amount,
    });

    reset();

    fetchTransactions();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={20} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            required
            type="number"
            placeholder="Valor"
            {...register("amount", { valueAsNumber: true })}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              return (
                <TransactionType
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <TransactionTypeButton
                    value={ETransactionType.DEPOSIT}
                    variant={ETransactionType.DEPOSIT}
                  >
                    <ArrowCircleUp size={24} />
                    Depósito
                  </TransactionTypeButton>
                  <TransactionTypeButton
                    value={ETransactionType.WITHDRAWAL}
                    variant={ETransactionType.WITHDRAWAL}
                  >
                    <ArrowCircleDown size={24} />
                    Saque
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          ></Controller>
          <button type="submit">Confirmar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
