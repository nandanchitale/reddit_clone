import Layout from "@/components/layout/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { theme } from '../chakra/theme';


/**
 * Represents entire application
 * Every page and every component is child of this component
 * @param param0 
 * @returns 
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider >
    </RecoilRoot >
  );
}
