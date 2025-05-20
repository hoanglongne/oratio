'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaUser, FaCog, FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';
import SignOutButton from './SignOutButton';
import ThemeToggle from '../ThemeToggle';

export default function UserMenu() {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (status === 'loading') {
        return (
            <div className="h-10 w-10 rounded-full bg-neutral-200 animate-pulse"></div>
        );
    }

    if (status === 'unauthenticated' || !session) {
        return null;
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getInitials = () => {
        if (!session.user?.name) return 'U';

        const nameParts = session.user.name.split(' ');
        if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="relative h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                onClick={toggleMenu}
                aria-label="User menu"
            >
                <div className="relative h-8 w-8 rounded-full bg-accent2 flex items-center justify-center text-white text-sm font-medium overflow-hidden">
                    {session.user?.image ? (
                        <Image
                            src={session.user.image}
                            alt={session.user.name || 'User avatar'}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        getInitials()
                    )}
                </div>
            </button>

            {isMenuOpen && (
                <div className="absolute -right-24 top-full mt-1 w-54 bg-white rounded-lg shadow-lg border border-neutral-200 overflow-hidden z-50">
                    <div className="p-3 border-b border-neutral-200">
                        <div className="text-sm font-medium text-primary truncate">{session.user.name}</div>
                        <div className="text-xs text-neutral-500 truncate">{session.user.email}</div>
                    </div>
                    <div className="p-2 flex flex-col">
                        <a
                            href="/profile"
                            className="flex items-center gap-2 text-left p-2 rounded-md hover:bg-neutral-50 text-sm text-neutral-700"
                        >
                            <FaUserCircle className="text-neutral-500" />
                            Profile
                        </a>
                        <a
                            href="/settings"
                            className="flex items-center gap-2 text-left p-2 rounded-md hover:bg-neutral-50 text-sm text-neutral-700"
                        >
                            <FaCog className="text-neutral-500" />
                            Settings
                        </a>
                        <div className="h-px bg-neutral-200 my-1"></div>
                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-50 text-sm text-neutral-700">
                            <span className="flex items-center gap-2">
                                <FaMoon className="text-neutral-500" />
                                Theme
                            </span>
                            <ThemeToggle className="p-0 hover:bg-transparent" />
                        </div>
                        <div className="h-px bg-neutral-200 my-1"></div>
                        <SignOutButton variant="minimal" className="w-full text-left p-2 rounded-md hover:bg-neutral-50" />
                    </div>
                </div>
            )}
        </div>
    );
} 