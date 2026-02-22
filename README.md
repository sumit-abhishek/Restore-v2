# 🛒 Snowskiva — Full Stack E-Commerce Application

[![Build and Deploy](https://github.com/sumit-abhishek/Restore-v2/actions/workflows/main_snowskiva.yml/badge.svg)](https://github.com/sumit-abhishek/Restore-v2/actions/workflows/main_snowskiva.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Azure-blue?logo=microsoft-azure)](https://snowskiva.azurewebsites.net/)

> A fully featured e-commerce web application built with React 19, .NET 9, and Redux Toolkit — deployed to Azure with a CI/CD pipeline powered by GitHub Actions.

🔗 **[View Live Application →](https://snowskiva.azurewebsites.net/)**

---

## 📸 Overview

Snowskiva is a production-ready e-commerce platform that allows users to browse products, manage a shopping basket, place orders, and manage their account. The application is built with a modern full-stack architecture, following industry best practices for both development and deployment.

---

## 🚀 Tech Stack

### Frontend
- **React 19** — Component-based UI with hooks
- **Redux Toolkit** — Global state management
- **RTK Query** — Server-side data fetching, caching, and synchronization
- **TypeScript** — Type-safe development
- **Vite** — Fast build tooling and development server
- **Material UI** — Responsive and polished component library

### Backend
- **.NET 9 (ASP.NET Core)** — RESTful API
- **Entity Framework Core** — ORM for database access
- **ASP.NET Identity** — Authentication and authorization
- **SQLite / SQL Server** — Database

### DevOps & Deployment
- **GitHub Actions** — CI/CD pipeline (build, test, and deploy on every PR merge)
- **Microsoft Azure** — Cloud hosting via Azure App Service
- **Branch Protection Rules** — PRs require passing CI checks before merging to `main`

---

## ✨ Features

- 🔐 User registration, login, and JWT-based authentication
- 🛍️ Product catalog with filtering, sorting, and search
- 🛒 Shopping basket with real-time updates
- 📦 Order placement and order history
- 👤 User profile and address management
- 💳 Checkout flow with Stripe payment integration
- 📱 Fully responsive design for mobile and desktop
- ⚡ Optimistic UI updates with RTK Query cache management

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** for automated build and deployment to Azure:

1. Developer pushes code to a **feature branch**
2. A **Pull Request** is created targeting `main`
3. GitHub Actions automatically **builds and validates** the application
4. The PR can only be merged if the **build passes** ✅
5. On merge to `main`, the app is automatically **deployed to Azure** 🚀

```
Feature Branch → Pull Request → CI Build ✅ → Merge to Main → Deploy to Azure
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/sumit-abhishek/Restore-v2.git
cd Restore-v2
```

### 2. Set up the backend
```bash
cd API
dotnet restore
dotnet ef database update
dotnet run
```

### 3. Set up the frontend
```bash
cd client
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file inside the `client` folder:
```env
VITE_API_URL=https://localhost:5001/api
```

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## 📁 Project Structure

```
Restore-v2/
├── API/                  # .NET 9 Backend
│   ├── Controllers/      # API endpoints
│   ├── Entities/         # Domain models
│   ├── Data/             # EF Core DbContext & migrations
│   └── wwwroot/          # Built React app (served by .NET in production)
│
├── client/               # React 19 Frontend
│   ├── src/
│   │   ├── app/          # Store, API base, routes
│   │   ├── features/     # Feature-based modules (basket, catalog, account, etc.)
│   │   └── lib/          # Shared schemas and utilities
│   └── vite.config.ts
│
└── .github/
    └── workflows/
        └── main_snowskiva.yml   # GitHub Actions CI/CD pipeline
```

---

## 🌐 Deployment

The application is hosted on **Microsoft Azure App Service**.

- The React frontend is built and output into `API/wwwroot`, where it is served statically by the .NET backend.
- Environment-specific variables (API URL, secrets) are configured as **Azure App Settings** and **GitHub Secrets** — never stored in the repository.

---

## 📄 License

This project is for educational and portfolio purposes.

---

<div align="center">
  <strong>Built with ❤️ using React, .NET, and Azure</strong><br/>
  <a href="https://snowskiva.azurewebsites.net/">🔗 Live Demo</a>
</div>
