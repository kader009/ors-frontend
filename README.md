# ORS Tracker — Frontend

> **Modern web application for managing Operational Roadworthiness Scores (ORS) with role-based access control and real-time monitoring.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

---

## Features

### Core Functionality

- **JWT-based Authentication** with persistent sessions (Redux Persist)
- **Role-Based Access Control** (Admin, Inspector, Viewer)
- **Real-time Dashboard** with metrics, charts, and activity monitoring
- **ORS Plan Management** — CRUD operations for vehicle roadworthiness records
- **Advanced Filtering** — Search, filter by grade (A/B/C/Failed), score range
- **Fully Responsive** — Optimized for mobile (6400px), tablet (768px), and desktop (1024px+)
- **Dark Mode Support** — Automatic theme detection with custom gradient backgrounds
- **Optimistic UI Updates** — Instant feedback with RTK Query mutations
- **Modern UI/UX** — Tailwind CSS v4 with custom design system

## Tech Stack

### Frontend Framework

- **React 19.2** — Latest features with improved performance
- **TypeScript 5.9** — Type-safe development
- **Vite 7.2** — Lightning-fast HMR and build tooling

### State Management

- **Redux Toolkit 2.11** — Modern Redux with RTK Query
- **Redux Persist 6.0** — Persistent state to localStorage
- **React Router 7.12** — Client-side routing with protected routes

### Styling & UI

- **Tailwind CSS 4.1** — Utility-first CSS framework
- **Lucide React 0.563** — Beautiful, consistent icons
- **Custom CSS Variables** — Dynamic theming support

### HTTP & Data Fetching

- **RTK Query** — Powerful data fetching with caching
- **Axios 1.13** — HTTP client for API communication

### Developer Experience

- **ESLint 9** — Code quality and consistency
- **TypeScript ESLint** — TypeScript-specific linting rules
- **Hot Module Replacement** — Instant feedback during development

---

## Prerequisites

- **Node.js** `>= 18.x` ([Download](https://nodejs.org/))
- **npm** `>= 9.x` (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ors-frontend
```

### 2. Install Dependencies

```bash
npm install
```

---

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BACKEND_API=https://ors-backend-ys1m.onrender.com/api/v1
```

**Note:** Replace with your backend API URL if self-hosting.

---

## Development

### Start Development Server

```bash
npm run dev
```

---

## Authentication & Roles

### Demo Credentials

| Email              | Password    | Role      | Access Level                     |
| ------------------ | ----------- | --------- | -------------------------------- |
| `admin@gmail.com`  | `admin123`  | Admin     | Full access (CRUD all resources) |
| `shakil@gmail.com` | `shakil123` | Inspector | Assigned/created ORS plans only  |
| `alam@gmail.com`   | `alam123`   | Viewer    | Read-only access                 |
