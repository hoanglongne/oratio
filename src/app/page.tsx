'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaVideo, FaPlus, FaChartBar, FaStar, FaGraduationCap, FaFire, FaArrowRight } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

export default function Home(): React.ReactElement {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 relative inline-block text-accent">
          Welcome to IELTS Oratio
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full z-10"></div>
        </h1>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                <FaVideo className="text-white text-base" />
              </div>
              <h2 className="text-xl font-semibold text-primary">Start IELTS Practice</h2>
            </div>
            <p className="mb-4 text-primary">
              Get matched with another student to practice IELTS speaking tasks.
            </p>
            <Link
              href="/practice/new"
              className="inline-flex items-center bg-primary text-white py-3 px-5 rounded-lg no-underline font-semibold"
            >
              <FaPlus className="mr-2" /> New Practice Session
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3">
                <FaGraduationCap className="text-white text-base" />
              </div>
              <h2 className="text-xl font-semibold text-primary">Find Practice Partners</h2>
            </div>
            <p className="mb-4 text-primary">
              Enter your IELTS band score target and preferred topics.
            </p>
            <div className="flex items-center mb-3 relative">
              <select className="w-full py-3 px-4 border-none bg-neutral-100 rounded-lg outline-none appearance-none font-bold text-primary">
                <option value="">Target Band Score</option>
                <option value="5.5">5.5</option>
                <option value="6">6.0</option>
                <option value="6.5">6.5</option>
                <option value="7">7.0</option>
                <option value="7.5">7.5</option>
                <option value="8">8.0+</option>
              </select>
              <div className="absolute right-4 pointer-events-none">
                <FaArrowRight className="text-accent2" />
              </div>
            </div>
            <button className="w-full bg-accent text-white py-3 px-4 rounded-lg border-none cursor-pointer font-semibold">
              Search Partners
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
            <div className="w-1 h-6 bg-accent rounded-full"></div>
            Recent Practice Sessions
          </h2>
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="p-5 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1 text-primary">Practice with Sarah</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Education', 'Environment'].map(topic => (
                      <span
                        key={topic}
                        className="text-accent2 py-1 px-2 rounded-lg text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center py-1.5 px-3">
                  <FaStar className="text-accent mr-1.5" />
                  <span className="font-bold text-primary">6.5</span>
                </div>
              </div>
            </div>
            <div className="p-5 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1 text-primary">Practice with Michael</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Work'].map(topic => (
                      <span
                        key={topic}
                        className="text-accent2 py-1 px-2 rounded-lg text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center py-1.5 px-3">
                  <FaStar className="text-accent mr-1.5" />
                  <span className="font-bold text-primary">7.0</span>
                </div>
              </div>
            </div>
            <div className="p-5 text-center">
              <Link href="/practice/history" className="text-accent2 no-underline font-semibold flex items-center justify-center gap-2">
                View All History <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
            <div className="w-1 h-6 bg-accent rounded-full"></div>
            Your Progress
          </h2>
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <div className={`flex ${isMobile ? 'flex-col items-start gap-5' : 'items-center justify-between'}`}>
              <div>
                <h3 className="text-sm font-medium text-primary">Current Band Score</h3>
                <div className="flex items-center mt-1.5 py-2 px-3">
                  <FaStar className="text-accent mr-2 text-xl" />
                  <span className="text-2xl font-bold text-primary">6.5</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary">Available Credits</h3>
                <div className="mt-1.5 py-2 px-3">
                  <span className="text-2xl font-bold text-primary">15</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary">Sessions Completed</h3>
                <div className="flex items-center gap-2 mt-1.5 py-2 px-3">
                  <span className="text-2xl font-bold text-primary">7</span>
                  <span className="text-sm text-accent py-1 px-2 rounded-full flex items-center gap-1">
                    <FaFire className="text-accent" /> Streak: 3 days
                  </span>
                </div>
              </div>
            </div>
            <div className="h-px bg-neutral-200 my-4"></div>
            <Link
              href="/progress"
              className="text-accent2 no-underline flex items-center font-semibold gap-2"
            >
              <FaChartBar className="mr-1" /> View Detailed Progress <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
