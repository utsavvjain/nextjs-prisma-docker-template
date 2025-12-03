import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createTaskSchema, type TaskListResponse, type TaskResponse, type FilterType } from '@/types/task';
import { ZodError } from 'zod';

// GET /api/tasks - List all tasks with optional filter
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = (searchParams.get('status') || 'all') as FilterType;

    // Build filter condition
    let whereClause = {};
    if (status === 'active') {
      whereClause = { completed: false };
    } else if (status === 'completed') {
      whereClause = { completed: true };
    }

    // Fetch tasks
    const tasks = await prisma.task.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc',
      },
    });

    const response: TaskListResponse = {
      tasks,
      total: tasks.length,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createTaskSchema.parse(body);

    // Create task
    const task = await prisma.task.create({
      data: {
        title: validatedData.title,
      },
    });

    const response: TaskResponse = {
      task,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', message: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
