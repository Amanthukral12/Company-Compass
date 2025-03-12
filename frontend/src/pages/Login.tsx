/// <reference types="vite-plugin-svgr/client" />
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/Employee.svg?react";
const Login = () => {
  const { login } = useAuth();
  const currentYear = new Date().getFullYear();

  const onSubmit = async () => {
    try {
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#cae9ff] min-h-screen flex items-center justify-center">
      <main className="h-[80vh] lg:h-[80vh] w-4/5 lg:w-2/5 bg-white shadow-2xl rounded-4xl p-4 flex flex-col items-center relative">
        <Logo className="w-1/2" />
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl mb-4">
          Company Compass
        </h1>
        <h3 className="font-semibold text-lg lg:text-xl my-2">Welcome back</h3>
        <p className="text-sm lg:text-base text-slate-600">
          Access your workforce management portal
        </p>
        <button
          onClick={() => onSubmit()}
          className="w-4/5 flex items-center justify-center px-4 py-1 border border-gray-300 rounded-lg mt-4 mb-6 cursor-pointer focus:outline-none"
        >
          <svg viewBox="0 0 48 48" className="h-5 w-5 sm:h-6 sm:w-6 mr-1">
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          <span className="font-semibold">Login with google</span>
        </button>
        <p className="text-sm text-slate-600 text-center">
          Secure login for company registration and employee management
        </p>
        <p className="text-sm text-slate-500 absolute bottom-10">
          © {currentYear} Company Compass. All rights reserved.
        </p>
      </main>
    </div>
  );
};

export default Login;
