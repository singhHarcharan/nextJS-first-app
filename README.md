# Next.js Authentication App

This is a modern web application built with Next.js that implements user authentication and responsive UI components. The app features a clean, modern design with a focus on user experience.

## 🚀 Features

- **Authentication Flow**
  - Sign-in page with form validation
  - Protected routes
  - Session management

- **UI Components**
  - Reusable form components
  - Responsive design with Tailwind CSS
  - Custom form inputs with validation
  - Loading states and error handling

- **Modern Development**
  - TypeScript for type safety
  - Next.js App Router
  - Server Components architecture
  - Environment variables configuration

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Form Handling**: React Hook Form
- **State Management**: React Context API
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
