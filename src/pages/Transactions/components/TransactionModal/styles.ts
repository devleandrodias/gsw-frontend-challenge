import styled, { css } from "styled-components";

import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { ETransactionType } from "../../../../contexts/TransactionContext";

export const Overlay = styled(Dialog.Overlay)`
  inset: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem;
  background: ${(props) => props.theme["gray-800"]};

  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["red-santander-100"]};
      color: ${(props) => props.theme["white"]};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 0.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background: ${(props) => props.theme["gray-400"]};
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["red-santander-200"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background-color: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  line-height: 0;
  color: ${(props) => props.theme["gray-300"]};
`;

export const NotesContainer = styled.div`
  margin-top: 2rem;
  font-size: 1.25rem;

  svg {
    color: ${(props) => props.theme["green-300"]};
  }
`;

export const NoteRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface TransactionTypeButtonProps {
  variant: ETransactionType;
}

export const TransactionTypeButton = styled(
  RadioGroup.Item
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme["gray-700"]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme["gray-300"]};

  svg {
    color: ${(props) =>
      props.variant === ETransactionType.DEPOSIT
        ? props.theme["green-300"]
        : props.theme["red-300"]};
  }

  &[data-state="unchecked"]:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme["gray-600"]};
  }

  &[data-state="checked"] {
    color: ${(props) => props.theme["white"]};
    background: ${(props) =>
      props.variant === ETransactionType.DEPOSIT
        ? props.theme["green-500"]
        : props.theme["red-500"]};

    svg {
      color: ${(props) => props.theme["white"]};
    }
  }

  ${(props) =>
    props.variant === ETransactionType.WITHDRAWAL &&
    css`
      :focus {
        outline: 0;
        box-shadow: 0 0 0 1px ${(props) => props.theme["red-500"]};
      }
    `}
`;

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;
