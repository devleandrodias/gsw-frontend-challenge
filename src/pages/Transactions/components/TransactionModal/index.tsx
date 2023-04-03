import * as Dialog from "@radix-ui/react-dialog";

import { X } from "phosphor-react";

import { CloseButton, Content, Overlay } from "./styles";

export function TransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Modal de transacao</Dialog.Title>
        <CloseButton>
          <X size={20} />
        </CloseButton>
      </Content>
    </Dialog.Portal>
  );
}
