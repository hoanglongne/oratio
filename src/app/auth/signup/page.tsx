'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function SignUp() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        console.log('Form submitted:', { name, email, password: '********' });

        // Basic validation
        if (!name || !email || !password) {
            setError('All fields are required');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            console.log('Sending request to /api/auth/signup');

            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            console.log('Response status:', response.status);

            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Redirect to sign-in page on success
            router.push('/auth/signin?registered=true');
        } catch (error) {
            console.error('Signup error:', error);
            setError(error instanceof Error ? error.message : 'Failed to register');
            setIsLoading(false);
        } finally {
            // Ensure isLoading is reset even if there's an error in router navigation
            if (isLoading) setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto pt-10">
                <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-primary text-center">Create Your Account</h1>

                    {error && (
                        <div className="bg-red-50 text-accent p-3 rounded-lg border border-accent mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent2 focus:border-accent2 outline-none"
                                placeholder="John Doe"
                                required
                            />
                        </div>

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
                                minLength={6}
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                                Must be at least 6 characters
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-accent2 focus:border-accent2 outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent2 text-white py-3 px-4 mt-6 rounded-lg disabled:opacity-70 flex items-center justify-center"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-neutral-600">
                        Already have an account?{' '}
                        <Link href="/auth/signin" className="font-medium text-accent2 hover:text-accent">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
} 