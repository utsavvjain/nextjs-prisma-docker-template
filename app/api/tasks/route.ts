import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createTaskSchema, TasksResponse, TaskResponse, ErrorResponse } from '@/types/task'

// GET /api/tasks - List all tasks with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || 'all'

    let where = {}
    if (status === 'active') {
      where = { completed: false }
    } else if (status === 'completed') {
      where = { completed: true }
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { created_at: 'desc' }
    })

    const response: TasksResponse = {
      tasks,
      total: tasks.length
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    const errorResponse: ErrorResponse = {
      error: 'Failed to fetch tasks',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validation = createTaskSchema.safeParse(body)
    if (!validation.success) {
      const errorResponse: ErrorResponse = {
        error: 'Validation error',
        message: validation.error.errors[0].message
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const { title } = validation.data

    const task = await prisma.task.create({
      data: { title }
    })

    const response: TaskResponse = { task }
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    const errorResponse: ErrorResponse = {
      error: 'Failed to create task',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
