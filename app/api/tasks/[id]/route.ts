import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updateTaskSchema, TaskResponse, DeleteResponse, ErrorResponse } from '@/types/task'

// GET /api/tasks/[id] - Get a single task
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.id }
    })

    if (!task) {
      const errorResponse: ErrorResponse = {
        error: 'Task not found'
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    const response: TaskResponse = { task }
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching task:', error)
    const errorResponse: ErrorResponse = {
      error: 'Failed to fetch task',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Validate request body
    const validation = updateTaskSchema.safeParse(body)
    if (!validation.success) {
      const errorResponse: ErrorResponse = {
        error: 'Validation error',
        message: validation.error.errors[0].message
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: params.id }
    })

    if (!existingTask) {
      const errorResponse: ErrorResponse = {
        error: 'Task not found'
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    const task = await prisma.task.update({
      where: { id: params.id },
      data: validation.data
    })

    const response: TaskResponse = { task }
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating task:', error)
    const errorResponse: ErrorResponse = {
      error: 'Failed to update task',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: params.id }
    })

    if (!existingTask) {
      const errorResponse: ErrorResponse = {
        error: 'Task not found'
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    await prisma.task.delete({
      where: { id: params.id }
    })

    const response: DeleteResponse = { success: true }
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error deleting task:', error)
    const errorResponse: ErrorResponse = {
      error: 'Failed to delete task',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
