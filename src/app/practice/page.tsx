'use client';

import React, { useState } from 'react';
import { FaVideo, FaUsers, FaFilter, FaArrowRight } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

const topics = [
    { id: 1, name: 'Education', category: 'Part 1' },
    { id: 2, name: 'Work', category: 'Part 1' },
    { id: 3, name: 'Hobbies', category: 'Part 1' },
    { id: 4, name: 'Technology', category: 'Part 2' },
    { id: 5, name: 'Environment', category: 'Part 2' },
    { id: 6, name: 'Urbanization', category: 'Part 3' },
    { id: 7, name: 'Globalization', category: 'Part 3' },
    { id: 8, name: 'Culture', category: 'Part 3' },
];

export default function Practice() {
    const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
    const [targetBand, setTargetBand] = useState('');
    const [questionCount, setQuestionCount] = useState('3');
    const [showFilters, setShowFilters] = useState(false);

    const handleTopicToggle = (topicId: number) => {
        if (selectedTopics.includes(topicId)) {
            setSelectedTopics(selectedTopics.filter(id => id !== topicId));
        } else {
            setSelectedTopics([...selectedTopics, topicId]);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-boldtext-white relative inline-block">
                        <span className="text-primaryHeader text-2xl">Practice Speaking</span>
                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full"></div>
                    </h1>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-5 py-3 bg-white text-primary border border-neutral-200 rounded-lg font-semibold"
                    >
                        <FaFilter className="mr-2 text-accent2" />
                        Filters {showFilters ? 'Hide' : 'Show'}
                    </button>
                </div>

                {showFilters && (
                    <div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-primary">
                            Practice Settings
                        </h2>

                        <div className="mb-6">
                            <label className="block mb-2 font-medium text-primary">
                                Target Band Score
                            </label>
                            <select
                                value={targetBand}
                                onChange={(e) => setTargetBand(e.target.value)}
                                className="w-full p-2 border border-neutral-200 rounded-lg text-primary"
                            >
                                <option value="">Select target score</option>
                                <option value="5.5">5.5</option>
                                <option value="6.0">6.0</option>
                                <option value="6.5">6.5</option>
                                <option value="7.0">7.0</option>
                                <option value="7.5">7.5</option>
                                <option value="8.0">8.0+</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 font-medium text-primary">
                                Questions per Session
                            </label>
                            <div className="flex gap-2">
                                {['3', '5', '7'].map(count => (
                                    <button
                                        key={count}
                                        onClick={() => setQuestionCount(count)}
                                        className={`px-4 py-2 rounded-lg border border-neutral-200 ${questionCount === count ? 'bg-primary text-white' : 'bg-white text-primary'
                                            }`}
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-primary">
                                Topics (Select up to 3)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {topics.map(topic => (
                                    <div
                                        key={topic.id}
                                        onClick={() => handleTopicToggle(topic.id)}
                                        className={`p-2 rounded-lg border border-neutral-200 cursor-pointer ${selectedTopics.includes(topic.id) ? 'bg-accent2 text-white' : 'bg-white text-primary'
                                            }`}
                                    >
                                        <div className="font-medium">{topic.name}</div>
                                        <div className={`text-xs ${selectedTopics.includes(topic.id) ? 'text-white' : 'text-accent2'}`}>
                                            {topic.category}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-neutral-200">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                                <FaVideo className="text-white text-base" />
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Random Matching</h2>
                        </div>
                        <p className="mb-6 text-primary">
                            Get matched with another student based on your filters and start practicing immediately.
                        </p>
                        <button className="flex items-center justify-center w-full bg-primary text-white py-3 px-4 rounded-lg border-none">
                            Start Random Practice <FaArrowRight className="ml-2" />
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-neutral-200">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3">
                                <FaUsers className="text-white text-base" />
                            </div>
                            <h2 className="text-xl font-semibold text-primary">Create Practice Room</h2>
                        </div>
                        <p className="mb-6 text-primary">
                            Create a room and invite specific practice partners to join your session.
                        </p>
                        <button className="flex items-center justify-center w-full bg-accent text-white py-3 px-4 rounded-lg border-none">
                            Create Room <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                        <div className="w-1 h-6 bg-accent rounded-full"></div>
                        <span className="text-primaryHeader">
                            Recent Practice Partners
                        </span>
                    </h2>
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="p-4 flex items-center justify-between border-b border-neutral-200 last:border-b-0">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-neutral-200 mr-3"></div>
                                    <div>
                                        <h3 className="font-medium text-primary">Partner {i}</h3>
                                        <p className="text-sm text-accent2">Band Score: {6 + i * 0.5}</p>
                                    </div>
                                </div>
                                <button className="text-accent2 font-medium">
                                    Invite Again
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
} 