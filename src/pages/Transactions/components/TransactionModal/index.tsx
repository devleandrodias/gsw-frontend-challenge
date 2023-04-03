import * as Dialog from "@radix-ui/react-dialog";

import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";

import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

export function TransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={20} />
        </CloseButton>

        <form>
          <input required type="number" placeholder="Valor" />
          <TransactionType>
            <TransactionTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} />
              Depósito
            </TransactionTypeButton>
            <TransactionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saque
            </TransactionTypeButton>
          </TransactionType>
          <button type="submit">Confirmar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
