import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    console.log("DB test API called");

    try {
        // Test MongoDB connection
        console.log("Connecting to MongoDB...");
        const client = await clientPromise;
        console.log("Getting database...");
        const db = client.db();

        // Create a collection if it doesn't exist
        console.log("Creating test document...");
        const result = await db.collection("test").insertOne({
            message: "Test document",
            createdAt: new Date()
        });

        console.log("Test successful:", result.insertedId.toString());

        return NextResponse.json({
            status: "connected",
            message: "MongoDB connection successful",
            databaseName: db.databaseName,
            insertedId: result.insertedId.toString()
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);

        if (error instanceof Error) {
            console.error("Error details:", {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        }

        return NextResponse.json({
            status: "error",
            message: "Failed to connect to MongoDB",
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
} 