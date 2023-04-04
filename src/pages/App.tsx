import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../styles/global";
import { defaultTheme } from "../styles/theme/default";

import { Transactions } from "./Transactions";
import { TransactionProvider } from "../contexts/TransactionProvider";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ToastContainer />
      <TransactionProvider>
        <Transactions />
      </TransactionProvider>
    </ThemeProvider>
  );
}
