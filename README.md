# Full-Stack Product Catalog (Modular Architecture)

A premium full-stack application built with Next.js 14 (App Router) and a standalone Express.js backend.

## JWT Flow Explanation

This application uses a hybrid authentication model to bridge NextAuth.js (frontend) and Express.js (backend) using JSON Web Tokens (JWT).

### 1. Authentication Flow
- **Manual Credentials**: 
    - The user enters email and password on the frontend.
    - NextAuth `CredentialsProvider` calls the backend `POST /auth/login`.
    - Express validates the user via MongoDB and returns a signed JWT.
    - NextAuth stores this token in the encrypted session cookie.
- **Google Sign-In**:
    - NextAuth handles the Google OAuth flow.
    - Upon success, the `jwt` callback on the frontend generates/syncs a backend-compatible JWT using a shared `JWT_SECRET`.
    - *(In a production environment, the frontend would exchange the Google token for a backend-specific token via a dedicated endpoint).*

### 2. Authorization Flow
- When the frontend fetches data from protected routes (e.g., `GET /api/products`):
    - It extracts the `accessToken` from the NextAuth session.
    - It attaches this token to the `Authorization: Bearer <token>` header.
- The backend uses a custom `authMiddleware`:
    - It extracts the token from the header.
    - It verifies the signature using the shared `JWT_SECRET`.
    - If valid, the request proceeds and can access `req.user`.

## Tech Stack
- **Frontend**: Next.js 14, NextAuth.js, Tailwind CSS, Axios.
- **Backend**: Express.js, Mongoose, JWT, Bcrypt.
- **Database**: MongoDB.

## Getting Started

### 1. Environment Configuration
Create a `.env` file in the root with the following variables:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/product-catalog
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
BACKEND_URL=http://localhost:5001
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001

> [!NOTE]
> We use port 5001 because port 5000 is often occupied by "AirPlay Receiver" (Control Center) on modern macOS versions.
```

### 2. Installation
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 3. Database Seeding
```bash
cd backend
node seed.js
```

### 4. Running the Application
```bash
# Start backend (from /backend)
npm start

# Start frontend (from /frontend)
npm run dev
```

Visit `http://localhost:3000` to view the application.
