# Quick Start Guide

Get your TodoList application up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MySQL 8.0+ running locally or remotely
- Terminal/Command Line access

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update your MySQL connection:

```env
DATABASE_URL="mysql://root:password@localhost:3306/todolist"
```

Replace:
- `root` with your MySQL username
- `password` with your MySQL password
- `localhost:3306` with your MySQL host and port
- `todolist` with your desired database name

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Create database and tables
npm run db:push

# (Optional) Add sample tasks
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### Database Connection Issues

If you see `Can't reach database server`:

1. Ensure MySQL is running:
   ```bash
   # macOS
   brew services start mysql

   # Linux
   sudo systemctl start mysql

   # Windows
   net start MySQL80
   ```

2. Test connection:
   ```bash
   mysql -u root -p
   ```

3. Create database manually:
   ```sql
   CREATE DATABASE todolist;
   ```

### Port Already in Use

If port 3000 is busy:

```bash
# Use different port
PORT=3001 npm run dev
```

### Prisma Generate Fails

If Prisma generation fails:

```bash
# Clean and regenerate
rm -rf node_modules/.prisma
npm run db:generate
```

## Next Steps

✅ Your app is now running!

- Visit the homepage to create tasks
- Check out `/about` for feature information
- Use keyboard shortcuts for faster workflow
- Toggle dark mode with the theme button

## Production Deployment

### Environment Variables

Set these in your production environment:

```env
DATABASE_URL="mysql://user:password@production-host:3306/todolist"
NODE_ENV="production"
```

### Build and Start

```bash
npm run build
npm run start
```

### Deploy to Vercel

1. Push code to GitHub
2. Import in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Sync database schema
npm run db:migrate       # Create migration
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed sample data

# Code Quality
npm run lint             # Run linter
```

## Getting Help

- Check the main [README.md](README.md) for detailed documentation
- Review API endpoints for backend integration
- Open an issue on GitHub for bugs

---

Happy task managing! 🚀
