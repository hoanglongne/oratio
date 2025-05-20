import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    console.error('No MONGODB_URI found in environment variables');
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI configured:', uri.substring(0, 20) + '...');

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        console.log('Creating new MongoDB client in development mode');
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect()
            .then(client => {
                console.log('MongoDB connected successfully in development mode');
                return client;
            })
            .catch(error => {
                console.error('MongoDB connection error in development mode:', error);
                throw error;
            });
    } else {
        console.log('Using existing MongoDB client from global variable');
    }
    clientPromise = global._mongoClientPromise!;
} else {
    console.log('Creating new MongoDB client in production mode');
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
        .then(client => {
            console.log('MongoDB connected successfully in production mode');
            return client;
        })
        .catch(error => {
            console.error('MongoDB connection error in production mode:', error);
            throw error;
        });
}

export default clientPromise; 