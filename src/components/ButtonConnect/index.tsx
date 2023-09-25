import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WalletIcon } from "@heroicons/react/24/solid";
import { modeTestnet } from "viem/chains";

const ButtonConnectWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { push, query } = useRouter();

  const SignInWithWallet = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const callbackUrl: any = query.callbackUrl || "/";
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the CycGods App.",
        uri: window.location.origin,
        version: "1",
        chainId: modeTestnet.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const res = await signIn("ethereum", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Sign in with wallet failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Sign in with wallet failed");
    }
  };

  return (
    <>
      <button
        className="w-full gap-3 bg-blue-500 text-white py-2 md:py-4 rounded hover:bg-blue-600 focus:outline-none flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          if (!isConnected) {
            connect();
          } else {
            SignInWithWallet(e);
          }
        }}
        disabled={isLoading}
      >
        <WalletIcon className="w-6 h-6 " />
        {isLoading
          ? "Loading..."
          : !isConnected
          ? "Connect Wallet"
          : "Sign-in With Wallet"}
      </button>
    </>
  );
};

export default ButtonConnectWallet;
