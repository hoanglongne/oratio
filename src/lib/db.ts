import clientPromise from './mongodb';
import { Db, Collection, Document } from 'mongodb';
import { IUser } from '@/models/User';
import { IPracticeSession } from '@/models/PracticeSession';

// Cache the DB instance
let db: Db | null = null;

export async function getDb(): Promise<Db> {
    if (db) return db;

    const client = await clientPromise;
    db = client.db();
    return db;
}

// Collection access functions
export async function getCollection<T extends Document>(name: string): Promise<Collection<T>> {
    const dbInstance = await getDb();
    return dbInstance.collection<T>(name);
}

export async function getUsersCollection(): Promise<Collection<IUser & Document>> {
    return getCollection<IUser & Document>('users');
}

export async function getSessionsCollection(): Promise<Collection<IPracticeSession & Document>> {
    return getCollection<IPracticeSession & Document>('practiceSessions');
}

// Transaction helper (for operations that need to be atomic)
export async function withTransaction<T>(callback: (db: Db) => Promise<T>): Promise<T> {
    const client = await clientPromise;
    const session = client.startSession();

    try {
        let result: T;
        await session.withTransaction(async () => {
            result = await callback(client.db());
        });
        return result!;
    } finally {
        await session.endSession();
    }
} 