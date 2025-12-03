'use client'

import { useState } from 'react'
import { useTaskStore } from '@/stores/taskStore'
import { cn } from '@/lib/utils'

export function TaskStats() {
  const stats = useTaskStore((state) => state.stats)
  const clearCompleted = useTaskStore((state) => state.clearCompleted)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClearCompleted = async () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    await clearCompleted()
    setShowConfirm(false)
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  if (!stats) return null

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="text-sm text-gray-600">
        <span className="font-semibold">{stats.active}</span> item
        {stats.active !== 1 && 's'} left
      </div>

      {stats.completed > 0 && (
        <div className="flex gap-2">
          {showConfirm ? (
            <>
              <button
                onClick={handleClearCompleted}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Confirm Clear
              </button>
              <button
                onClick={handleCancel}
                className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleClearCompleted}
              className="text-sm text-gray-600 hover:text-red-500 transition-colors"
            >
              Clear completed ({stats.completed})
            </button>
          )}
        </div>
      )}
    </div>
  )
}
