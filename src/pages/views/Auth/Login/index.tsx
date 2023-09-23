import { ButtonConnect } from "@/components/ButtonConnect";
import DocumentHead from "@/components/Molecules/DocumentHead";
import { getAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { WalletIcon } from "@heroicons/react/24/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, getAuthOptions(req)),
    },
  };
};

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or Password is incorrect");
    }
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
      <div className="flex items-center justify-center h-screen  ">
        <div className="bg-white p-4 md:p-8 rounded shadow-md max-w-md w-full ">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center">
            Login
          </h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-2 md:mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border rounded"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-2 md:mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-2 border rounded"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div className="mb-4 flex justify-center items-center text-center">
            <div className="w-1/4 h-0.5 bg-gray-300"></div>
            <p className="mx-3 text-gray-500">or</p>
            <div className="w-1/4 h-0.5 bg-gray-300"></div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row justify-center items-center gap-2">
            <button
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              className="w-full bg-blue-500 text-white py-2 md:py-4 rounded hover:bg-blue-600 focus:outline-none flex items-center justify-center"
              disabled={isLoading}
            >
              <div className="flex items-center gap-1">
                <Image
                  src="/assets/Logo/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <p className="font-semibold">
                  {isLoading ? "Loading..." : "Sign In With Google"}
                </p>
              </div>
            </button>
            <div className="w-full">
              <ButtonConnect />
            </div>
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
