import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bulkDeleteSchema, DeleteResponse, ErrorResponse } from '@/types/task'

// POST /api/tasks/bulk-delete - Clear all completed tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validation = bulkDeleteSchema.safeParse(body)
    if (!validation.success) {
      const errorResponse: ErrorResponse = {
        error: 'Validation error',
        message: validation.error.errors[0].message
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const { completed } = validation.data

    if (!completed) {
      const errorResponse: ErrorResponse = {
        error: 'Can only bulk delete completed tasks'
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const result = await prisma.task.deleteMany({
      where: { completed: true }
    })

    const response: DeleteResponse = {
      success: true,
      deleted: result.count
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error bulk deleting tasks:', error)
    const errorResponse: ErrorResponse = {
      error: 'Failed to delete tasks',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
