import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import theme from "@app/styles/theme";
import GlobalStyle from "@app/styles/globalstyles";
import MainContainer from "@app/components/shared/main";
import Navbar from "@app/components/shared/navbar";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meu App</title>
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <Navbar />
      </ThemeProvider>
    </>
  );
}
