import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NewWithdrawalButton = styled.button`
  border: 0;
  height: 50px;
  background: ${(props) => props.theme["red-santander-100"]};
  color: ${(props) => props.theme["white"]};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    transition: background-color 0.5s;
    background: ${(props) => props.theme["red-santander-200"]};
  }
`;
