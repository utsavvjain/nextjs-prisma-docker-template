'use client'

import { TaskItem } from './TaskItem'
import { useTaskStore } from '@/stores/taskStore'
import { CheckCircle2 } from 'lucide-react'

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks)
  const isLoading = useTaskStore((state) => state.isLoading)
  const filter = useTaskStore((state) => state.filter)

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <CheckCircle2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">
          {filter === 'completed'
            ? 'No completed tasks yet'
            : filter === 'active'
            ? 'No active tasks'
            : 'No tasks yet'}
        </h3>
        <p className="text-gray-400">
          {filter === 'all' && 'Add a task above to get started!'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
