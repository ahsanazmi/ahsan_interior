# Dream Home Design

Dream Home Design is a modern interior-design frontend built with React, TanStack Router, Vite, Tailwind CSS, and TypeScript. It connects to a FastAPI backend for city data, leads, appointments, quotes, auth, and admin settings.

## Features

- Premium landing page and marketing routes for interior services
- City-specific experience pages and lead capture flows
- Appointment booking with backend integration
- Price calculator and quote submission
- Login, registration, and admin screens
- Responsive UI with reusable component primitives

## Tech Stack

- React 19
- TanStack Router
- TanStack Query
- Vite
- Tailwind CSS 4
- Radix UI
- FastAPI backend integration

## Prerequisites

- Node.js 20 or newer
- Bun or npm
- A running FastAPI backend on port 8000, or another API base URL

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file if needed:

```bash
cp .env.example .env
```

3. Set the API base URL for the backend:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

4. Start the frontend:

```bash
npm run dev
```

## Backend

The frontend expects the FastAPI backend to be available at the API base URL above. The backend lives in the sibling `backend` folder and exposes endpoints for health checks, cities, appointments, leads, quotes, calculator settings, and auth flows.

If you want the full stack running locally, start the backend first and then the frontend.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run build:dev` - build in development mode
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint across the project
- `npm run format` - format the codebase with Prettier

## Project Structure

- `src/routes` - TanStack Router pages and route groups
- `src/components` - shared UI and site components
- `src/lib/api.ts` - backend API client and typed payloads
- `src/assets` - static images and media

## Environment Variables

- `VITE_API_BASE_URL` - backend API base URL, defaults to `/api` in the client

## Deployment

The app is ready to build as a static frontend. Run `npm run build` before deploying and make sure the production environment points `VITE_API_BASE_URL` at the deployed FastAPI API.