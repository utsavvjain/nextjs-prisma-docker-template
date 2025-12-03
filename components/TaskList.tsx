'use client';

import { useTaskStore } from '@/stores/taskStore';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const getFilteredTasks = useTaskStore((state) => state.getFilteredTasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  const filter = useTaskStore((state) => state.filter);

  const tasks = getFilteredTasks();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-muted animate-pulse rounded-lg"
            role="status"
            aria-label="Loading tasks"
          />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    const emptyMessages = {
      all: 'No tasks yet. Create one to get started!',
      active: 'No active tasks. Great job!',
      completed: 'No completed tasks yet. Keep working!',
    };

    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground mb-4"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <p className="text-lg text-muted-foreground">{emptyMessages[filter]}</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-card" role="list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
