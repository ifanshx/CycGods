import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SiweMessage } from "siwe";
import { useNetwork, useSignMessage } from "wagmi";

export const useLogin = () => {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { push, query } = useRouter();

  async function loginAsync(address: string) {
    const callbackUrl: any = query.callbackUrl || "/";
    const message = new SiweMessage({
      domain: window.location.host,
      address: address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId: chain?.id,
      nonce: await getCsrfToken(),
    });

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });

    if (!signature) {
      throw new Error("Signature is empty");
    }

    const response = await signIn("ethereum", {
      message: JSON.stringify(message),
      redirect: false,
      signature,
      callbackUrl,
    });

    if (!response) {
      throw new Error("Response is empty");
    }

    if (response.error) {
      throw new Error(response.error);
    }
  }

  return { loginAsync };
};
