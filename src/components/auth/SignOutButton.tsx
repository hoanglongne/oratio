'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

interface SignOutButtonProps {
    className?: string;
    variant?: 'default' | 'minimal';
}

export default function SignOutButton({ className = '', variant = 'default' }: SignOutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            await signOut({ callbackUrl: '/auth/signin' });
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === 'minimal') {
        return (
            <button
                onClick={handleSignOut}
                className={`text-neutral-600 hover:text-accent flex items-center gap-1 ${className}`}
                disabled={isLoading}
            >
                <FaSignOutAlt className="text-sm" />
                <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleSignOut}
            className={`bg-white text-primary border border-neutral-200 py-2 px-4 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 ${className}`}
            disabled={isLoading}
        >
            <FaSignOutAlt />
            <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
        </button>
    );
} 