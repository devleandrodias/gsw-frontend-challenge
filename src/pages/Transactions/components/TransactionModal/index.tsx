import * as Dialog from "@radix-ui/react-dialog";

export function TransactionModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <div className="">Modal de transacao</div>
      </Dialog.Content>
      <Dialog.Close>X</Dialog.Close>
    </Dialog.Portal>
  );
}
