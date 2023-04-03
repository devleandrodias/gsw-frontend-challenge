import logo from "../../assets/santander-logo.png";

import { HeaderContainer, HeaderContent, NewWithdrawalButton } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} height={100} />
        <NewWithdrawalButton>Novo Saque</NewWithdrawalButton>
      </HeaderContent>
    </HeaderContainer>
  );
}
