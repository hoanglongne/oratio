'use client';

import React, { useState, useEffect } from 'react';
import { FaVideo, FaMicrophone, FaVideoSlash, FaMicrophoneSlash, FaThumbsUp, FaThumbsDown, FaTimes, FaCheck, FaFire } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';

const questionCards = [
    {
        id: 1,
        topic: 'Education',
        question: 'Describe your educational background. What subjects did you enjoy the most and why?',
        part: 'Part 1',
        tips: 'Speak about your school/university experience, favorite subjects, and reasons for your preferences.'
    },
    {
        id: 2,
        topic: 'Technology',
        question: 'Describe a piece of technology that you find useful in your daily life. You should say: what it is, how often you use it, what you use it for, and explain why you find it so useful.',
        part: 'Part 2',
        tips: 'Structure your answer with an introduction, main points about the technology, and a conclusion.'
    },
    {
        id: 3,
        topic: 'Urbanization',
        question: 'Do you think the growth of cities is a positive development? What challenges do urban areas face compared to rural communities?',
        part: 'Part 3',
        tips: 'Consider both sides of the argument and use specific examples to support your points.'
    }
];

const evaluationCriteria = [
    { id: 'fluency', name: 'Fluency & Coherence' },
    { id: 'lexical', name: 'Lexical Resource' },
    { id: 'grammar', name: 'Grammatical Range & Accuracy' },
    { id: 'pronunciation', name: 'Pronunciation' }
];

export default function PracticeSession() {
    const [isMobile, setIsMobile] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isMyTurn, setIsMyTurn] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(120);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [showEvaluation, setShowEvaluation] = useState(false);
    const [evaluation, setEvaluation] = useState({
        fluency: 0,
        lexical: 0,
        grammar: 0,
        pronunciation: 0
    });

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

    useEffect(() => {
        if (timeRemaining > 0 && isMyTurn) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeRemaining === 0) {
            nextTurn();
        }
    }, [timeRemaining, isMyTurn]);

    const nextTurn = () => {
        if (currentCardIndex < questionCards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            setShowEvaluation(true);
        }
        setIsMyTurn(!isMyTurn);
        setTimeRemaining(120);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleEvaluationChange = (criterion: string, score: number) => {
        setEvaluation({
            ...evaluation,
            [criterion]: score
        });
    };

    const calculateOverallBand = () => {
        const sum = Object.values(evaluation).reduce((acc: number, val: number) => acc + val, 0);
        return (sum / Object.keys(evaluation).length).toFixed(1);
    };

    // Get classes for part badges
    const getPartClasses = (part: string) => {
        if (part === 'Part 1') return 'bg-accent2 text-white';
        if (part === 'Part 2') return 'bg-accent text-white';
        return 'bg-primary text-white';
    };

    // Get classes for criteria colors
    const getCriterionClasses = (criterion: string, isSelected: boolean) => {
        if (!isSelected) return 'bg-white text-primary border border-neutral-200';

        if (criterion === 'fluency') return 'bg-accent2 text-white';
        if (criterion === 'lexical') return 'bg-green-500 text-white';
        if (criterion === 'grammar') return 'bg-accent text-white';
        return 'bg-orange-500 text-white';
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                {!showEvaluation ? (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-bold text-primary flex items-center">
                                Practice with Sarah
                                <span className="text-sm bg-blue-50 text-accent2 py-1 px-2 rounded-full ml-3 font-normal flex items-center gap-1 border border-blue-200">
                                    <FaFire className="text-accent" /> Streak: 3 days
                                </span>
                            </h1>
                            <div className={`${isMyTurn ? 'bg-accent' : 'bg-accent2'} text-white py-1 px-3 rounded-full text-sm font-semibold flex items-center gap-1`}>
                                {isMyTurn ? <FaMicrophone /> : <FaCheck />}
                                {isMyTurn ? 'Your Turn' : 'Partner\'s Turn'}
                            </div>
                        </div>

                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
                            <div className="col-span-2">
                                <div className="bg-primary rounded-lg overflow-hidden aspect-video relative border border-white">
                                    {/* Main video area */}
                                    <div className="absolute top-4 right-4 bg-black/50 text-white py-1 px-3 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <span className={`inline-block w-2 h-2 rounded-full ${timeRemaining < 30 ? 'bg-accent animate-pulse' : 'bg-green-500'}`}></span>
                                        {formatTime(timeRemaining)}
                                    </div>

                                    {/* Self view */}
                                    <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-accent2 rounded-lg border border-white overflow-hidden"></div>
                                </div>

                                <div className="flex justify-center gap-4 mt-5">
                                    <button
                                        onClick={() => setVideoEnabled(!videoEnabled)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border border-neutral-200 ${videoEnabled ? 'bg-white text-primary' : 'bg-neutral-100 text-accent'}`}
                                    >
                                        {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
                                    </button>
                                    <button
                                        onClick={() => setAudioEnabled(!audioEnabled)}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border border-neutral-200 ${audioEnabled ? 'bg-white text-primary' : 'bg-neutral-100 text-accent'}`}
                                    >
                                        {audioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                    </button>
                                    <button
                                        className="w-12 h-12 rounded-full flex items-center justify-center bg-accent text-white"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className={`bg-white p-6 rounded-lg border border-neutral-200 mb-5 ${isMyTurn ? 'transform rotate-1' : ''}`}>
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getPartClasses(questionCards[currentCardIndex].part)}`}>
                                        {questionCards[currentCardIndex].part} - {questionCards[currentCardIndex].topic}
                                    </div>
                                    <h2 className="text-lg font-semibold mb-5 text-primary leading-relaxed">
                                        {questionCards[currentCardIndex].question}
                                    </h2>
                                    <div className="bg-gradient-to-r from-neutral-50 to-blue-50 p-3 rounded-lg text-sm text-neutral-600 border border-dashed border-accent2 relative">
                                        <div className="absolute -top-3 left-4 bg-white text-accent2 px-2 py-0.5 rounded text-xs font-semibold border border-accent2">
                                            Pro Tip
                                        </div>
                                        {questionCards[currentCardIndex].tips}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                    <h3 className="text-lg font-semibold mb-5 text-primary flex items-center gap-2">
                                        <div className="w-1 h-6 bg-accent2 rounded-full"></div>
                                        Session Progress
                                    </h3>
                                    <div className="mb-5">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-neutral-600">Question</span>
                                            <span className="text-sm font-semibold text-primary bg-blue-50 py-0.5 px-2 rounded">
                                                {currentCardIndex + 1} of {questionCards.length}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-accent2 rounded-full"
                                                style={{ width: `${((currentCardIndex + 1) / questionCards.length) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {isMyTurn && (
                                        <button
                                            onClick={nextTurn}
                                            className="w-full bg-primary text-white py-3 px-4 rounded-lg border-none font-semibold flex items-center justify-center gap-2"
                                        >
                                            I'm Finished <FaCheck />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-8 rounded-lg border border-neutral-200 bg-gradient-to-br from-white to-blue-50">
                        <h1 className="text-2xl font-bold mb-7 text-primary text-center relative inline-block left-1/2 -translate-x-1/2">
                            <span className="relative z-10">Rate Your Partner</span>
                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-accent opacity-20 rounded-full"></div>
                        </h1>

                        <div className="mb-10">
                            {evaluationCriteria.map(criterion => (
                                <div key={criterion.id} className="mb-7">
                                    <label className="block mb-3 font-semibold text-primary">
                                        {criterion.name}
                                    </label>
                                    <div className="flex gap-1 flex-wrap">
                                        {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(score => (
                                            <button
                                                key={score}
                                                onClick={() => handleEvaluationChange(criterion.id, score)}
                                                className={`py-2 px-3 min-w-11 rounded-lg font-semibold ${getCriterionClasses(criterion.id, evaluation[criterion.id as keyof typeof evaluation] === score)}`}
                                            >
                                                {score}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-primary p-5 rounded-lg mb-7">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">Overall Band Score</span>
                                <span className="text-4xl font-bold text-white">
                                    {calculateOverallBand()}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-white text-primary py-3 px-4 rounded-lg border border-neutral-200 font-semibold">
                                Skip Evaluation
                            </button>
                            <button className="flex-1 bg-accent2 text-white py-3 px-4 rounded-lg border-none font-semibold flex items-center justify-center gap-2">
                                Submit Evaluation <FaCheck />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }
            `}</style>
        </Layout>
    );
} 