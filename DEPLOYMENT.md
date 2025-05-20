# Oratio Deployment Guide

This guide will walk you through deploying the Oratio application with authentication and MongoDB integration.

## Prerequisites

- A MongoDB Atlas account or self-hosted MongoDB instance
- A Vercel account (recommended for deployment)
- OAuth provider accounts (Google, GitHub, etc.)

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oratio?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-at-least-32-chars

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## Install Required Packages

Before deployment, install these packages:

```bash
npm install next-auth @next-auth/mongodb-adapter mongodb
```

## Setting Up MongoDB for NextAuth

1. Create a MongoDB database for your application
2. Set up collections for users, accounts, sessions, and verification tokens
3. Update the MongoDB URI in your environment variables

## Setting Up OAuth Providers

### Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to "APIs & Services" > "Credentials"
4. Create OAuth client ID credentials
5. Add your deployment URL plus `/api/auth/callback/google` as an authorized redirect URI
6. Copy the Client ID and Client Secret to your environment variables

### GitHub OAuth

1. Go to [GitHub Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers)
2. Create a new OAuth application
3. Set the Authorization callback URL to your deployment URL plus `/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your environment variables

## Deployment on Vercel

1. Push your code to a GitHub repository
2. Sign in to [Vercel](https://vercel.com/)
3. Import your GitHub repository
4. Add all environment variables from `.env.local` to the Vercel project settings
5. Deploy

## Setting up NextAuth Secret

Run this command to generate a secure NextAuth secret:

```bash
openssl rand -base64 32
```

Add this as your `NEXTAUTH_SECRET` in your environment variables.

## Verify MongoDB Connection

After deployment, test your MongoDB connection by:

1. Signing in with OAuth
2. Checking that user data is saved to your MongoDB collections
3. Verifying session persistence

## Troubleshooting

Common issues:

1. **OAuth callback errors**: Ensure your callback URLs are correctly set with the proper protocol (http vs https)
2. **MongoDB connection issues**: Verify your MongoDB Atlas IP whitelist includes 0.0.0.0/0 for Vercel
3. **Missing environment variables**: Double-check all variables are set properly in Vercel

## Security Considerations

1. Never commit your `.env.local` file to version control
2. Regularly rotate your OAuth client secrets
3. Consider implementing rate limiting for authentication endpoints
4. Enable MongoDB Atlas network security features

## Additional Configuration

For more advanced setup:
- Add custom email templates for email-based authentication
- Configure session expiration times
- Set up MFA if needed
- Implement custom user profile fields 