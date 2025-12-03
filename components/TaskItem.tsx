'use client'

import { useState, useRef, useEffect } from 'react'
import { Task } from '@/types/task'
import { useTaskStore } from '@/stores/taskStore'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const updateTask = useTaskStore((state) => state.updateTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    if (!task.completed) {
      setIsEditing(true)
      setEditTitle(task.title)
    }
  }

  const handleSave = async () => {
    const trimmed = editTitle.trim()
    if (trimmed && trimmed !== task.title) {
      await updateTask(task.id, { title: trimmed })
    }
    setIsEditing(false)
    setEditTitle(task.title)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditTitle(task.title)
    }
  }

  const handleToggle = () => {
    toggleTask(task.id)
  }

  const handleDelete = () => {
    deleteTask(task.id)
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-4 border rounded-lg',
        'transition-all duration-200 hover:shadow-md',
        'bg-white',
        task.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggle}
        className={cn(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center',
          'transition-all duration-200',
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        )}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0" onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            maxLength={200}
            className="w-full px-2 py-1 border-2 border-blue-500 rounded focus:outline-none"
          />
        ) : (
          <div>
            <p
              className={cn(
                'text-lg break-words',
                task.completed && 'line-through text-gray-500'
              )}
            >
              {task.title}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {formatRelativeTime(task.created_at)}
            </p>
          </div>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className={cn(
          'flex-shrink-0 p-2 text-red-500 rounded hover:bg-red-50',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
          'focus:opacity-100'
        )}
        aria-label="Delete task"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
