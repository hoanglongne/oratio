'use client';

import React, { useState } from 'react';
import { FaPlay, FaComment, FaStar, FaThumbsUp, FaFilter, FaSearch, FaUpload } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

const feedItems = [
    {
        id: 1,
        user: 'Alex Chen',
        topic: 'Technology',
        title: 'Impact of AI on Daily Life',
        duration: '2:45',
        rating: 7.0,
        likes: 24,
        comments: 8,
        timestamp: '2 hours ago',
        thumbnail: '#217592'
    },
    {
        id: 2,
        user: 'Sarah Johnson',
        topic: 'Environment',
        title: 'Climate Change Solutions',
        duration: '3:12',
        rating: 7.5,
        likes: 32,
        comments: 12,
        timestamp: '5 hours ago',
        thumbnail: '#1e2d3c'
    },
    {
        id: 3,
        user: 'Michael Wong',
        topic: 'Education',
        title: 'Online Learning Benefits',
        duration: '2:30',
        rating: 6.5,
        likes: 18,
        comments: 5,
        timestamp: '1 day ago',
        thumbnail: '#da2761'
    },
    {
        id: 4,
        user: 'Emma Taylor',
        topic: 'Urbanization',
        title: 'City Planning Challenges',
        duration: '3:45',
        rating: 8.0,
        likes: 41,
        comments: 15,
        timestamp: '2 days ago',
        thumbnail: '#217592'
    }
];

export default function CommunityFeed() {
    const [filter, setFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFeed = feedItems.filter(item => {
        if (filter !== 'all' && item.topic.toLowerCase() !== filter) {
            return false;
        }
        if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !item.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !item.topic.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primaryHeader relative inline-block">
                        Community Feed
                        <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full z-10"></div>
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
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-primary">
                                Search
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by topic, title, or user"
                                    className="w-full py-3 px-12 border border-neutral-200 rounded-lg text-primary focus:border-accent2 outline-none"
                                />
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-primary">
                                Filter by Topic
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {['all', 'technology', 'environment', 'education', 'urbanization', 'culture'].map(topic => (
                                    <button
                                        key={topic}
                                        onClick={() => setFilter(topic)}
                                        className={`py-3 px-5 rounded-lg font-semibold capitalize ${filter === topic
                                            ? 'bg-accent2 text-white border border-accent2'
                                            : 'bg-white text-primary border border-neutral-200'
                                            }`}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-8">
                    <div className="bg-white p-7 rounded-lg border border-primary text-primary text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent2 to-accent"></div>
                        <h2 className="text-2xl font-bold mb-4 relative inline-block text-primary">
                            Share Your Practice Sessions
                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent opacity-20 rounded-full"></div>
                        </h2>
                        <p className="mb-7 max-w-2xl mx-auto">
                            Upload your best practice sessions to get feedback from the community and earn credits.
                        </p>
                        <button className="bg-white text-primary py-3 px-7 rounded-lg border border-primary font-bold flex items-center gap-3 mx-auto">
                            <FaUpload />
                            Upload Session
                        </button>
                    </div>
                </div>

                <div>
                    {filteredFeed.length > 0 ? (
                        <div className="grid gap-6">
                            {filteredFeed.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg overflow-hidden border border-neutral-200"
                                >
                                    <div className="flex flex-col h-full">
                                        <div
                                            className="relative flex items-center justify-center aspect-video"
                                            style={{ backgroundColor: item.thumbnail }}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-white bg-opacity-25 flex items-center justify-center cursor-pointer border border-white border-opacity-50">
                                                <FaPlay className="text-white text-xl" />
                                            </div>
                                            <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white py-1 px-3 rounded-lg text-xs font-semibold flex items-center gap-1">
                                                <FaPlay className="text-[0.6rem]" /> {item.duration}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-grow">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-bold text-primary text-lg mb-1">{item.title}</h3>
                                                    <p className="text-sm text-neutral-600 font-medium">{item.user}</p>
                                                </div>
                                                <div className="flex items-center py-1 px-3">
                                                    <FaStar className="text-accent mr-1" />
                                                    <span className="font-bold text-primary">{item.rating.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="inline-block text-accent2 text-xs font-medium mb-3">
                                                {item.topic}
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="flex gap-5">
                                                    <div className="flex items-center py-1 px-3">
                                                        <FaThumbsUp className="text-neutral-400 mr-1 text-sm" />
                                                        <span className="text-sm text-neutral-400 font-medium">{item.likes}</span>
                                                    </div>
                                                    <div className="flex items-center py-1 px-3">
                                                        <FaComment className="text-neutral-400 mr-1 text-sm" />
                                                        <span className="text-sm text-neutral-400 font-medium">{item.comments}</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-neutral-400 py-1 px-2 font-medium">{item.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-10 rounded-lg text-center border border-neutral-200">
                            <p className="text-neutral-600 text-lg">No practice sessions match your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
} 