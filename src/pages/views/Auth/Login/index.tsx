import DocumentHead from "@/components/Molecules/DocumentHead";

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
    setError("");
    setisLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
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
          {error && <p className=" text-red-600 mb-10 ">{error}</p>}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 p-2 border rounded"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 p-2 border rounded"
                name="password"
                placeholder="password"
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
