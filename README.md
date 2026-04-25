# The Wild Oasis

Admin dashboard for a hotel and cabin booking business, built with React and Supabase.

`React` `Vite` `Supabase` `React Query` `Styled Components` `Recharts`

This project helps staff manage cabins, bookings, guest activity, hotel settings, and account data from one dashboard. It includes authentication, protected routes, CRUD operations, charts, filtering, sorting, pagination, dark mode, and file uploads.

## Preview

The app includes:

- Dashboard with booking stats, sales chart, stay duration chart, and today's activity
- Cabin management with create, edit, delete, image upload, and validation
- Booking management with filtering, sorting, pagination, details view, check-in, check-out, and delete actions
- Authentication flow with login, signup, logout, password update, and profile/avatar update
- Hotel settings management
- Persistent dark mode
- Reusable UI system built with styled-components

## Tech Stack

- React 18
- Vite
- React Router
- TanStack React Query
- Supabase
- Styled Components
- React Hook Form
- Recharts
- React Hot Toast
- date-fns

## What I Built

This is a full single-page admin application with:

- Protected app routes for authenticated users only
- Server-state management using React Query
- Database and auth integration with Supabase
- Storage integration for cabin images and user avatars
- Reusable tables, forms, modals, filters, menus, and pagination components
- Dashboard analytics with real booking and stay data
- Custom hooks for reusable logic like local storage, click outside, and navigation helpers
- Global theming with dark and light mode support
- Error boundary handling for a better user experience

## What I Learned And Practiced

Through this project, I practiced:

- Building a larger React app with a feature-based folder structure
- Creating protected routes and authentication flows
- Working with Supabase database, auth, and storage
- Handling server state, caching, refetching, and mutations with React Query
- Building forms with validation using React Hook Form
- Managing CRUD operations across multiple resources
- Implementing file uploads for cabins and user avatars
- Creating reusable and composable UI components
- Using styled-components for scalable component styling
- Adding filtering, sorting, and pagination to data tables
- Visualizing data with charts and dashboard widgets
- Writing custom hooks to reuse app behavior cleanly
- Persisting UI preferences with local storage
- Improving UX with loading states, empty states, toasts, and error boundaries

## Main Pages

- `Dashboard`: stats, charts, and today's check-in/check-out activity
- `Bookings`: booking list with filters, sorting, pagination, and details
- `Cabins`: cabin CRUD operations with image upload
- `Users`: create new staff users
- `Settings`: hotel configuration updates
- `Account`: update user profile, avatar, and password
- `Login`: sign in to access the dashboard

## Project Structure

```text
src/
  features/        Feature-based modules like bookings, cabins, dashboard, auth
  pages/           Route-level pages
  services/        Supabase API logic
  ui/              Reusable UI components
  hooks/           Custom React hooks
  context/         Global app context such as dark mode
  styles/          Global styles and theme setup
  data/            Seed data and uploader utility
  utils/           Helper functions and constants
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

## Notes

- The app uses Supabase as the backend service.
- The dashboard is designed for hotel or cabin management workflows.
- Sample uploader utilities are included in `src/data/Uploader.jsx` for seeding demo data.

## Why This Project Matters

This project was a strong practice ground for building a real-world React dashboard from start to finish. It combines frontend architecture, backend integration, reusable UI patterns, data visualization, authentication, and production-style state management in one app.
