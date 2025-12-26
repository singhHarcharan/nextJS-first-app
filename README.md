# Next.js 14 Full-Stack Application

A comprehensive full-stack application demonstrating modern web development with Next.js 14, Prisma ORM, and advanced patterns like Server Actions, Singleton Prisma Client, and database management.

## 🏗️ Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom implementation with Server Actions
- **Type Safety**: TypeScript
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Vercel (compatible)

## 🌟 Key Features

### 1. Database Integration with Prisma
- Type-safe database operations
- Database migrations
- Schema management
- Seamless PostgreSQL integration

### 2. Authentication System
- User signup and signin flows
- Secure password handling
- Protected routes
- Session management

### 3. Modern Development Patterns
- Server Components for better performance
- Client Components for interactivity
- Environment-based configuration
- Type-safe API development

### 4. Advanced State Management
- Server-side state with Server Actions
- Client-side state with React hooks
- Optimistic UI updates
- Loading and error states

### 5. Performance Optimizations
- Code splitting
- Lazy loading
- Image optimization
- Route-based chunking

## 🛠️ Core Concepts

### 1. Prisma ORM Setup

#### Database Configuration
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Singleton Prisma Client
```typescript
// db/index.ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
```

### 2. Server Actions

Server Actions are a powerful feature in Next.js 13+ that enable you to write server-side code that can be directly called from your React components. They provide a more intuitive way to handle data mutations and form submissions without creating dedicated API routes.

### 🔍 Purpose of Server Actions

1. **Direct Server-Side Execution**
   - Execute server-side code directly from client components
   - Handle form submissions and data mutations without API endpoints
   - Access server-side resources like databases and APIs securely

2. **Simplified Data Flow**
   - Eliminate the need for manual fetch/Axios calls to API routes
   - Reduce boilerplate code for form handling
   - Maintain type safety between server and client code

3. **Enhanced Developer Experience**
   - Co-locate server logic with related UI components
   - Automatic request/response serialization
   - Built-in error handling and loading states

### 🛠️ Key Benefits

- **Type Safety**: Full TypeScript support with end-to-end type safety
- **Progressive Enhancement**: Works with JavaScript disabled in the browser
- **Optimistic Updates**: Easy to implement optimistic UI updates
- **Revalidation**: Built-in support for revalidating cached data
- **Security**: Runs on the server, keeping sensitive logic and credentials secure

## 🚀 Key Features

### Database Integration
- **Prisma ORM** for type-safe database operations
- **PostgreSQL** database integration
- **Migrations** for database schema management
- **Type-safe database queries** with TypeScript

### Authentication
- User signup and signin functionality
- Secure password handling
- Session management

### Modern Development Patterns
- **Server Components** for efficient server-side rendering
- **Server Actions** for server-side data mutations
- **Singleton Prisma Client** for optimal database connection management
- Environment-based configuration

### UI/UX
- Responsive design with Tailwind CSS
- Reusable form components
- Loading states and error handling

## �️ Technologies Used

- **Frontend Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Form Handling**: Native form actions with Server Actions
- **Deployment**: Vercel (compatible)

## 📚 Learning Resources

This project was built while learning about:
- Next.js Server Components and Server Actions
- Prisma ORM and database management
- Singleton pattern for database connections
- Type-safe API development
- Modern full-stack architecture

## 🔧 Project Structure

```
next-app/
├── app/
│   ├── (auth)/               # Authentication routes
│   │   ├── signin/          # Sign-in page
│   │   └── signup/          # Sign-up page
│   ├── api/                 # API routes
│   └── page.tsx             # Home page
├── components/              # Reusable components
├── db/                      # Database configuration
│   └── index.ts             # Singleton Prisma client
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static files
└── app/serverActions/       # Server Actions
    └── user.ts              # User-related server actions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd next-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/yourdb?schema=public"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🔍 Key Concepts

### Singleton Prisma Client
The application uses a singleton pattern for the Prisma client to prevent multiple database connections in development mode:

```typescript
// db/index.ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => new PrismaClient();

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
```

### Server Actions: Implementation & Examples

#### Basic Server Action

```typescript
// app/serverActions/user.ts
'use server';

import client from "@/db";

// Server Action for user signup
export async function signup(username: string, password: string) {
    try {
        const user = await client.user.create({
            data: { username, password }
        });
        console.log('User created with ID:', user.id);
        return { success: true, userId: user.id };
    } catch (error) {
        console.error('Signup failed:', error);
        return { success: false, error: 'Failed to create user' };
    }
}
```

#### Using Server Actions in Components

```tsx
// components/SignupForm.tsx
'use client';

import { signup } from '@/app/serverActions/user';
import { useState } from 'react';

export function SignupForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    
    try {
      const result = await signup(formData.username, formData.password);
      if (result.success) {
        // Handle successful signup
        window.location.href = '/dashboard';
      } else {
        setStatus({ loading: false, error: result.error || 'Signup failed' });
      }
    } catch (error) {
      setStatus({ loading: false, error: 'An unexpected error occurred' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {status.error && <div className="error">{status.error}</div>}
    </form>
  );
}
```

### Advanced Server Action Patterns

#### 1. Form Validation with Zod

```typescript
'use server';

import { z } from 'zod';
import client from "@/db";

const signupSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8),
});

export async function signup(prevState: any, formData: FormData) {
  const rawFormData = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  // Validate input
  const result = signupSchema.safeParse(rawFormData);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Proceed with signup logic
  // ...
}
```

#### 2. Revalidating Cached Data

```typescript
'use server';

import { revalidatePath } from 'next/cache';

export async function updatePost(id: string, formData: FormData) {
  // Update post in database
  await db.posts.update({ where: { id }, data: { title: formData.get('title') } });
  
  // Revalidate the posts page
  revalidatePath('/posts');
  
  // Revalidate a specific post
  revalidatePath(`/posts/${id}`);
  
  return { success: true };
}
```

### Database Schema
The application uses the following database schema:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int     @id @default(autoincrement())
  username  String  @unique
  password  String
}
```

## 🔄 Understanding the Data Flow

### Traditional API Routes vs Server Actions

#### Traditional Approach (API Routes)
```mermaid
sequenceDiagram
    Client->>API Route: HTTP Request (JSON)
    API Route->>Database: Query
    Database-->>API Route: Data
    API Route-->>Client: JSON Response
    Client->>UI: Update State
```

#### Server Actions Approach
```mermaid
sequenceDiagram
    Client->>Server Action: Function Call
    Server Action->>Database: Direct Query
    Database-->>Server Action: Data
    Server Action-->>Client: JavaScript Object
    Client->>UI: Update State
```

### When to Use Server Actions

1. **Ideal Use Cases**
   - Form submissions
   - Data mutations (create, update, delete)
   - Server-side form validation
   - Database operations
   - Authentication flows

2. **When to Use API Routes Instead**
   - Public APIs that need to be consumed by third parties
   - When you need to support non-JavaScript clients
   - For WebSocket or Server-Sent Events
   - When you need fine-grained control over the HTTP response

## 🔄 Data Flow Architecture

### 1. Traditional API vs Server Actions

#### Traditional API Flow
```mermaid
sequenceDiagram
    Client->>API Route: HTTP Request (JSON)
    API Route->>Database: Query
    Database-->>API Route: Data
    API Route-->>Client: JSON Response
    Client->>UI: Update State
```

#### Server Actions Flow
```mermaid
sequenceDiagram
    Client->>Server Action: Function Call
    Server Action->>Database: Direct Query
    Database-->>Server Action: Data
    Server Action-->>Client: JavaScript Object
    Client->>UI: Update State
```

### 2. Authentication Flow

```mermaid
sequenceDiagram
    User->>Signup Form: Enters Credentials
    Signup Form->>Server Action: Submit
    Server Action->>Database: Create User
    Database-->>Server Action: User Created
    Server Action-->>Client: Success/Error
    Client->>UI: Show Status/Redirect
```

## � Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd next-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/yourdb?schema=public"
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📂 Project Structure

```
next-app/
├── app/
│   ├── (auth)/               # Authentication routes
│   │   ├── signin/          # Sign-in page
│   │   └── signup/          # Sign-up page
│   ├── api/                 # API routes (if needed)
│   ├── dashboard/           # Protected routes
│   └── page.tsx             # Home page
├── components/
│   ├── auth/                # Auth components
│   ├── ui/                  # Reusable UI components
│   └── forms/               # Form components
├── db/
│   └── index.ts             # Prisma client instance
├── lib/
│   └── auth.ts              # Authentication utilities
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static files
└── styles/                  # Global styles
```

## 📝 Best Practices

- The application uses the App Router for routing
- Server Components are used by default for better performance
- Client Components are only used when browser APIs or interactivity is needed
- Environment variables are used for configuration
- TypeScript provides type safety throughout the application

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
- **Routing**: Next.js App Router

## 📚 What We've Learned

1. **Next.js App Router**
   - File-based routing system
   - Nested layouts and route groups
   - Loading and error states

2. **Authentication**
   - Implementing protected routes
   - Form validation
   - Session management

3. **UI/UX**
   - Responsive design with Tailwind CSS
   - Reusable component patterns
   - Loading and error states
   - Form handling and validation

4. **TypeScript**
   - Type definitions for components
   - Interface design
   - Type safety in forms and API calls

5. **Modern React Patterns**
   - Server Components
   - Client Components
   - Component composition

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📂 Project Structure

```
next-app/
├── app/                    # App router
│   ├── (auth)/             # Authentication routes
│   ├── components/         # Reusable components
│   ├── lib/                # Utility functions
│   └── page.tsx            # Home page
├── public/                # Static files
└── styles/                # Global styles
```

## 🛠️ Development

- Run the development server:
  ```bash
  npm run dev
  ```

- Build for production:
  ```bash
  npm run build
  ```

- Start production server:
  ```bash
  npm start
  ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
