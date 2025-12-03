# Setup Guide for Todo App

This guide will help you get the Todo App up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

## Step-by-Step Setup

### 1. Install Node.js

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version
npm --version
```

### 2. Install MySQL

#### On macOS (using Homebrew):
```bash
brew install mysql
brew services start mysql
```

#### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

#### On Windows:
Download and install from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)

### 3. Create MySQL Database

Connect to MySQL:
```bash
mysql -u root -p
```

Create a new database:
```sql
CREATE DATABASE todoapp;
CREATE USER 'todouser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON todoapp.* TO 'todouser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Clone and Install

Clone the repository (or navigate to the project folder):
```bash
cd workspace
```

Install dependencies:
```bash
npm install
```

### 5. Configure Environment Variables

Copy the example env file:
```bash
cp .env.example .env
```

Edit the `.env` file with your actual database credentials:
```env
DATABASE_URL="mysql://todouser:your_password@localhost:3306/todoapp"
```

**Important**: Replace `todouser`, `your_password`, and `todoapp` with your actual MySQL credentials.

### 6. Initialize the Database

Generate Prisma Client:
```bash
npm run db:generate
```

Create database tables:
```bash
npm run db:migrate
```

When prompted for a migration name, enter something like: `init`

(Optional) Seed the database with sample data:
```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### 7. Start the Development Server

```bash
npm run dev
```

The app should now be running at [http://localhost:3000](http://localhost:3000)

## Verification

To verify everything is working:

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. You should see the Todo App interface
3. Try adding a new task
4. Try marking a task as complete
5. Try filtering tasks by status

## Common Issues and Solutions

### Issue: "Can't reach database server"

**Solution**:
- Ensure MySQL is running: `sudo systemctl status mysql` (Linux) or `brew services list` (macOS)
- Check your DATABASE_URL in `.env` file
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Issue: "Prisma Client not found"

**Solution**:
```bash
npm run db:generate
```

### Issue: "Cannot find module '@prisma/client'"

**Solution**:
```bash
npm install @prisma/client
npm run db:generate
```

### Issue: Port 3000 already in use

**Solution**: Kill the process using port 3000 or change the port:
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or run on a different port
PORT=3001 npm run dev
```

### Issue: "Module not found" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Database Management

### View Database with Prisma Studio

```bash
npm run db:studio
```

This opens a visual database browser at [http://localhost:5555](http://localhost:5555)

### Reset Database

If you need to start fresh:
```bash
npx prisma migrate reset
```

**Warning**: This will delete all data!

### Create a New Migration

After modifying `prisma/schema.prisma`:
```bash
npm run db:migrate
```

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure these are set in your production environment:
- `DATABASE_URL` - Your production database connection string
- `NODE_ENV=production`

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard
4. Connect your MySQL database (e.g., PlanetScale, AWS RDS)

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- Vercel
- Netlify
- AWS
- Google Cloud
- Azure
- DigitalOcean
- Heroku

Make sure to:
1. Set up a production MySQL database
2. Configure environment variables
3. Run database migrations

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## Getting Help

If you encounter issues not covered here:

1. Check the main [README.md](README.md) for more information
2. Review the [Prisma troubleshooting guide](https://www.prisma.io/docs/guides/troubleshooting-orm)
3. Check the browser console for error messages
4. Check the terminal for server-side errors

## Next Steps

After setup, you can:

1. Explore the codebase structure (see README.md)
2. Customize the UI in `app/page.tsx` and `components/`
3. Modify the database schema in `prisma/schema.prisma`
4. Add new API routes in `app/api/`
5. Extend functionality with new features

Happy coding! 🚀
