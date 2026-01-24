import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  SetUsername,
  SetEmail,
  SetPassword,
  SetRole,
  ClearRegister,
} from '../../redux/features/authentication/registerSlice';

import { useState } from 'react';
import { z } from 'zod';
import {
  registerSchema,
  type TRegisterSchema,
} from '../../validation/authValidation';
import toast from 'react-hot-toast';
import type { RootState } from '../../redux/store/store';
import { registerUser } from '../../redux/features/authentication/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email, password, role } = useAppSelector(
    (state: RootState) => state.register,
  );
  const { loading, error: serverError } = useAppSelector(
    (state: RootState) => state.user,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof TRegisterSchema, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate using Zod
      registerSchema.parse({ username, email, password, role });

      const result = await dispatch(
        registerUser({ username, email, password, role }),
      );
      if (registerUser.fulfilled.match(result)) {
        toast.success('Successfully created account!');
        dispatch(ClearRegister());
        navigate('/dashboard');
      } else {
        toast.error(serverError || 'Failed to Register');
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
            Join Us
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create an account to start tracking ORS
          </p>
        </div>

        <div className="bg-white dark:bg-[#1c2632] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {serverError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center font-medium">
                {serverError}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                className={`w-full h-11 px-4 rounded-xl border ${errors.username ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-[#101822] dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder="Enter your name"
                type="text"
                value={username}
                onChange={(e) => dispatch(SetUsername(e.target.value))}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                className={`w-full h-11 px-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-[#101822] dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => dispatch(SetEmail(e.target.value))}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                className={`w-full h-11 px-4 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-[#101822] dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => dispatch(SetPassword(e.target.value))}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                className={`w-full h-11 px-4 rounded-xl border ${errors.role ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-[#101822] dark:text-white focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                value={role}
                onChange={(e) => dispatch(SetRole(e.target.value))}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="inspector">Inspector</option>
                <option value="viewer">Viewer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            <button
              disabled={loading}
              className="w-full h-12 bg-primary text-white font-bold rounded-xl mt-4 shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70"
              type="submit"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?
              <Link
                to="/auth/login"
                className="text-primary font-bold hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
