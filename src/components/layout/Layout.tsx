import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { FaHome, FaVideo, FaUsers, FaCog, FaGraduationCap, FaChartBar } from 'react-icons/fa';
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    return (
        <div className={`min-h-screen flex ${inter.className}`}>
            {/* Sidebar */}
            <div className="bg-primary text-white flex flex-col" style={{
                width: isMobile ? '4rem' : '16rem'
            }}>
                <div className="p-4 flex items-center" style={{
                    justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                    {!isMobile && (
                        <h1 className="text-xl font-bold text-white">IELTS Oratio</h1>
                    )}
                </div>
                <nav className="flex-grow mt-6">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center px-4 py-3 rounded-lg"
                                style={{
                                    justifyContent: isMobile ? 'center' : 'flex-start'
                                }}
                            >
                                <FaHome className="text-accent2" style={{ marginRight: isMobile ? 0 : '0.75rem' }} />
                                {!isMobile && <span>Home</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/practice"
                                className="flex items-center px-4 py-3 rounded-lg"
                                style={{
                                    justifyContent: isMobile ? 'center' : 'flex-start'
                                }}
                            >
                                <FaVideo className="text-accent2" style={{ marginRight: isMobile ? 0 : '0.75rem' }} />
                                {!isMobile && <span>Practice Speaking</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/feed"
                                className="flex items-center px-4 py-3 rounded-lg"
                                style={{
                                    justifyContent: isMobile ? 'center' : 'flex-start'
                                }}
                            >
                                <FaUsers className="text-accent2" style={{ marginRight: isMobile ? 0 : '0.75rem' }} />
                                {!isMobile && <span>Community Feed</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/progress"
                                className="flex items-center px-4 py-3 rounded-lg"
                                style={{
                                    justifyContent: isMobile ? 'center' : 'flex-start'
                                }}
                            >
                                <FaChartBar className="text-accent2" style={{ marginRight: isMobile ? 0 : '0.75rem' }} />
                                {!isMobile && <span>My Progress</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/topics"
                                className="flex items-center px-4 py-3 rounded-lg"
                                style={{
                                    justifyContent: isMobile ? 'center' : 'flex-start'
                                }}
                            >
                                <FaGraduationCap className="text-accent2" style={{ marginRight: isMobile ? 0 : '0.75rem' }} />
                                {!isMobile && <span>Topics</span>}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/settings"
                                className="flex items-center px-4 py-3 rounded-lg"
                                style={{
                                    justifyContent: isMobile ? 'center' : 'flex-start'
                                }}
                            >
                                <FaCog className="text-accent2" style={{ marginRight: isMobile ? 0 : '0.75rem' }} />
                                {!isMobile && <span>Settings</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 mt-auto flex flex-col gap-4">
                    <ThemeToggle />
                    {!isMobile && (
                        <div className="bg-primaryLight p-3 rounded-lg">
                            <p className="text-sm text-accent2">Available Credits</p>
                            <p className="text-lg font-bold text-white">15</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main content */}
            <div className="flex-grow bg-background text-foreground">
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout; 