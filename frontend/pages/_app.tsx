// pages/_app.tsx
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Head>
        <title>AI CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
