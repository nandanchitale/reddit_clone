import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";


/**
 * Represents entire application
 * Every page and every component is child of this component
 * @param param0 
 * @returns 
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
