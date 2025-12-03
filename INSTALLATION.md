# Installation Instructions

## Important: Initial Setup Required

The dependencies are listed in `package.json` but need to be installed. Please follow these steps to complete the installation:

### Step 1: Install Node Modules

```bash
npm install
```

This will install all required dependencies including:
- **@prisma/client** - Prisma ORM client
- **zustand** - State management
- **zod** - Schema validation
- **react-hook-form** - Form handling
- **@hookform/resolvers** - Zod resolver for react-hook-form
- **lucide-react** - Icon library
- **date-fns** - Date utilities
- **clsx** & **tailwind-merge** - CSS utilities
- **class-variance-authority** - Component variants

Plus development dependencies like Prisma CLI and ts-node.

### Step 2: Setup Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Then edit `.env` with your MySQL credentials:

```env
DATABASE_URL="mysql://user:password@localhost:3306/todoapp"
```

### Step 3: Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Create database and run migrations
npm run db:migrate

# Optional: Seed with sample data
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### Step 4: Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## What's Included

All the application code is already in place:

✅ **Database Layer**
- Prisma schema (`prisma/schema.prisma`)
- Prisma client utility (`lib/prisma.ts`)
- Database seed file (`prisma/seed.ts`)

✅ **Backend APIs**
- `/api/tasks` - List and create tasks
- `/api/tasks/[id]` - Get, update, delete individual tasks
- `/api/tasks/bulk-delete` - Clear completed tasks
- `/api/tasks/stats` - Get task statistics

✅ **Frontend Components**
- TaskInput - Task creation form
- TaskItem - Individual task with edit/delete
- TaskList - Task list container
- FilterTabs - Status filtering
- TaskStats - Statistics and bulk actions

✅ **Pages**
- Homepage with full todo functionality
- About page with documentation

✅ **State Management**
- Zustand store with optimistic updates

✅ **Type Safety**
- TypeScript types and Zod schemas
- Full type coverage from DB to UI

✅ **Documentation**
- README.md - Main documentation
- QUICKSTART.md - Quick start guide
- SETUP_GUIDE.md - Detailed setup
- PROJECT_SUMMARY.md - Architecture overview

## Verification

After installation, verify everything works:

1. **Check dependencies**:
   ```bash
   npm list --depth=0
   ```

2. **Check Prisma client**:
   ```bash
   npm run db:generate
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

4. **Test features**:
   - Add a task
   - Mark as complete
   - Edit a task (double-click)
   - Delete a task
   - Filter by status
   - Clear completed

## Troubleshooting

### If npm install fails:

```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### If Prisma errors occur:

```bash
# Regenerate Prisma client
npm run db:generate
```

### If database connection fails:

- Ensure MySQL is running
- Check DATABASE_URL in `.env`
- Create database if it doesn't exist:
  ```bash
  mysql -u root -p -e "CREATE DATABASE todoapp;"
  ```

## Support

For detailed help, see:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Step-by-step setup
- [README.md](README.md) - Full documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick reference

## Ready to Code!

Once installed, the app is fully functional and ready for:
- Local development
- Feature additions
- Customization
- Production deployment

Enjoy building with the Todo App! 🚀
