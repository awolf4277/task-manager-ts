# 📝 Task Manager (TypeScript + React + Auth0)

A fully functional **Task Management Application** built with **TypeScript**, **React**, **Vite**, and **Auth0** authentication.  
This project demonstrates complete mastery of TypeScript fundamentals, React hooks, Context API, state management, and secure authentication.

---

## 🚀 Features

### ✅ Task Management
- **Dashboard** — View all tasks in a clean list view.
- **Task Details** — View, edit, or delete any task.
- **Task Creation / Editing** — Typed form with validation and error handling.
- **Persistence** — Tasks are saved to `localStorage` for a seamless user experience (no backend required).

### ✅ Authentication (Auth0)
- **Login / Register** via Auth0 Hosted UI
- **Protected Routes** — Only authenticated users can create, edit, or delete tasks.
- **Logout** — Securely sign out and return to home.

### ✅ TypeScript Integration
- Strict TypeScript config for maximum safety and maintainability.
- Custom types:
  - `Task`, `TaskStatus`, `NewTask`, `TaskUpdate`
  - `AppAuth0User` for typed Auth0 user data
- Typed React hooks (`useState`, `useReducer`) and context with strong interfaces.

### ✅ Global State Management
- **Context API** + **Reducer Pattern**
- Typed actions (`ADD_TASK`, `UPDATE_TASK`, `DELETE_TASK`)
- Context-provided CRUD helpers used across components.

### ✅ Error Handling & Validation
- Typed error map (`Record<string, string>`)
- Inline field validation in task forms
- Confirm dialogs on deletes
- Fallback for invalid task routes

---

## 🏗️ Project Structure

