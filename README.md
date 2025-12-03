# TodoList - Task Management Application

A clean, minimal todo list application built with modern web technologies to help you organize your daily tasks efficiently.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)

## Features

### Core Functionality
- ✅ **Task Management** - Create, edit, delete, and complete tasks with instant UI updates
- 🔍 **Smart Filtering** - Filter tasks by status (all, active, completed) with URL persistence
- ✏️ **Inline Editing** - Double-click any task to edit it in place
- 🗑️ **Bulk Actions** - Clear all completed tasks at once with confirmation dialog
- ⚡ **Optimistic Updates** - Instant UI feedback on all actions
- 📊 **Task Statistics** - Real-time counter showing active and completed tasks

### User Experience
- 🎨 **Dark Mode** - Beautiful dark theme with system preference detection
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ⌨️ **Keyboard Shortcuts** - Full keyboard navigation support
- ♿ **Accessibility** - ARIA labels, screen reader support, WCAG AA compliant
- 🎯 **Clean UI** - Minimal, distraction-free interface

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **Zustand** - State management
- **react-hook-form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date formatting
- **next-themes** - Dark mode support

### Backend
- **Prisma** - ORM for type-safe database access
- **MySQL** - Relational database
- **Next.js API Routes** - RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- MySQL 8.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todolist
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the database connection string:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npm run db:generate

   # Create database and run migrations
   npm run db:push

   # Optional: Seed with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

```prisma
model Task {
  id         String   @id @default(cuid())
  title      String   @db.VarChar(200)
  completed  Boolean  @default(false)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  @@map("tasks")
}
```

## API Endpoints

### Tasks

#### `GET /api/tasks`
List all tasks with optional filtering.

**Query Parameters:**
- `status` - Filter by status: `all`, `active`, `completed` (default: `all`)

**Response:**
```json
{
  "tasks": [
    {
      "id": "clxxx...",
      "title": "Complete project documentation",
      "completed": false,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### `POST /api/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "New task title"
}
```

**Response:**
```json
{
  "task": {
    "id": "clxxx...",
    "title": "New task title",
    "completed": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `GET /api/tasks/[id]`
Get a single task by ID.

#### `PUT /api/tasks/[id]`
Update a task.

**Request Body:**
```json
{
  "title": "Updated title",
  "completed": true
}
```

#### `DELETE /api/tasks/[id]`
Delete a task.

#### `POST /api/tasks/bulk-delete`
Clear all completed tasks.

**Request Body:**
```json
{
  "completed": true
}
```

**Response:**
```json
{
  "deleted": 5
}
```

#### `GET /api/tasks/stats`
Get task statistics.

**Response:**
```json
{
  "total": 10,
  "active": 5,
  "completed": 5
}
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Add new task or save edit |
| `Escape` | Cancel editing |
| `Double-click` | Edit task inline |
| `Space` | Toggle task completion (when checkbox focused) |
| `Tab` | Navigate between elements |

## Project Structure

```
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── [id]/
│   │       │   └── route.ts          # Single task operations
│   │       ├── bulk-delete/
│   │       │   └── route.ts          # Bulk delete endpoint
│   │       ├── stats/
│   │       │   └── route.ts          # Statistics endpoint
│   │       └── route.ts              # List/create tasks
│   ├── about/
│   │   └── page.tsx                  # About page
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   └── globals.css                   # Global styles
├── components/
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── checkbox.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── alert-dialog.tsx
│   ├── TaskInput.tsx                 # Task input form
│   ├── TaskItem.tsx                  # Individual task item
│   ├── TaskList.tsx                  # Task list with empty states
│   ├── FilterTabs.tsx                # Filter tab buttons
│   ├── TaskStats.tsx                 # Task counter and clear button
│   ├── theme-provider.tsx            # Theme context provider
│   └── theme-toggle.tsx              # Dark mode toggle
├── lib/
│   ├── prisma.ts                     # Prisma client singleton
│   └── utils.ts                      # Utility functions
├── stores/
│   └── taskStore.ts                  # Zustand store
├── types/
│   └── task.ts                       # TypeScript types and Zod schemas
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── seed.ts                       # Database seeding script
└── public/                           # Static assets
```

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server

# Build
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Run migrations (dev)
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database with sample data

# Linting
npm run lint             # Run ESLint
```

### Adding New Components

This project uses shadcn/ui. To add new components:

```bash
npx shadcn@latest add [component-name]
```

### Database Migrations

When you modify the Prisma schema:

```bash
# Create and apply migration
npm run db:migrate

# Or push changes directly (development)
npm run db:push
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```bash
# Build image
docker build -t todolist .

# Run container
docker run -p 3000:3000 -e DATABASE_URL="your-db-url" todolist
```

### Environment Variables

Required environment variables for production:

```env
DATABASE_URL="mysql://user:password@host:port/database"
NODE_ENV="production"
```

## Architecture Highlights

### Database-First Development
Built with Prisma ORM for type-safe database access. Schema-first approach ensures data integrity and type safety from database to UI.

### Type-Safe API Layer
RESTful API endpoints with Zod validation schemas ensure data consistency. Comprehensive error handling with appropriate HTTP status codes.

### State Management
Zustand provides lightweight, performant state management with optimistic updates for instant UI feedback.

### Component Architecture
Modular, reusable components following single responsibility principle. Built with shadcn/ui for consistent, accessible design.

## Performance Optimizations

- ⚡ Optimistic UI updates for instant feedback
- 🎯 React.memo for task items to prevent unnecessary re-renders
- 📦 Code splitting with Next.js dynamic imports
- 🔄 Efficient state updates with Zustand
- 🗄️ Database query optimization with Prisma

## Accessibility Features

- ARIA labels on all interactive elements
- Full keyboard navigation support
- Screen reader announcements for task actions
- Focus management with visible focus indicators
- WCAG AA color contrast ratios
- Semantic HTML structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, React, TypeScript, Prisma, and MySQL
