import { z } from 'zod';

// Database Task type (from Prisma)
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

// Filter types
export type FilterType = 'all' | 'active' | 'completed';

// Zod validation schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(200, 'Task title must be 200 characters or less'),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(200, 'Task title must be 200 characters or less').optional(),
  completed: z.boolean().optional(),
}).refine(
  (data) => data.title !== undefined || data.completed !== undefined,
  { message: 'At least one field must be provided for update' }
);

export const bulkDeleteSchema = z.object({
  completed: z.literal(true),
});

// API Request types
export type CreateTaskRequest = z.infer<typeof createTaskSchema>;
export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;
export type BulkDeleteRequest = z.infer<typeof bulkDeleteSchema>;

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
}

export interface TaskResponse {
  task: Task;
}

export interface BulkDeleteResponse {
  deleted: number;
}

export interface TaskStatsResponse {
  total: number;
  active: number;
  completed: number;
}
