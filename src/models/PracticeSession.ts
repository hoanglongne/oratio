import { ObjectId } from 'mongodb';

export interface IPracticeSession {
    _id?: ObjectId;
    userId: string;
    partnerId?: string;
    startTime: Date;
    endTime?: Date;
    duration?: number; // in seconds
    questions: Array<{
        id: number;
        topic: string;
        question: string;
        part: string;
    }>;
    evaluation?: {
        fromUserId: string;
        toUserId: string;
        fluency: number;
        lexical: number;
        grammar: number;
        pronunciation: number;
        overall: number;
        feedback?: string;
    };
    recording?: {
        url: string;
        duration: number;
    };
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function createPracticeSession(db: any, sessionData: Partial<IPracticeSession>): Promise<string | null> {
    try {
        const newSession = {
            ...sessionData,
            startTime: new Date(),
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('practiceSessions').insertOne(newSession);
        return result.insertedId.toString();
    } catch (error) {
        console.error('Error creating practice session:', error);
        return null;
    }
}

export async function completePracticeSession(db: any, sessionId: string, evaluation: any): Promise<boolean> {
    try {
        const now = new Date();
        const session = await db.collection('practiceSessions').findOne({ _id: new ObjectId(sessionId) });

        if (!session) return false;

        const duration = Math.floor((now.getTime() - session.startTime.getTime()) / 1000);

        const result = await db.collection('practiceSessions').updateOne(
            { _id: new ObjectId(sessionId) },
            {
                $set: {
                    endTime: now,
                    duration,
                    evaluation,
                    isCompleted: true,
                    updatedAt: now
                }
            }
        );

        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error completing practice session:', error);
        return false;
    }
}

export async function getUserPracticeSessions(db: any, userId: string, limit = 10): Promise<IPracticeSession[]> {
    try {
        return await db.collection('practiceSessions')
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .toArray();
    } catch (error) {
        console.error('Error fetching user practice sessions:', error);
        return [];
    }
} 