"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || 'Login failed');
        return;
      }
  
      const data = await res.json();
      console.log(data);  // Log the response to check if token is there
  
      if (data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        console.log("Token stored:", data.token);  // Check if token is stored
  
        // Redirect using Next.js router
        router.push('/admin');  // Redirect to protected page
      } else {
        alert('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login Error:', error);  // Log errors
      alert('An error occurred during login');
    }
  };
  
  
  
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#1a1a2e] p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#9c7bea] to-[#6b57b0]"></div>
      <div className="absolute w-full h-full bg-opacity-30 backdrop-blur-lg"></div>

      {/* Floating Effects */}
      <div className="absolute w-60 h-60 bg-purple-500 opacity-30 blur-3xl rounded-full -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-40 h-40 bg-purple-500 opacity-30 blur-3xl rounded-full top-20 right-20 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-purple-500 bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col border border-white border-opacity-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-white text-center"
        >
          Admin Login
        </motion.h2>

        <div className="mt-6 space-y-6">
          {/* Email Input with Floating Label */}
          <div className="relative">
            <FaUser className="absolute left-3 top-4 text-white text-opacity-60" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-10 py-3 rounded-md bg-transparent text-white border border-white border-opacity-40 focus:border-opacity-100 outline-none transition ${
                email ? 'pt-6' : ''
              }`}
            />
            <label
              htmlFor="email"
              className={`absolute left-10 top-3 text-white text-opacity-60 transition-all ${
                email ? '-translate-y-4 scale-75 text-purple-700' : ''
              }`}
            >
              Email Address
            </label>
          </div>

          {/* Password Input with Floating Label */}
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-white text-opacity-60" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-10 py-3 rounded-md bg-transparent text-white border border-white border-opacity-40 focus:border-opacity-100 outline-none transition ${
                password ? 'pt-6' : ''
              }`}
            />
            <label
              htmlFor="password"
              className={`absolute left-10 top-3 text-white text-opacity-60 transition-all ${
                password ? '-translate-y-4 scale-75 text-purple-700' : ''
              }`}
            >
              Password
            </label>
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full bg-white text-purple-600 py-3 rounded-md shadow-lg transition text-lg font-semibold"
          onClick={handleLogin}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
