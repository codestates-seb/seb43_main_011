import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import { useState } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { wrapper } from "../redux/store";
import theme from "../components/style/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../components/style/GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>알딸딸</title>
        <link rel="icon" href="%PUBLIC_URL%/cocktail3.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
