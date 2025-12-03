'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTaskStore } from '@/stores/taskStore'
import { cn } from '@/lib/utils'

const taskInputSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less')
})

type TaskInputForm = z.infer<typeof taskInputSchema>

export function TaskInput() {
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const addTask = useTaskStore((state) => state.addTask)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskInputForm>({
    resolver: zodResolver(taskInputSchema)
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onSubmit = async (data: TaskInputForm) => {
    setIsLoading(true)
    try {
      await addTask(data.title)
      reset()
      inputRef.current?.focus()
    } catch (error) {
      console.error('Failed to add task:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="relative">
        <input
          {...register('title')}
          ref={inputRef}
          type="text"
          placeholder="What needs to be done?"
          disabled={isLoading}
          className={cn(
            'w-full px-6 py-4 text-lg border-2 rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200',
            'placeholder:text-gray-400',
            errors.title && 'border-red-500',
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </div>
      {errors.title && (
        <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
      )}
    </form>
  )
}
