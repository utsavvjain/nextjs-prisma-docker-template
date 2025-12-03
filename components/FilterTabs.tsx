'use client'

import { FilterType } from '@/types/task'
import { useTaskStore } from '@/stores/taskStore'
import { cn } from '@/lib/utils'

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
]

export function FilterTabs() {
  const filter = useTaskStore((state) => state.filter)
  const setFilter = useTaskStore((state) => state.setFilter)

  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={cn(
            'px-4 py-2 rounded-full font-medium transition-all duration-200',
            filter === f.value
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
