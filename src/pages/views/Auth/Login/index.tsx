import DocumentHead from "@/components/Molecules/DocumentHead";
import { query } from "firebase/firestore";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginView = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: (event.target as any).email.value,
        password: (event.target as any).password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setisLoading(false);
        push(callbackUrl);
      } else {
        setisLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (error: any) {
      setisLoading(false);
      setError(" Email or Password is incorrect");
    }
  };

  // Function to handle login with Discord
  const handleDiscordLogin = () => {
    // Implement your Discord login logic here
    console.log("Logging in with Discord");
  };

  // Function to handle login with Google
  const handleGoogleLogin = () => {
    // Implement your Google login logic here
    console.log("Logging in with Google");
  };

  // Function to handle connecting a wallet
  const handleConnectWallet = () => {
    // Implement your wallet connection logic here
    console.log("Connecting Wallet");
  };

  return (
    <>
      <DocumentHead
        title="CycGods! - Login"
        description="CycGods"
        baseUrl="https://cycgods.vercel.app/"
        favicon="/assets/Eyes.png"
        siteName="CycGods"
        image="/assets/Logo.png"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
          <form className="mb-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Your email address"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Your password"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mb-4">
            <p className="text-gray-600">Or Login ith:</p>
          </div>
          {/* Add login options for Discord, Google, and Wallet */}
          <div className="text-center mb-4">
            <button
              onClick={handleDiscordLogin}
              className="bg-black text-white py-2 px-4 rounded hover:bg-discord-dark mx-2 focus:outline-none"
            >
              Discord
            </button>
            <button
              onClick={handleGoogleLogin}
              className="bg-black text-white py-2 px-4 rounded hover:bg-google-dark mx-2 focus:outline-none"
            >
              Google
            </button>
          </div>

          <div className="text-center mb-4">
            <button
              onClick={handleConnectWallet}
              className="bg-black text-white py-2 px-4 rounded hover:bg-wallet-dark focus:outline-none"
            >
              Connect Wallet
            </button>
          </div>

          <div className="text-center">
            <Link href="/auth/register">
              <p className="text-blue-500 hover:underline">
                Don&apos;t have an account yet? Register here.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginView;
