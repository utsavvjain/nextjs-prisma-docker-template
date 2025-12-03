import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { type TaskStatsResponse } from '@/types/task';

// GET /api/tasks/stats - Get task statistics
export async function GET(request: NextRequest) {
  try {
    // Get total count
    const total = await prisma.task.count();

    // Get active count
    const active = await prisma.task.count({
      where: { completed: false },
    });

    // Get completed count
    const completed = await prisma.task.count({
      where: { completed: true },
    });

    const response: TaskStatsResponse = {
      total,
      active,
      completed,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching task stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task stats', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
