"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; // adjust to your actual toast library
import { authClient } from '@/lib/auth-client';

const SignupPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        setIsSubmitting(true);

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        setIsSubmitting(false);

        if (error) {
            toast.error(error.message);
            return;
        }

        if (data) {
            router.push("/");
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-[#FAF8F5]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 my-8"
            >
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tight">Create Account</h1>
                        <p className="text-[#475569]">Join us to get started with our services</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-[#0F172A] mb-1.5 ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#475569]">
                                    <FiUser className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-[#FAF8F5] text-[#0F172A] focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all outline-none"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

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
                                    name="email"
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-[#FAF8F5] text-[#0F172A] focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all outline-none"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0F172A] mb-1.5 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#475569]">
                                    <FiLock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-2xl bg-[#FAF8F5] text-[#0F172A] focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
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

                        <div>
                            <label className="block text-sm font-medium text-[#0F172A] mb-1.5 ml-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#475569]">
                                    <FiLock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-2xl bg-[#FAF8F5] text-[#0F172A] focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#475569] hover:text-[#0F172A] transition-colors"
                                >
                                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-3.5 px-4 rounded-2xl shadow-sm text-sm font-semibold text-white bg-[#B45309] hover:bg-[#92400E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B45309] transition-all active:scale-[0.98] mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
                            <button
                                type="button"
                                className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-2xl shadow-sm bg-white text-sm font-medium text-[#0F172A] hover:bg-[#FAF8F5] transition-colors active:scale-[0.98]"
                            >
                                <FcGoogle className="h-5 w-5 mr-2.5" />
                                Google
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-[#475569]">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-[#B45309] hover:text-[#92400E] transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;