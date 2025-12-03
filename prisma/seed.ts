import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create sample tasks
  const tasks = [
    { title: 'Welcome to Todo App!', completed: false },
    { title: 'Double-click a task to edit it', completed: false },
    { title: 'Click the circle to mark as complete', completed: false },
    { title: 'Try filtering tasks by status', completed: false },
    { title: 'This is a completed task example', completed: true }
  ]

  for (const task of tasks) {
    await prisma.task.create({ data: task })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
