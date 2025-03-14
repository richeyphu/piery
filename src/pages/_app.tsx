import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@components";
import theme from "@theme";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
