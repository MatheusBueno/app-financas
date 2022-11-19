import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

export const renderTestingWithTheme = (children: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
