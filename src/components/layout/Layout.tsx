'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { FaCog } from 'react-icons/fa';
import Link from 'next/link';
import UserMenu from '../auth/UserMenu';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { status } = useSession();

    return (
        <div className={`min-h-screen flex flex-col ${inter.className}`}>
            {/* Top Navigation Bar */}
            <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-3xl">
                <div className="bg-nav rounded-2xl border border-accent2/20">
                    <div className="flex items-center justify-between px-6 py-3">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-lg font-bold text-white">IELTS Oratio</h1>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center space-x-6 font-semibold">
                            <Link
                                href="/"
                                className="text-sm text-primaryHeader hover:text-accent2 transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                href="/practice"
                                className="text-sm text-primaryHeader hover:text-accent2 transition-colors duration-200"
                            >
                                Practice
                            </Link>
                            <Link
                                href="/feed"
                                className="text-sm text-primaryHeader hover:text-accent2 transition-colors duration-200"
                            >
                                Community
                            </Link>
                            <Link
                                href="/progress"
                                className="text-sm text-primaryHeader hover:text-accent2 transition-colors duration-200"
                            >
                                Progress
                            </Link>
                            <Link
                                href="/topics"
                                className="text-sm text-primaryHeader hover:text-accent2 transition-colors duration-200"
                            >
                                Topics
                            </Link>
                        </nav>

                        {/* Right Side Controls */}
                        <div className="flex items-center space-x-4">
                            {/* User Menu or Sign In Link */}
                            {status === 'authenticated' ? (
                                <UserMenu />
                            ) : status === 'unauthenticated' ? (
                                <Link
                                    href="/auth/signin"
                                    className="bg-accent2 text-white text-sm py-1.5 px-3 rounded-lg hover:bg-accent2/90 transition-colors"
                                >
                                    Sign In
                                </Link>
                            ) : (
                                <div className="h-8 w-16 bg-accent2/30 animate-pulse rounded-lg"></div>
                            )}

                            {/* Mobile Menu Button */}
                            <button className="md:hidden p-1.5 rounded-lg hover:bg-accent2/10 transition-colors duration-200">
                                <FaCog className="text-accent2 text-sm" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content with increased top padding */}
            <div className="flex-grow bg-background text-foreground pt-28">
                <main className="px-8 py-6 max-w-7xl mx-auto">{children}</main>
            </div>
        </div>
    );
};

export default Layout; 