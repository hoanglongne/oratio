'use client';

import React, { useState } from 'react';
import { FaCalendarAlt, FaStar, FaArrowUp, FaArrowDown, FaMinus, FaChartBar, FaTrophy } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

const progressData = {
    currentScore: 6.5,
    targetScore: 7.5,
    sessionsCompleted: 12,
    totalPracticeTime: '8.5 hours',
    scoreHistory: [
        { date: 'Jan 5', score: 5.5 },
        { date: 'Jan 12', score: 5.5 },
        { date: 'Jan 19', score: 6.0 },
        { date: 'Jan 26', score: 6.0 },
        { date: 'Feb 2', score: 6.0 },
        { date: 'Feb 9', score: 6.5 },
        { date: 'Feb 16', score: 6.5 },
        { date: 'Feb 23', score: 6.5 },
        { date: 'Mar 2', score: 6.5 },
        { date: 'Mar 9', score: 7.0 },
        { date: 'Mar 16', score: 6.5 },
        { date: 'Mar 23', score: 6.5 }
    ],
    criteriaScores: {
        fluency: 7.0,
        lexical: 6.5,
        grammar: 6.0,
        pronunciation: 6.5
    },
    recentSessions: [
        {
            id: 1,
            date: 'Mar 23, 2023',
            partner: 'Sarah Johnson',
            topics: ['Education', 'Technology'],
            score: 6.5,
            feedback: 'Good vocabulary but needs to work on fluency and grammar.'
        },
        {
            id: 2,
            date: 'Mar 16, 2023',
            partner: 'Alex Chen',
            topics: ['Environment', 'Urbanization'],
            score: 6.5,
            feedback: 'Well-structured answers but could improve pronunciation.'
        },
        {
            id: 3,
            date: 'Mar 9, 2023',
            partner: 'Emma Taylor',
            topics: ['Work', 'Globalization'],
            score: 7.0,
            feedback: 'Excellent fluency and coherence. Good use of advanced vocabulary.'
        },
        {
            id: 4,
            date: 'Mar 2, 2023',
            partner: 'Michael Wong',
            topics: ['Culture', 'Hobbies'],
            score: 6.5,
            feedback: 'Good examples but needs more complex sentence structures.'
        }
    ]
};

export default function Progress() {
    const [activeTab, setActiveTab] = useState('overview');

    const getScoreChange = (current: number, previous: number) => {
        if (current > previous) {
            return { icon: <FaArrowUp className="text-green-500" />, color: 'text-green-500 bg-green-50 border-green-200', text: `+${(current - previous).toFixed(1)}` };
        } else if (current < previous) {
            return { icon: <FaArrowDown className="text-red-500" />, color: 'text-red-500 bg-red-50 border-red-200', text: `-${(previous - current).toFixed(1)}` };
        } else {
            return { icon: <FaMinus className="text-neutral-500" />, color: 'text-neutral-500 bg-neutral-50 border-neutral-200', text: '0.0' };
        }
    };

    const previousScore = progressData.scoreHistory.length >= 2
        ? progressData.scoreHistory[progressData.scoreHistory.length - 2].score
        : progressData.scoreHistory[0].score;

    const scoreChange = getScoreChange(progressData.currentScore, previousScore);

    const maxChartValue = Math.max(...progressData.scoreHistory.map(item => item.score), progressData.targetScore);
    const minChartValue = Math.min(...progressData.scoreHistory.map(item => item.score));
    const chartRange = maxChartValue - minChartValue;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-primary relative inline-block">
                    <span className="text-primaryHeader">
                        My Progress
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent rounded-full z-10"></div>
                </h1>

                <div className="mb-8">
                    <div className="bg-white p-6 rounded-lg border border-neutral-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <h3 className="text-sm text-neutral-600 mb-2">Current Band Score</h3>
                                <div className="flex items-end gap-2 bg-blue-5r-blue-200">
                                    <span className="text-4xl font-bold text-primary leading-none">
                                        {progressData.currentScore.toFixed(1)}
                                    </span>
                                    <div className={`flex items-center mb-1 px-2 py-1 rounded-full ${scoreChange.color}`}>
                                        {scoreChange.icon}
                                        <span className="text-sm ml-1">
                                            {scoreChange.text}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm text-neutral-600 mb-2">Target Band Score</h3>
                                <div className="flex items-center">
                                    <FaTrophy className="text-accent2 mr-2 text-xl" />
                                    <span className="text-4xl font-bold text-accent2 leading-none">
                                        {progressData.targetScore.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm text-neutral-600 mb-2">Sessions Completed</h3>
                                <div className="flex items-center">
                                    <span className="text-4xl font-bold text-primary leading-none">
                                        {progressData.sessionsCompleted}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm text-neutral-600 mb-2">Total Practice Time</h3>
                                <div className="flex items-center">
                                    <span className="text-4xl font-bold text-primary leading-none">
                                        {progressData.totalPracticeTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex border-b border-neutral-200 mb-6 relative">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-5 py-3 font-semibold flex items-center gap-2 relative z-10 ${activeTab === 'overview' ? 'text-primaryHeader' : 'text-neutral-500'}`}
                    >
                        <FaChartBar /> Overview
                        {activeTab === 'overview' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-5 py-3 font-semibold flex items-center gap-2 relative z-10 ${activeTab === 'history' ? 'text-primaryHeader' : 'text-neutral-500'}`}
                    >
                        <FaCalendarAlt /> Session History
                        {activeTab === 'history' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>
                        )}
                    </button>
                </div>

                {activeTab === 'overview' && (
                    <>
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                <div className="w-1 h-6 bg-accent2 rounded-full"></div>
                                <span className="text-primaryHeader">
                                    Score Progress
                                </span>
                            </h2>
                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <div className="h-[200px] relative mb-4">
                                    {/* Chart grid lines */}
                                    {[0, 1, 2, 3, 4].map((line) => (
                                        <div
                                            key={line}
                                            className="absolute left-0 right-0 border-t border-dashed border-neutral-200"
                                            style={{ bottom: `${line * 25}%` }}
                                        />
                                    ))}

                                    {/* Target score line */}
                                    <div
                                        className="absolute left-0 right-0 border-t-2 border-dashed border-accent2"
                                        style={{ bottom: `${((progressData.targetScore - minChartValue) / chartRange) * 100}%` }}
                                    />

                                    {/* Chart bars */}
                                    <div className="flex items-end justify-between h-full relative z-10">
                                        {progressData.scoreHistory.map((item, index) => (
                                            <div key={index} className="flex-1 flex flex-col items-center group">
                                                <div
                                                    className={`w-3/5 rounded-t-lg ${index === progressData.scoreHistory.length - 1 ? 'bg-accent border-accent' : 'bg-accent2 border-accent2'} border transition-transform hover:-translate-y-1 relative`}
                                                    style={{
                                                        height: `${((item.score - minChartValue) / chartRange) * 100}%`,
                                                        borderBottomWidth: 0
                                                    }}
                                                >
                                                    <div className={`absolute -top-6 left-1/2 -translate-x-1/2 ${index === progressData.scoreHistory.length - 1 ? 'bg-accent' : 'bg-accent2'} text-white py-0.5 px-1.5 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                                                        {item.score.toFixed(1)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Chart labels */}
                                <div className="flex justify-between text-xs text-neutral-500">
                                    {progressData.scoreHistory.map((item, index) => (
                                        <div key={index} className="flex-1 text-center">
                                            {item.date}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                                <div className="w-1 h-6 bg-accent rounded-full"></div>
                                <span className="text-primaryHeader">
                                    Criteria Breakdown
                                </span>
                            </h2>
                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <div className="grid gap-5">
                                    {Object.entries(progressData.criteriaScores).map(([key, score]) => (
                                        <div key={key} className="flex flex-col">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold text-primary capitalize">
                                                    {key === 'fluency' ? 'Fluency & Coherence' :
                                                        key === 'lexical' ? 'Lexical Resource' :
                                                            key === 'grammar' ? 'Grammatical Range & Accuracy' : 'Pronunciation'}
                                                </span>
                                                <div className="flex items-center">
                                                    <FaStar className={
                                                        key === 'fluency' ? 'text-green-500' :
                                                            key === 'lexical' ? 'text-accent2' :
                                                                key === 'grammar' ? 'text-accent' : 'text-orange-500'
                                                    } />
                                                    <span className="font-bold text-primary ml-1">{score.toFixed(1)}</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${key === 'fluency' ? 'bg-green-500' :
                                                        key === 'lexical' ? 'bg-accent2' :
                                                            key === 'grammar' ? 'bg-accent' : 'bg-orange-500'
                                                        }`}
                                                    style={{ width: `${(score / 9) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                            <div className="w-1 h-6 bg-accent2 rounded-full"></div>
                            <span className="text-primaryHeader">
                                Recent Practice Sessions
                            </span>
                        </h2>
                        <div className="bg-white rounded-lg overflow-hidden border border-neutral-200">
                            {progressData.recentSessions.map((session, index) => (
                                <div
                                    key={session.id}
                                    className={`p-5 hover:bg-blue-50 transition-colors ${index < progressData.recentSessions.length - 1 ? 'border-b border-neutral-200' : ''}`}
                                >
                                    <div className="flex justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-primary mb-1">
                                                Session with {session.partner}
                                            </h3>
                                            <div className="flex items-center text-sm text-neutral-600">
                                                <FaCalendarAlt className="mr-1" />
                                                {session.date}
                                            </div>
                                        </div>
                                        <div className="flex items-center bg-white py-1 px-3 rounded-lg border border-neutral-200">
                                            <FaStar className="text-accent mr-1" />
                                            <span className="font-bold text-primary">{session.score.toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex flex-wrap gap-2">
                                            {session.topics.map(topic => (
                                                <span
                                                    key={topic}
                                                    className="bg-blue-50 text-accent2 py-1 px-2 rounded-lg text-xs font-medium border border-blue-200"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-dashed border-neutral-200">
                                        <strong>Feedback:</strong> {session.feedback}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
} 