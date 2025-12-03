import { z } from 'zod'

// Task type from Prisma
export interface Task {
  id: string
  title: string
  completed: boolean
  created_at: Date
  updated_at: Date
}

// Filter types
export type FilterType = 'all' | 'active' | 'completed'

// Zod validation schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less')
})

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed: z.boolean().optional()
})

export const bulkDeleteSchema = z.object({
  completed: z.boolean()
})

// API Response types
export interface TasksResponse {
  tasks: Task[]
  total: number
}

export interface TaskResponse {
  task: Task
}

export interface DeleteResponse {
  success: boolean
  deleted?: number
}

export interface StatsResponse {
  total: number
  active: number
  completed: number
}

export interface ErrorResponse {
  error: string
  message?: string
}
