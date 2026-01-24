import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { loginUser } from '../../redux/features/authentication/authSlice';
import {
  SetEmail,
  SetPassword,
} from '../../redux/features/authentication/loginSlice';

import { useState } from 'react';
import {
  loginSchema,
  type TLoginSchema,
} from '../../validation/authValidation';
import { z } from 'zod';
import type { RootState } from '../../redux/store/store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state: RootState) => state.login);
  const { loading, error: serverError } = useAppSelector(
    (state: RootState) => state.user,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof TLoginSchema, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate using Zod
      loginSchema.parse({ email, password });

      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        toast.error(serverError || 'Failed to login');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.issues.forEach((e) => {
          if (e.path[0]) {
            formattedErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-[#111418] dark:text-white text-4xl font-extrabold tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to access the ORS dashboard
          </p>
        </div>

        <div className="bg-white dark:bg-[#1c2632] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {serverError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">
                {serverError}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                className={`w-full h-12 px-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-[#101822] dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => dispatch(SetEmail(e.target.value))}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                className={`w-full h-12 px-4 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-[#101822] dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => dispatch(SetPassword(e.target.value))}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Don't have an account?
              <Link
                to="/auth/register"
                className="text-primary font-bold hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
