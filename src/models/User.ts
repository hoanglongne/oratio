import { ObjectId } from 'mongodb';

// Base User interface for the default NextAuth User
export interface IUser {
    _id: ObjectId;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    // Oratio-specific fields
    credits?: number;
    practiceSessionCount?: number;
    bandScores?: {
        fluency?: number;
        lexical?: number;
        grammar?: number;
        pronunciation?: number;
        overall?: number;
    };
    streak?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Helper functions for user operations
export async function getUserById(db: any, userId: string): Promise<IUser | null> {
    try {
        return await db.collection('users').findOne({ _id: new ObjectId(userId) });
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function updateUserBandScore(db: any, userId: string, scores: any): Promise<boolean> {
    try {
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    'bandScores.fluency': scores.fluency || 0,
                    'bandScores.lexical': scores.lexical || 0,
                    'bandScores.grammar': scores.grammar || 0,
                    'bandScores.pronunciation': scores.pronunciation || 0,
                    'bandScores.overall': scores.overall || 0,
                    updatedAt: new Date()
                },
                $inc: { practiceSessionCount: 1 }
            }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error updating user band score:', error);
        return false;
    }
}

export async function updateUserCredits(db: any, userId: string, credits: number): Promise<boolean> {
    try {
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            {
                $inc: { credits },
                $set: { updatedAt: new Date() }
            }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error updating user credits:', error);
        return false;
    }
}

export async function updateUserStreak(db: any, userId: string): Promise<boolean> {
    try {
        const user = await getUserById(db, userId);
        if (!user) return false;

        const lastUpdated = user.updatedAt || new Date(0);
        const now = new Date();
        const daysSinceLastLogin = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));

        let streakUpdate = {};
        if (daysSinceLastLogin === 1) {
            // Continue streak
            streakUpdate = { $inc: { streak: 1 } };
        } else if (daysSinceLastLogin > 1) {
            // Reset streak
            streakUpdate = { $set: { streak: 1 } };
        } else {
            // Same day, no streak change
            return true;
        }

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(userId) },
            {
                ...streakUpdate,
                $set: { updatedAt: new Date() }
            }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error updating user streak:', error);
        return false;
    }
} 