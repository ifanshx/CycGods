import DocumentHead from "@/components/Molecules/DocumentHead";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-2">
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
            <p>-or-</p>
          </div>
          <div className="mb-4">
            <button
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In With Google"}
            </button>
          </div>
          <div className="text-center">
            <Link href="/auth/register">
              <p className="text-blue-500 hover:underline">
                Dont have an account yet? Register here.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginView;
