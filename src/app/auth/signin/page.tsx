'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check if user has just registered
        const registered = searchParams.get('registered');
        if (registered === 'true') {
            setSuccessMessage('Account created successfully! Please sign in with your credentials.');
        }

        // Check for error parameter from NextAuth
        const errorType = searchParams.get('error');
        if (errorType) {
            if (errorType === 'CredentialsSignin') {
                setError('Invalid email or password');
            } else {
                setError('An error occurred during sign in');
            }
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Invalid email or password');
                setIsLoading(false);
                return;
            }

            router.push('/');
        } catch (error) {
            setError('Something went wrong');
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto pt-10">
                <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-primary text-center">Sign in to Oratio</h1>

                    {successMessage && (
                        <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-300 mb-6 text-sm">
                            {successMessage}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-accent p-3 rounded-lg border border-accent mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4 mb-6">
                        <button
                            onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="w-full flex items-center justify-center gap-3 bg-white text-primary border border-neutral-200 py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                            <FaGoogle className="text-red-500" />
                            <span>Continue with Google</span>
                        </button>

                        <button
                            onClick={() => signIn('github', { callbackUrl: '/' })}
                            className="w-full flex items-center justify-center gap-3 bg-white text-primary border border-neutral-200 py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                            <FaGithub className="text-black" />
                            <span>Continue with GitHub</span>
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-neutral-500">Or sign in with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent2 focus:border-accent2 outline-none"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent2 focus:border-accent2 outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-accent2 focus:ring-accent2 border-neutral-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-neutral-700">
                                    Remember me
                                </label>
                            </div>

                            <a href="#" className="text-sm font-medium text-accent2 hover:text-accent">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent2 text-white py-3 px-4 rounded-lg disabled:opacity-70 flex items-center justify-center"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-neutral-600">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="font-medium text-accent2 hover:text-accent">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
} 