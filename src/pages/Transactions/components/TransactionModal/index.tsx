import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, ArrowCircleUp, ArrowCircleDown, Money } from "phosphor-react";

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
import { formatBRLCurrency } from "../../../../utils/formatBRLCurrency";

type NewTransactionFormInputs = {
  amount: number;
  type: ETransactionType;
};

export function TransactionModal() {
  const [notes, setNotes] = useState<{ note: number; quantity: number }[]>([]);

  const {
    fetchTransactions,
    createDepositTransaction,
    createWithdrawTransaction,
  } = useContext(TransactionContext);

  const { reset, register, control, handleSubmit, formState } =
    useForm<NewTransactionFormInputs>();

  const { isSubmitting } = formState;

  function handleReset() {
    reset();
    setNotes([]);
  }

  async function handleCreateNewTransaction({
    type,
    amount,
  }: NewTransactionFormInputs) {
    setNotes([]);

    let successMessage = "";

    if (type === ETransactionType.DEPOSIT) {
      await createDepositTransaction({ amount });
      successMessage = "Depósito efetuado com sucesso!";
    }

    if (type === ETransactionType.WITHDRAWAL) {
      setNotes((await createWithdrawTransaction({ amount })).notes);
      successMessage = "Saque efetuado com sucesso!";
    }

    toast.success(successMessage, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    await fetchTransactions();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>
          {notes.length ? (
            <span>Retire seu dinheiro</span>
          ) : (
            <span>Nova transação</span>
          )}
        </Dialog.Title>

        <CloseButton onClick={handleReset}>
          <X size={20} />
        </CloseButton>

        {notes.length ? (
          <div style={{ marginTop: "2rem" }}>
            {notes.map((note) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <span>{note.quantity} x</span>
                <Money color="#00B37E" size={32} />
                <span>{formatBRLCurrency(note.note)}</span>
              </div>
            ))}
          </div>
        ) : (
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
              {isSubmitting ? (
                <span>Carregando...</span>
              ) : (
                <span>Confirmar</span>
              )}
            </button>
          </form>
        )}
      </Content>
    </Dialog.Portal>
  );
}
