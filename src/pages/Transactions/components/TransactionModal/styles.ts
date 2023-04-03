import * as Dialog from "@radix-ui/react-dialog";

import styled from "styled-components";

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
