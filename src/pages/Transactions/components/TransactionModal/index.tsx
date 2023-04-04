import { useContext } from "react";
import { toast } from "react-toastify";
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

type NewTransactionFormInputs = {
  amount: number;
  type: ETransactionType;
};

export function TransactionModal() {
  const { createTransaction, fetchTransactions } =
    useContext(TransactionContext);

  const { reset, register, control, handleSubmit, formState } =
    useForm<NewTransactionFormInputs>();

  const { isSubmitting } = formState;

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction({ type: data.type, amount: data.amount });

    toast.success("Transação Realizada com Sucesso!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    reset();

    await fetchTransactions();
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <span>Carregando...</span> : <span>Confirmar</span>}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
