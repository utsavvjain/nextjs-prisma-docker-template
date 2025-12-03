'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, type CreateTaskRequest } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function TaskInput() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskRequest>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: CreateTaskRequest) => {
    setIsSubmitting(true);
    try {
      await addTask(data.title);
      reset();
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            {...register('title')}
            placeholder="What needs to be done?"
            autoFocus
            disabled={isSubmitting}
            className="h-12 text-base"
            aria-label="New task title"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-6"
          aria-label="Add task"
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
}
