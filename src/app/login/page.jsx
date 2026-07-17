"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiMail, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-[#FAF8F5]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-[#475569]">Sign in to access your account</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-[#0F172A] mb-1.5 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#475569]">
                                    <FiMail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-[#FAF8F5] text-[#0F172A] focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all outline-none"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5 ml-1">
                                <label className="block text-sm font-medium text-[#0F172A]">
                                    Password
                                </label>
                                <Link href="#" className="text-sm font-medium text-[#B45309] hover:text-[#92400E] transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#475569]">
                                    <FiLock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-2xl bg-[#FAF8F5] text-[#0F172A] focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#475569] hover:text-[#0F172A] transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 rounded-2xl shadow-sm text-sm font-semibold text-white bg-[#B45309] hover:bg-[#92400E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B45309] transition-all active:scale-[0.98] mt-2"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-[#475569]">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-2xl shadow-sm bg-white text-sm font-medium text-[#0F172A] hover:bg-[#FAF8F5] transition-colors active:scale-[0.98]">
                                <FcGoogle className="h-5 w-5 mr-2.5" />
                                Google
                            </button>
                        </div>
                    </div>
                    
                    <p className="mt-8 text-center text-sm text-[#475569]">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-semibold text-[#B45309] hover:text-[#92400E] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;