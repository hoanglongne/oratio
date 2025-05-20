import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
    console.log("Signup API called");

    try {
        const body = await req.json();
        console.log("Request body received:", { ...body, password: '[REDACTED]' });

        const { name, email, password } = body;

        // Validation
        if (!name || !email || !password) {
            console.log("Validation failed: Missing required fields");
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            console.log("Validation failed: Password too short");
            return NextResponse.json(
                { error: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        // Connect to database
        console.log("Connecting to MongoDB");
        const client = await clientPromise;
        const db = client.db('oratio');
        console.log("MongoDB connected successfully");

        // Check if user already exists
        console.log("Checking for existing user with email:", email);
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            console.log("User already exists with email:", email);
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 409 }
            );
        }

        // Hash password
        console.log("Hashing password");
        const hashedPassword = await hash(password, 10);
        console.log("Password hashed successfully");

        // Create user
        console.log("Creating new user in database");
        const result = await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            credits: 100, // Starting credits for new users
            practiceSessionCount: 0,
            bandScores: {
                fluency: 0,
                lexical: 0,
                grammar: 0,
                pronunciation: 0,
                overall: 0
            },
            streak: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log("User created successfully with ID:", result.insertedId.toString());

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                userId: result.insertedId.toString()
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);

        // More detailed error information
        if (error instanceof Error) {
            console.error("Error name:", error.name);
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
} 