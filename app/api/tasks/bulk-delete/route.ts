import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bulkDeleteSchema, type BulkDeleteResponse } from '@/types/task';
import { ZodError } from 'zod';

// POST /api/tasks/bulk-delete - Clear all completed tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = bulkDeleteSchema.parse(body);

    // Delete all completed tasks
    const result = await prisma.task.deleteMany({
      where: {
        completed: validatedData.completed,
      },
    });

    const response: BulkDeleteResponse = {
      deleted: result.count,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation error', message: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error deleting tasks:', error);
    return NextResponse.json(
      { error: 'Failed to delete tasks', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
