import * as Dialog from "@radix-ui/react-dialog";

import logo from "../../assets/santander-logo.png";

import { HeaderContainer, HeaderContent, NewWithdrawalButton } from "./styles";
import { TransactionModal } from "../../pages/Transactions/components/TransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} height={100} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewWithdrawalButton>Nova Transação</NewWithdrawalButton>
          </Dialog.Trigger>
          <TransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}
