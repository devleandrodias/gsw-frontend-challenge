import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../styles/global";
import { defaultTheme } from "../styles/theme/default";

import { Transactions } from "./Transactions";
import { TransactionProvider } from "../contexts/TransactionContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionProvider>
        <Transactions />
      </TransactionProvider>
    </ThemeProvider>
  );
}
