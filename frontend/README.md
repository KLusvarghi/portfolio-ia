# Frontend Project

## Overview
This project is a Next.js application that provides a structured interface for viewing and interacting with projects, including a chat feature.

## Getting Started

### Installation
To create the project, we used the following command:
```bash
npx create-next-app@latest frontend
```

During the setup, we enabled:
- TypeScript
- ESLint
- Tailwind CSS
- Directory configuration (src/app)
- App Router

This automatically installs the following dependencies:
- React
- React-DOM

### Running the Project
```bash
# Navigate to the project directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Project Structure

```
frontend/
├── node_modules/
├── public/
├── src/
│   └── app/
│       ├── components/
│       │   ├── chat/
│       │   │   └── ButtonChat.tsx
│       │   ├── landing/
│       │   │   └── main.tsx
│       │   └── shared/
│       │       ├── Nav/
│       │       │   ├── Nav.tsx
│       │       │   └── NavLink.tsx
│       │       ├── Container.tsx
│       │       └── Header.tsx
│       ├── (paginas)/
│       │   └── project/
│       │       └── [id]/
│       │           ├── page.tsx
│       │           ├── layout.tsx
│       │           └── globals.css
│       │           └── layout.tsx
├── .eslintrc.json
├── .gitignore
├── eslint.config.mjs
├── next.env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Architecture

### Pages
The project uses Next.js App Router for routing. The pages are organized in the `src/app/(paginas)` directory:

- **Project Pages**: Located in `(paginas)/project/[id]`
  - The `[id]` dynamic route allows accessing individual projects by their ID
  - When a project page is accessed, the ID is extracted from the URL parameters
  - This ID is then used to fetch the specific project data from the API

### Components
The components are organized in a hierarchical structure:

1. **Components (Parent Folder)**
   - Contains all reusable UI components

2. **Shared Components**
   - Located in `components/shared`
   - General-purpose components used across multiple pages
   - Includes navigation components, containers, and headers

3. **Chat Components**
   - Located in `components/chat`
   - Specialized components for chat functionality

4. **Landing Components**
   - Located in `components/landing`
   - Components specific to the landing page

## Data Flow
When accessing a project page:
1. The project ID is extracted from the URL parameters
2. A request is made to the API with the project ID
3. The API returns the project data
4. The data is rendered on the page

## Technologies
- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

## Configuration Files
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Git ignore rules
- `eslint.config.mjs` - Additional ESLint configuration
- `next.config.ts` - Next.js configuration
- `package.json` - Project dependencies and scripts
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
