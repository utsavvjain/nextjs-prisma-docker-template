import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing tasks
  await prisma.task.deleteMany();

  // Create sample tasks
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Complete project documentation',
        completed: false,
      },
      {
        title: 'Review pull requests',
        completed: false,
      },
      {
        title: 'Setup CI/CD pipeline',
        completed: true,
      },
      {
        title: 'Write unit tests for API endpoints',
        completed: false,
      },
      {
        title: 'Update dependencies to latest versions',
        completed: true,
      },
      {
        title: 'Implement dark mode toggle',
        completed: false,
      },
      {
        title: 'Optimize database queries',
        completed: false,
      },
      {
        title: 'Add authentication middleware',
        completed: true,
      },
    ],
  });

  console.log(`✅ Created ${tasks.count} sample tasks`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
