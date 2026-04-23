# Productivity Dashboard

A modern full-stack productivity dashboard for managing tasks, tracking goals, and visualizing personal progress.

## Tech stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT + bcrypt
- Charts: Recharts

## Features

- Public landing page plus auth flow and protected dashboard
- JWT authentication with signup, login, logout, and protected routes
- Task management with search, filters, sorting, pagination, and completion toggles
- Goal tracking with deadlines, sorting, pagination, and progress percentage
- Dashboard analytics for weekly productivity, completion rates, and progress summaries
- Responsive UI for desktop and mobile
- Dark mode persisted in local storage
- Reminder and notification center for upcoming deadlines
- Sample seed data for quick local testing

## Project structure

```text
.
|-- client
|   |-- src
|-- server
|   |-- src
|-- package.json
```

## Local setup

### 1. Install dependencies

```bash
npm install
npm run install:all
```

### 2. Configure environment variables

Create the following files:

- `server/.env`
- `client/.env`

Use the included examples below.

#### `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/productivity_dashboard
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

#### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed sample data

```bash
npm run seed
```

Seeded demo credentials:

- Email: `demo@example.com`
- Password: `password123`

### 4. Start the app

```bash
npm run dev
```

Frontend:

- `http://localhost:5173`

Backend:

- `http://localhost:5000`

## Scripts

- `npm run install:all` installs frontend and backend dependencies
- `npm run dev` runs both apps in development mode
- `npm run seed` clears and reseeds the MongoDB database
- `npm run build` builds the frontend for production

## How it works

### Backend

- Express exposes API routes under `/api`
- MongoDB stores users, tasks, and goals
- JWT auth protects dashboard, task, and goal routes
- Controllers keep route handlers focused and organized
- Middleware handles validation, auth, and centralized error responses
- Task and goal list APIs support sorting and pagination

### Frontend

- React Router handles landing, auth, and dashboard navigation
- Context providers manage authentication and theme state
- Axios instance attaches JWT tokens automatically
- Recharts renders task completion and weekly productivity charts
- Tailwind powers the responsive interface

### Notifications and reminders

- Reminder cards surface overdue and upcoming tasks/goals
- Browser notifications can be enabled from the dashboard
- The app notifies users about upcoming due dates when permission is granted

## Security and performance notes

- Passwords are hashed with `bcryptjs`
- JWT tokens are validated on protected routes
- Helmet secures HTTP headers
- Rate limiting helps protect auth endpoints
- Lean queries and indexed fields improve MongoDB performance
- Input validation is applied to auth, task, and goal payloads

## GitHub publishing

This repo is already set up to keep secrets out of version control:

- `client/.env` and `server/.env` are ignored by `.gitignore`
- `.env.example` files remain safe templates to commit

Suggested publish flow:

```bash
git init
git branch -M main
git add .
git commit -m "Initial productivity dashboard"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
