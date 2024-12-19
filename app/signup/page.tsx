'use client';
import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/solid'; // Correct import
import { useAuth } from '../context/AuthContext'; 
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const SignUpPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState({ email: '', password: '', confirmPassword: '' });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Track confirm password visibility
  const [showToast, setShowToast] = useState({ message: '', type: '' });
  const { login } = useAuth();
  const router = useRouter();

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    if (!userDetails.email || !userDetails.password || !userDetails.confirmPassword) {
      setValidated(true);
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to sign up');

      setShowToast({ message: 'Sign-up successful!', type: 'success' });
      login(userDetails.email);
      const redirectPath = Cookies.get('redirectPath') || '/';
      router.push(redirectPath); 
      Cookies.remove('redirectPath'); 
      setUserDetails({ email: '', password: '', confirmPassword: '' });
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-10" style={{ backgroundImage: 'url("/electronics-bg.jpg")' }}>
      <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Sign Up</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={handleUserDetailsChange}
              className={`mt-1 py-2 block w-full rounded-lg bg-white/20 text-white placeholder-gray-300 shadow-sm border ${validated && !userDetails.email ? 'border-red-500' : 'border-transparent'
                } focus:ring-blue-500 focus:border-blue-500`}
            />
            {validated && !userDetails.email && (
              <p className="text-red-400 text-sm mt-1">Please provide your email.</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={userDetails.password}
                onChange={handleUserDetailsChange}
                className={`mt-1 py-2 block w-full rounded-lg bg-white/20 text-white placeholder-gray-300 shadow-sm border ${validated && !userDetails.password ? 'border-red-500' : 'border-transparent'
                  } focus:ring-blue-500 focus:border-blue-500`}
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <EyeIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            {validated && !userDetails.password && (
              <p className="text-red-400 text-sm mt-1">Please provide your password.</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={userDetails.confirmPassword}
                onChange={handleUserDetailsChange}
                className={`mt-1 py-2 block w-full rounded-lg bg-white/20 text-white placeholder-gray-300 shadow-sm border ${validated && !userDetails.confirmPassword ? 'border-red-500' : 'border-transparent'
                  } focus:ring-blue-500 focus:border-blue-500`}
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <EyeIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            {validated && !userDetails.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">Please confirm your password.</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="px-6 py-2 text-white bg-blue-800 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="mt-4 text-sm text-red-400">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
      {showToast.message && (
        <div
          className={`fixed bottom-4 right-4 text-white text-sm py-2 px-4 rounded-md shadow-md ${showToast.type === 'success' ? 'bg-blue-600' : 'bg-red-600'}`}
          role="alert"
        >
          {showToast.message}
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
