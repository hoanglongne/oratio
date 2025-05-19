'use client';

import React, { useState } from 'react';
import { FaSearch, FaBookOpen, FaLightbulb, FaRegStar, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

const topicCategories = [
    { id: 'part1', name: 'Part 1: Introduction & Interview' },
    { id: 'part2', name: 'Part 2: Individual Long Turn' },
    { id: 'part3', name: 'Part 3: Two-way Discussion' }
];

const topics = [
    {
        id: 1,
        title: 'Education',
        category: 'part1',
        difficulty: 'Medium',
        popular: true,
        favorite: false,
        description: 'Questions about your educational background, experiences, and preferences.',
        sampleQuestions: [
            'What did you study in school/university?',
            'Do you think education is important? Why?',
            'What subjects were you good at in school?'
        ]
    },
    {
        id: 2,
        title: 'Work',
        category: 'part1',
        difficulty: 'Medium',
        popular: true,
        favorite: true,
        description: 'Questions about your job, career aspirations, and work experiences.',
        sampleQuestions: [
            'What is your job?',
            'Why did you choose that type of work?',
            'What skills do you need for your job?'
        ]
    },
    {
        id: 3,
        title: 'Hobbies',
        category: 'part1',
        difficulty: 'Easy',
        popular: true,
        favorite: false,
        description: 'Questions about activities you enjoy in your free time.',
        sampleQuestions: [
            'What do you enjoy doing in your free time?',
            'How long have you been doing this hobby?',
            'Do you prefer indoor or outdoor activities?'
        ]
    },
    {
        id: 4,
        title: 'Technology',
        category: 'part2',
        difficulty: 'Medium',
        popular: false,
        favorite: false,
        description: 'Describe a piece of technology that has changed your life.',
        sampleQuestions: [
            'Describe a piece of technology that you find useful. You should say: what it is, how often you use it, what you use it for, and explain why you find it so useful.'
        ]
    },
    {
        id: 5,
        title: 'Environment',
        category: 'part2',
        difficulty: 'Hard',
        popular: false,
        favorite: true,
        description: 'Describe an environmental problem that concerns you.',
        sampleQuestions: [
            'Describe an environmental problem that concerns you. You should say: what the problem is, how it affects people, what causes this problem, and explain what you think should be done about it.'
        ]
    },
    {
        id: 6,
        title: 'Urbanization',
        category: 'part3',
        difficulty: 'Hard',
        popular: false,
        favorite: false,
        description: 'Discussion about city development, urban planning, and related issues.',
        sampleQuestions: [
            'Do you think the growth of cities is a positive development?',
            'What challenges do urban areas face compared to rural communities?',
            'How can cities be designed to be more environmentally friendly?'
        ]
    },
    {
        id: 7,
        title: 'Globalization',
        category: 'part3',
        difficulty: 'Hard',
        popular: true,
        favorite: false,
        description: 'Discussion about international connections, cultural exchange, and global issues.',
        sampleQuestions: [
            'How has globalization affected your country?',
            'Do you think cultural identity is lost due to globalization?',
            'What are the benefits and drawbacks of international trade?'
        ]
    },
    {
        id: 8,
        title: 'Culture',
        category: 'part3',
        difficulty: 'Medium',
        popular: false,
        favorite: false,
        description: 'Discussion about traditions, cultural practices, and cultural change.',
        sampleQuestions: [
            'How important are traditional customs in your country?',
            'Do you think younger generations value traditions less than older generations?',
            'How do cultural celebrations bring communities together?'
        ]
    }
];

export default function Topics() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [viewMode, setViewMode] = useState('all'); // all, popular, favorites
    const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

    const toggleFavorite = (topicId: number) => {
        // In a real app, this would update state or make an API call
        console.log(`Toggle favorite for topic ${topicId}`);
    };

    const toggleExpanded = (topicId: number) => {
        if (expandedTopic === topicId) {
            setExpandedTopic(null);
        } else {
            setExpandedTopic(topicId);
        }
    };

    const filteredTopics = topics.filter(topic => {
        // Filter by search query
        if (searchQuery && !topic.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !topic.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filter by category
        if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
            return false;
        }

        // Filter by difficulty
        if (selectedDifficulty !== 'all' && topic.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
            return false;
        }

        // Filter by view mode
        if (viewMode === 'popular' && !topic.popular) {
            return false;
        }

        if (viewMode === 'favorites' && !topic.favorite) {
            return false;
        }

        return true;
    });

    const getDifficultyColor = (difficulty: string) => {
        if (difficulty === 'Easy') return 'text-green-500 bg-green-50 border-green-200';
        if (difficulty === 'Medium') return 'text-amber-500 bg-amber-50 border-amber-200';
        return 'text-red-500 bg-red-50 border-red-200';
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 relative inline-block">
                    <span className="text-primaryHeader">
                        IELTS Speaking Topics
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full z-10"></div>
                </h1>

                <div className="mb-8">
                    <div className="bg-white p-6 rounded-lg border border-neutral-200">
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search topics..."
                                    className="w-full py-3 px-12 border border-neutral-200 rounded-lg text-primary focus:border-accent2 outline-none"
                                />
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-6">
                            <div>
                                <label className="block mb-2 text-sm text-neutral-600 font-medium">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="py-3 px-4 pr-10 border border-neutral-200 rounded-lg bg-white text-primary min-w-[200px] appearance-none font-medium"
                                    >
                                        <option value="all">All Categories</option>
                                        {topicCategories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <FaChevronDown className="text-neutral-400 text-sm" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-neutral-600 font-medium">
                                    Difficulty
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        className="py-3 px-4 pr-10 border border-neutral-200 rounded-lg bg-white text-primary min-w-[200px] appearance-none font-medium"
                                    >
                                        <option value="all">All Difficulties</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <FaChevronDown className="text-neutral-400 text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex border-b border-neutral-200 relative">
                            <button
                                onClick={() => setViewMode('all')}
                                className={`px-5 py-3 font-semibold relative z-10 ${viewMode === 'all' ? 'text-primary' : 'text-neutral-500'}`}
                            >
                                All Topics
                                {viewMode === 'all' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setViewMode('popular')}
                                className={`px-5 py-3 font-semibold relative z-10 ${viewMode === 'popular' ? 'text-primary' : 'text-neutral-500'}`}
                            >
                                Popular
                                {viewMode === 'popular' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setViewMode('favorites')}
                                className={`px-5 py-3 font-semibold relative z-10 ${viewMode === 'favorites' ? 'text-primary' : 'text-neutral-500'}`}
                            >
                                My Favorites
                                {viewMode === 'favorites' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    {filteredTopics.length > 0 ? (
                        <div className="grid gap-5">
                            {filteredTopics.map(topic => (
                                <div
                                    key={topic.id}
                                    className="bg-white rounded-lg overflow-hidden border border-neutral-200"
                                >
                                    <div
                                        className="p-5 cursor-pointer flex justify-between items-center"
                                        onClick={() => toggleExpanded(topic.id)}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-5 border ${topic.category === 'part1' ? 'border-accent2' : topic.category === 'part2' ? 'border-accent' : 'border-primary'}`}>
                                                <FaBookOpen className={topic.category === 'part1' ? 'text-accent2' : topic.category === 'part2' ? 'text-accent' : 'text-primary'} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-primary text-lg">{topic.title}</h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={`text-xs py-1 px-2 rounded-lg border ${topic.category === 'part1' ? 'bg-blue-50 text-accent2 border-blue-200' : topic.category === 'part2' ? 'bg-red-50 text-accent border-red-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
                                                        {topicCategories.find(c => c.id === topic.category)?.name.split(':')[0]}
                                                    </span>
                                                    <span className={`text-xs py-1 px-2 rounded-lg border ${getDifficultyColor(topic.difficulty)}`}>
                                                        {topic.difficulty}
                                                    </span>
                                                    {topic.popular && (
                                                        <span className="text-xs py-1 px-2 rounded-lg bg-neutral-100 text-neutral-600 border border-neutral-200 flex items-center gap-1">
                                                            <FaLightbulb className="text-amber-500" /> Popular
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(topic.id);
                                                }}
                                                className="bg-transparent border-none p-2"
                                            >
                                                {topic.favorite ? (
                                                    <FaStar className="text-amber-500 text-xl" />
                                                ) : (
                                                    <FaRegStar className="text-neutral-400 text-xl" />
                                                )}
                                            </button>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${expandedTopic === topic.id ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'} border border-neutral-200`}>
                                                {expandedTopic === topic.id ? <FaChevronUp /> : <FaChevronDown />}
                                            </div>
                                        </div>
                                    </div>

                                    {expandedTopic === topic.id && (
                                        <div className="p-6 border-t border-neutral-200 bg-neutral-50">
                                            <p className="mb-5 text-neutral-600 leading-relaxed">
                                                {topic.description}
                                            </p>
                                            <div className="bg-white p-5 rounded-lg border border-dashed border-accent2 mb-6">
                                                <h4 className="font-semibold mb-3 text-primary">
                                                    Sample Questions:
                                                </h4>
                                                <ul className="pl-6 text-neutral-600">
                                                    {topic.sampleQuestions.map((question, index) => (
                                                        <li key={index} className="mb-2 leading-relaxed">{question}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="flex justify-end">
                                                <button className="bg-white text-primary py-3 px-5 rounded-lg border border-primary font-semibold">
                                                    Practice This Topic
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-10 rounded-lg text-center border border-neutral-200">
                            <p className="text-neutral-600 text-lg">No topics match your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
} 