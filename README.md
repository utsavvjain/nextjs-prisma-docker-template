# Todo App

A modern, clean, and minimal todo list application built with Next.js, Prisma, and MySQL.

## Features

- ✅ **Task Management** - Create, edit, delete, and complete tasks with instant UI updates
- 🔍 **Real-time Filtering** - Filter tasks by status (all, active, completed)
- 💾 **Persistent Storage** - MySQL database with Prisma ORM for reliable data persistence
- ⌨️ **Keyboard Shortcuts** - Inline task editing with double-click, Enter to save, Escape to cancel
- 📱 **Responsive Design** - Mobile-first responsive design with accessibility features
- ⚡ **Optimistic UI** - Instant feedback with optimistic updates
- 🎨 **Smooth Animations** - Beautiful transitions and loading states

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Prisma** - Next-generation ORM for MySQL
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form validation
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MySQL database running
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workspace
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:

Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://user:password@localhost:3306/todoapp"
```

Replace `user`, `password`, and database name with your MySQL credentials.

4. Initialize the database:
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with sample data (optional)
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio

## Usage

### Adding Tasks
Type your task in the input field and press Enter to add it to your list.

### Completing Tasks
Click the circle checkbox next to a task to mark it as complete.

### Editing Tasks
Double-click on any task to edit it inline. Press Enter to save or Escape to cancel.

### Deleting Tasks
Hover over a task and click the trash icon to delete it.

### Filtering Tasks
Use the filter buttons to view all, active, or completed tasks.

### Clearing Completed
Click "Clear completed" to remove all completed tasks at once.

## API Routes

### GET /api/tasks
List all tasks with optional filtering
- Query params: `status=all|active|completed`
- Response: `{ tasks: Task[], total: number }`

### POST /api/tasks
Create a new task
- Body: `{ title: string }`
- Response: `{ task: Task }`

### GET /api/tasks/:id
Get a single task
- Response: `{ task: Task }`

### PUT /api/tasks/:id
Update a task
- Body: `{ title?: string, completed?: boolean }`
- Response: `{ task: Task }`

### DELETE /api/tasks/:id
Delete a task
- Response: `{ success: boolean }`

### POST /api/tasks/bulk-delete
Clear all completed tasks
- Body: `{ completed: true }`
- Response: `{ success: boolean, deleted: number }`

### GET /api/tasks/stats
Get task statistics
- Response: `{ total: number, active: number, completed: number }`

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

## Project Structure

```
├── app/
│   ├── api/
│   │   └── tasks/              # API routes
│   ├── about/                  # About page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── FilterTabs.tsx          # Filter buttons
│   ├── TaskInput.tsx           # Task input form
│   ├── TaskItem.tsx            # Individual task item
│   ├── TaskList.tsx            # Task list container
│   └── TaskStats.tsx           # Task statistics
├── lib/
│   ├── prisma.ts               # Prisma client
│   └── utils.ts                # Utility functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seed
├── stores/
│   └── taskStore.ts            # Zustand store
├── types/
│   └── task.ts                 # TypeScript types
└── .env                        # Environment variables
```

## Features in Detail

### Optimistic UI Updates
The app uses optimistic UI updates for instant feedback. When you create, update, or delete a task, the UI updates immediately before the server response, providing a smooth user experience.

### State Management
Zustand is used for global state management with a simple store pattern. The store handles all task operations and syncs with the backend API.

### Form Validation
React Hook Form with Zod validation ensures data integrity. Tasks must have a title between 1-200 characters.

### Responsive Design
The app is fully responsive and works on all device sizes:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus indicators for better accessibility
- Screen reader friendly

## Performance Optimizations

- React.memo for task items to prevent unnecessary re-renders
- Optimistic updates for instant UI feedback
- Efficient API calls with proper error handling
- Lazy loading and code splitting

## Keyboard Shortcuts

- **Enter** - Add new task (when in input field) or save edited task
- **Escape** - Cancel editing
- **Double-click** - Edit task

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check DATABASE_URL in .env file
- Verify database exists and user has permissions

### Build Errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Run `npm run db:generate` to regenerate Prisma client

### Migration Issues
- Run `npx prisma migrate reset` to reset database
- Run `npm run db:migrate` to apply migrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js, Prisma, and Zustand
