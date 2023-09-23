import { DefaultLayout } from "@/components/sidebar/layouts/Default";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  goerli,
  polygonMumbai,
  modeTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import type { Session } from "next-auth";

import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
      mainnet,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
        ? [modeTestnet]
        : []),
    ],
    [publicProvider()]
  );

  const projectId = "7e1cfd45b1d73fdb5867dbf0c724b095";

  const { wallets } = getDefaultWallets({
    appName: "CycGods",
    projectId,
    chains,
  });

  const demoAppInfo = {
    appName: "CycGods",
  };

  const connectors = connectorsForWallets([...wallets]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: "Sign in to the RainbowKit + SIWE example app",
  });

  return (
    <SessionProvider refetchInterval={0} session={pageProps.session}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </WagmiConfig>
    </SessionProvider>
  );
}
