import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { StatsResponse, ErrorResponse } from '@/types/task'

// GET /api/tasks/stats - Get task statistics
export async function GET(request: NextRequest) {
  try {
    const [total, active, completed] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { completed: false } }),
      prisma.task.count({ where: { completed: true } })
    ])

    const response: StatsResponse = {
      total,
      active,
      completed
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching stats:', error)
    const errorResponse: ErrorResponse = {
      error: 'Failed to fetch stats',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
