import { create } from 'zustand'
import { Task, FilterType, TasksResponse, TaskResponse, DeleteResponse, StatsResponse } from '@/types/task'

interface TaskStore {
  tasks: Task[]
  filter: FilterType
  isLoading: boolean
  error: string | null
  stats: StatsResponse | null

  // Actions
  setFilter: (filter: FilterType) => void
  fetchTasks: (filter?: FilterType) => Promise<void>
  addTask: (title: string) => Promise<Task | null>
  updateTask: (id: string, data: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  clearCompleted: () => Promise<void>
  fetchStats: () => Promise<void>
  toggleTask: (id: string) => Promise<void>
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filter: 'all',
  isLoading: false,
  error: null,
  stats: null,

  setFilter: (filter) => {
    set({ filter })
    get().fetchTasks(filter)
  },

  fetchTasks: async (filter) => {
    set({ isLoading: true, error: null })
    try {
      const currentFilter = filter || get().filter
      const params = new URLSearchParams()
      if (currentFilter !== 'all') {
        params.set('status', currentFilter)
      }

      const response = await fetch(`/api/tasks?${params}`)
      if (!response.ok) throw new Error('Failed to fetch tasks')

      const data: TasksResponse = await response.json()
      set({ tasks: data.tasks, isLoading: false })

      // Also fetch stats
      get().fetchStats()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false
      })
    }
  },

  addTask: async (title) => {
    set({ error: null })
    try {
      // Optimistic update
      const tempTask: Task = {
        id: 'temp-' + Date.now(),
        title,
        completed: false,
        created_at: new Date(),
        updated_at: new Date()
      }

      set((state) => ({ tasks: [tempTask, ...state.tasks] }))

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })

      if (!response.ok) throw new Error('Failed to create task')

      const data: TaskResponse = await response.json()

      // Replace temp task with real task
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === tempTask.id ? data.task : t))
      }))

      get().fetchStats()
      return data.task
    } catch (error) {
      // Rollback on error
      set((state) => ({
        tasks: state.tasks.filter((t) => !t.id.startsWith('temp-')),
        error: error instanceof Error ? error.message : 'Unknown error'
      }))
      return null
    }
  },

  updateTask: async (id, data) => {
    set({ error: null })
    try {
      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, ...data, updated_at: new Date() } : t
        )
      }))

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to update task')

      const result: TaskResponse = await response.json()

      // Update with real task
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? result.task : t))
      }))

      get().fetchStats()
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error' })
      // Refetch to restore correct state
      get().fetchTasks()
    }
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return

    await get().updateTask(id, { completed: !task.completed })
  },

  deleteTask: async (id) => {
    set({ error: null })
    try {
      // Optimistic delete
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      }))

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete task')

      get().fetchStats()
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error' })
      // Refetch to restore correct state
      get().fetchTasks()
    }
  },

  clearCompleted: async () => {
    set({ error: null })
    try {
      const response = await fetch('/api/tasks/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true })
      })

      if (!response.ok) throw new Error('Failed to clear completed tasks')

      // Refetch tasks
      get().fetchTasks()
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error' })
    }
  },

  fetchStats: async () => {
    try {
      const response = await fetch('/api/tasks/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')

      const data: StatsResponse = await response.json()
      set({ stats: data })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }
}))
