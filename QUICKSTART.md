# Quick Start Guide

Get the Todo App running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MySQL running locally
- 5 minutes of your time ⏰

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
DATABASE_URL="mysql://root:password@localhost:3306/todoapp"
```

### 3. Setup Database

Create the database in MySQL:

```bash
mysql -u root -p -e "CREATE DATABASE todoapp;"
```

Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 4. Start the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## Optional: Add Sample Data

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

## Troubleshooting

### Can't connect to database?

Check that MySQL is running:
```bash
# macOS
brew services list

# Linux
sudo systemctl status mysql
```

### Module not found?

```bash
npm install
npm run db:generate
```

### Port 3000 in use?

```bash
PORT=3001 npm run dev
```

## Next Steps

- Read the full [README.md](README.md) for features and API docs
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for architecture

## Need Help?

See the comprehensive guides:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [README.md](README.md) - Full documentation
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Architecture overview

Happy coding! 🚀
