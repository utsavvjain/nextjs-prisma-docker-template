'use client'

import { useEffect } from 'react'
import { TaskInput } from '@/components/TaskInput'
import { TaskList } from '@/components/TaskList'
import { FilterTabs } from '@/components/FilterTabs'
import { TaskStats } from '@/components/TaskStats'
import { useTaskStore } from '@/stores/taskStore'
import Link from 'next/link'
import { ListTodo } from 'lucide-react'

export default function Home() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Todo App
              </h1>
            </div>
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Organize Your Daily Tasks
          </h2>
          <p className="text-gray-600 text-lg">
            Simple, fast, and efficient task management for everyone
          </p>
        </div>

        {/* Task Input */}
        <div className="mb-8">
          <TaskInput />
        </div>

        {/* Filters and Stats */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <FilterTabs />
          <TaskStats />
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <TaskList />
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Double-click a task to edit • Hover to delete</p>
          <p className="mt-1">Press Enter to save • Escape to cancel</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-sm text-gray-500">
        <p>Built with Next.js, Prisma, and Zustand</p>
      </footer>
    </div>
  )
}
