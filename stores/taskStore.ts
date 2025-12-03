import { create } from 'zustand';
import { type Task, type FilterType } from '@/types/task';

interface TaskStore {
  // State
  tasks: Task[];
  filter: FilterType;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTasks: (tasks: Task[]) => void;
  setFilter: (filter: FilterType) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Task operations
  fetchTasks: (filter?: FilterType) => Promise<void>;
  addTask: (title: string) => Promise<void>;
  updateTask: (id: string, data: { title?: string; completed?: boolean }) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  clearCompleted: () => Promise<void>;

  // Computed
  getFilteredTasks: () => Task[];
  getActiveCount: () => number;
  getCompletedCount: () => number;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state
  tasks: [],
  filter: 'all',
  isLoading: false,
  error: null,

  // Setters
  setTasks: (tasks) => set({ tasks }),
  setFilter: (filter) => set({ filter }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Fetch tasks
  fetchTasks: async (filter) => {
    set({ isLoading: true, error: null });
    try {
      const filterParam = filter || get().filter;
      const response = await fetch(`/api/tasks?status=${filterParam}`);

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      set({ tasks: data.tasks, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false
      });
    }
  },

  // Add task
  addTask: async (title) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create task');
      }

      const data = await response.json();

      // Optimistic update
      set((state) => ({
        tasks: [data.task, ...state.tasks],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false
      });
      throw error;
    }
  },

  // Update task
  updateTask: async (id, data) => {
    // Optimistic update
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...data, updated_at: new Date() } : task
      ),
    }));

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.json();

      // Update with server response
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? result.task : task
        ),
      }));
    } catch (error) {
      // Revert on error
      set({ tasks: previousTasks });
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    // Optimistic update
    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      // Revert on error
      set({ tasks: previousTasks });
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  },

  // Clear completed
  clearCompleted: async () => {
    const previousTasks = get().tasks;

    // Optimistic update
    set((state) => ({
      tasks: state.tasks.filter((task) => !task.completed),
    }));

    try {
      const response = await fetch('/api/tasks/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to clear completed tasks');
      }
    } catch (error) {
      // Revert on error
      set({ tasks: previousTasks });
      set({ error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  },

  // Computed values
  getFilteredTasks: () => {
    const { tasks, filter } = get();

    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  },

  getActiveCount: () => {
    return get().tasks.filter((task) => !task.completed).length;
  },

  getCompletedCount: () => {
    return get().tasks.filter((task) => task.completed).length;
  },
}));
