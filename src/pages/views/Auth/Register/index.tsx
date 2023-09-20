import DocumentHead from "@/components/Molecules/DocumentHead";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, FormEvent } from "react";

const RegisterView: React.FC = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      email: (event.target as any).email.value,
      fullname: (event.target as any).fullname.value,
      password: (event.target as any).password.value,
    };

    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      (event.target as HTMLFormElement).reset();
      setisLoading(false);
      push("/auth/login");
    } else {
      setisLoading(false);
      setError(result.status === 400 ? "Email already exists" : "");
    }
  };

  return (
    <>
      <DocumentHead
        title="CycGods! - Register"
        description="CycGods"
        baseUrl="https://cycgods.vercel.app/"
        favicon="/assets/Eyes.png"
        siteName="CycGods"
        image="/assets/Logo.png"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          {error && <p className=" text-red-600 mb-10 ">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 p-2 border rounded"
                name="fullname"
                placeholder="fullname"
              />
            </div>
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
            <div className="mb-4">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {isLoading ? "Loading.." : "Register"}
              </button>
            </div>
            <div className="text-center">
              <Link href="/auth/login">
                <p className="text-blue-500 hover:underline">
                  Have an account? Login here.
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterView;
