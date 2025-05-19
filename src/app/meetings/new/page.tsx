'use client';

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaCheck } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { initializeWebRTC } from '@/lib/webrtc';
import { initializeSocket, joinRoom } from '@/lib/socket';

export default function NewPracticeSession(): React.ReactElement {
    const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
    const [sessionId, setSessionId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [practiceSettings, setPracticeSettings] = useState({
        questionCount: 3,
        topics: [] as string[],
        targetBand: '6.5',
    });
    const [isMatching, setIsMatching] = useState<boolean>(false);
    const [matchFound, setMatchFound] = useState<boolean>(false);
    const [currentRound, setCurrentRound] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [showEvaluation, setShowEvaluation] = useState<boolean>(false);

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localStreamRef = useRef<MediaStream | null>(null);

    const topicOptions = [
        { id: 'education', label: 'Education' },
        { id: 'environment', label: 'Environment' },
        { id: 'technology', label: 'Technology' },
        { id: 'work', label: 'Work and Career' },
        { id: 'lifestyle', label: 'Lifestyle' },
        { id: 'culture', label: 'Culture and Society' },
    ];

    const questions = [
        "Describe a place you enjoy visiting in your free time. Why do you like it there?",
        "Do you think technology has improved communication between people? Why or why not?",
        "What changes would you like to see in your hometown in the future?",
        "Describe a skill you'd like to learn. Why is this skill important to you?",
        "Do you think international tourism is a positive development? Why or why not?"
    ];

    useEffect(() => {
        // Generate a unique session ID
        setSessionId(uuidv4());

        // Initialize WebRTC
        const setupWebRTC = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const stream = await initializeWebRTC();
                localStreamRef.current = stream;

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                setIsLoading(false);
            } catch (err) {
                setError(`Failed to initialize WebRTC: ${String(err)}`);
                setIsLoading(false);
            }
        };

        void setupWebRTC();

        // Cleanup function
        return () => {
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, []);

    const toggleAudio = (): void => {
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioEnabled(audioTrack.enabled);
            }
        }
    };

    const toggleVideo = (): void => {
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoEnabled(videoTrack.enabled);
            }
        }
    };

    const endCall = (): void => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
        }
        window.location.href = '/';
    };

    const startMatching = (): void => {
        if (practiceSettings.topics.length === 0) {
            setError("Please select at least one topic");
            return;
        }

        setIsMatching(true);
        setError(null);

        // Simulate finding a match after 3 seconds
        setTimeout(() => {
            initializeSocket();
            const userId = uuidv4();
            joinRoom(sessionId, userId);

            setIsMatching(false);
            setMatchFound(true);
            setCurrentRound(1);
            setCurrentQuestion(questions[0]);
        }, 3000);
    };

    const handleTopicChange = (topicId: string): void => {
        setPracticeSettings(prev => {
            const isSelected = prev.topics.includes(topicId);

            if (isSelected) {
                return { ...prev, topics: prev.topics.filter(id => id !== topicId) };
            } else {
                return { ...prev, topics: [...prev.topics, topicId] };
            }
        });
    };

    const nextQuestion = (): void => {
        if (currentRound < practiceSettings.questionCount) {
            setCurrentRound(prev => prev + 1);
            setCurrentQuestion(questions[currentRound % questions.length]);
        } else {
            setShowEvaluation(true);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 relative inline-block text-accent">
                    IELTS Speaking Practice
                </h1>

                {isLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '16rem' }}>
                        <div style={{
                            animation: 'spin 1s linear infinite',
                            height: '3rem',
                            width: '3rem',
                            borderTop: '2px solid #217592',
                            borderBottom: '2px solid #217592',
                            borderRadius: '50%'
                        }}></div>
                    </div>
                )}

                {error && (
                    <div style={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #f87171',
                        color: '#b91c1c',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.375rem',
                        marginBottom: '1rem'
                    }}>
                        {error}
                    </div>
                )}

                {!isLoading && !error && !isMatching && !matchFound && (
                    <div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-accent">
                            Practice Settings
                        </h2>

                        <div className="mb-4">
                            <label className="block mb-2 text-white">
                                Number of Questions
                            </label>
                            <select
                                className="w-full py-2 px-4 border border-neutral-200 rounded-lg text-primary bg-white"
                                value={practiceSettings.questionCount}
                                onChange={(e) => setPracticeSettings(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                            >
                                <option value="3">3 Questions</option>
                                <option value="5">5 Questions</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-white">
                                Target Band Score
                            </label>
                            <select
                                className="w-full py-2 px-4 border border-neutral-200 rounded-lg text-primary bg-white"
                                value={practiceSettings.targetBand}
                                onChange={(e) => setPracticeSettings(prev => ({ ...prev, targetBand: e.target.value }))}
                            >
                                <option value="5.5">5.5</option>
                                <option value="6.0">6.0</option>
                                <option value="6.5">6.5</option>
                                <option value="7.0">7.0</option>
                                <option value="7.5">7.5</option>
                                <option value="8.0">8.0+</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-white">
                                Topics (select at least one)
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {topicOptions.map(topic => (
                                    <div
                                        key={topic.id}
                                        className={`p-3 rounded-lg cursor-pointer border ${practiceSettings.topics.includes(topic.id) ? 'border-accent2 bg-accent2/10' : 'border-neutral-200'} text-white`}
                                        onClick={() => handleTopicChange(topic.id)}
                                    >
                                        {topic.label}
                                        {practiceSettings.topics.includes(topic.id) && (
                                            <FaCheck className="inline-block ml-2 text-accent2" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex">
                            <div className="w-1/2 pr-2">
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-48 bg-primary rounded-lg object-cover"
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <div className="w-full h-48 bg-primary flex items-center justify-center rounded-lg">
                                    <p className="text-white">Waiting for partner...</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                            <div className="flex gap-3">
                                <button
                                    onClick={toggleAudio}
                                    className={`p-3 rounded-full ${isAudioEnabled ? 'bg-neutral-200 text-primary' : 'bg-accent text-white'}`}
                                >
                                    {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                </button>

                                <button
                                    onClick={toggleVideo}
                                    className={`p-3 rounded-full ${isVideoEnabled ? 'bg-neutral-200 text-primary' : 'bg-accent text-white'}`}
                                >
                                    {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                                </button>
                            </div>

                            <button
                                onClick={startMatching}
                                className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-[#2a3b4c]"
                            >
                                Start Matching
                            </button>
                        </div>
                    </div>
                )}

                {isMatching && (
                    <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center">
                        <div className="mx-auto mb-6 h-16 w-16 rounded-full border-t-4 border-b-4 border-accent2 animate-spin"></div>
                        <h2 className="text-xl font-semibold mb-2 text-accent">
                            Finding a Practice Partner
                        </h2>
                        <p className="text-white">Matching with someone of similar level...</p>
                    </div>
                )}

                {matchFound && !showEvaluation && (
                    <>
                        <div className="bg-white p-4 rounded-lg border border-neutral-200 mb-6">
                            <div className="bg-accent2/10 border-l-4 border-accent2 p-4 mb-4">
                                <h3 className="font-semibold text-accent">
                                    Question {currentRound} of {practiceSettings.questionCount}
                                </h3>
                                <p className="text-white">{currentQuestion}</p>
                            </div>

                            <div className="flex">
                                <div className="w-1/2 pr-2">
                                    <p className="text-sm mb-1 text-white">
                                        You (Speaking)
                                    </p>
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-64 bg-primary rounded-lg object-cover"
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <p className="text-sm mb-1 text-white">
                                        Practice Partner
                                    </p>
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-64 bg-primary rounded-lg object-cover"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <div className="flex gap-3">
                                    <button
                                        onClick={toggleAudio}
                                        className={`p-3 rounded-full ${isAudioEnabled ? 'bg-neutral-200 text-primary' : 'bg-accent text-white'}`}
                                    >
                                        {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                    </button>

                                    <button
                                        onClick={toggleVideo}
                                        className={`p-3 rounded-full ${isVideoEnabled ? 'bg-neutral-200 text-primary' : 'bg-accent text-white'}`}
                                    >
                                        {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                                    </button>
                                </div>

                                <button
                                    onClick={currentRound === practiceSettings.questionCount ? () => setShowEvaluation(true) : nextQuestion}
                                    className="py-2 px-6 bg-accent2 text-white rounded-lg hover:bg-[#1a5e77]"
                                >
                                    {currentRound === practiceSettings.questionCount ? 'Complete Practice' : 'Next Question'}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {showEvaluation && (
                    <div className="bg-white p-6 rounded-lg border border-neutral-200 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-accent">
                            Rate Your Practice Partner
                        </h2>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-accent">
                                Fluency & Coherence
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(score => (
                                    <button
                                        key={score}
                                        className="py-3 px-2 min-w-10 rounded-lg border border-neutral-200 text-primary hover:bg-accent2/10 hover:border-accent2"
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-accent">
                                Lexical Resource
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(score => (
                                    <button
                                        key={score}
                                        className="py-3 px-2 min-w-10 rounded-lg border border-neutral-200 text-primary hover:bg-accent2/10 hover:border-accent2"
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-accent">
                                Grammatical Range & Accuracy
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(score => (
                                    <button
                                        key={score}
                                        className="py-3 px-2 min-w-10 rounded-lg border border-neutral-200 text-primary hover:bg-accent2/10 hover:border-accent2"
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-accent">
                                Pronunciation
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(score => (
                                    <button
                                        key={score}
                                        className="py-3 px-2 min-w-10 rounded-lg border border-neutral-200 text-primary hover:bg-accent2/10 hover:border-accent2"
                                    >
                                        {score}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-accent">
                                Comments (Optional)
                            </h3>
                            <textarea
                                className="w-full p-3 border border-neutral-200 rounded-lg text-primary"
                                rows={3}
                                placeholder="Provide feedback on your partner's performance..."
                            ></textarea>
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center text-white">
                                <input type="checkbox" className="mr-2" />
                                Make this practice session public in the community feed
                            </label>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={endCall}
                                className="py-2 px-6 bg-accent text-white rounded-lg border-none cursor-pointer hover:bg-[#dc2626]"
                            >
                                End Practice
                            </button>

                            <button
                                onClick={endCall}
                                className="py-2 px-6 bg-accent2 text-white rounded-lg border-none cursor-pointer hover:bg-[#1a5e77]"
                            >
                                Submit & End
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
} 