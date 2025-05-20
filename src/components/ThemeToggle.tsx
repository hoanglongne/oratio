'use client';

import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

interface ThemeToggleProps {
    className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg hover:bg-accent2/10 transition-colors duration-200 ${className}`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <FaMoon className="text-accent2 text-sm" />
            ) : (
                <FaSun className="text-accent2 text-sm" />
            )}
        </button>
    );
} 